import {Label} from "@/components/ui/label.tsx";
import {useState} from "react";
import type {DirectoryItem, TreeItem} from "@/features/tree/treeSlice.ts";
import {FolderUpIcon} from "lucide-react";
import {ContextMenuMobile} from "@/components/mobile/ContextMenuMobile.tsx";
import {useCurrentPlaylistLogic} from "@/hooks/useCurrentPlaylistLogic.ts";
import {useTreeLogic} from "@/hooks/useTreeLogic.ts";

export const TreeMobile = () => {
    const {addByPathToPos, currentPlaylistLength} = useCurrentPlaylistLogic();
    const {rootFolder, updateFull, updateByPath} = useTreeLogic();
    const [folderStack, setFolderStack] = useState<DirectoryItem[]>([rootFolder]);
    const currentFolder = folderStack[folderStack.length - 1];

    const isDir = (item: TreeItem) => "children" in item;

    const goBack = () => {
        if (folderStack.length > 1) {
            setFolderStack((prev) => prev.slice(0, -1));
        }
    };

    const goToFolder = (folder: DirectoryItem) =>  setFolderStack((prev) => [...prev, folder]);

    const  addFirst = (path: string)=>  addByPathToPos( path, 0);
    const  addLast = (path: string)=>  addByPathToPos(path, currentPlaylistLength);

    return <>
        {folderStack.length > 1 &&
            <ContextMenuMobile
                items={[
                    {label: "⬆️ Add first", onClick: () => addFirst(folderStack[folderStack.length - 1].path)},
                    {label: "⬇️ Add last",onClick: () => addLast( folderStack[folderStack.length - 1].path)},
                    {label: "🔄 Update the tree (this folder)", onClick: () => updateByPath(folderStack[folderStack.length - 1].path)},
                    {label: "🔄 Update the tree (full)", onClick: updateFull},
                ]}>
                <Label
                    className="mb-2 text-left"
                    onClick={goBack}
                >
                    <FolderUpIcon className="size-5 flex-shrink-0"/>
                    <span className="dark:invert truncate">{folderStack[folderStack.length - 1].name}</span>
                </Label>
            </ContextMenuMobile>
        }
        <ul>
            {currentFolder.children.map((item, key) => (
                isDir(item) &&
                <ContextMenuMobile
                    items={[
                        {label: "⬆️ Add first", onClick: () => addFirst(item.path)},
                        {label: "⬇️ Add last",onClick: () => addLast(item.path)},
                        {label: "🔄 Update the tree", onClick: () => updateByPath(item.path)},
                        {label: "🔄 Update the tree (full)", onClick: updateFull},
                    ]}>
                    <li>

                        <Label
                            className="text-left mb-2"
                            key={key}
                            onClick={() => goToFolder(item)}
                        ><span className="dark:invert grayscale">📁</span><span className="truncate">{item.name}</span></Label>
                    </li>
                </ContextMenuMobile>
            ))}

            {currentFolder.children.map((item, key) => (
                !isDir(item) &&
                <ContextMenuMobile
                    items={[
                        {label: "⬆️ Add first", onClick: () => addFirst(item.path)},
                        {label: "⬇️ Add last",onClick: () => addLast(item.path)},
                        {label: "🔄 Update the tree (full)", onClick: updateFull},
                    ]}>
                    <li>
                        <Label
                            key={key}
                            className="text-left mb-2"
                        >
                            <span className="dark:invert grayscale">🎵</span>{item.name}
                        </Label>
                    </li>
                </ContextMenuMobile>
            ))}
        </ul>
    </>
}