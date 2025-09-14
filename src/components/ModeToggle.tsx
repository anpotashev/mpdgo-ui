import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import {MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar.tsx";
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";

export function ModeToggle ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
    const { theme, setTheme } = useTheme()
    return (
        <MenubarMenu {...props}>
            <MenubarTrigger className={"ml-auto"}>
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                Theme
            </MenubarTrigger>
            <MenubarContent align={"end"}>
                <MenubarCheckboxItem checked={theme ==="light"} onClick={() => setTheme("light")}>light</MenubarCheckboxItem>
                <MenubarCheckboxItem checked={theme ==="dark"} onClick={() => setTheme("dark")}>dark</MenubarCheckboxItem>
                <MenubarCheckboxItem checked={theme ==="system"} onClick={() => setTheme("system")}>system</MenubarCheckboxItem>
            </MenubarContent>
        </MenubarMenu>
    )
}