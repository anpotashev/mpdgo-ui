import { useTheme } from "@/components/common/theme-provider.tsx"
import {CustomCheckboxItem} from "@/components/mobile/CustomCheckboxItem.tsx";

export const ModeToggleMobile = () => {
    const { theme, setTheme } = useTheme();
    return (
        <>
            <CustomCheckboxItem
                enabledMessage="Light theme set"
                disabledMessage="Set light theme"
                onClick={() => setTheme("light")}
                enabled={theme === "light"}
            />
            <CustomCheckboxItem
                enabledMessage="Dark theme set"
                disabledMessage="Set dark theme"
                onClick={() => setTheme("dark")}
                enabled={theme === "dark"}
            />
            <CustomCheckboxItem
                enabledMessage="System theme set"
                disabledMessage="Set system theme"
                onClick={() => setTheme("system")}
                enabled={theme === "system"}
            />
        </>
    )
}