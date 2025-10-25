import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create(
    persist(
        (set) => ({
            theme: localStorage.getItem("theme") || "default", // default, light, dark
            isSettingsOpen: false,

            setTheme: (theme) => {
                localStorage.setItem("theme", theme);
                document.documentElement.setAttribute("data-theme", theme);
                set({ theme });
            },

            toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
            closeSettings: () => set({ isSettingsOpen: false }),
        }),
        {
            name: "settings-storage",
        }
    )
);