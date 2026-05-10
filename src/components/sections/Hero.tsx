"use client";

/** Full-viewport hero with parallax images, text reveals, rotating sublines, and scroll-driven fade */

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useResponsive } from "@/lib/hooks";

interface HeroProps {
  loaderDone: boolean;
}

const EASE_ENTRANCE = [0.25, 0.1, 0.25, 1] as const;

export default function Hero({ loaderDone }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useResponsive();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Main image: 117% tall, scrolls -15% (creates parallax depth)
  const mainImgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
// Text scroll fade
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "700px",
        overflow: "hidden",
        backgroundColor: "var(--white)",
      }}
    >
      {/* ─── LAYER 1: Main full-bleed image ───────────────────────── */}
      {/* Entrance: opacity + scale. Parallax handled by inner wrapper. */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={loaderDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.2, ease: EASE_ENTRANCE, delay: 0.2 }}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "117%",
            y: mainImgY,
          }}
        >
          <Image
            src="/images/hero-main.jpg"
            alt="Lanre Bello"
            fill
            priority
            style={{ objectFit: "cover", filter: "brightness(0.96)" }}
            sizes="100vw"
          />
        </motion.div>
      </motion.div>


      {/* ─── Gradient overlay ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaderDone ? { opacity: 0.24 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: EASE_ENTRANCE, delay: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(rgba(0,0,0,0) 44%, rgb(0,0,0) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ─── Text container ───────────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          top: isMobile ? "48%" : "50%",
          left: 0,
          right: 0,
          zIndex: 3,
          padding: isMobile ? "0 24px" : "0 60px",
          y: textY,
          opacity: textOpacity,
        }}
      >
        {/* Headline */}
        <div style={{ overflow: "hidden", marginBottom: "12px" }}>
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={loaderDone ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{ duration: 1, ease: EASE_ENTRANCE, delay: 0.8 }}
            style={{
              fontFamily: '"Inter Display", system-ui, sans-serif',
              fontSize: "clamp(72px, 10vw, 130px)",
              fontWeight: 700,
              color: "var(--white)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Lanre Bello
          </motion.h1>
        </div>

        {/* Sub-headline */}
        <div style={{ overflow: "hidden", marginBottom: "24px" }}>
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={loaderDone ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{ duration: 1, ease: EASE_ENTRANCE, delay: 0.95 }}
            style={{
              fontFamily: '"Inter Display", system-ui, sans-serif',
              fontSize: "clamp(22px, 3vw, 36px)",
              fontWeight: 400,
              color: "var(--white)",
              margin: 0,
            }}
          >
            Building the FoodTech Ecosystem
          </motion.p>
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: EASE_ENTRANCE, delay: 1.15 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}
        >
          <HeroCTAPrimary />
          <HeroCTASecondary />
        </motion.div>

      </motion.div>
    </section>
  );
}

function HeroCTAPrimary() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="#story"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -2 : 0, backgroundColor: hovered ? "var(--green-700)" : "var(--green-800)" }}
      transition={{ duration: 0.3 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: "44px",
        padding: "10px 24px",
        borderRadius: "999px",
        backgroundColor: "var(--green-800)",
        color: "var(--white)",
        fontFamily: "var(--font-inter)",
        fontSize: "14px",
        fontWeight: 500,
        textDecoration: "none",
      }}
    >
      Read the story →
    </motion.a>
  );
}

function HeroCTASecondary() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="#built"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        borderColor: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.35)",
        color: hovered ? "var(--white)" : "rgba(255,255,255,0.75)",
      }}
      transition={{ duration: 0.3 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: "44px",
        padding: "10px 24px",
        borderRadius: "999px",
        border: "1px solid rgba(255,255,255,0.35)",
        color: "rgba(255,255,255,0.75)",
        fontFamily: "var(--font-inter)",
        fontSize: "14px",
        fontWeight: 500,
        textDecoration: "none",
      }}
    >
      Explore what I&apos;ve built
    </motion.a>
  );
}
