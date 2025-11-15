import {useAppDispatch} from "@/hooks/app.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {deleteStoredPlaylist, saveStoredPlaylist} from "@/features/wsRequestPayloads.ts";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store.ts";

export function useStoredPlaylistLogic() {
    const dispatch = useAppDispatch();
    const deleteStoredByName = (name: string) => dispatch(wsSend(deleteStoredPlaylist(name)));
    const saveCurrentAsStored = (name: string) => dispatch(wsSend(saveStoredPlaylist(name)));
    const storedPlaylists = useSelector((state: RootState) => state.storedPlaylists);

    return {deleteStoredByName, saveCurrentAsStored, storedPlaylists: storedPlaylists.playlists, storedPlaylistsLoading: storedPlaylists.loading};
}