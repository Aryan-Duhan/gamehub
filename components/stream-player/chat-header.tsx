"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ChatToggle } from "./chat-toggle";
import { VariantToggle } from "./variant-toggle";


export const ChatHeader = () => {
    return (
        <div className="relative p-3 border-b">
            <div className="absolute left-2 top-2 hidden lg:block">
                <ChatToggle />
            </div>
            <div className="font-semibold text-primary text-center">
                Stream Chat
            </div>
            <div className="absolute right-2 top-2">
                <VariantToggle />
            </div>
        </div>
    );
};

export const ChatHeaderSkeleton = () => {
    return (
        <div className="relative p-3 border-b">
            <Skeleton className="absolute h-6 w-6 top-3 left-3" />
            <Skeleton className="w-28 h-6 mx-auto"/>
            <Skeleton className="absolute h-6 w-6 top-3 right-3" />
        </div>
    );
};