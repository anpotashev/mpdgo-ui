import { createPortal } from "react-dom";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store.ts";
import {useEffect, useState} from "react";

export const DragPreview= () => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const dragItem = useSelector((state: RootState) => state.dnd.draggingItem);
    useEffect(() => {
        const onMove = (e: MouseEvent) => setCoords({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    if (!dragItem || !dragItem.name) return null;
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
            {dragItem.name}
        </div>,
        document.body
    );
};