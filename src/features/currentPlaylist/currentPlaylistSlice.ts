import {createSlice} from "@reduxjs/toolkit";

export interface PlaylistItem {
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
    loading: boolean
}

const initValue: CurrentPlaylist = {
    items: null,
    loading: true,
}

export const currentPlaylistSlice = createSlice({
    name: 'currentPlaylist',
    initialState: initValue,
    reducers: {
        processWsPayload: (_store, action) =>  (action.payload) ?
            {
                items: action.payload.items ?? [] as PlaylistItem[],
                loading: false,
            }: initValue
    },
});

export default currentPlaylistSlice.reducer;