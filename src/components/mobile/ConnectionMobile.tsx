import {CustomCheckboxItem} from "@/components/mobile/CustomCheckboxItem.tsx";
import {useConnectionLogic} from "@/hooks/useConnectionLogic.ts";

export const ConnectionMobile = () => {
    const {changeConnectionStatus, connected} = useConnectionLogic();
    return <CustomCheckboxItem
        enabledMessage={"Disconnect from the MPD server"}
        disabledMessage={"Connect to the MPD server"}
        onClick={changeConnectionStatus}
        enabled={connected}
    />;
}
