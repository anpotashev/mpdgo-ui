import { createPortal } from "react-dom";
import {useEffect, useState} from "react";
import {useDragLogic} from "@/components/common/useDragLogic.ts";

export const DragPreview= () => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const {draggingItem} = useDragLogic();
    useEffect(() => {
        const onMove = (e: MouseEvent) => setCoords({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    if (!draggingItem || !draggingItem.name) return null;
    return createPortal(
        <div
            style={{
                position: "fixed",
                top: coords.y + 10,
                left: coords.x + 10,
                pointerEvents: "none",
                zIndex: 9999,
            }}
            className={`px-2 py-1 rounded text-sm font-medium text-blue bg-white dark:bg-blue-600 dark:text-white`}
        >
            {draggingItem.name}
        </div>,
        document.body
    );
};