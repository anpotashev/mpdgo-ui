import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface PlaylistItem {
    file: string;
    time: number;
    artist?: string;
    title?: string;
    album?: string;
    track?: string;
    pos: number;
    id: number;
}
interface CurrentPlaylist {
    items: PlaylistItem[] | null
}

const initValue: CurrentPlaylist = {
    items: null,
}

export const currentPlaylistSlice = createSlice({
    name: 'currentPlaylist',
    initialState: initValue,
    reducers: {
        resetStatusState: () => initValue,
        processWsPayload: (store, action: PayloadAction<any>) => {
            if (action.payload?.items) {
                store.items = action.payload.items as PlaylistItem[];
            } else {
                store.items = null;
            }
        }
    },
});

export default currentPlaylistSlice.reducer;