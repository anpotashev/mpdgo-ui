import React from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {wsSend} from "@/store/middleware/wsMiddleware";
import {dndSlice} from "@/features/dnd/dndSlice";
// import {addToPos, moveItemToPos, playPos} from "@/features/wsRequestPayloads";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent, ContextMenuRadioGroup, ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/ui/context-menu";
import {addStoredPlaylistToPos, addToPos, moveItemToPos, playPos} from "@/features/wsRequestPayloads.ts";
import {ScrollArea} from "./ui/scroll-area";

type Column = "Id" | "Title" | "Artist" | "Album" | "Time"

export const PlaylistPanel: React.FC = () => {
        // Столбец, у которого вызвали контекстное меню
        const [currentColumn, setCurrentColumn] = React.useState<Column | null>(null);
        // видимость и ширины столбцов
        const [columns, setColumns] = React.useState<Record<Column, { visible: boolean; width: string }>>(() => {
                const saved = localStorage.getItem("visibleColumns");
                return saved ? JSON.parse(saved) : {
                    Id: {visible: true, width: "w-4"},
                    Title: {visible: true, width: "w-16"},
                    Artist: {visible: true, width: "w-16"},
                    Album: {visible: true, width: "w-16"},
                    Time: {visible: true, width: "w-8"},
                }
            }
        );
        // если остался единственный видимый столбец, то скрывать его нельзя
        const isOnlyOneVisible = Object.values(columns).filter(c => c.visible).length === 1

        React.useEffect(() => {
            localStorage.setItem("visibleColumns", JSON.stringify(columns))
        }, [columns])

        const toggleColumnVisible = (col: Column) => {
            setColumns((prev) => ({
                ...prev,
                [col]: {...prev[col], visible: !prev[col].visible},
            }))
        }
        const setColumnWidth = (col: Column, width: string) => {
            setColumns((prev) => ({
                ...prev,
                [col]: {...prev[col], width},
            }))
        }

        const items = useAppSelector(state => state.playlist.items) ?? [];
        const draggingItem = useAppSelector(state => state.dnd.draggingItem) ?? null;
        const playing = useAppSelector(state => state.status?.status?.state === "play");
        const activePos = useAppSelector(state => state.status.status?.song);

        const dispatch = useAppDispatch();
        const handleMouseUp = (pos: number) => {
            if (draggingItem?.source === "tree") {
                if (draggingItem.path !== null) {
                    dispatch(wsSend(addToPos(pos, draggingItem.path)));
                }
            }
            if (draggingItem?.source === "playlist") {
                if (draggingItem.pos !== null && draggingItem.pos !== pos) {
                    dispatch(wsSend(moveItemToPos(draggingItem.pos, pos)));
                }
            }
            if (draggingItem?.source === "stored_playlist" && draggingItem.name) {
                dispatch(wsSend(addStoredPlaylistToPos(pos, draggingItem.name)))
            }
            dispatch(dndSlice.actions.stopDrag());
        }
        return (
            <ScrollArea className="w-full h-full" onMouseUp={() => handleMouseUp(items.length ? items.length : 0)}>
                <Table className={"table-fixed"}>
                    <ContextMenu>
                        <ContextMenuTrigger asChild>
                            <TableHeader onMouseUp={() => handleMouseUp(0)}>
                                <TableRow>
                                    {columns.Id.visible && <TableHead onContextMenu={() => setCurrentColumn("Id")}
                                                                      className={columns.Id.width}>#</TableHead>}
                                    {columns.Title.visible && <TableHead onContextMenu={() => setCurrentColumn("Title")}
                                                                         className={columns.Title.width}>Title</TableHead>}
                                    {columns.Artist.visible && <TableHead onContextMenu={() => setCurrentColumn("Artist")}
                                                                          className={columns.Artist.width}>Artist</TableHead>}
                                    {columns.Album.visible && <TableHead onContextMenu={() => setCurrentColumn("Album")}
                                                                         className={columns.Album.width}>Album</TableHead>}
                                    {columns.Time.visible && <TableHead onContextMenu={() => setCurrentColumn("Time")}
                                                                        className={columns.Time.width}>Time</TableHead>}
                                </TableRow>
                            </TableHeader>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuCheckboxItem disabled={isOnlyOneVisible && columns.Id.visible}
                                                     checked={columns.Id.visible}
                                                     onCheckedChange={() => toggleColumnVisible("Id")}>#</ContextMenuCheckboxItem>
                            <ContextMenuCheckboxItem disabled={isOnlyOneVisible && columns.Title.visible}
                                                     checked={columns.Title.visible}
                                                     onCheckedChange={() => toggleColumnVisible("Title")}>Title</ContextMenuCheckboxItem>
                            <ContextMenuCheckboxItem disabled={isOnlyOneVisible && columns.Artist.visible}
                                                     checked={columns.Artist.visible}
                                                     onCheckedChange={() => toggleColumnVisible("Artist")}>Artist</ContextMenuCheckboxItem>
                            <ContextMenuCheckboxItem disabled={isOnlyOneVisible && columns.Album.visible}
                                                     checked={columns.Album.visible}
                                                     onCheckedChange={() => toggleColumnVisible("Album")}>Album</ContextMenuCheckboxItem>
                            <ContextMenuCheckboxItem disabled={isOnlyOneVisible && columns.Time.visible}
                                                     checked={columns.Time.visible}
                                                     onCheckedChange={() => toggleColumnVisible("Time")}>Time</ContextMenuCheckboxItem>

                            {currentColumn && currentColumn !== "Id" && <><ContextMenuSeparator/>
                                <ContextMenuRadioGroup value={columns[currentColumn!].width}
                                                       onValueChange={(v) => setColumnWidth(currentColumn!, v)}>
                                    <ContextMenuRadioItem value={"w-8"}>Small</ContextMenuRadioItem>
                                    <ContextMenuRadioItem value={"w-16"}>Medium</ContextMenuRadioItem>
                                    <ContextMenuRadioItem value={"w-24"}>Large</ContextMenuRadioItem>
                                </ContextMenuRadioGroup></>}

                        </ContextMenuContent>
                    </ContextMenu>
                    <TableBody>
                        {items.map((item, idx) => (
                            <TableRow key={item.id} className={`${
                                item.pos === activePos ? (playing ? "text-blue-400" : "text-gray-400") : ""
                            }`}
                                      onMouseUp={(e) => {
                                          e.stopPropagation();
                                          handleMouseUp(item.pos);
                                      }}
                                      onMouseDown={() => dispatch(dndSlice.actions.startDrag({
                                          id: null,
                                          name: item.title ?? null,
                                          path: null,
                                          source: "playlist",
                                          pos: item.pos
                                      }))}
                                      onDoubleClick={() => dispatch(wsSend(playPos(item.pos)))}
                            >
                                {columns.Id.visible &&
                                    <TableCell className="text-left px-1 py-0.5 border-b">{idx + 1}</TableCell>}
                                {columns.Title.visible &&
                                    <TableCell
                                        className="text-left px-1 py-0.5 border-b truncate">{item.title ?? "-"}</TableCell>}
                                {columns.Artist.visible &&
                                    <TableCell
                                        className="text-left px-1 py-0.5 border-b truncate">{item.artist ?? "-"}</TableCell>}
                                {columns.Album.visible &&
                                    <TableCell
                                        className="text-left px-1 py-0.5 border-b truncate">{item.album ?? "-"}</TableCell>}
                                {columns.Time.visible &&
                                    <TableCell
                                        className="text-left px-1 py-0.5 border-b">{formatTime(item.time)}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        );
    }
;

// Вспомогательная функция для форматирования секунд в MM:SS
function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

