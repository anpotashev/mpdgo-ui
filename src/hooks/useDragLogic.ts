import {useAppDispatch, useAppSelector} from "@/hooks/app.ts";
import {dndSlice, type DragItem} from "@/features/dnd/dndSlice.ts";

export function useDragLogic() {

    const dispatch = useAppDispatch();

    const doDragStop = () => dispatch(dndSlice.actions.stopDrag());

    const doDragStart = (dragginItem: DragItem) => dispatch(dndSlice.actions.startDrag(dragginItem));

    const draggingItem = useAppSelector(state => state.dnd.draggingItem) ?? null;

    return{doDragStop, doDragStart, draggingItem};
}