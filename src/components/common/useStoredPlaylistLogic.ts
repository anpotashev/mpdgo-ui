import {useAppDispatch} from "@/app/hooks.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {deleteStoredPlaylist} from "@/features/wsRequestPayloads.ts";

export function useStoredPlaylistLogic() {
    const dispatch = useAppDispatch();
    const deleteStoredByName = (name: string) => dispatch(wsSend(deleteStoredPlaylist(name)));

    return {deleteStoredByName};
}