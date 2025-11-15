import {createSlice} from "@reduxjs/toolkit";

export interface StoredPlaylistsState {
    playlists:  StoredPlaylist[];
    loading: boolean;
}

type IsoDateString = string;

export interface StoredPlaylist {
    name: string;
    last_modified: IsoDateString;
}

const initValue: StoredPlaylistsState = {
    playlists: [],
    loading: true,
}

export const storedPlaylistsSlice = createSlice({
    name: 'storedPlaylist',
    initialState: initValue,
    reducers: {
        processWsPayload: (_store, action) => action.payload ?
            {
                playlists: action.payload?.Playlists ?? [],
                loading: false,
            } : initValue
    }
})

export default storedPlaylistsSlice.reducer;