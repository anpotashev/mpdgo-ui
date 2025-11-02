import {CustomCheckboxItem} from "@/components/mobile/CustomCheckboxItem.tsx";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {setConnectionState} from "@/features/wsRequestPayloads.ts";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";

export const ConnectionMobile = () => {
    const connected = useAppSelector(state => state.connection.connected ?? false);
    const dispatch = useAppDispatch();
    return <CustomCheckboxItem
        enabledMessage={"Disconnect from the MPD server"}
        disabledMessage={"Connect to the MPD server"}
        onClick={() => dispatch(wsSend(setConnectionState(!connected)))}
        enabled={connected}
    />;
}
