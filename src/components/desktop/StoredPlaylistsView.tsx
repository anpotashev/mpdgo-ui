import {useSelector} from "react-redux";
import type {RootState} from "@/store/store.ts";
import {useAppDispatch} from "@/app/hooks.ts";
import {dndSlice, type DragItem} from "@/features/dnd/dndSlice.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {SaveIcon} from "lucide-react";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {saveStoredPlaylist} from "@/features/wsRequestPayloads.ts";

export const StoredPlaylistsView = () => {
    const playlists = useSelector((state: RootState) => state.storedPlaylists.playlists );
    const currentPlaylistIsEmpty = useSelector((state: RootState) => (state.playlist?.items?.length ?? 0) == 0);
    const dispatch = useAppDispatch();
    const [playlistName, setPlaylistName] = useState("");

    return (
        <>
            <div className="flex items-center gap-2">
                <Input type={"text"}
                       placeholder={"Save current playlist as..."}
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                /><Button
                disabled={currentPlaylistIsEmpty || playlistName.length == 0}
                className={"rounded-full " +
                "     bg-white      text-black      hover:bg-blue-400      hover:text-black " +
                "dark:bg-black dark:text-white dark:hover:bg-blue-400 dark:hover:text-white"}
                onClick={() => dispatch(wsSend(saveStoredPlaylist(playlistName)))}
            ><SaveIcon/></Button>
            </div>
            <div className="m-3">
                <ul>
                    {playlists.map((pl, idx) => (
                        <li key={idx} className={"text-left"}
                            onMouseDown={e => {
                                if (e.button == 0) {
                                    dispatch(dndSlice.actions.startDrag({
                                        source: "stored_playlist",
                                        name: pl.name,
                                    } as DragItem))
                                }
                            }}><span className="dark:invert grayscale">🎶</span>{pl.name}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}