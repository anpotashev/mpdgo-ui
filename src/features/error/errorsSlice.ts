import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface ErrorEntry {
    requestId?: string | null;
    error: string;
    originalType?: string;
    originalPayload?: any;
    timestamp: number;
}

const errorsSlice = createSlice({
    name: "errors",
    initialState: [] as ErrorEntry[],
    reducers: {
        addError: (state, action: PayloadAction<ErrorEntry>) => {
            state.push(action.payload);
        },
        clearErrors: () => [] as ErrorEntry[]
    },
});

export const { addError, clearErrors } = errorsSlice.actions;
export default errorsSlice.reducer;
