import React from "react"
import {contextMenuLogic, type Item} from "@/components/mobile/ContextMenuMobileFunctions.tsx";

interface ContextMenuMobileProps {
    children: React.ReactNode
    items: Item[]
}

export const ContextMenuMobile: React.FC<ContextMenuMobileProps> = ({ children, items }) => {
    const {handleTouchStart, handleTouchEnd, handleTouchMove, printMenu} = contextMenuLogic()

    return (
        <>
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                className="relative w-full h-full"
            >
                {children}
            </div>

            {printMenu(items)}
        </>
    )
}
