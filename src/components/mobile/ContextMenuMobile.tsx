import React from "react"
import {useContextMenuLogic, type Item} from "@/components/mobile/useContextMenuLogic.tsx";

interface ContextMenuMobileProps {
    children: React.ReactNode
    items: Item[]
}

export const ContextMenuMobile: React.FC<ContextMenuMobileProps> = ({ children, items }) => {
    const {handleTouchStart, handleTouchEnd, handleTouchMove, printMenu} = useContextMenuLogic()

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
