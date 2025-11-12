import {useAppDispatch, useAppSelector} from "@/hooks/app.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {next, pause, play, stop, prev, seekPos} from "@/features/wsRequestPayloads.ts";

export function usePlaybackLogic() {
    const dispatch = useAppDispatch();

    const doPrev = () => dispatch(wsSend(prev()))
    const doPlay = () => dispatch(wsSend(play()))
    const doPause = () => dispatch(wsSend(pause()))
    const doStop = () => dispatch(wsSend(stop()))
    const doNext = () => dispatch(wsSend(next()))
    const doSeekPos = (songPos: number, newSeconds: number) =>dispatch(wsSend(seekPos(songPos, newSeconds)));

    const status = useAppSelector((state) => state.status.status ?? null);
    const nextPrevPauseStopEnabled = status?.state === "play" || status?.state === "pause";
    const playEnabled = status?.state === "pause" || status?.state === "stop";
    return {doPrev, doPlay, doPause, doStop, doNext, doSeekPos, nextPrevPauseStopEnabled, playEnabled};
}