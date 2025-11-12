import {Button} from "@/components/ui/button.tsx";
import {PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon, SquareIcon} from "lucide-react";
import {MpdPlayingProgress} from "@/components/common/MpdPlayingProgress.tsx";
import {usePlaybackLogic} from "@/hooks/usePlaybackLogic.ts";

export const PlaybackControlMobile = () => {
    const {doPrev, doPlay, doPause, doStop, doNext, nextPrevPauseStopEnabled, playEnabled} = usePlaybackLogic();

    const buttonClass = "rounded-full w-full justify-start" +
        "     bg-white      text-black      hover:bg-blue-400      hover:text-black " +
        "dark:bg-black dark:text-white dark:hover:bg-blue-400 dark:hover:text-white";

    return <div className="flex flex-col space-y-2">
        {nextPrevPauseStopEnabled && <MpdPlayingProgress/>}
        <Button className={buttonClass} onClick={doPrev}
                disabled={!nextPrevPauseStopEnabled}><SkipBackIcon/>Previous</Button>
        <Button className={buttonClass} onClick={doPlay}
                disabled={!playEnabled}><PlayIcon/>Play</Button>
        <Button className={buttonClass} onClick={doPause}
                disabled={!nextPrevPauseStopEnabled}><PauseIcon/>Pause</Button>
        <Button className={buttonClass} onClick={doStop}
                disabled={!nextPrevPauseStopEnabled}><SquareIcon/>Stop</Button>
        <Button className={buttonClass} onClick={doNext}
                disabled={!nextPrevPauseStopEnabled}><SkipForwardIcon/>Next</Button>
    </div>
}