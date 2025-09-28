import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {PauseIcon, PlayIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon, SquareIcon, TrashIcon} from "lucide-react";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";

import {
    clearCurrentPlaylist, deleteByPos, next, pause, play, prev, shuffleCurrentPlaylist, stop
} from "@/features/wsRequestPayloads.ts";
import {dndSlice} from "@/features/dnd/dndSlice.ts";

export const ControlPanel = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.status.status ?? null);
    const draggingItem = useAppSelector((state) => state.dnd.draggingItem);
    const items = useAppSelector(state => state.playlist.items) ?? [];
    const shuffleEnabled = !draggingItem && items.length > 0;
    const clearEnabled = (!draggingItem || draggingItem.source === "playlist") && items.length > 0;
    const stopEnabled = !draggingItem && (status?.state === "play" || status?.state === "pause");
    const nextPrevEnabled = !draggingItem && (status?.state === "play" || status?.state === "pause");
    const playEnabled = !draggingItem && shuffleEnabled && (status?.state === "pause" || status?.state === "stop");
    const pauseEnabled = !draggingItem && (status?.state === "play" || status?.state === "pause");

    const buttonClass = "rounded-full " +
        "     bg-white      text-black      hover:bg-blue-400      hover:text-black " +
        "dark:bg-black dark:text-white dark:hover:bg-blue-400 dark:hover:text-white";

    function deleteTrack() {
        if (draggingItem && draggingItem.source === "playlist") {
            dispatch(wsSend(deleteByPos(draggingItem.pos!)));
        }
        dispatch(dndSlice.actions.stopDrag());
    }

    return (
        <div className={"m-1"}>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(clearCurrentPlaylist()))}
                    disabled={!clearEnabled} onMouseUp={deleteTrack}><TrashIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(shuffleCurrentPlaylist()))}
                    disabled={!shuffleEnabled}><ShuffleIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(prev()))}
                    disabled={!nextPrevEnabled}><SkipBackIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(play()))}
                    disabled={!playEnabled}><PlayIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(pause()))}
                    disabled={!pauseEnabled}><PauseIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(stop()))}
                    disabled={!stopEnabled}><SquareIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(next()))}
                    disabled={!nextPrevEnabled}><SkipForwardIcon/></Button>
        </div>
    )
}