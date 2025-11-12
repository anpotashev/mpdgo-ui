import {MpdMenuBar} from "@/components/desktop/MpdMenuBar.tsx";
import {MpdPlayingProgress} from "@/components/common/MpdPlayingProgress.tsx";
import {ControlPanel} from "@/components/desktop/ControlPanel.tsx";
import {MpdDatabasePanel} from "@/components/desktop/MpdDatabasePanel.tsx";
import {DragPreview} from "@/components/desktop/DragPreview.tsx";
import {useDragLogic} from "@/components/common/useDragLogic.ts";

export const MainElement = () => {
    const {draggingItem, doDragStop} = useDragLogic();

    return (
    <div onMouseUp={doDragStop}
         className={draggingItem?.source && "cursor-disabled cursor-grabbing"}>
        <MpdMenuBar/>
        <MpdPlayingProgress/>
        <ControlPanel/>
        <MpdDatabasePanel/>
        <DragPreview/>
    </div>
    )
}