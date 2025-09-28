import {MpdMenuBar} from "@/components/MpdMenuBar.tsx";
import {MpdPlayingProgress} from "@/components/MpdPlayingProgress.tsx";
import {ControlPanel} from "@/components/ControlPanel.tsx";
import {MpdDatabasePanel} from "@/components/MpdDatabasePanel.tsx";
import {StreamPlayer} from "@/components/StreamPlayer.tsx";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {dndSlice} from "@/features/dnd/dndSlice.ts";
import {DragPreview} from "@/components/DragPreview.tsx";


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