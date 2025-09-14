import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {PauseIcon, PlayIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon, SquareIcon, TrashIcon} from "lucide-react";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";

import {
    clearCurrentPlaylist, next, pause, play, prev, shuffleCurrentPlaylist, stop
} from "@/features/wsRequestPayloads.ts";

export const ControlPanel = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.status.status ?? null);
    // const draggingItem = useAppSelector((state) => state.dnd.draggingItem);
    const items = useAppSelector(state => state.playlist.items) ?? [];
    const shuffleClearEnabled = items.length > 0;
    const stopEnabled = status?.state === "play" || status?.state === "pause";
    const nextPrevEnabled = status?.state === "play" || status?.state === "pause";
    const playEnabled = shuffleClearEnabled && (status?.state === "pause" || status?.state === "stop");
    const pauseEnabled = status?.state === "play" || status?.state === "pause";

    const buttonClass = "rounded-full " +
        "     bg-white      text-black      hover:bg-blue-400      hover:text-black " +
        "dark:bg-black dark:text-white dark:hover:bg-blue-400 dark:hover:text-white";
    return (
        <div className={"m-1"}>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(clearCurrentPlaylist()))}
                    disabled={!shuffleClearEnabled}><TrashIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(shuffleCurrentPlaylist()))}
                    disabled={!shuffleClearEnabled}><ShuffleIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(prev()))}
                    disabled={!nextPrevEnabled}><SkipBackIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(play()))} disabled={!playEnabled}><PlayIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(pause()))}
                    disabled={!pauseEnabled}><PauseIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(stop()))}
                    disabled={!stopEnabled}><SquareIcon/></Button>
            <Button className={buttonClass} onClick={() => dispatch(wsSend(next()))}
                    disabled={!nextPrevEnabled}><SkipForwardIcon/></Button>
        </div>
    )
}