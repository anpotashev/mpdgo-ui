import {createSlice} from "@reduxjs/toolkit";

export interface Output {
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
        processWsPayload: (_store, action) => action.payload
            ? {
                outputs: action.payload.outputs ?? []
            } : initValue
    },
});

export default outputSlice.reducer;