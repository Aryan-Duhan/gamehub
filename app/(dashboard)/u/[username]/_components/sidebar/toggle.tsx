"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { use } from "react";

export const Toggle = () => {

    const {
        collapsed,
        onExpand,
        onCollapse,
    } = useCreatorSidebar((state) => state);

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
            {collapsed && (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <Hint label={label} side="right" asChild>
                        <Button
                            onClick={onExpand}
                            variant="ghost"
                            className="h-auto p-2"
                        >
                            <div className="cursor-pointer">
                                <ArrowRightFromLine className="h-4 w-4" />
                            </div>
                        </Button>
                    </Hint>
                </div>
            )};
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
                    <p className="font-semibold text-primary" >
                        Dashboard
                    </p>
                    <Hint label={label} side="right" asChild>
                        <Button
                            onClick={onCollapse}
                            variant="ghost"
                            className="h-auto p-2 ml-auto"
                        >
                            <div className="cursor-pointer">
                                <ArrowLeftFromLine className="h-4 w-4"/>
                            </div>
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
};