import {MpdMenuBar} from "@/components/MpdMenuBar.tsx";
import {MpdPlayingProgress} from "@/components/MpdPlayingProgress.tsx";
import {ControlPanel} from "@/components/ControlPanel.tsx";
import {MpdDatabasePanel} from "@/components/MpdDatabasePanel.tsx";
import {StreamPlayer} from "@/components/StreamPlayer.tsx";

export const MainElement = () =>
    <>
        <StreamPlayer/>
        <MpdMenuBar/>
        <MpdPlayingProgress/>
        <ControlPanel/>
        <MpdDatabasePanel/>

    </>