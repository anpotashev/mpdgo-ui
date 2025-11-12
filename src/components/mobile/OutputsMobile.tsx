import {CustomCheckboxItem} from "@/components/mobile/CustomCheckboxItem.tsx";
import {useOutputsLogic} from "@/hooks/useOutputsLogic.ts";

export const OutputsMobile = () => {
    const {changeOutputState, outputs} = useOutputsLogic();
    return <>
        {outputs?.map((output, key) => (
            <CustomCheckboxItem
                enabledMessage={"Disable " + output.name}
                disabledMessage={"Enable " + output.name}
                onClick={() => changeOutputState(output)}
                enabled={output.enabled}
                key = {key}
            />
            ))
        }
    </>
}