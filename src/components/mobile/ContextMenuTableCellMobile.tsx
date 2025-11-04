import React, {useRef, useState} from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {TableCell} from "@/components/ui/table.tsx";

export interface Item { label: string; onClick: () => void }

interface ContextMenuMobileProps {
    children: React.ReactNode
    items: Item[]
}

export const ContextMenuTableCellMobile: React.FC<ContextMenuMobileProps> = ({ children, items }) => {
    const [open, setOpen] = useState(false)
    const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0]
        touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() }

        timerRef.current = setTimeout(() => setOpen(true), 500)
    }

    const handleTouchEnd = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = null
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0]
        const start = touchStartRef.current
        if (!start) return

        const dx = Math.abs(touch.clientX - start.x)
        const dy = Math.abs(touch.clientY - start.y)

        if (dx > 10 || dy > 10) {
            if (timerRef.current) clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }

    return (
        <>
            <TableCell
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                className="text-left text-xs px-1 py-0.5 border-b align-top break-words whitespace-normal"
            >
                {children}
            </TableCell>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="bottom" className="p-2 space-y-2 text-left">
                    {items.map((item, idx) => (
                        <Button
                            key={idx}
                            variant="ghost"
                            className="w-full text-lg text-left"
                            onClick={() => {
                                setOpen(false)
                                item.onClick()
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                </SheetContent>
            </Sheet>
        </>
    )
}
