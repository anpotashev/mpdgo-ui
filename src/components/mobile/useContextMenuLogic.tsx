import React, {useRef, useState} from "react";
import {Sheet, SheetContent} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";

export interface Item { label: string; onClick: () => void }

export function useContextMenuLogic() {
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

    const printMenu = (items: Item[]) => <Sheet open={open} onOpenChange={setOpen}>
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

    return {handleTouchStart, handleTouchEnd, handleTouchMove, printMenu}
}