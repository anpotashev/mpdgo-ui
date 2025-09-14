import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface GetConnectionStateResponse {
    connected: boolean;
}

interface ConnectionState {
    connected: boolean|null;
}

const initValue: ConnectionState = {
    connected: null,
}

export const connectionSlice = createSlice({
        name: 'connection',
        initialState: initValue,
        reducers: {
            processConnectionState: (state, action: PayloadAction<any>) => {
                if (action.payload !== null) {
                    state.connected = (action.payload as GetConnectionStateResponse).connected;
                } else {
                    state.connected = null;
                }
            },
            resetConnectionState: () => initValue
        },
    }
);

export default connectionSlice.reducer;