"use client";
import { logEvent } from "firebase/analytics";
import { useEffect } from "react";
import { firebaseAnalytics } from "./firebase/clientApp";

export function trackEvent(name: string) {
  if (typeof window !== "undefined" && window.sa_event) {
    try {
      window.sa_event(name);
    } catch (e) {
      console.error(e);
    }
    logEvent(firebaseAnalytics!, name);
  }
}

export function useTrackEvent(name: string, track = true) {
  useEffect(() => {
    if (track) trackEvent(name);
  }, [name, track]);
}
