import {configureStore} from '@reduxjs/toolkit';
import connectionReducer from '@/features/connection/connectionSlice';
import statusReducer from '@/features/status/statusSlice'
import wsReducer from "@/features/ws/wsSlice";
import errorsReducer from "@/features/error/errorsSlice";
import currentPlaylistReducer from "@/features/currentPlaylist/currentPlaylistSlice"
import treeReducer from "@/features/tree/treeSlice"
import outputReducer from "@/features/output/outputSlice";
import dndReducer from "@/features/dnd/dndSlice";
import storedPlaylistsReducer from '@/features/storedPlaylists/storedPlaylistsSlice'
import {wsMiddleware} from "@/store/middleware/wsMiddleware";
import {wsMessageMiddleware} from "@/store/middleware/wsMessageMiddleware";

export const store = configureStore({
    reducer: {
        ws: wsReducer,
        errors: errorsReducer,
        connection: connectionReducer,
        status: statusReducer,
        playlist: currentPlaylistReducer,
        tree: treeReducer,
        output: outputReducer,
        dnd: dndReducer,
        storedPlaylists: storedPlaylistsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(wsMiddleware, wsMessageMiddleware),
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(websocketMiddleware, connectionWatcherMiddleware, camelCaseMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;