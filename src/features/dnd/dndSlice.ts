import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface DragItem {
    source: "tree"|"playlist"
    path: string | null
    pos: number | null
    name: string | null
    id: number | null
}
interface DragState {
    draggingItem: DragItem|null
}
const initValue: DragState = {
    draggingItem: null
}

export const dndSlice = createSlice({
    name: 'dnd',
    initialState: initValue,
    reducers: {
        startDrag: (state, action: PayloadAction<DragItem>) => {
            console.log("startDrag", action.payload);
            state.draggingItem = action.payload;
        },
        stopDrag: (store, action: PayloadAction<any>) => {
            store.draggingItem = null;
            console.log(action);
        },
    },
});

export default dndSlice.reducer;