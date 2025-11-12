import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SaveIcon} from "lucide-react";
import {ContextMenuMobile} from "@/components/mobile/ContextMenuMobile.tsx";
import {useStoredPlaylistLogic} from "@/components/common/useStoredPlaylistLogic.ts";
import {useCurrentPlaylistLogic} from "@/components/common/useCurrentPlaylistLogic.ts";

export const StoredPlaylistsMobile = () => {
    const { saveCurrentAsStored,deleteStoredByName, storedPlaylists } = useStoredPlaylistLogic();
    const {addStoredToPos, items} = useCurrentPlaylistLogic();

    const playlistLength = items.length;
    const currentPlaylistIsEmpty = playlistLength == 0;
    const [playlistName, setPlaylistName] = useState("");

    const  addFirst = (name: string)=> addStoredToPos(name, 0);
    const  addLast = (name: string)=>  addStoredToPos(name, playlistLength);
    const  deleteStored = (name: string)=>  deleteStoredByName(name);

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
            onClick={() => saveCurrentAsStored(playlistName)}
        ><SaveIcon/></Button>
        </div>

        <div className="m-3">
            <ul>
                {storedPlaylists.map((pl, idx) => (
                    <ContextMenuMobile
                        items={[
                            {label: "⬆️ Add first", onClick: () => addFirst(pl.name)},
                            {label: "⬇️ Add last",onClick: () => addLast(pl.name)},
                            {label: "⬇️ Delete",onClick: () => deleteStored(pl.name)},
                        ]}>
                    <li key={idx} className={"text-left"}><span className=" dark:invert grayscale">🎶</span>{pl.name}</li>
                    </ContextMenuMobile>
                ))}
            </ul>
        </div>
    </>
}