"use client";

/** Full-width typographic quote with scroll-triggered text reveal per line */

import FadeIn from "@/components/ui/FadeIn";
import TextReveal from "@/components/ui/TextReveal";
import { useResponsive } from "@/lib/hooks";

export default function InsightQuote() {
  const { isMobile } = useResponsive();

  return (
    <section
      style={{
        backgroundColor: "var(--white)",
        padding: isMobile ? "100px 0" : "160px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: isMobile ? "0 24px" : "0 60px",
        }}
      >
        {/* Attribution */}
        <FadeIn delay={0}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "#888888",
              marginBottom: "24px",
            }}
          >
            — Lanre Bello
          </p>
        </FadeIn>

        {/* Line 1 */}
        <TextReveal delay={0.1}>
          <p
            style={{
              fontFamily: '"Inter Display", system-ui, sans-serif',
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              fontWeight: 400,
              margin: 0,
              marginBottom: "8px",
            }}
          >
            Many food businesses don&apos;t struggle because they lack passion.
          </p>
        </TextReveal>

        {/* Line 2 */}
        <TextReveal delay={0.25}>
          <p
            style={{
              fontFamily: '"Inter Display", system-ui, sans-serif',
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              fontWeight: 400,
              margin: 0,
            }}
          >
            They struggle because they lack structure.
          </p>
        </TextReveal>
      </div>
    </section>
  );
}
