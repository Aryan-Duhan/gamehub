import { create } from "zustand";

interface CreatorSidebarState {
    collapsed: boolean;
    onExpand : () => void;
    onCollapse : () => void;
};

export const useCreatorSidebar = create<CreatorSidebarState>((set) => ({
    collapsed: false,
    onExpand: () => set({ collapsed: false }),
    onCollapse: () => set({ collapsed: true }),
}));