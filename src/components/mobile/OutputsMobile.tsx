import {CustomCheckboxItem} from "@/components/mobile/CustomCheckboxItem.tsx";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {setOutputState} from "@/features/wsRequestPayloads.ts";

export const OutputsMobile = () => {
    const outputs = useAppSelector(state => state.output.outputs) ?? [];
    const dispatch = useAppDispatch();
    return <>
        {outputs?.map((output, key) => (
            <CustomCheckboxItem
                enabledMessage={"Disable " + output.name}
                disabledMessage={"Enable " + output.name}
                onClick={() => dispatch(wsSend(setOutputState(output.id, !output.enabled)))}
                enabled={output.enabled}
                key = {key}
            />
            ))
        }
    </>
}