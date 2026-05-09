"use client";

/** Text reveal: clips child via overflow:hidden, slides up from below on scroll */

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
}

const EASE_ENTRANCE = [0.25, 0.1, 0.25, 1] as const;

export default function TextReveal({ children, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ duration: 1, ease: EASE_ENTRANCE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
