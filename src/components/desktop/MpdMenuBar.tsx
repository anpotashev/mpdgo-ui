import {
    Menubar, MenubarCheckboxItem,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {ModeToggle} from "@/components/desktop/ModeToggle.tsx";
import {
    InfoIcon,
    Music4Icon,
    PlugIcon,
    SettingsIcon, SpeakerIcon
} from 'lucide-react'
import {Label} from "@/components/ui/label.tsx";
import {useConnectionLogic} from "@/hooks/useConnectionLogic.ts";
import {useOutputsLogic} from "@/hooks/useOutputsLogic.ts";
import {useSettingLogic} from "@/hooks/useSettingLogic.ts";
import {useState} from "react";
import {AboutDialog} from "@/components/desktop/AboutDialog.tsx";

export const MpdMenuBar = () => {
    const {changeConnectionStatus, connected} = useConnectionLogic();
    const {changeOutputState, outputs} = useOutputsLogic();
    const {changeRandom, changeSingle, changeRepeat, changeConsume, randomEnabled, singleEnabled, repeatEnabled, consumeEnabled} = useSettingLogic();
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);

    const showAbout = () => {
        setDialogVisible(true);
    }

    return (<>
        <Menubar>
            <Label className={"text-blue-400"}><Music4Icon/>MPD Client</Label>
            <MenubarMenu>
                <MenubarTrigger><PlugIcon/>Connection</MenubarTrigger>
                <MenubarContent>
                    <MenubarCheckboxItem
                        onClick={changeConnectionStatus}
                        checked={connected}>Connected
                    </MenubarCheckboxItem>
                </MenubarContent>
                {connected &&
                    <>
                        <MenubarMenu>
                            <MenubarTrigger><SettingsIcon/>Playback settings</MenubarTrigger>
                            <MenubarContent>
                                <MenubarCheckboxItem
                                    checked={randomEnabled}
                                    onClick={changeRandom}>
                                    Random
                                </MenubarCheckboxItem>
                                <MenubarCheckboxItem
                                    onClick={changeSingle}
                                    checked={singleEnabled}>Single
                                </MenubarCheckboxItem>
                                <MenubarCheckboxItem
                                    onClick={changeRepeat}
                                    checked={repeatEnabled}>Repeat
                                </MenubarCheckboxItem>
                                <MenubarCheckboxItem
                                    onClick={changeConsume}
                                    checked={consumeEnabled}>Consume
                                </MenubarCheckboxItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger><SpeakerIcon/>Audio outputs</MenubarTrigger>
                            <MenubarContent>
                                {outputs.map((output, id) => <MenubarCheckboxItem
                                    checked={output.enabled}
                                    key={id}
                                    onClick={() => changeOutputState(output)}
                                >{output.name}</MenubarCheckboxItem>)}
                            </MenubarContent>
                        </MenubarMenu>
                    </>}
                <MenubarTrigger onClick={showAbout}><InfoIcon/>About</MenubarTrigger>
                <MenubarContent/>
            </MenubarMenu>
            <ModeToggle/>
        </Menubar>
            <AboutDialog isOpen={dialogVisible} onClose={() =>setDialogVisible(false)}/>
        </>
    );
}
