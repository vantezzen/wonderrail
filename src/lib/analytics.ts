"use client";
import { useEffect } from "react";

export function trackEvent(name: string) {
  if (typeof window !== "undefined" && window.sa_event) {
    try {
      window.sa_event(name);
    } catch (e) {
      console.error(e);
    }
  }
}

export function useTrackEvent(name: string, track = true) {
  useEffect(() => {
    if (track) trackEvent(name);
  }, [name, track]);
}
