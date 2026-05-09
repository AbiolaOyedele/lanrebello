"use client";

/** Investor call-to-action section with coming-soon badge and two CTA buttons */

import FadeUp from "@/components/ui/FadeUp";
import { useResponsive } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useState } from "react";

export default function InvestorCTA() {
  const { isMobile } = useResponsive();

  return (
    <section
      id="investors"
      style={{
        backgroundColor: "var(--white)",
        borderTop: "1px solid var(--line)",
        padding: isMobile ? "72px 0" : "100px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "0 24px" : "0 60px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
          gap: isMobile ? "40px" : "80px",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <FadeUp delay={0}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "var(--cream-2)",
            borderRadius: "999px",
            padding: "5px 14px",
            width: "fit-content",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--gold)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--ink-soft)",
            }}
          >
            Coming soon
          </span>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <h2
          style={{
            fontFamily: '"Inter Display", system-ui, sans-serif',
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 700,
            color: "var(--ink)",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          The investor data room
          <br />
          is being prepared.
        </h2>
      </FadeUp>

      <FadeUp delay={0.2}>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "17px",
            color: "var(--muted)",
            lineHeight: 1.7,
            margin: 0,
            maxWidth: "480px",
          }}
        >
          We&apos;re putting together the full picture — financials, structure,
          brand performance, and growth plans. If you&apos;re a serious investor
          exploring the Nigerian foodtech space, get notified when it launches.
        </p>
      </FadeUp>
    </div>
  );
}

function RightColumn() {
  return (
    <FadeUp delay={0.25}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <PrimaryButton />
        <SecondaryButton />
      </div>
    </FadeUp>
  );
}

function PrimaryButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="#contact"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ backgroundColor: hovered ? "#333333" : "#000000" }}
      transition={{ duration: 0.25 }}
      style={{
        display: "block",
        padding: "16px 28px",
        borderRadius: "999px",
        backgroundColor: "#000000",
        color: "var(--white)",
        fontFamily: "var(--font-inter)",
        fontSize: "15px",
        fontWeight: 500,
        textDecoration: "none",
        textAlign: "center" as const,
      }}
    >
      Notify me when it&apos;s live →
    </motion.a>
  );
}

function SecondaryButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="#contact"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        borderColor: hovered ? "var(--ink)" : "var(--line)",
        color: hovered ? "var(--ink)" : "var(--ink-soft)",
      }}
      transition={{ duration: 0.25 }}
      style={{
        display: "block",
        padding: "16px 28px",
        borderRadius: "999px",
        border: "1px solid var(--line)",
        color: "var(--ink-soft)",
        fontFamily: "var(--font-inter)",
        fontSize: "15px",
        fontWeight: 500,
        textDecoration: "none",
        textAlign: "center" as const,
      }}
    >
      Get in touch
    </motion.a>
  );
}
