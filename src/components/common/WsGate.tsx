import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "@/store/store";
import {RetryWsScreen} from "@/components/common/RetryWsScreen.tsx";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";

type WsGateProps = {
    url: string;
    children: React.ReactNode;
};

export const WsGate: React.FC<WsGateProps> = ({ url, children }) => {
    const connected = useSelector((s: RootState) => s.ws.connected);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (connected) {
            const interval = setInterval(() => {
                dispatch(wsSend({"@type": "ping"}))
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [connected]);

    if (!connected) return <RetryWsScreen url={url} />;
    return <>{children}</>;
};
