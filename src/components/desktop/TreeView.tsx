import React, {useState} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {dndSlice, type DragItem} from "@/features/dnd/dndSlice";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu.tsx";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {addToPos, updateTree} from "@/features/wsRequestPayloads.ts";

interface DirectoryItem {
    path: string;
    name: string;
    children: TreeItem[];
}

interface FileItem {
    path: string;
    name: string;
}

type TreeItem = DirectoryItem | FileItem;

// Компонент для файла
const FileNode: React.FC<{ file: FileItem }> = ({file}) => {
    const dispatch = useAppDispatch();
    const playlistLength = useSelector((state: RootState) => state.playlist?.items?.length) ?? 0
    
    return<ContextMenu>
        <ContextMenuTrigger>
    <div className="ml-2 cursor-pointer"
                onMouseDown={() => dispatch(dndSlice.actions.startDrag({
                    source: "tree",
                    path: file.path,
                    name: file.name,
                } as DragItem))}><span className="dark:invert grayscale">📁🎵</span>{file.name}</div>
            </ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem onClick={() => dispatch(wsSend(addToPos(0, file.path)))}>Add first</ContextMenuItem>
            <ContextMenuItem onClick={() => dispatch(wsSend(addToPos(playlistLength, file.path)))}>Add last</ContextMenuItem>
        </ContextMenuContent>
        </ContextMenu>;
};

// Компонент для папки
const DirectoryNode: React.FC<{ dir: DirectoryItem }> = ({dir}) => {
    const dispatch = useAppDispatch();
    const playlistLength = useSelector((state: RootState) => state.playlist?.items?.length) ?? 0
    const [open, setOpen] = useState(false);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className="ml-1 flex flex-col items-start whitespace-nowrap">
                    <div className="cursor-pointer select-none"
                         onClick={() => setOpen(!open)}
                         onMouseDown={(e) => {
                             if (e.button == 0) {
                                 dispatch(dndSlice.actions.startDrag({
                                         source: "tree",
                                         path: dir.path,
                                         name: dir.name,
                                     } as DragItem)
                                 )
                             }
                         }
                         }
                    >
                        <span className="dark:invert grayscale">{open ? "📂" : "📁"}</span> {dir.name}
                    </div>
                    {open &&
                        dir.children.map((child, idx) =>
                            "children" in child ? (
                                <DirectoryNode key={idx} dir={child}/>
                            ) : (
                                <FileNode key={idx} file={child}/>
                            )
                        )}
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={() => dispatch(wsSend(addToPos(0, dir.path)))}>Add first</ContextMenuItem>
                <ContextMenuItem onClick={() => dispatch(wsSend(addToPos(playlistLength, dir.path)))}>Add last</ContextMenuItem>
                <ContextMenuItem onClick={() => dispatch(wsSend(updateTree(dir.path)))}>Update</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

// Основной компонент дерева
export const TreeView: React.FC = () => {
    const root = useSelector((state: RootState) => state.tree.root);
    const connected = useAppSelector((state) => state.connection.connected) ?? false;
    if (!connected) {
        return <>[Not Connected]</>
    }
    return (
        <div className="flex flex-col items-start overflow-auto">
            <DirectoryNode dir={root}/>
        </div>
    );
};
