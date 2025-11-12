import {useAppDispatch, useAppSelector} from "@/hooks/app.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {setOutputState} from "@/features/wsRequestPayloads.ts";
import type {Output} from "@/features/output/outputSlice.ts";

export function useOutputsLogic() {

    const outputs = useAppSelector(state => state.output.outputs) ?? [];
    const dispatch = useAppDispatch();
    const changeOutputState = (output: Output) => dispatch(wsSend(setOutputState(output.id, !output.enabled)));
    return {changeOutputState, outputs}
}