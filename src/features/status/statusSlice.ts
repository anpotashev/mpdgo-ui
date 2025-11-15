import {createSlice} from "@reduxjs/toolkit";

interface SongTime {
    current: number,
    full: number,
}

interface MpdStatus {
    volume: number | null,
    repeat: boolean | null,
    random: boolean | null,
    single: boolean | null,
    consume: boolean | null,
    playlist: string | null,
    playlistLength: number | null,
    xfade: number | null,
    state: string | null,
    song: number | null,
    songId: number | null,
    time: SongTime | null,
    bitrate: number | null,
    audio: string | null,
    nextSong: number | null,
    nextSongId: number | null,
}

interface StatusState {
    status: MpdStatus|null,
    loading: boolean,
    error: string|null
}

const initValue: StatusState = {
    status: null,
    loading: false,
    error: null,
}

export const statusSlice = createSlice({
    name: 'status',
    initialState: initValue,
    reducers: {
        processWsPayload: (_store, action) => action.payload ?
            { status: action.payload} as StatusState: initValue
    },
});

export default statusSlice.reducer;