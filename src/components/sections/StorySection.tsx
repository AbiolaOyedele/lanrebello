"use client";

/** Two-column founder story section with scroll-triggered FadeUp animations */

import FadeUp from "@/components/ui/FadeUp";
import { useResponsive } from "@/lib/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function StorySection() {
  const { isMobile } = useResponsive();

  return (
    <section
      id="story"
      style={{
        backgroundColor: "var(--cream)",
        padding: isMobile ? "80px 0" : "120px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "0 24px" : "0 60px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "48px" : "80px",
          alignItems: "center",
        }}
      >
        <LeftColumn />
        <RightColumn />
      </div>
    </section>
  );
}

function LeftColumn() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Eyebrow */}
      <FadeUp delay={0}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "24px",
              height: "2px",
              backgroundColor: "var(--green-800)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "var(--green-800)",
            }}
          >
            The story
          </span>
        </div>
      </FadeUp>

      {/* Heading */}
      <FadeUp delay={0.1}>
        <h2
          style={{
            fontFamily: '"Inter Display", system-ui, sans-serif',
            fontSize: "clamp(40px, 5vw, 58px)",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "var(--ink)",
            margin: 0,
          }}
        >
          It began in 2016, with one restaurant.
        </h2>
      </FadeUp>

      {/* Body paragraphs */}
      <FadeUp delay={0.2}>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "18px",
            color: "var(--muted)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          I had just graduated from Royal Holloway. I had more ambition than
          certainty. I didn&apos;t have a perfect plan. But I had a strong
          feeling that I wanted to build something real.
        </p>
      </FadeUp>

      <FadeUp delay={0.3}>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "18px",
            color: "var(--muted)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Papa&apos;s Grill was my first serious step into that world. I thought
          I was building a restaurant. In truth, I was learning how to build a
          company.
        </p>
      </FadeUp>

      {/* CTA */}
      <FadeUp delay={0.4}>
        <StoryLink />
      </FadeUp>
    </div>
  );
}

function StoryLink() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="/founder"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ x: hovered ? 4 : 0 }}
      transition={{ duration: 0.25 }}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "15px",
        fontWeight: 500,
        color: "var(--green-800)",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      Read the full story →
    </motion.a>
  );
}

function RightColumn() {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeUp delay={0.2}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          aspectRatio: "4 / 5",
          borderRadius: "24px",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "var(--cream-2)",
        }}
      >
        <Image
          src="/images/hero-main.jpg"
          alt="Lanre Bello"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 1280px) 50vw, 640px"
        />
      </motion.div>
    </FadeUp>
  );
}
