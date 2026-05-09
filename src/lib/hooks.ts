/** Shared React hooks for the Lanre Bello site */

"use client";

import { useEffect, useState } from "react";

/**
 * Returns live viewport dimensions and breakpoint flags.
 * Initialises with desktop defaults to avoid hydration mismatch —
 * the real values are set on the first client paint.
 */
export function useResponsive() {
  const [width, setWidth] = useState(1280);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    isMobile: width < 768,
    isTablet: width < 1024,
    width,
  };
}
