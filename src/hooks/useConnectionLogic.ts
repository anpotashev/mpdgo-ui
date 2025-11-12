import {useAppDispatch, useAppSelector} from "@/hooks/app.ts";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {setConnectionState} from "@/features/wsRequestPayloads.ts";

export function useConnectionLogic() {
    const dispatch = useAppDispatch();
    const connected = useAppSelector(state => state.connection.connected ?? false);
    const changeConnectionStatus = () => dispatch(wsSend(setConnectionState(!connected)));
    return {changeConnectionStatus, connected};
}