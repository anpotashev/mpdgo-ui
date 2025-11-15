import {createSlice} from "@reduxjs/toolkit";

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
    root: DirectoryItem;
    loading: boolean;
}

const initValue: Tree = {
    root: {
        path: "",
        name: "/",
        children: [],
    },
    loading: true,
}

export const treeSlice = createSlice({
    name: 'tree',
    initialState: initValue,
    reducers: {
        processWsPayload: (_store, action) =>
            action.payload ? {
                root: action.payload as DirectoryItem,
                loading: false,
            } : initValue
    },
});

export default treeSlice.reducer;