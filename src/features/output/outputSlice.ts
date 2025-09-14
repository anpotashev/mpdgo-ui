import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface Output {
    id: number;
    name: string;
    enabled: boolean;
}

interface Outputs {
    outputs: Output[] | null
}

const initValue: Outputs = {
    outputs: null
}

export const outputSlice = createSlice({
    name: 'output',
    initialState: initValue,
    reducers: {
        resetStatusState: () => initValue,
        processWsPayload: (store, action: PayloadAction<any>) => {
            if (action.payload.outputs) {
                store.outputs = action.payload.outputs as Output[]
            } else {
                store.outputs = null;
            }
        }
    },
});

export default outputSlice.reducer;