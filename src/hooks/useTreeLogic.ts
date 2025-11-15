import {useAppDispatch, useAppSelector} from "@/hooks/app.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {updateTree} from "@/features/wsRequestPayloads.ts";

export function useTreeLogic() {
    const dispatch = useAppDispatch();
    const tree = useAppSelector(state => state.tree);
    const updateByPath = (path: string) => dispatch(wsSend(updateTree(path)));
    const updateFull = () => dispatch(wsSend(updateTree("")));
    return {rootFolder: tree.root, treeLoading: tree.loading, updateByPath, updateFull};
}