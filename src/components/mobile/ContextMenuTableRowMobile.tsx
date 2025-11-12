import React from "react"
import { TableRow} from "@/components/ui/table.tsx";
import {useContextMenuLogic, type Item} from "@/components/mobile/useContextMenuLogic.tsx";

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
    const {handleTouchStart, handleTouchEnd, handleTouchMove, printMenu} = useContextMenuLogic()
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
