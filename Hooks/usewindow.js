"use client";

import { useClientOnly } from "./useclientonly";

export function useWindow() {
  return useClientOnly(() => window, null);
}

// Example window-specific hooks
export function useWindowWidth() {
  return useClientOnly(() => window.innerWidth, 0);
}

export function useWindowHeight() {
  return useClientOnly(() => window.innerHeight, 0);
}
