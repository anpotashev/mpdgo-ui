import './App.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {WsGate} from "@/components/WsGate.tsx";
import {MainElement} from "@/components/MainElement.tsx";

function App() {

    const wsUrl = import.meta.env.VITE_BACKEND_URL;
    const wsUrl2 = wsUrl.startsWith("ws") ? wsUrl : `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}${wsUrl}`
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <WsGate url={wsUrl2}><MainElement/>
            </WsGate>
        </ThemeProvider>
    )
}

export default App
