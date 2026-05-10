"use client";

/** Footer — Arlo-inspired: bordered grid top, oversized wordmark bottom */

import FadeIn from "@/components/ui/FadeIn";
import FadeUp from "@/components/ui/FadeUp";
import { useResponsive } from "@/lib/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

/** Food brand logos — real assets available */
const FOOD_LOGOS = [
  { name: "Papa's Grill",   src: "/images/logos/papas-grill.png",  w: 1260, h: 1521 },
  { name: "City Subs",      src: "/images/logos/city-subs.png",    w: 2305, h: 482  },
  { name: "Wings Bistro",   src: "/images/logos/wings-bistro.png", w: 549,  h: 375  },
  { name: "Spicy Corner",   src: "/images/logos/spicy-corner.png", w: 1500, h: 785  },
  { name: "Ajebo Chops",    src: "/images/logos/ajebo-chops.png",  w: 1163, h: 833  },
] as const;

/** Tech product logos */
const TECH_LOGOS = [
  { name: "IPC",       src: "/images/logos/ipc.png",       w: 3924, h: 1084 },
  { name: "Daash",     src: "/images/logos/daash.png",     w: 4096, h: 4096 },
  { name: "GoSource",  src: "/images/logos/gosource.png",  w: 729,  h: 399  },
  { name: "Find Eat",  src: "/images/logos/find-eat.png",  w: 864,  h: 864  },
] as const;

/** Relay has no logo yet — shown as a text chip */
const RELAY_CHIP = "Relay";

const LINKS = [
  { label: "The Story", href: "/founder" },
  { label: "For Investors", href: "#investors" },
  { label: "What I've Built", href: "#built" },
  { label: "Governance", href: "#governance" },
  { label: "Contact", href: "#contact" },
];


export default function Footer() {
  const { isMobile } = useResponsive();

  return (
    <footer
      id="contact"
      style={{
        backgroundColor: "var(--white)",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* ── Top section ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "5fr 7fr",
          borderBottom: "1px solid var(--line)",
        }}
      >
        {/* Left — logos + tagline */}
        <FadeUp>
          <div
            style={{
              padding: isMobile ? "48px 24px" : "56px 60px",
              borderRight: isMobile ? "none" : "1px solid var(--line)",
              borderBottom: isMobile ? "1px solid var(--line)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            {/* Food brand logos */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
              {FOOD_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    backgroundColor: "var(--white)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.w}
                    height={logo.h}
                    style={{
                      height: "28px",
                      width: "auto",
                      maxWidth: "32px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Tech product logos */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
              {TECH_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    backgroundColor: "var(--white)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.w}
                    height={logo.h}
                    style={{
                      height: "28px",
                      width: "auto",
                      maxWidth: "32px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
              <LogoChip label={RELAY_CHIP} />
            </div>

            {/* Tagline */}
            <h2
              style={{
                fontFamily: '"Inter Display", system-ui, sans-serif',
                fontSize: "clamp(22px, 2.8vw, 34px)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                margin: 0,
                maxWidth: "380px",
              }}
            >
              Building the{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--green-700)",
                }}
              >
                FoodTech Ecosystem.
              </em>
            </h2>
          </div>
        </FadeUp>

        {/* Right — link grid */}
        <FadeUp delay={0.1}>
          <div
            style={{
              padding: isMobile ? "48px 24px" : "56px 60px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
                gap: "0",
                width: "100%",
              }}
            >
              {LINKS.map((link, i) => (
                <FooterLink key={link.label} label={link.label} href={link.href} index={i} isMobile={isMobile} />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ── Bottom — wordmark ── */}
      <FadeIn delay={0.2}>
        <div
          style={{
            position: "relative",
            padding: isMobile ? "0 24px 32px" : "0 60px 40px",
            overflow: "hidden",
          }}
        >
          {/* Social icons — top right */}
          <div
            style={{
              position: "absolute",
              top: "28px",
              right: isMobile ? "24px" : "60px",
              display: "flex",
              gap: "12px",
              zIndex: 1,
            }}
          >
            <SocialIcon href="#" label="Instagram">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="11.5" cy="4.5" r="0.8" fill="currentColor" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#" label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 6h2v7H3zM4 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM7 6h1.9v1h.02C9.24 6.47 10.1 6 11.2 6 13.2 6 14 7.2 14 9.2V13h-2V9.5c0-.8-.3-1.5-1.1-1.5-.8 0-1.2.6-1.2 1.5V13H7V6z" fill="currentColor" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#" label="Twitter / X">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12.6 2h2.1L9.9 7.4 15.5 14h-4.2l-3.5-4.5L4 14H1.9l5.2-5.8L1.5 2h4.3L9 6.1 12.6 2z" fill="currentColor" />
              </svg>
            </SocialIcon>
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontFamily: '"Inter Display", system-ui, sans-serif',
              fontSize: "clamp(120px, 19vw, 280px)",
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "var(--green-900)",
              userSelect: "none",
              marginTop: isMobile ? "72px" : "20px",
            }}
          >
            Lanre Bello
          </div>

          {/* Copyright — bottom right */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#888888",
                margin: 0,
                textAlign: "right",
                lineHeight: 1.8,
              }}
            >
              All rights reserved.
              <br />
              © {new Date().getFullYear()} Lanre Bello.
            </p>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}

function LogoChip({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: "5px 12px",
        borderRadius: "999px",
        border: "1px solid var(--line)",
        fontFamily: "var(--font-inter)",
        fontSize: "11px",
        fontWeight: 500,
        color: "var(--ink-soft)",
        whiteSpace: "nowrap",
        letterSpacing: "0.01em",
        backgroundColor: "var(--cream)",
      }}
    >
      {label}
    </div>
  );
}

function FooterLink({
  label,
  href,
  index,
  isMobile,
}: {
  label: string;
  href: string;
  index: number;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  /** Column count depends on breakpoint */
  const cols = isMobile ? 2 : 3;
  const isLastRow = index >= LINKS.length - (LINKS.length % cols || cols);
  const isLastCol = index % cols === cols - 1;

  return (
    <motion.a
      href={href}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        /* 44px minimum touch target via vertical padding */
        padding: "20px 0",
        borderBottom: isLastRow ? "none" : "1px solid var(--line)",
        borderRight: isLastCol ? "none" : "1px solid var(--line)",
        paddingLeft: (index % cols !== 0) ? (isMobile ? "16px" : "24px") : "0",
        paddingRight: isLastCol ? "0" : (isMobile ? "16px" : "24px"),
        fontFamily: "var(--font-inter)",
        fontSize: "13px",
        fontWeight: 500,
        color: hovered ? "var(--ink)" : "#888888",
        textDecoration: "none",
        transition: "color 0.2s ease",
        cursor: "pointer",
      }}
    >
      <span>{label}</span>
      <motion.span
        animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ fontSize: "14px", lineHeight: 1 }}
      >
        ↗
      </motion.span>
    </motion.a>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      aria-label={label}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -2 : 0 }}
      transition={{ duration: 0.2 }}
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hovered ? "var(--ink)" : "#888888",
        textDecoration: "none",
        transition: "color 0.2s ease",
      }}
    >
      {children}
    </motion.a>
  );
}
