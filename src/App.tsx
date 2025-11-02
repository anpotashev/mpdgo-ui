import './App.css'
import {ThemeProvider} from "@/components/common/theme-provider.tsx";
import {WsGate} from "@/components/common/WsGate.tsx";
import {MainElement} from "@/components/desktop/MainElement.tsx";
import {useIsMobile} from "@/hooks/use-mobile.ts";
import {MainElementMobile} from "@/components/mobile/MainElementMobile.tsx";

function App() {

    const wsUrl = import.meta.env.VITE_BACKEND_URL;
    const wsUrl2 = wsUrl.startsWith("ws") ? wsUrl : `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}${wsUrl}`
    const isMobile = useIsMobile();
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <WsGate url={wsUrl2}>{isMobile ?  <MainElementMobile/> : <MainElement/> }
            </WsGate>
        </ThemeProvider>
    )
}

export default App
