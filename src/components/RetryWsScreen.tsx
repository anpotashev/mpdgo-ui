import React, {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {wsConnect} from "@/store/middleware/wsMiddleware"; // скорректируй путь
import type {RootState} from "@/store/store"; // скорректируй путь

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
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <div style={styles.spinner} aria-hidden />
                <h2 style={styles.title}>Connecting…</h2>
                <p style={styles.subtitle}>
                    Attempt #{attempt} {pauseOnHidden && !visible ? "(paused)" : ""}
                </p>
                {!connected && pauseOnHidden && !visible ? (
                    <p style={styles.note}>Open this tab to resume retry.</p>
                ) : (
                    <p style={styles.note}>
                        Next retry in ~{secondsLeft}s (URL: <code>{url}</code>)
                    </p>
                )}
                <div style={styles.actions}>
                    <button style={styles.button} onClick={retryNow}>
                        Retry now
                    </button>
                </div>
            </div>
        </div>
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

// простые инлайн-стили
const styles: { [k: string]: React.CSSProperties } = {
    wrapper: {
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background:
            "radial-gradient(1200px 600px at 50% -50%, rgba(0,0,0,0.08), transparent), #f8fafc",
    },
    card: {
        width: "min(92vw, 520px)",
        borderRadius: 16,
        background: "#fff",
        boxShadow: "0 12px 36px rgba(0,0,0,0.12)",
        padding: "28px 24px",
        textAlign: "center",
        border: "1px solid #e5e7eb",
    },
    spinner: {
        width: 36,
        height: 36,
        margin: "0 auto 12px",
        borderRadius: "50%",
        border: "3px solid #e5e7eb",
        borderTopColor: "#2563eb",
        animation: "spin 1s linear infinite",
    } as React.CSSProperties,
    title: { margin: "8px 0 4px", fontSize: "1.25rem" },
    subtitle: { margin: 0, color: "#6b7280" },
    note: { marginTop: 8, fontSize: 12, color: "#6b7280" },
    actions: { marginTop: 16, display: "flex", justifyContent: "center", gap: 8 },
    button: {
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #2563eb",
        background: "#2563eb",
        color: "#fff",
        cursor: "pointer",
    },
};
