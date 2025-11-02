import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {Button} from "@/components/ui/button.tsx";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {
    next,
    pause,
    play,
    prev,
    stop
} from "@/features/wsRequestPayloads.ts";
import {PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon, SquareIcon} from "lucide-react";
import {MpdPlayingProgress} from "@/components/common/MpdPlayingProgress.tsx";

export const PlaybackControlMobile = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.status.status ?? null);
    const nextPrevPauseStopEnabled = status?.state === "play" || status?.state === "pause";
    const playEnabled = status?.state === "pause" || status?.state === "stop";

    const buttonClass = "rounded-full w-full justify-start" +
        "     bg-white      text-black      hover:bg-blue-400      hover:text-black " +
        "dark:bg-black dark:text-white dark:hover:bg-blue-400 dark:hover:text-white";

    return <div className="flex flex-col space-y-2">
        {nextPrevPauseStopEnabled && <MpdPlayingProgress/>}
        <Button className={buttonClass} onClick={() => dispatch(wsSend(prev()))}
                disabled={!nextPrevPauseStopEnabled}><SkipBackIcon/>Previous</Button>
        <Button className={buttonClass} onClick={() => dispatch(wsSend(play()))}
                disabled={!playEnabled}><PlayIcon/>Play</Button>
        <Button className={buttonClass} onClick={() => dispatch(wsSend(pause()))}
                disabled={!nextPrevPauseStopEnabled}><PauseIcon/>Pause</Button>
        <Button className={buttonClass} onClick={() => dispatch(wsSend(stop()))}
                disabled={!nextPrevPauseStopEnabled}><SquareIcon/>Stop</Button>
        <Button className={buttonClass} onClick={() => dispatch(wsSend(next()))}
                disabled={!nextPrevPauseStopEnabled}><SkipForwardIcon/>Next</Button>
    </div>
}