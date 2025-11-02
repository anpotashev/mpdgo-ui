import {MpdMenuBar} from "@/components/desktop/MpdMenuBar.tsx";
import {MpdPlayingProgress} from "@/components/common/MpdPlayingProgress.tsx";
import {ControlPanel} from "@/components/desktop/ControlPanel.tsx";
import {MpdDatabasePanel} from "@/components/desktop/MpdDatabasePanel.tsx";
import {StreamPlayer} from "@/components/common/StreamPlayer.tsx";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {dndSlice} from "@/features/dnd/dndSlice.ts";
import {DragPreview} from "@/components/desktop/DragPreview.tsx";


export const MainElement = () => {
    const draggingItem = useAppSelector(state => state.dnd.draggingItem);
    const dispatch = useAppDispatch();
    function handleMouseUpd() {
        dispatch(dndSlice.actions.stopDrag());
    }

    return (
    <div onMouseUp={handleMouseUpd}
         className={draggingItem?.source && "cursor-disabled cursor-grabbing"}>
        <StreamPlayer/>
        <MpdMenuBar/>
        <MpdPlayingProgress/>
        <ControlPanel/>
        <MpdDatabasePanel/>
        <DragPreview/>
    </div>
    )
}