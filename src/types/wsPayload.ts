
export enum WsMessagePayloadType {
    subscribe = "subscribe",
    setConnectionState = "connection/set",
    getConnectionState = "connection/get",

    // outputs
    listOutputs = "output/list",
    setOutput = "output/set",

    // current playlist
    listCurrentPlaylist = "current_playlist/get",
    clearCurrentPlaylist = "current_playlist/clear",
    addToPlaylist = "current_playlist/add",
    addToPosPlaylist = "current_playlist/add_to_pos",
    deleteByPosFromCurrentPlaylist = "current_playlist/delete_by_pos",
    shuffleAllCurrentPlaylist = "current_playlist/shuffle_all",
    shuffleCurrentPlaylist = "current_playlist/shuffle",
    moveInCurrentPlaylist = "current_playlist/move",
    batchMoveInCurrentPlaylist = "current_playlist/batch_move",

    // tree
    getTree = "tree/get",

    // playback
    play = "playback/play",
    pause = "playback/pause",
    stop = "playback/stop",
    next = "playback/next",
    previous = "playback/previous",
    playId = "playback/play_id",
    playPos = "playback/play_pos",
    seekPos = "playback/seek_pos",

    // stored playlist
    getStoredPlaylists = "stored_playlist/get_stored_playlists",
    deleteStoredPlaylist = "stored_playlist/delete_stored_playlist",
    saveCurrentPlaylistAsStored = "stored_playlist/save_current_playlist_as_stored",
    renameStoredPlaylist = "stored_playlist/rename_stored_playlist",

    // status | options
    getStatus = "status/get",
    setRandom = "status/set_random",
    setRepeat = "status/set_repeat",
    setSingle = "status/set_single",
    setConsume = "status/set_consume",
}

export interface WsMessage {
    '@type': WsMessagePayloadType;
    requestId?: string | null;
    payload?: any;
    success?: boolean;
    error?: string;
}

export interface ErrorEntry {
    requestId?: string | null;
    error: string;
    originalType?: string;
    originalPayload?: any;
    timestamp: number;
}


export interface Output {
    id: number;
    name: string;
    enabled: boolean;
}

export interface OutputPayload {
    outputs: Output[];
}

// export interface PlaylistItem {
//     file: string;
//     time: number;
//     artist?: string;
//     title?: string;
//     album?: string;
//     track?: string;
//     pos: number;
//     id: number;
// }

// export interface Playlist {
//     items?: PlaylistItem[];
//     name?: string;
//     last_modified?: string; // ISO string
// }
//
// export interface SongTime {
//     current: number;
//     full: number;
// }

// export interface GetStatusPayload {
//     volume?: number;
//     repeat?: boolean;
//     random?: boolean;
//     single?: boolean;
//     consume?: boolean;
//     playlist?: string;
//     playlist_length?: number;
//     xfade?: number;
//     state?: string;
//     song?: number;
//     song_id?: number;
//     time?: SongTime;
//     bitrate?: number;
//     audio?: string;
//     next_song?: number;
//     next_song_id?: number;
// }
//
// export type TreeItem = DirectoryItem | FileItem;
//
// export interface DirectoryItem {
//     path: string;
//     name: string;
//     children: TreeItem[];
// }
//
// export interface FileItem {
//     path: string;
//     name: string;
//     time?: string;
//     artist?: string;
//     album_artist?: string;
//     title?: string;
//     album?: string;
//     track?: string;
//     date?: string;
// }


//
// export interface GetStoredPlaylistsResponse {
//     playlists: Playlist[];
// }
