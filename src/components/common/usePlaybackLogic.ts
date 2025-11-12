import {useAppDispatch} from "@/app/hooks.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {next, pause, play, stop, prev} from "@/features/wsRequestPayloads.ts";

export function usePlaybackLogic() {
    const dispatch = useAppDispatch();

    const doPrev = () => dispatch(wsSend(prev()))
    const doPlay = () => dispatch(wsSend(play()))
    const doPause = () => dispatch(wsSend(pause()))
    const doStop = () => dispatch(wsSend(stop()))
    const doNext = () => dispatch(wsSend(next()))
    return {doPrev, doPlay, doPause, doStop, doNext};
}