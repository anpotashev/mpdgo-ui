
export const WsMessagePayloadType = {
    setConnectionState: "connection/set",
    getConnectionState: "connection/get",
    listOutputs: "output/list",
    setOutput: "output/set",
    listCurrentPlaylist: "current_playlist/get",
    clearCurrentPlaylist: "current_playlist/clear",
    addToPlaylist: "current_playlist/add",
    addToPosPlaylist: "current_playlist/add_to_pos",
    deleteByPosFromCurrentPlaylist: "current_playlist/delete_by_pos",
    shuffleAllCurrentPlaylist: "current_playlist/shuffle_all",
    shuffleCurrentPlaylist: "current_playlist/shuffle",
    moveInCurrentPlaylist: "current_playlist/move",
    batchMoveInCurrentPlaylist: "current_playlist/batch_move",
    getTree: "tree/get",
    play: "playback/play",
    pause: "playback/pause",
    stop: "playback/stop",
    next: "playback/next",
    previous: "playback/previous",
    playId: "playback/play_id",
    playPos: "playback/play_pos",
    seekPos: "playback/seek_pos",
    getStoredPlaylists: "stored_playlist/get_stored_playlists",
    deleteStoredPlaylist: "stored_playlist/delete_stored_playlist",
    saveCurrentPlaylistAsStored: "stored_playlist/save_current_playlist_as_stored",
    renameStoredPlaylist: "stored_playlist/rename_stored_playlist",
    getStatus: "status/get",
    setRandom: "status/set_random",
    setRepeat: "status/set_repeat",
    setSingle: "status/set_single",
    setConsume: "status/set_consume",
}
type WsMessagePayloadType = typeof WsMessagePayloadType[keyof typeof WsMessagePayloadType];

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
