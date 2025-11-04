import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {
    clearCurrentPlaylist, deleteByPos, moveItemToPos, next,
    pause,
    play,
    playPos,
    prev,
    shuffleCurrentPlaylist, stop
} from "@/features/wsRequestPayloads.ts";
import {Button} from "@/components/ui/button.tsx";
import {PauseIcon, PlayIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon, SquareIcon, TrashIcon} from "lucide-react";
import {MpdPlayingProgress} from "@/components/common/MpdPlayingProgress.tsx";
import {MobileContextMenu} from "@/components/mobile/MobileContextMenu.tsx";


export const CurrentPlaylistMobile = () => {

    const items = useAppSelector(state => state.playlist.items) ?? [];

    const playing = useAppSelector(state => state.status?.status?.state === "play");
    const activePos = useAppSelector(state => state.status.status?.song);

    const dispatch = useAppDispatch();

    const clearAndShuffleEnabled = items.length > 0
    const status = useAppSelector((state) => state.status.status ?? null);
    const nextPrevPauseStopEnabled = status?.state === "play" || status?.state === "pause";
    const playEnabled = status?.state === "pause" || status?.state === "stop";

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }

    const buttonClass = "rounded-full" +
        "     bg-white      text-black      hover:bg-blue-400      hover:text-black " +
        "dark:bg-black dark:text-white dark:hover:bg-blue-400 dark:hover:text-white";

    const tableCellClass = "text-left text-xs px-1 py-0.5 border-b truncate align-top break-words whitespace-normal"

    const moveUp = (id: number) => {
        dispatch(wsSend(moveItemToPos(id, id - 1)));
    }
    const moveDown = (id: number) => {
        dispatch(wsSend(moveItemToPos(id, id + 1)));
    }
    const deleteItem = (id: number) => {
        dispatch(wsSend(deleteByPos(id)));
    }


    return <>
        {clearAndShuffleEnabled && <>
            {nextPrevPauseStopEnabled && <MpdPlayingProgress/>}
            <div className="whitespace-nowrap text-left">
                <Button className={buttonClass}
                        onClick={() => dispatch(wsSend(clearCurrentPlaylist()))}><TrashIcon/></Button>
                <Button className={buttonClass}
                        onClick={() => dispatch(wsSend(shuffleCurrentPlaylist()))}><ShuffleIcon/></Button>
                <Button className={buttonClass} onClick={() => dispatch(wsSend(prev()))}
                        disabled={!nextPrevPauseStopEnabled}><SkipBackIcon/></Button>
                <Button className={buttonClass} onClick={() => dispatch(wsSend(play()))}
                        disabled={!playEnabled}><PlayIcon/></Button>
                <Button className={buttonClass} onClick={() => dispatch(wsSend(pause()))}
                        disabled={!nextPrevPauseStopEnabled}><PauseIcon/></Button>
                <Button className={buttonClass} onClick={() => dispatch(wsSend(stop()))}
                        disabled={!nextPrevPauseStopEnabled}><SquareIcon/></Button>
                <Button className={buttonClass} onClick={() => dispatch(wsSend(next()))}
                        disabled={!nextPrevPauseStopEnabled}><SkipForwardIcon/></Button>
            </div>
        </>}

        <Table className={"table-fixed"}>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Album</TableHead>
                    <TableHead>Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item, idx) => {

                        const contextMenuItems: { label: string; onClick: () => void }[] = [];
                        if (item.pos > 0) {
                            contextMenuItems.push({label: "⬆️ Move up", onClick: () => moveUp(item.pos)})
                        }
                        if (item.pos < items.length - 1) {
                            contextMenuItems.push({
                                label: "⬇️ Move down",
                                onClick: () => moveDown(item.pos)
                            })
                        }
                        contextMenuItems.push({label: "🗑️ Delete", onClick: () => deleteItem(item.pos)})

                        return (<TableRow
                                key={idx}
                                className={`${
                                    item.pos === activePos ? (playing ? "text-blue-400" : "text-gray-400") : ""
                                }`}
                                onDoubleClick={() => dispatch(wsSend(playPos(item.pos)))}
                            >
                                <TableCell className={tableCellClass}>
                                    <MobileContextMenu items={contextMenuItems}>{idx + 1}</MobileContextMenu>
                                </TableCell>
                                <TableCell className={tableCellClass}>
                                    <MobileContextMenu items={contextMenuItems}>{item.title ?? "-"}</MobileContextMenu>
                                </TableCell>
                                <TableCell className={tableCellClass}>
                                    <MobileContextMenu items={contextMenuItems}>{item.artist ?? "-"}</MobileContextMenu>
                                </TableCell>
                                <TableCell className={tableCellClass}>
                                    <MobileContextMenu items={contextMenuItems}>{item.album ?? "-"}</MobileContextMenu></TableCell>
                                <TableCell className={tableCellClass}>
                                    <MobileContextMenu items={contextMenuItems}>{formatTime(item.time)}</MobileContextMenu></TableCell>
                            </TableRow>
                        )
                    }
                )}
            </TableBody>
        </Table>
    </>
}