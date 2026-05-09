"use client";

/**
 * Traction section — scroll-pinned stat carousel.
 * The section occupies N × 100vh of scroll space. The inner viewport is sticky,
 * so each 100vh of scroll advances the carousel by one stat. After all stats
 * are consumed the pin releases and normal scroll resumes.
 */

import type { StatBlock } from "@/types";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useResponsive } from "@/lib/hooks";

/** How long each image is shown before cross-fading to the next. */
const IMAGE_CYCLE_MS = 2200;

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS: StatBlock[] = [
  {
    digits: ["0", "9"],
    heading: "09 Businesses",
    description:
      "Nine businesses across food and technology, each one built with intention and run with structure.",
    images: [
      "/images/stats/businesses-1.jpg",
      "/images/stats/businesses-2.jpg",
      "/images/stats/businesses-3.jpg",
    ],
  },
  {
    digits: ["0", "5"],
    heading: "05 Food Brands",
    description:
      "Five customer-facing brands across grilled meals, subs, wings, spicy meals, and quick service.",
    images: [
      "/images/stats/brands-1.jpg",
      "/images/stats/brands-2.jpg",
      "/images/stats/brands-3.jpg",
    ],
  },
  {
    digits: ["0", "4"],
    heading: "04 Tech Products",
    description:
      "Four technology products built through IPC — from procurement to discovery to logistics.",
    images: ["/images/stats/tech-1.jpg", "/images/stats/tech-2.jpg", "/images/stats/tech-3.jpg"],
  },
  {
    digits: ["2", "1"],
    heading: "21 Outlets",
    description:
      "Twenty-one outlets across Lagos and Abuja. Ibadan coming soon.",
    images: [
      "/images/stats/outlets-1.jpg",
      "/images/stats/outlets-2.jpg",
      "/images/stats/outlets-3.jpg",
    ],
  },
];

const N = STATS.length;

// ─── Types ────────────────────────────────────────────────────────────────────

type CardStatus = "active" | "prev" | "next" | "hidden";

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Traction() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const { isMobile } = useResponsive();

  /* Reset image cycle and start fresh whenever the active stat changes. */
  useEffect(() => {
    setImageIndex(0);
    const id = setInterval(
      () => setImageIndex((i) => (i + 1) % STATS[currentIndex].images.length),
      IMAGE_CYCLE_MS
    );
    return () => clearInterval(id);
  }, [currentIndex]);

  /*
   * Track scroll progress across the full N × 100vh section height.
   * Each 1/N slice of progress = one stat step.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCurrentIndex(Math.min(N - 1, Math.floor(v * N)));
  });

  const getCardStatus = (index: number): CardStatus => {
    const diff = index - currentIndex;
    let d = diff;
    if (diff > N / 2) d -= N;
    if (diff < -N / 2) d += N;
    if (d === 0) return "active";
    if (d === -1) return "prev";
    if (d === 1) return "next";
    return "hidden";
  };

  return (
    /*
     * Outer section: tall enough to give the browser N × 100vh of scroll
     * distance. The sticky child consumes that distance without moving.
     */
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: `${(N + 1) * 100}vh`,
        backgroundColor: "var(--white)",
      }}
    >
      {/* ── Sticky viewport — pins for the full scroll duration ─── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "clip",
          backgroundColor: "var(--white)",
        }}
      >
        {/* ── Section heading ──────────────────────────────────── */}
        <div
          style={{
            maxWidth: "1280px",
            width: "100%",
            margin: "0 auto",
            padding: isMobile ? "0 24px" : "0 60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: isMobile ? "40px" : "56px",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "16px" : "0",
          }}
        >
          <h2
            style={{
              fontFamily: '"Inter Display", system-ui, sans-serif',
              fontSize: "clamp(36px, 4.5vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              lineHeight: 1.0,
              margin: 0,
            }}
          >
            Lanre Bello
            <br />
            In Numbers
          </h2>
          {!isMobile && (
            <div style={{ maxWidth: "300px", paddingTop: "8px" }}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  color: "#888888",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                A closer look at the milestones behind a decade of building. Each
                one represents real decisions, real teams, and real outcomes.
              </p>
            </div>
          )}
        </div>

        {/* ── Two-column body ──────────────────────────────────── */}
        <div
          style={{
            maxWidth: "1280px",
            width: "100%",
            margin: "0 auto",
            padding: isMobile ? "0 24px" : "0 60px",
            display: "flex",
            alignItems: isMobile ? "stretch" : "center",
            gap: isMobile ? "40px" : "80px",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {/* ── Left: stat content ──────────────────────────── */}
          <div
            style={{
              width: isMobile ? "100%" : "38%",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/*
             * key={currentIndex} remounts on each stat change so the
             * enter animation fires cleanly every time.
             */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* Counter */}
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#888888",
                  margin: "0 0 16px",
                }}
              >
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(N).padStart(2, "0")}
              </p>

              {/* Heading */}
              <h3
                style={{
                  fontFamily: '"Inter Display", system-ui, sans-serif',
                  fontSize: "clamp(32px, 3.5vw, 52px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                  margin: "0 0 20px",
                  lineHeight: 1.05,
                }}
              >
                {STATS[currentIndex].heading}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "15px",
                  color: "#888888",
                  lineHeight: 1.7,
                  margin: "0 0 32px",
                  maxWidth: "340px",
                }}
              >
                {STATS[currentIndex].description}
              </p>

              {/* CTA */}
              <motion.a
                href="#built"
                whileHover={{
                  y: -3,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "999px",
                  backgroundColor: "var(--ink)",
                  color: "var(--white)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 500,
                  textDecoration: "none",
                  alignSelf: "flex-start",
                }}
              >
                Explore what I&apos;ve built →
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right: photo card carousel ───────────────────── */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: isMobile ? "280px" : "420px",
                aspectRatio: "4 / 5",
              }}
            >
              {STATS.map((stat, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={stat.heading}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.87 : 0.72,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.45 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "28px",
                      overflow: "hidden",
                      border: "6px solid white",
                      backgroundColor: "white",
                      transformOrigin: "center center",
                      boxShadow: isActive
                        ? "0 24px 64px rgba(0,0,0,0.12)"
                        : "0 8px 24px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/*
                     * Active card: cycle through all 3 images with a cross-fade.
                     * Inactive cards: show image[0] statically (greyscale + blur).
                     */}
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={isActive ? `${index}-${imageIndex}` : `${index}-static`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        style={{ position: "absolute", inset: 0 }}
                      >
                        <Image
                          src={
                            isActive
                              ? stat.images[imageIndex]
                              : stat.images[0]
                          }
                          alt={stat.heading}
                          fill
                          style={{
                            objectFit: "cover",
                            filter: isActive
                              ? "grayscale(0%) blur(0px)"
                              : "grayscale(100%) blur(2px) brightness(0.75)",
                          }}
                          sizes="420px"
                          priority={index === 0}
                        />
                      </motion.div>
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
