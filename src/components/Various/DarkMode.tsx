"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface JourneyIdState {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

const useDarkModeStore = create<JourneyIdState>()(
  persist(
    devtools((set) => ({
      isDarkMode: false,
      setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
    })),
    {
      name: "dark-mode",
    }
  )
);
export default useDarkModeStore;

export const useIsDarkMode = () => {
  const pathname = usePathname();
  const isPlanner = pathname.startsWith("/journeys/");
  const isDarkMode = useDarkModeStore((store) => store.isDarkMode);

  console.log(isPlanner, pathname);

  return !isPlanner || isDarkMode;
};

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useIsDarkMode();
  return (
    <div
      className={cn(
        isDarkMode ? "dark bg-zinc-900" : "bg-zinc-100",
        "m-0 p-0 w-full h-full"
      )}
    >
      {children}
    </div>
  );
}
