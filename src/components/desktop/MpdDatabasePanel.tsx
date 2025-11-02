import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {TreeView} from "@/components/desktop/TreeView.tsx";
import {PlaylistPanel} from "@/components/desktop/PlaylistPanel.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {StoredPlaylistsView} from "@/components/desktop/StoredPlaylistsView.tsx";

export const MpdDatabasePanel = () => {

    return <div className={"h-[calc(75vh)]"}>
        <ResizablePanelGroup direction={"horizontal"}>
        <ResizablePanel maxSize={40} minSize={20} defaultSize={30}>
            <ScrollArea className="h-full w-full">
            <Accordion type="single" collapsible>
                <AccordionItem value="tree">
                    <AccordionTrigger>Tree</AccordionTrigger>
                    <AccordionContent>
                        <TreeView/>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="stored-playlists">
                    <AccordionTrigger>Playlists</AccordionTrigger>
                    <AccordionContent>
                        <StoredPlaylistsView/>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="search">
                    <AccordionTrigger>Search</AccordionTrigger>
                    <AccordionContent>
                        [Coming soon]
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            </ScrollArea>
        </ResizablePanel>
        <ResizableHandle/>
        <ResizablePanel>
            <PlaylistPanel/>
        </ResizablePanel>
    </ResizablePanelGroup>
    </div>
}