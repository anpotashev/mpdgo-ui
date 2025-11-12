import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PauseIcon, PlayIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon, SquareIcon, TrashIcon} from "lucide-react";
import {MpdPlayingProgress} from "@/components/common/MpdPlayingProgress.tsx";
import {ContextMenuTableRowMobile} from "@/components/mobile/ContextMenuTableRowMobile.tsx";
import type {Item} from "@/components/mobile/useContextMenuLogic.tsx";
import {useCurrentPlaylistLogic} from "@/hooks/useCurrentPlaylistLogic.ts";
import {usePlaybackLogic} from "@/hooks/usePlaybackLogic.ts";


const CurrentPlaylistMobile = () => {

    const {shuffle,
        deleteItem,
        moveDown,
        moveUp,
        formatTime,
        playItem,
        clear,
        items,
        playing,
        activePos,
        currentPlaylistIsEmpty} = useCurrentPlaylistLogic();
    const {doPrev, doPlay, doPause, doStop, doNext, nextPrevPauseStopEnabled, playEnabled} = usePlaybackLogic();
    const buttonClass = "rounded-full" +
        "     bg-white      text-black      hover:bg-blue-400      hover:text-black " +
        "dark:bg-black dark:text-white dark:hover:bg-blue-400 dark:hover:text-white";

    const tableCellClass="text-left text-xs px-1 py-0.5 border-b align-top break-words whitespace-normal";

    return <>
        {currentPlaylistIsEmpty && <>
            {nextPrevPauseStopEnabled && <MpdPlayingProgress/>}
            <div className="whitespace-nowrap text-left">
                <Button className={buttonClass}
                        onClick={clear}><TrashIcon/></Button>
                <Button className={buttonClass}
                        onClick={shuffle}><ShuffleIcon/></Button>
                <Button className={buttonClass} onClick={doPrev}
                        disabled={!nextPrevPauseStopEnabled}><SkipBackIcon/></Button>
                <Button className={buttonClass} onClick={doPlay}
                        disabled={!playEnabled}><PlayIcon/></Button>
                <Button className={buttonClass} onClick={doPause}
                        disabled={!nextPrevPauseStopEnabled}><PauseIcon/></Button>
                <Button className={buttonClass} onClick={doStop}
                        disabled={!nextPrevPauseStopEnabled}><SquareIcon/></Button>
                <Button className={buttonClass} onClick={doNext}
                        disabled={!nextPrevPauseStopEnabled}><SkipForwardIcon/></Button>
            </div>
        </>}

        <Table className={"table-fixed w-full"}>
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

                        const contextMenuItems: Item[] = [];
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

                        return (<ContextMenuTableRowMobile
                                items={contextMenuItems}
                                key={idx}
                                className={`${
                                    item.pos === activePos ? (playing ? "text-blue-400" : "text-gray-400") : ""
                                }`}
                                onDoubleClick={() => playItem(item)}
                            >
                                <TableCell className={tableCellClass}>{idx + 1}</TableCell>
                                <TableCell className={tableCellClass}>{item.title ?? "-"}</TableCell>
                                <TableCell className={tableCellClass}>{item.artist ?? "-"}</TableCell>
                                <TableCell className={tableCellClass}>{item.album ?? "-"}</TableCell>
                                <TableCell className={tableCellClass}>{formatTime(item.time)}</TableCell>
                            </ContextMenuTableRowMobile>
                        )
                    }
                )}
            </TableBody>
        </Table>
    </>
}
export default CurrentPlaylistMobile