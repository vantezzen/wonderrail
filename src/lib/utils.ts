import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHost() {
  if (typeof window === "undefined") return "https://wonderrail.com";
  return window.location.origin;
}
