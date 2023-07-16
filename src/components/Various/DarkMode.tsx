"use client";
import { cn } from "@/lib/utils";
import usePersistentStoreSecure from "@/lib/utils/zustand";
import { usePathname } from "next/navigation";
import React from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DarkModeState {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

const useDarkModeStoreRaw = create<DarkModeState>()(
  persist(
    (set, get) => ({
      isDarkMode: true,
      setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
    }),
    {
      name: "dark-mode",
    }
  )
);

const useDarkModeStore = (selector: (state: DarkModeState) => any) => {
  return usePersistentStoreSecure(useDarkModeStoreRaw, selector);
};
export default useDarkModeStore;

export const useIsDarkMode = () => {
  const pathname = usePathname();
  const isPlanner =
    pathname.startsWith("/journeys/") || pathname.startsWith("/app");

  const isDarkMode = useDarkModeStore((store) => store.isDarkMode);

  return !isPlanner || isDarkMode;
};

export function DarkModeBodyProvider({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isDarkMode = useIsDarkMode();
  return (
    <body
      className={cn(
        isDarkMode
          ? "dark bg-zinc-900 text-zinc-100"
          : "bg-zinc-100 text-zinc-900",
        "m-0 p-0 w-full h-full min-h-screen",
        className
      )}
    >
      {children}
    </body>
  );
}
