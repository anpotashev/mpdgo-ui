import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {updateTree} from "@/features/wsRequestPayloads.ts";

export function useTreeLogic() {
    const dispatch = useAppDispatch();
    const rootFolder = useAppSelector(state => state.tree.root);
    const updateByPath = (path: string) => dispatch(wsSend(updateTree(path)));
    const updateFull = () => dispatch(wsSend(updateTree("")));
    return {rootFolder, updateByPath, updateFull};
}