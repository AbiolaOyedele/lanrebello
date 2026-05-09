"use client";

/** Dark governance section with two-column layout and animated principle rows */

import FadeUp from "@/components/ui/FadeUp";
import { useResponsive } from "@/lib/hooks";
import type { Principle } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";

const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Clear ownership per brand",
    body: "Every brand has named shareholders, not vague structures.",
  },
  {
    number: "02",
    title: "Real operating discipline",
    body: "Branches, products, and units run on regular reporting, not gut feel.",
  },
  {
    number: "03",
    title: "Shared infrastructure",
    body: "Procurement, logistics, and software serve every brand in the group.",
  },
  {
    number: "04",
    title: "Built to be reviewed",
    body: "Documentation, structure, and governance ready for serious conversations.",
  },
];

export default function Governance() {
  const { isMobile } = useResponsive();

  return (
    <section
      id="governance"
      style={{
        backgroundColor: "var(--green-900)",
        padding: isMobile ? "80px 0" : "130px 0",
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
          alignItems: "start",
        }}
      >
        <LeftColumn />
        <RightColumn />
      </div>
    </section>
  );
}

function LeftColumn() {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <FadeUp delay={0}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "24px", height: "2px", backgroundColor: "var(--gold)" }} />
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "var(--gold)",
            }}
          >
            Governance
          </span>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <h2
          style={{
            fontFamily: '"Inter Display", system-ui, sans-serif',
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 700,
            color: "var(--white)",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Built with structure.
          <br />
          Not just ambition.
        </h2>
      </FadeUp>

      <FadeUp delay={0.2}>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "17px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Every business in the group is structured for accountability. We
          operate with clear ownership, disciplined reporting, and shared
          infrastructure — because serious growth demands serious foundations.
        </p>
      </FadeUp>

      <FadeUp delay={0.3}>
        <motion.a
          href="#investors"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{
            backgroundColor: hovered ? "var(--white)" : "transparent",
            color: hovered ? "var(--green-900)" : "var(--white)",
          }}
          transition={{ duration: 0.25 }}
          style={{
            display: "inline-block",
            padding: "12px 28px",
            borderRadius: "999px",
            border: "1px solid var(--gold)",
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
            fontWeight: 500,
            textDecoration: "none",
            width: "fit-content",
          }}
        >
          For investors →
        </motion.a>
      </FadeUp>
    </div>
  );
}

function RightColumn() {
  return (
    <FadeUp delay={0.15}>
      <div>
        {PRINCIPLES.map((p, i) => (
          <PrincipleRow key={p.number} principle={p} index={i} />
        ))}
      </div>
    </FadeUp>
  );
}

function PrincipleRow({ principle }: { principle: Principle; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ x: hovered ? 6 : 0 }}
      transition={{ duration: 0.25 }}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "24px 0",
        display: "flex",
        gap: "20px",
        cursor: "default",
      }}
    >
      <span
        style={{
          fontFamily: '"Inter Display", system-ui, sans-serif',
          fontSize: "13px",
          color: "var(--gold)",
          width: "28px",
          flexShrink: 0,
          paddingTop: "2px",
        }}
      >
        {principle.number}
      </span>
      <div>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "16px",
            fontWeight: 500,
            color: "var(--white)",
            margin: 0,
            marginBottom: "6px",
          }}
        >
          {principle.title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
            color: "rgba(255,255,255,0.45)",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {principle.body}
        </p>
      </div>
    </motion.div>
  );
}
