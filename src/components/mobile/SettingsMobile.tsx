import {CustomCheckboxItem} from "@/components/mobile/CustomCheckboxItem.tsx";
import {useSettingLogic} from "@/hooks/useSettingLogic.ts";


export const SettingsMobile = () => {
    const {changeRandom, changeSingle, changeRepeat, changeConsume, randomEnabled, singleEnabled, repeatEnabled, consumeEnabled} = useSettingLogic();

    return <>
            <CustomCheckboxItem
                onClick={changeRandom}
                enabled={randomEnabled}
                enabledMessage="Disable random play"
                disabledMessage="Enable random play"
            />
            <CustomCheckboxItem
                onClick={changeSingle}
                enabled={singleEnabled}
                enabledMessage="Disable single play"
                disabledMessage="Enable single play"
            />
            <CustomCheckboxItem
                onClick={changeRepeat}
                enabled={repeatEnabled}
                enabledMessage="Disable repeat"
                disabledMessage="Enable repeat"
            />
            <CustomCheckboxItem
                onClick={changeConsume}
                enabled={consumeEnabled}
                enabledMessage="Disable consume"
                disabledMessage="Enable consume"
            />
        </>
}