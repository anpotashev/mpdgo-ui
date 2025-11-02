import React from "react";
import {Label} from "@/components/ui/label.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

interface CustomCheckboxItemProps {
    enabledMessage: string;
    disabledMessage: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    enabled: boolean;
}

export const CustomCheckboxItem = (props: CustomCheckboxItemProps) => {

    return <div className="flex flex-col gap-6">
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
            <Checkbox value="Settings"
                      checked={props.enabled}
                      id="random-toggle"
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                      onClick={props.onClick}
            />
            <div className="grid gap-1.5 font-normal text-left">
                <p className="text-muted-foreground text-sm">
                    {props.enabled ? props.enabledMessage : props.disabledMessage}
                </p>
            </div>
        </Label>
    </div>
}
