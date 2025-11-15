import React, {useState} from "react";
import {type DragItem} from "@/features/dnd/dndSlice";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu.tsx";
import {useDragLogic} from "@/hooks/useDragLogic.ts";
import {useCurrentPlaylistLogic} from "@/hooks/useCurrentPlaylistLogic.ts";
import {useTreeLogic} from "@/hooks/useTreeLogic.ts";
import {useConnectionLogic} from "@/hooks/useConnectionLogic.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Label} from "@/components/ui/label.tsx";

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
    const {doDragStart} = useDragLogic();
    const {addByPathToPos, currentPlaylistLength} = useCurrentPlaylistLogic();

    return <ContextMenu>
        <ContextMenuTrigger>
            <div className="ml-2 cursor-pointer"
                 onMouseDown={() => doDragStart({
                     source: "tree",
                     path: file.path,
                     name: file.name,
                 } as DragItem)}><span className="dark:invert grayscale">📁🎵</span>{file.name}</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem onClick={() => addByPathToPos(file.path, 0)}>Add first</ContextMenuItem>
            <ContextMenuItem onClick={() => addByPathToPos(file.path, currentPlaylistLength)}>Add last</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>;
};

// Компонент для папки
const DirectoryNode: React.FC<{ dir: DirectoryItem }> = ({dir}) => {
    const {doDragStart} = useDragLogic();
    const {addByPathToPos, currentPlaylistLength} = useCurrentPlaylistLogic();
    const {updateByPath} = useTreeLogic();
    const [open, setOpen] = useState(false);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className="ml-1 flex flex-col items-start whitespace-nowrap">
                    <div className="cursor-pointer select-none"
                         onClick={() => setOpen(!open)}
                         onMouseDown={(e) => {
                             if (e.button == 0) {
                                 doDragStart({
                                     source: "tree",
                                     path: dir.path,
                                     name: dir.name,
                                 } as DragItem);
                             }
                         }}
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
                <ContextMenuItem onClick={() => addByPathToPos( dir.path, 0)}>Add first</ContextMenuItem>
                <ContextMenuItem onClick={() => addByPathToPos(dir.path, currentPlaylistLength)}>Add
                    last</ContextMenuItem>
                <ContextMenuItem onClick={() => updateByPath(dir.path)}>Update</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

// Основной компонент дерева
export const TreeView: React.FC = () => {
    const {rootFolder, treeLoading} = useTreeLogic();
    const {connected} = useConnectionLogic();
    if (!connected) {
        return <>[Not Connected]</>
    }
    return (treeLoading ? <Label><Spinner/>Loading...</Label> :
        <div className="flex flex-col items-start overflow-auto">
            <DirectoryNode dir={rootFolder}/>
        </div>
    );
};
