import {
    Menubar, MenubarCheckboxItem,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {ModeToggle} from "@/components/ModeToggle.tsx";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {
    setConnectionState,
    setConsume,
    setOutputState,
    setRandom,
    setRepeat,
    setSingle
} from "@/features/wsRequestPayloads.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {Music4Icon, SettingsIcon} from 'lucide-react'
import {Label} from "@/components/ui/label.tsx";

export const MpdMenuBar = () => {
    const connected = useAppSelector((state) => state.connection.connected) ?? false;
    const status = useAppSelector((state) => state.status?.status);
    const outputs = useAppSelector(state => state.output.outputs) ?? [];
    const randomEnabled = status?.random ?? false;
    const singleEnabled = status?.single ?? false;
    const repeatEnabled = status?.repeat ?? false;
    const consumeEnabled = status?.consume ?? false;
    const dispatch = useAppDispatch();

    return (
        <Menubar>
            <Label className={"text-blue-400"}><Music4Icon/>MPD Client</Label>
            <MenubarMenu>
                {/*<Label style={styles.logo}></Label>*/}
                <MenubarTrigger>Connection</MenubarTrigger>
                <MenubarContent>
                    <MenubarCheckboxItem
                        onClick={() => dispatch(wsSend(setConnectionState(!connected)))}
                        checked={connected}>Connected
                    </MenubarCheckboxItem>
                </MenubarContent>
                {connected &&
                    <>
                        <MenubarMenu>
                            <MenubarTrigger><SettingsIcon/>Settings</MenubarTrigger>
                            <MenubarContent>
                                <MenubarCheckboxItem
                                    checked={randomEnabled}
                                    onClick={() => dispatch(wsSend(setRandom(!randomEnabled)))}>
                                    Random
                                </MenubarCheckboxItem>
                                <MenubarCheckboxItem
                                    onClick={() => dispatch(wsSend(setSingle(!singleEnabled)))}
                                    checked={singleEnabled}>Single
                                </MenubarCheckboxItem>
                                <MenubarCheckboxItem
                                    onClick={() => dispatch(wsSend(setRepeat(!repeatEnabled)))}
                                    checked={repeatEnabled}>Repeat
                                </MenubarCheckboxItem>
                                <MenubarCheckboxItem
                                    onClick={() => dispatch(wsSend(setConsume(!consumeEnabled)))}
                                    checked={consumeEnabled}>Consume
                                </MenubarCheckboxItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Outputs</MenubarTrigger>
                            <MenubarContent>
                                {outputs.map((output, id) => <MenubarCheckboxItem
                                    checked={output.enabled}
                                    key={id}
                                    onClick={() => dispatch(wsSend(setOutputState(output.id, !output.enabled)))}
                                >{output.name}</MenubarCheckboxItem>)}
                            </MenubarContent>
                        </MenubarMenu>
                    </>}
            </MenubarMenu>
            <ModeToggle/>
        </Menubar>
    );
}
