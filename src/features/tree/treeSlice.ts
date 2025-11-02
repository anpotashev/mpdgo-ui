import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface DirectoryItem {
    path: string;
    name: string;
    children: TreeItem[];
}

export interface FileItem {
    path: string;
    name: string;
    time?: string;
    artist?: string;
    album_artist?: string;
    title?: string;
    album?: string;
    track?: string;
    date?: string;
}

export type TreeItem = DirectoryItem | FileItem;

interface Tree {
    root: DirectoryItem
}

const initValue: Tree = {
    root: {
        path: "",
        name: "/",
        children: [],
    },
}

export const treeSlice = createSlice({
    name: 'tree',
    initialState: initValue,
    reducers: {
        resetTreeState: () => initValue,
        processWsPayload: (store, action: PayloadAction<any>) => {
            if (action.payload) {
                store.root = action.payload as DirectoryItem
            } else {
                store.root = initValue.root;
            }
        }
    },
});

export default treeSlice.reducer;