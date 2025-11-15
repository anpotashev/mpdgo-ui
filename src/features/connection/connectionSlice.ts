import {createSlice} from "@reduxjs/toolkit";

interface GetConnectionStateResponse {
    connected: boolean;
}

interface ConnectionState {
    connected: boolean | null;
}

const initValue: ConnectionState = {
    connected: null,
}

export const connectionSlice = createSlice({
        name: 'connection',
        initialState: initValue,
        reducers: {
            processConnectionState: (_state, action) =>
                action.payload ?
                    {connected: (action.payload as GetConnectionStateResponse).connected}
                    : initValue
        },
    }
);

export default connectionSlice.reducer;