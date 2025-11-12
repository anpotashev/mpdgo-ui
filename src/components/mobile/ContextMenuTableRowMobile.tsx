import React from "react"
import { TableRow} from "@/components/ui/table.tsx";
import {contextMenuLogic, type Item} from "@/components/mobile/ContextMenuMobileFunctions.tsx";

export interface ContextMenuTableRowProps
    extends React.ComponentPropsWithoutRef<"tr"> {
    children: React.ReactNode
    items: Item[]
}

export const ContextMenuTableRowMobile: React.FC<ContextMenuTableRowProps> = ({
                                                                                  children,
                                                                                  items,
                                                                                  ...props
                                                                              }) => {
    const {handleTouchStart, handleTouchEnd, handleTouchMove, printMenu} = contextMenuLogic()
    return (
        <>
            <TableRow
                {...props}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
            >
                {children}
            </TableRow>
            {printMenu(items)}
        </>
    )
}
