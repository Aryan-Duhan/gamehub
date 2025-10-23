"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatListProps {
    messages : ReceivedChatMessage[];
    isHidden : boolean;
};

export const ChatList = ({
    messages,
    isHidden
} : ChatListProps) => {

    if (isHidden || !messages || messages.length === 0){
        return(
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? "Chat is disabled" : "Welcome to the chat"}
                </p>
            </div>
        )
    }

    return(
        <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
            {messages.map((message) => (
                <ChatMessage
                    key={message.timestamp}
                    data={message}
                />
            ))}
        </div>
    );
};

export const ChatListSkeleton = () => {
    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-x-2 mb-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
};