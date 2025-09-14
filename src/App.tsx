import './App.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {WsGate} from "@/components/WsGate.tsx";
import {MainElement} from "@/components/MainElement.tsx";

function App() {

  return (

      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <WsGate url="ws://localhost:8080/v1/ws"><MainElement/>
          </WsGate>
      </ThemeProvider>
  )
}

export default App
