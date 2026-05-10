"use client";

/** Two-card ecosystem section showing food brands and tech products as two connected sides */

import FadeUp from "@/components/ui/FadeUp";
import { useResponsive } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useState } from "react";

const FOOD_BRANDS = [
  "Papa's Grill",
  "City Subs",
  "Wings Bistro",
  "Spicy Corner",
  "Ajebo Chops",
];

const TECH_PRODUCTS = ["Daash", "GoSource", "Find Eat", "Relay"];

export default function Ecosystem() {
  const { isMobile } = useResponsive();

  return (
    <section
      id="ecosystem"
      style={{
        backgroundColor: "var(--white)",
        padding: isMobile ? "80px 0" : "120px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "0 24px" : "0 60px",
        }}
      >
        {/* Header */}
        <FadeUp delay={0}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "2px", backgroundColor: "var(--green-800)" }} />
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
                The Ecosystem
              </span>
            </div>
            <h2
              style={{
                fontFamily: '"Inter Display", system-ui, sans-serif',
                fontSize: "clamp(36px, 5vw, 58px)",
                fontWeight: 700,
                color: "var(--ink)",
                margin: 0,
                marginBottom: "20px",
                lineHeight: 1.05,
              }}
            >
              Two sides. One ecosystem.
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "17px",
              color: "#666666",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: 0,
              marginBottom: "56px",
            }}
          >
            The food brands inform the products. The products serve food
            businesses across the market. Each side strengthens the other.
          </p>
        </FadeUp>

        {/* Two cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "24px",
          }}
        >
          <FadeUp delay={0.2}>
            <EcosystemCard side="A" />
          </FadeUp>
          <FadeUp delay={0.3}>
            <EcosystemCard side="B" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function EcosystemCard({ side }: { side: "A" | "B" }) {
  const [hovered, setHovered] = useState(false);
  const { isMobile } = useResponsive();
  const isDark = side === "B";

  const items = side === "A" ? FOOD_BRANDS : TECH_PRODUCTS;
  const dotColor = isDark ? "var(--gold)" : "var(--green-700)";
  const textColor = isDark ? "var(--white)" : "var(--ink-soft)";
  const labelColor = isDark ? "var(--gold)" : "#888888";
  const titleColor = isDark ? "var(--white)" : "var(--ink)";
  const bg = isDark ? "var(--green-900)" : "var(--cream)";
  const borderAccent = isDark ? "rgba(184,150,90,0.4)" : "var(--green-700)";

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: hovered ? -4 : 0,
        borderColor: hovered ? borderAccent : isDark ? "transparent" : "var(--line)",
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        backgroundColor: bg,
        borderRadius: "24px",
        padding: isMobile ? "28px" : "44px",
        border: `1px solid ${isDark ? "transparent" : "var(--line)"}`,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: labelColor,
          marginBottom: "12px",
        }}
      >
        Side {side}
      </p>
      <h3
        style={{
          fontFamily: '"Inter Display", system-ui, sans-serif',
          fontSize: "32px",
          fontWeight: 700,
          color: titleColor,
          margin: 0,
          marginBottom: "32px",
          lineHeight: 1.1,
        }}
      >
        {side === "A" ? "Food brands" : "Technology products"}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: dotColor,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "15px",
                fontWeight: 500,
                color: textColor,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
