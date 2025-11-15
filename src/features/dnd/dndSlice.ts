import {createSlice} from "@reduxjs/toolkit";

export interface DragItem {
    source: "tree" | "playlist" | "stored_playlist"
    path: string | null
    pos: number | null
    name: string | null
    id: number | null
}

interface DragState {
    draggingItem: DragItem | null
}

const initValue: DragState = {
    draggingItem: null
}

export const dndSlice = createSlice({
    name: 'dnd',
    initialState: initValue,
    reducers: {
        startDrag: (_state, action) => action.payload ?
            {draggingItem: action.payload}
            : initValue,
        stopDrag: () => initValue,
    },
});

export default dndSlice.reducer;