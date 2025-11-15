import {useAppDispatch, useAppSelector} from "@/hooks/app.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {
    addStoredPlaylistToPos,
    addToPos,
    clearCurrentPlaylist,
    deleteByPos,
    moveItemToPos,
    playPos,
    shuffleCurrentPlaylist
} from "@/features/wsRequestPayloads.ts";
import type {PlaylistItem} from "@/features/currentPlaylist/currentPlaylistSlice.ts";

export function useCurrentPlaylistLogic() {
    const playlist = useAppSelector(state => state.playlist);
    const items = playlist.items ?? [];
    const loading = playlist.loading;
    const playing = useAppSelector(state => state.status?.status?.state === "play");
    const activePos = useAppSelector(state => state.status.status?.song);

    const dispatch = useAppDispatch();
    const currentPlaylistLength = items.length;
    const currentPlaylistIsEmpty = currentPlaylistLength === 0;
    const formatTime = (seconds: number) => {
        if (seconds < 1) {
            return "00:00"
        }
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };
    const clear = () => dispatch(wsSend(clearCurrentPlaylist()));
    const shuffle = () => dispatch(wsSend(shuffleCurrentPlaylist()));
    const playItem =  (item: PlaylistItem)=> dispatch(wsSend(playPos(item.pos)));
    const moveUp = (id: number) => dispatch(wsSend(moveItemToPos(id, id - 1)));
    const moveDown = (id: number) => dispatch(wsSend(moveItemToPos(id, id + 1)));
    const deleteItem = (id: number) => dispatch(wsSend(deleteByPos(id)));
    const addByPathToPos = (path: string, pos: number) => dispatch(wsSend(addToPos(pos, path)));
    const moveFromPosToPos = (from: number, to: number) => dispatch(wsSend(moveItemToPos(from,to)));
    const addStoredToPos = (name: string, pos: number)=> dispatch(wsSend(addStoredPlaylistToPos(pos, name)));

    return {
        clear,
        shuffle,
        deleteItem,
        moveDown,
        moveUp,
        formatTime,
        playItem,
        addByPathToPos,
        moveFromPosToPos,
        addStoredToPos,
        items,
        playing,
        activePos,
        currentPlaylistLength,
        currentPlaylistIsEmpty,
        playlistLoading: loading,
    };
}