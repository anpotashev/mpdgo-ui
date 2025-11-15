import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Item, ItemActions, ItemContent, ItemDescription, ItemHeader} from "@/components/ui/item.tsx";
import {Button} from "@/components/ui/button.tsx";
import {repos} from "@/components/common/aboutData.ts";

export const AboutMobile= () => {
    return <>
        <Card className="w-full text-left">
            <CardHeader>
                <CardTitle>About the application</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    </>
}