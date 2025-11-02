import React, {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {wsConnect} from "@/store/middleware/wsMiddleware";
import type {RootState} from "@/store/store";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";

type RetryWsScreenProps = {
    url: string;
    baseDelayMs?: number;   // стартовая задержка
    maxDelayMs?: number;    // потолок задержки
    jitterRatio?: number;   // доля случайного джиттера 0..1
    pauseOnHidden?: boolean;// не ретраиться, когда вкладка скрыта
};

export const RetryWsScreen: React.FC<RetryWsScreenProps> = ({
                                                                url,
                                                                baseDelayMs = 1000,
                                                                maxDelayMs = 15000,
                                                                jitterRatio = 0.2,
                                                                pauseOnHidden = true,
                                                            }) => {
    const dispatch = useDispatch();
    const connected = useSelector((s: RootState) => s.ws.connected);

    const [attempt, setAttempt] = useState(0);
    const [nextDelay, setNextDelay] = useState(baseDelayMs);
    const timerRef = useRef<number | null>(null);
    const [untilRetryMs, setUntilRetryMs] = useState<number>(0);
    const countdownRef = useRef<number | null>(null);

    const visible = usePageVisibility();

    // вычисление задержки с экспоненциальным ростом и джиттером
    const computeDelay = (n: number) => {
        const ideal = Math.min(maxDelayMs, baseDelayMs * Math.pow(2, n));
        const jitter = ideal * jitterRatio * (Math.random() * 2 - 1); // +/- jitterRatio
        return Math.max(250, Math.floor(ideal + jitter));
    };

    // старт первой попытки сразу при маунте, если не подключены
    useEffect(() => {
        if (!connected) {
            dispatch(wsConnect(url));
            setAttempt((a) => a + 1);
            setNextDelay(computeDelay(0));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // перезапуск таймера ретраев, когда: подключение потеряно, или завершилась попытка
    useEffect(() => {
        // если подключились — чистим таймеры
        if (connected) {
            clearTimers();
            return;
        }

        if (pauseOnHidden && !visible) {
            clearTimers();
            return;
        }

        // планируем следующий ретрай
        scheduleRetry(nextDelay);

        return clearTimers;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connected, nextDelay, visible]);

    // ручной “повторить сейчас”
    const retryNow = () => {
        clearTimers();
        dispatch(wsConnect(url));
        const next = computeDelay(attempt);
        setAttempt((a) => a + 1);
        setNextDelay(next);
    };

    function scheduleRetry(delay: number) {
        // обратный отсчёт
        setUntilRetryMs(delay);
        countdownRef.current = window.setInterval(() => {
            setUntilRetryMs((ms) => {
                const n = ms - 200;
                if (n <= 0) {
                    if (countdownRef.current) {
                        clearInterval(countdownRef.current);
                        countdownRef.current = null;
                    }
                    return 0;
                }
                return n;
            });
        }, 200);

        timerRef.current = window.setTimeout(() => {
            dispatch(wsConnect(url));
            const next = computeDelay(attempt);
            setAttempt((a) => a + 1);
            setNextDelay(next);
        }, delay);
    }

    function clearTimers() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
        }
    }

    const secondsLeft = useMemo(
        () => Math.ceil(untilRetryMs / 1000),
        [untilRetryMs]
    );

    return (
        <>
            <Label className={"justify-center text-xl"}>Connecting to <Label className={"text-xl text-blue-400"}>{url}</Label></Label>
            <Label className={"justify-center text-xl"}>Attempt #{attempt}</Label>
            <Label className={"justify-center text-xl"}>
            {!connected && pauseOnHidden && !visible ? "Open this tab to resume retry.":  "Next retry in ~{" + secondsLeft + "}s"}
            </Label>
            <Button onClick={retryNow}
                    className={"rounded-full  bg-white text-black hover:bg-blue-400 hover:text-black  dark:bg-black dark:text-white dark:hover:bg-blue-400 dark:hover:text-white"}>
                Retry now
            </Button>
        </>
        );
};

// маленький хук видимости вкладки
function usePageVisibility(): boolean {
    const [visible, setVisible] = useState(
        typeof document !== "undefined" ? !document.hidden : true
    );
    useEffect(() => {
        const handler = () => setVisible(!document.hidden);
        document.addEventListener("visibilitychange", handler);
        return () => document.removeEventListener("visibilitychange", handler);
    }, []);
    return visible;
}
