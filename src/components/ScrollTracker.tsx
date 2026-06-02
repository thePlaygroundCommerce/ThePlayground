"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

export default function ScrollTracker(): null {
  const sentScreensRef = useRef<Set<number>>(new Set());
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const sentScreens = sentScreensRef.current;

    const getPath = () => (typeof window !== "undefined" ? window.location.pathname : "");

    const sendForScreensUpTo = (currentScreen: number) => {
      for (let n = 1; n <= currentScreen; n++) {
        if (!sentScreens.has(n)) {
          sentScreens.add(n);
          try {
            track("Page Scroll Depth", { depth: `${n} screen${n > 1 ? "s" : ""}`, path: getPath() });
          } catch {
            // ignore analytics errors
          }
        }
      }
    };

    const update = () => {
      rafRef.current = null;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || window.pageYOffset || doc.scrollTop || 0;
      const windowHeight = window.innerHeight || doc.clientHeight || 0;

      if (windowHeight <= 0) return; // defensive: avoid division by zero

      const currentScreen = Math.floor(scrollTop / windowHeight);
      if (currentScreen >= 1) sendForScreensUpTo(currentScreen);
    };

    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    // initial check
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
