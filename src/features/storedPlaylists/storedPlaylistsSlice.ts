import {createSlice} from "@reduxjs/toolkit";

export interface StoredPlaylistsState {
    playlists:  StoredPlaylist[];
}

type IsoDateString = string;

export interface StoredPlaylist {
    name: string;
    last_modified: IsoDateString;
}

const initValue: StoredPlaylistsState = {
    playlists: []
}

export const storedPlaylistsSlice = createSlice({
    name: 'storedPlaylist',
    initialState: initValue,
    reducers: {
        processWsPayload: (store, action) => {
            store.playlists = action.payload?.Playlists ?? []
        }
    }
})

export default storedPlaylistsSlice.reducer;