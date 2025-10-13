import { create } from "zustand";

export type ChatVariant = "chat" | "community";

interface ChatSidebarStore {
    collapsed: boolean;
    variant: ChatVariant;
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
    collapsed: false,
    variant: "chat",
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
    onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
}));

