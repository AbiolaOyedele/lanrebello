"use client";

/** Scroll-triggered fade + slide-up entrance animation wrapper */

import { motion, useInView } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

const EASE_ENTRANCE = [0.25, 0.1, 0.25, 1] as const;

export default function FadeUp({ children, delay = 0, className, style }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.8, ease: EASE_ENTRANCE, delay }}
    >
      {children}
    </motion.div>
  );
}
