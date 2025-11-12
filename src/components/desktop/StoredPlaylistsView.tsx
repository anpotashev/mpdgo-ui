import {type DragItem} from "@/features/dnd/dndSlice.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {SaveIcon} from "lucide-react";
import {useStoredPlaylistLogic} from "@/hooks/useStoredPlaylistLogic.ts";
import {useDragLogic} from "@/hooks/useDragLogic.ts";
import {useCurrentPlaylistLogic} from "@/hooks/useCurrentPlaylistLogic.ts";

export const StoredPlaylistsView = () => {
    const {saveCurrentAsStored, storedPlaylists} = useStoredPlaylistLogic();
    const {doDragStart} = useDragLogic();
    const {items} = useCurrentPlaylistLogic();
    const currentPlaylistIsEmpty = items.length == 0;
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
                onClick={() => saveCurrentAsStored(playlistName)}
            ><SaveIcon/></Button>
            </div>
            <div className="m-3">
                <ul>
                    {storedPlaylists.map((pl, idx) => (
                        <li key={idx} className={"text-left"}
                            onMouseDown={e => {
                                if (e.button == 0) {
                                    doDragStart({
                                        source: "stored_playlist",
                                        name: pl.name,
                                    } as DragItem)
                                }
                            }}><span className="dark:invert grayscale">🎶</span>{pl.name}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}