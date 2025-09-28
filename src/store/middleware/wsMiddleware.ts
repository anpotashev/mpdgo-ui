import {createAction, type Dispatch, type Middleware, type MiddlewareAPI} from "@reduxjs/toolkit";
import {wsConnected, wsDisconnected} from "@/features/ws/wsSlice";
import {wsProcessData} from "@/store/middleware/wsMessageMiddleware";
import {connectionSlice} from "@/features/connection/connectionSlice";

// --- Экшены для управления WS ---
export const wsConnect = createAction<string>("ws/connect"); // payload = URL
export const wsDisconnect = createAction("ws/disconnect");
export const wsSend = createAction<unknown>("ws/send"); // payload = сообщение

let socket: WebSocket | null = null;

export const wsMiddleware: Middleware<object, unknown> =
    (store: MiddlewareAPI<Dispatch, unknown>) => (next) => (action) => {
        // --- Обработка подключения ---
        if (wsConnect.match(action)) {
            if (socket && socket.readyState !== WebSocket.CLOSED) {
                return next(action);
            }
            socket = new WebSocket(action.payload);

            socket.onopen = () => {
                store.dispatch(wsConnected());
                // store.dispatch(wsSend(subscribeMessage()));
                // store.dispatch(wsSend(getConnectionStateMessage()));
            };

            socket.onclose = () => {
                store.dispatch(wsDisconnected());
                store.dispatch(connectionSlice.actions.resetConnectionState());
            };

            socket.onmessage = (event) => {
                store.dispatch(wsProcessData(event.data));
            };
        }

        // --- Отключение ---
        if (wsDisconnect.match(action)) {
            if (socket) {
                socket.close();
                socket = null;
            }
        }

        // --- Отправка сообщений ---
        if (wsSend.match(action)) {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(action.payload));
            }
        }

        return next(action);
    };
