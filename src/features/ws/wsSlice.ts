import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface PendingRequest {
    type: string;
    payload: any;
    timestamp: number;
}

interface WsState {
    connected: boolean;
    pending: Record<string, PendingRequest>;
}

const initialState: WsState = {
    connected: false,
    pending: {},
};

const wsSlice = createSlice({
    name: "ws",
    initialState,
    reducers: {
        wsConnected: (state) => {
            state.connected = true;
        },
        wsDisconnected: (state) => {
            state.connected = false;
        },
        trackRequest: (
            state,
            action: PayloadAction<{ requestId: string; type: string; payload: any }>
        ) => {
            state.pending[action.payload.requestId] = {
                type: action.payload.type,
                payload: action.payload.payload,
                timestamp: Date.now(),
            };
        },
        resolveRequest: (state, action: PayloadAction<{ requestId: string }>) => {
            delete state.pending[action.payload.requestId];
        },
    },
});

export const { wsConnected, wsDisconnected, trackRequest, resolveRequest } =
    wsSlice.actions;
export default wsSlice.reducer;
