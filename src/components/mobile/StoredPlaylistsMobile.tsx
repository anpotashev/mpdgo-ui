import {useSelector} from "react-redux";
import type {RootState} from "@/store/store.ts";
import {useAppDispatch} from "@/app/hooks.ts";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {addStoredPlaylistToPos, deleteStoredPlaylist, saveStoredPlaylist} from "@/features/wsRequestPayloads.ts";
import {SaveIcon} from "lucide-react";
import {MobileContextMenu} from "@/components/mobile/MobileContextMenu.tsx";

export const StoredPlaylistsMobile = () => {
    const playlists = useSelector((state: RootState) => state.storedPlaylists.playlists );
    const playlistLength = useSelector((state: RootState) => state.playlist?.items?.length) ?? 0
    const currentPlaylistIsEmpty = playlistLength === 0;
    const dispatch = useAppDispatch();
    const [playlistName, setPlaylistName] = useState("");

    const  addFirst = (path: string)=>  dispatch(wsSend(addStoredPlaylistToPos(0, path)));
    const  addLast = (path: string)=>  dispatch(wsSend(addStoredPlaylistToPos(playlistLength, path)));
    const  deleteStored = (path: string)=>  dispatch(wsSend(deleteStoredPlaylist(path)));

    return <>
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
                    <MobileContextMenu
                        items={[
                            {label: "⬆️ Add first", onClick: () => addFirst(pl.name)},
                            {label: "⬇️ Add last",onClick: () => addLast(pl.name)},
                            {label: "⬇️ Delete",onClick: () => deleteStored(pl.name)},

                        ]}>
                    <li key={idx} className={"text-left"}><span className=" dark:invert">🎶</span>{pl.name}</li>
                    </MobileContextMenu>
                ))}
            </ul>
        </div>
    </>
}