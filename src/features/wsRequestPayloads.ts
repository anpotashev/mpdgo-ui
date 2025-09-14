import {v4 as uuidv4} from 'uuid';
import {WsMessagePayloadType} from "@/types/wsPayload";

interface wsRequest {
    '@type': WsMessagePayloadType;
    requestId: string;
    payload: object;
}
const getWsRequest = (type: WsMessagePayloadType, payload: object): wsRequest  => {
    return {
        '@type': type,
        requestId: uuidv4(),
        payload: payload
    }
}

// export const subscribeMessage = () => getWsRequest(WsMessagePayloadType.subscribe, {topics: ["on_connect","on_disconnect","database","stored_playlist","playlist","player","output","options"]});

export const getConnectionStateMessage = () => getWsRequest(WsMessagePayloadType.getConnectionState, {});


export const setConnectionState = (state: boolean)=> getWsRequest(WsMessagePayloadType.setConnectionState, {enable: state});
export const setRandom = (state: boolean)=> getWsRequest(WsMessagePayloadType.setRandom, {enable: state});
export const setSingle = (state: boolean)=> getWsRequest(WsMessagePayloadType.setSingle, {enable: state});
export const setRepeat = (state: boolean)=> getWsRequest(WsMessagePayloadType.setRepeat, {enable: state});
export const setConsume = (state: boolean)=> getWsRequest(WsMessagePayloadType.setConsume, {enable: state});

export const seekPos = (songPos: number, seekTime: number) => getWsRequest(
    WsMessagePayloadType.seekPos, {pos: songPos,seek_time: seekTime}
)

export const getCurrentPlaylist = () => getWsRequest(WsMessagePayloadType.listCurrentPlaylist, {});
export const clearCurrentPlaylist = () => getWsRequest(WsMessagePayloadType.clearCurrentPlaylist, {});
export const shuffleCurrentPlaylist = () => getWsRequest(WsMessagePayloadType.shuffleAllCurrentPlaylist, {});
export const prev = () => getWsRequest(WsMessagePayloadType.previous, {});
export const play = () => getWsRequest(WsMessagePayloadType.play, {});
export const pause = () => getWsRequest(WsMessagePayloadType.pause, {});
export const stop = () => getWsRequest(WsMessagePayloadType.stop, {});
export const next = () => getWsRequest(WsMessagePayloadType.next, {});
export const getTree = () => getWsRequest(WsMessagePayloadType.getTree, {})
export const listOutputs = () => getWsRequest(WsMessagePayloadType.listOutputs, {})
export const getState = () => getWsRequest(WsMessagePayloadType.getStatus, {})

export const setOutputState = (id: number, enable: boolean) => getWsRequest(WsMessagePayloadType.setOutput, {id: id, enable: enable});
export const addToPos = (pos: number, path: string) => getWsRequest(WsMessagePayloadType.addToPosPlaylist, {pos: pos, path: path});

export const playPos = (pos: number)=> getWsRequest(WsMessagePayloadType.playPos, {pos: pos});
export const moveItemToPos = (posFrom: number, posTo: number) => getWsRequest(WsMessagePayloadType.moveInCurrentPlaylist, {from_pos: posFrom, to_pos: posTo});

export const deleteByPos = (pos: number) => getWsRequest(WsMessagePayloadType.deleteByPosFromCurrentPlaylist, {pos: pos});
