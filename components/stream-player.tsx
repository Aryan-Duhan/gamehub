"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { 
    VariantToggle,
    ChatToggle,
    ChatHeader,
    ChatForm,
    ChatList,
    ChatCommunity
} from "./chat";
import { User } from "@prisma/client";

interface StreamPlayerProps {
    user: User;
    stream: any;
    isFollowing: boolean;
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
}: StreamPlayerProps) => {
    const matches = useMediaQuery('(max-width: 1024px)');
    const { variant, onExpand } = useChatSidebar((state) => state);

    useEffect(() => {
        if (!matches) {
            onExpand();
        }
    }, [matches, onExpand]);

    return (
        <div className="flex flex-col bg-background">
            <div className="flex-1">
                <div className="flex h-full">
                    <div className="flex-1">
                        <div className="relative h-full">
                            <div className="absolute inset-0 bg-black">
                                {/* Stream content will go here */}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="h-full">
                            {/* Chat content will go here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
