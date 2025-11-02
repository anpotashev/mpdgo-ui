import {Accordion, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {AccordionContent, AccordionItem} from "@radix-ui/react-accordion";
import {useAppSelector} from "@/app/hooks.ts";
import {StreamPlayer} from "@/components/common/StreamPlayer.tsx";
import {SettingsMobile} from "@/components/mobile/SettingsMobile.tsx";
import {ConnectionMobile} from "@/components/mobile/ConnectionMobile.tsx";
import {ModeToggleMobile} from "@/components/mobile/ModeToggleMobile.tsx";
import {
    FileMusicIcon, FolderTreeIcon,
    ListMusicIcon,
    Moon, PlayIcon,
    PlugIcon,
    SettingsIcon,
    SpeakerIcon,
    Sun
} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {OutputsMobile} from "@/components/mobile/OutputsMobile.tsx";
import {PlaybackControlMobile} from "@/components/mobile/PlaybackControlMobile.tsx";
import {StoredPlaylistsMobile} from "@/components/mobile/StoredPlaylistsMobile.tsx";
import {TreeMobile} from "@/components/mobile/TreeMobile.tsx";
import {CurrentPlaylistMobile} from "@/components/mobile/CurrentPlaylistMobile.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store.ts";

export const MainElementMobile = () => {
    const connected = useAppSelector(state => state.connection.connected ?? false);

    const currentPlaylistIsEmpty = useSelector((state: RootState) => (state.playlist?.items?.length) ?? 0) === 0
    return <>
        <StreamPlayer/>
        <Accordion type="single" collapsible>
            <AccordionItem value="Theme">
                <AccordionTrigger>
                    <Label>
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            Theme</Label></AccordionTrigger>
                <AccordionContent><ModeToggleMobile/></AccordionContent>
            </AccordionItem>
            <AccordionItem value="Connection">
                <AccordionTrigger><Label><PlugIcon className="size-5"/>Connection</Label></AccordionTrigger>
                <AccordionContent><ConnectionMobile/></AccordionContent>
            </AccordionItem>
            {connected && <>
                <AccordionItem value="Settings">
                    <AccordionTrigger><Label><SettingsIcon className="size-5"/>Settings</Label></AccordionTrigger>
                    <AccordionContent><SettingsMobile/></AccordionContent>
                </AccordionItem>
                <AccordionItem value="Outputs">
                    <AccordionTrigger><Label><SpeakerIcon className="size-5"/>Outputs</Label></AccordionTrigger>
                    <AccordionContent><OutputsMobile/></AccordionContent>
                </AccordionItem>
                {!currentPlaylistIsEmpty && <AccordionItem value="Playback">
                    <AccordionTrigger><Label><PlayIcon className="size-5"/>Playback control</Label></AccordionTrigger>
                    <AccordionContent><PlaybackControlMobile/></AccordionContent>
                </AccordionItem>}
                {!currentPlaylistIsEmpty && <AccordionItem value="Current playlist">
                    <AccordionTrigger><Label><ListMusicIcon className="size-5"/>Current playlist</Label></AccordionTrigger>
                    <AccordionContent><CurrentPlaylistMobile/></AccordionContent>
                </AccordionItem>}
                <AccordionItem value="Tree">
                    <AccordionTrigger><Label><FolderTreeIcon className="size-5"/>Tree</Label></AccordionTrigger>
                    <AccordionContent><TreeMobile/></AccordionContent>
                </AccordionItem>
                <AccordionItem value="Stored playlists">
                    <AccordionTrigger><Label><FileMusicIcon className="size-5"/>Stored playlists</Label></AccordionTrigger>
                    <AccordionContent><StoredPlaylistsMobile/></AccordionContent>
                </AccordionItem>
            </>}
        </Accordion>
    </>;
}