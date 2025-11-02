import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {setConsume, setRandom, setRepeat, setSingle} from "@/features/wsRequestPayloads.ts";
import {CustomCheckboxItem} from "@/components/mobile/CustomCheckboxItem.tsx";


export const SettingsMobile = () => {
    const status = useAppSelector((state) => state.status?.status);
    // const outputs = useAppSelector(state => state.output.outputs) ?? [];
    const randomEnabled = status?.random ?? false;
    const singleEnabled = status?.single ?? false;
    const repeatEnabled = status?.repeat ?? false;
    const consumeEnabled = status?.consume ?? false;
    const dispatch = useAppDispatch();

    return <>
            <CustomCheckboxItem
                onClick={() => dispatch(wsSend(setRandom(!randomEnabled)))}
                enabled={randomEnabled}
                enabledMessage="Disable random play"
                disabledMessage="Enable random play"
            />
            <CustomCheckboxItem
                onClick={() => dispatch(wsSend(setSingle(!singleEnabled)))}
                enabled={singleEnabled}
                enabledMessage="Disable single play"
                disabledMessage="Enable single play"
            />
            <CustomCheckboxItem
                onClick={() => dispatch(wsSend(setRepeat(!repeatEnabled)))}
                enabled={repeatEnabled}
                enabledMessage="Disable repeat"
                disabledMessage="Enable repeat"
            />
            <CustomCheckboxItem
                onClick={() => dispatch(wsSend(setConsume(!consumeEnabled)))}
                enabled={consumeEnabled}
                enabledMessage="Disable consume"
                disabledMessage="Enable consume"
            />
        </>
}