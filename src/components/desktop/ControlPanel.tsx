import {Button} from "@/components/ui/button.tsx";
import {PauseIcon, PlayIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon, SquareIcon, TrashIcon} from "lucide-react";
import {useCurrentPlaylistLogic} from "@/hooks/useCurrentPlaylistLogic.ts";
import {usePlaybackLogic} from "@/hooks/usePlaybackLogic.ts";
import {useDragLogic} from "@/hooks/useDragLogic.ts";
import {useStoredPlaylistLogic} from "@/hooks/useStoredPlaylistLogic.ts";

export const ControlPanel = () => {
    const {clear, shuffle, deleteItem, currentPlaylistIsEmpty} = useCurrentPlaylistLogic();
    const {doPrev, doPlay, doPause, doStop, doNext, nextPrevPauseStopEnabled, playEnabled} = usePlaybackLogic();
    const {doDragStop,draggingItem} = useDragLogic();
    const {deleteStoredByName} = useStoredPlaylistLogic()
    const playbackEnabled = !draggingItem;
    const shuffleEnabled = playbackEnabled && currentPlaylistIsEmpty;
    const clearEnabled = ((!draggingItem || draggingItem.source === "playlist") && !currentPlaylistIsEmpty) || (draggingItem && draggingItem.source === "stored_playlist");

    const buttonClass = "rounded-full " +
        "     bg-white      text-black      hover:bg-blue-400      hover:text-black " +
        "dark:bg-black dark:text-white dark:hover:bg-blue-400 dark:hover:text-white";

    function deleteTrack() {
        if (draggingItem) {
            if (draggingItem.source === "playlist") {
                deleteItem(draggingItem.pos!)
            }
            if (draggingItem.source === "stored_playlist") {
                deleteStoredByName(draggingItem.name!);
            }
        }
        doDragStop();
    }

    return (
        <div className={"m-1"}>
            <Button className={buttonClass} onClick={clear}
                    disabled={!clearEnabled} onMouseUp={deleteTrack}><TrashIcon/></Button>
            <Button className={buttonClass} onClick={shuffle}
                    disabled={!shuffleEnabled}><ShuffleIcon/></Button>
            <Button className={buttonClass} onClick={doPrev}
                    disabled={!nextPrevPauseStopEnabled || !playbackEnabled}><SkipBackIcon/></Button>
            <Button className={buttonClass} onClick={doPlay}
                    disabled={!playEnabled || !playbackEnabled}><PlayIcon/></Button>
            <Button className={buttonClass} onClick={doPause}
                    disabled={!nextPrevPauseStopEnabled || !playbackEnabled}><PauseIcon/></Button>
            <Button className={buttonClass} onClick={doStop}
                    disabled={!nextPrevPauseStopEnabled || !playbackEnabled}><SquareIcon/></Button>
            <Button className={buttonClass} onClick={doNext}
                    disabled={!nextPrevPauseStopEnabled || !playbackEnabled}><SkipForwardIcon/></Button>
        </div>
    )
}