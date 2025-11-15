import {Dialog} from "@radix-ui/react-dialog";
import {DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {repos} from "@/components/common/aboutData.ts";
import {Item, ItemActions, ItemContent, ItemDescription, ItemHeader} from "@/components/ui/item.tsx";
import {Button} from "@/components/ui/button.tsx";

interface AboutDialogProps {
    isOpen: boolean;
    onClose: (open: boolean) => void; // shadcn вызывает onOpenChange(boolean)
}
export const AboutDialog = ({ isOpen, onClose }: AboutDialogProps) => {
    return  <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>About the application</DialogTitle>
                </DialogHeader>
                {repos.map((repo, key) => (
                    <Item key={key}>
                        <ItemContent>
                            <ItemHeader>{repo.name}</ItemHeader>
                            <ItemDescription>{repo.description}</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="outline" size="sm" onClick={() => window.open(repo.url, "_blank")}>
                                view on github
                            </Button>
                        </ItemActions>
                    </Item>
                ))}
            </DialogContent>
        </Dialog>
}