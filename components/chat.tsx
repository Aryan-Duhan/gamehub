"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export const VariantToggle = () => {
    return (
        <Button variant="ghost" size="sm">
            Toggle
        </Button>
    );
};

export const ChatToggle = () => {
    return (
        <Button variant="ghost" size="sm">
            Chat
        </Button>
    );
};

export const ChatHeader = () => {
    return (
        <div className="flex items-center justify-between p-3">
            <h3 className="text-lg font-semibold">Chat</h3>
        </div>
    );
};

export const ChatForm = () => {
    return (
        <div className="flex items-center gap-2 p-3">
            <Input placeholder="Type a message..." />
            <Button size="sm">
                <Send className="h-4 w-4" />
            </Button>
        </div>
    );
};

export const ChatList = () => {
    return (
        <div className="flex-1 p-3">
            <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                    Chat messages will appear here
                </div>
            </div>
        </div>
    );
};

export const ChatCommunity = () => {
    return (
        <div className="p-3">
            <div className="text-sm text-muted-foreground">
                Community features will appear here
            </div>
        </div>
    );
};

