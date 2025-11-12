import {useAppDispatch, useAppSelector} from "@/hooks/app.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {setConsume, setRandom, setRepeat, setSingle} from "@/features/wsRequestPayloads.ts";

export function useSettingLogic() {
    const status = useAppSelector((state) => state.status?.status);
    const randomEnabled = status?.random ?? false;
    const singleEnabled = status?.single ?? false;
    const repeatEnabled = status?.repeat ?? false;
    const consumeEnabled = status?.consume ?? false;
    const dispatch = useAppDispatch();
    const changeRandom = () => dispatch(wsSend(setRandom(!randomEnabled)))
    const changeSingle = () => dispatch(wsSend(setSingle(!singleEnabled)))
    const changeRepeat = () => dispatch(wsSend(setRepeat(!repeatEnabled)))
    const changeConsume = () => dispatch(wsSend(setConsume(!consumeEnabled)))
    return {changeRandom, changeSingle, changeRepeat, changeConsume, randomEnabled, singleEnabled, repeatEnabled, consumeEnabled}
}