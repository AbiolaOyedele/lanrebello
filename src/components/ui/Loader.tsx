"use client";

/** Full-screen loader — shows on initial page load, exits after 2s */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

const EXIT_EASE = [0.76, 0, 0.24, 1] as const;
const ENTRANCE_EASE = [0.25, 0.1, 0.25, 1] as const;
const LOADER_DURATION_MS = 1800;

export default function Loader({ onComplete }: LoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: EXIT_EASE }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "var(--white)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: ENTRANCE_EASE, delay: 0.3 }}
            style={{
              fontFamily: '"Inter Display", system-ui, sans-serif',
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink)",
            }}
          >
            Lanre Bello
          </motion.p>

          <div style={{ width: "48px", overflow: "hidden", height: "2px" }}>
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
                delay: 0.5,
              }}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "var(--ink)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
