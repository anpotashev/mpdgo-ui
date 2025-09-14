import React from "react";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store";
import {RetryWsScreen} from "./RetryWsScreen";

type WsGateProps = {
    url: string;
    children: React.ReactNode;
};

export const WsGate: React.FC<WsGateProps> = ({ url, children }) => {
    const connected = useSelector((s: RootState) => s.ws.connected);
    if (!connected) return <RetryWsScreen url={url} />;
    return <>{children}</>;
};
