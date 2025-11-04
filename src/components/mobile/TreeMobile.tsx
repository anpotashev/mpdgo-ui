import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {Label} from "@/components/ui/label.tsx";
import {useState} from "react";
import type {DirectoryItem, TreeItem} from "@/features/tree/treeSlice.ts";
import {FolderUpIcon} from "lucide-react";
import {wsSend} from "@/store/middleware/wsMiddleware.ts";
import {addToPos, updateTree} from "@/features/wsRequestPayloads.ts";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store.ts";
import {ContextMenuMobile} from "@/components/mobile/ContextMenuMobile.tsx";

export const TreeMobile = () => {
    const rootFolder = useAppSelector(state => state.tree.root);
    const playlistLength = useSelector((state: RootState) => state.playlist?.items?.length) ?? 0
    const dispatch = useAppDispatch();
    const [folderStack, setFolderStack] = useState<DirectoryItem[]>([rootFolder]);
    const currentFolder = folderStack[folderStack.length - 1];

    const isDir = (item: TreeItem) => "children" in item;

    const goBack = () => {
        if (folderStack.length > 1) {
            setFolderStack((prev) => prev.slice(0, -1));
        }
    };

    const goToFolder = (folder: DirectoryItem) => {
        setFolderStack((prev) => [...prev, folder]);
    };

    const  addFirst = (path: string)=>  dispatch(wsSend(addToPos(0, path)));
    const  addLast = (path: string)=>  dispatch(wsSend(addToPos(playlistLength, path)));
    const  updateDb = (path: string)=>  dispatch(wsSend(updateTree(path)));

    return <>
        {folderStack.length > 1 &&
            <ContextMenuMobile
                items={[
                    {label: "⬆️ Add first", onClick: () => addFirst(folderStack[folderStack.length - 1].path)},
                    {label: "⬇️ Add last",onClick: () => addLast( folderStack[folderStack.length - 1].path)},
                    {label: "🔄 Update the tree (this folder)", onClick: () => updateDb(folderStack[folderStack.length - 1].path)},
                    {label: "🔄 Update the tree (full)", onClick: () => updateDb("")},
                ]}>
                <Label
                    className="mb-2 text-left"
                    onClick={goBack}
                >
                    <FolderUpIcon className="size-5 flex-shrink-0"/>
                    <span className="truncate">{folderStack[folderStack.length - 1].name}</span>
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
                        {label: "🔄 Update the tree", onClick: () => updateDb(item.path)},
                        {label: "🔄 Update the tree (full)", onClick: () => updateDb("")},
                    ]}>
                    <li>

                        <Label
                            className="text-left mb-2"
                            key={key}
                            onClick={() => goToFolder(item)}
                        >📁<span className="truncate">{item.name}</span></Label>
                    </li>
                </ContextMenuMobile>
            ))}

            {currentFolder.children.map((item, key) => (
                !isDir(item) &&
                <ContextMenuMobile
                    items={[
                        {label: "⬆️ Add first", onClick: () => addFirst(item.path)},
                        {label: "⬇️ Add last",onClick: () => addLast(item.path)},
                        {label: "🔄 Update the tree (full)", onClick: () => updateDb("")},
                    ]}>
                    <li>
                        <Label
                            key={key}
                            className="text-left mb-2"
                        >
                            <span className=" dark:invert">🎵</span>{item.name}
                        </Label>
                    </li>
                </ContextMenuMobile>
            ))}
        </ul>
    </>
}