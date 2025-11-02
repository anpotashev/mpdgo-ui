import React, { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface MobileContextMenuProps {
    children: React.ReactNode
    items: { label: string; onClick: () => void }[]
}

export const MobileContextMenu: React.FC<MobileContextMenuProps> = ({ children, items }) => {
    const [open, setOpen] = useState(false)
    let touchTimer: NodeJS.Timeout

    const handleTouchStart = () => {
        touchTimer = setTimeout(() => setOpen(true), 300)
    }

    const handleTouchEnd = () => clearTimeout(touchTimer)

    return (
        <>
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
                className="select-none active:opacity-80"
            >
                {children}
            </div>

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
