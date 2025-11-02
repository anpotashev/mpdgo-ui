import {createAction, type Dispatch, type Middleware, type MiddlewareAPI} from "@reduxjs/toolkit";
import {type WsMessage, WsMessagePayloadType} from "@/types/wsPayload";
import {addError} from "@/features/error/errorsSlice";
import {connectionSlice} from "@/features/connection/connectionSlice";
import {statusSlice} from "@/features/status/statusSlice";
import {currentPlaylistSlice} from "@/features/currentPlaylist/currentPlaylistSlice";
import {treeSlice} from "@/features/tree/treeSlice";
import {outputSlice} from "@/features/output/outputSlice";
import {storedPlaylistsSlice} from "@/features/storedPlaylists/storedPlaylistsSlice.ts";

export const wsProcessData = createAction<string>("ws/processData"); // payload = сообщение

function handleData(store: MiddlewareAPI<Dispatch, unknown>, data: WsMessage) {
    if (data.error) {
        const err = {
            requestId: data.requestId,
            error: data.error,
            originalType: data["@type"],
            originalPayload: data.payload,
            timestamp: Date.now(),
        }
        store.dispatch(addError(err))
        return
    }
    switch (data["@type"]) {
        case WsMessagePayloadType.getConnectionState:
            store.dispatch(connectionSlice.actions.processConnectionState(data.payload));
            break;
        case WsMessagePayloadType.getStatus:
            store.dispatch(statusSlice.actions.processWsPayload(data.payload));
            break;
        case WsMessagePayloadType.listCurrentPlaylist:
            store.dispatch(currentPlaylistSlice.actions.processWsPayload(data.payload))
            break;
        case WsMessagePayloadType.getTree:
            store.dispatch(treeSlice.actions.processWsPayload(data.payload))
            break
        case WsMessagePayloadType.listOutputs:
            store.dispatch(outputSlice.actions.processWsPayload(data.payload));
            break;
        case WsMessagePayloadType.getStoredPlaylists:
            store.dispatch(storedPlaylistsSlice.actions.processWsPayload(data.payload));
            break;
    }
}

export const wsMessageMiddleware: Middleware<{}, unknown> =
    (store: MiddlewareAPI<Dispatch, unknown>) =>
        (next) =>
            (action) => {
                if (wsProcessData.match(action)) {
                    try {
                        const data = JSON.parse(action.payload) as WsMessage;
                        handleData(store, data);

                    } catch (err) {
                        console.error(err);
                    }
                }
                next(action);
            }