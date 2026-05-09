"use client";

/** Floating pill navigation — expands into a dropdown card on menu open */

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useResponsive } from "@/lib/hooks";

interface NavProps {
  loaderDone: boolean;
}

const NAV_LINKS = [
  { label: "The Story", href: "#story" },
  { label: "What I've Built", href: "#built" },
  { label: "The Ecosystem", href: "#ecosystem" },
  { label: "Governance", href: "#governance" },
  { label: "Contact", href: "#contact" },
];

const OVERLAY_LINKS = [
  { label: "The Story", href: "#story" },
  { label: "What I've Built", href: "#built" },
  { label: "The Ecosystem", href: "#ecosystem" },
  { label: "Governance", href: "#governance" },
  { label: "For Investors", href: "#investors" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
];

const ENTRANCE_EASE = [0.25, 0.1, 0.25, 1] as const;
const DROPDOWN_EASE = [0.76, 0, 0.24, 1] as const;

export default function Nav({ loaderDone }: NavProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const { isMobile } = useResponsive();

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.7, ease: ENTRANCE_EASE, delay: 0.1 }}
        style={{
          position: "fixed",
          top: "20px",
          left: 0,
          right: 0,
          margin: "0 auto",
          width: "calc(100% - 64px)",
          maxWidth: "660px",
          zIndex: 100,
        }}
      >
        <div
          style={{
            position: "relative",
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px",
            height: "58px",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "background 0.3s ease",
          }}
        >
          {/* Left — logo */}
          <div style={{ flex: 1 }}>
            <Link href="/" style={{ textDecoration: "none", lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: '"Inter Display", system-ui, sans-serif',
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--white)",
                  whiteSpace: "nowrap",
                }}
              >
                Lanre Bello
              </span>
            </Link>
          </div>

          {/* Center — links (hidden on mobile, use dropdown instead) */}
          {!isMobile && (
            <nav style={{ display: "flex", gap: "20px" }}>
              {NAV_LINKS.map((link) => (
                <NavLinkItem key={link.label} href={link.href} label={link.label} />
              ))}
            </nav>
          )}

          {/* Right — grid button */}
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <GridButton onClick={() => setOverlayOpen(true)} />
          </div>
        </div>
      </motion.header>

      {/* Dropdown overlay — same width/position as nav, expands downward */}
      <AnimatePresence>
        {overlayOpen && (
          <DropdownMenu onClose={() => setOverlayOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function NavLinkItem({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      initial={false}
      whileHover={{ color: "rgba(255,255,255,1)" }}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        color: "rgba(255,255,255,0.6)",
        textDecoration: "none",
        transition: "color 0.2s ease",
      }}
    >
      {label}
    </motion.a>
  );
}

function GridButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "4px",
        display: "grid",
        gridTemplateColumns: "repeat(2, 5px)",
        gridTemplateRows: "repeat(2, 5px)",
        gap: "4px",
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "1px",
            background: "rgba(255,255,255,0.8)",
          }}
        />
      ))}
    </button>
  );
}

function DropdownMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="dropdown"
      initial={{ clipPath: "inset(0 0 100% 0 round 14px)", opacity: 1 }}
      animate={{ clipPath: "inset(0 0 0% 0 round 14px)" }}
      exit={{ clipPath: "inset(0 0 100% 0 round 14px)" }}
      transition={{ duration: 0.55, ease: DROPDOWN_EASE }}
      style={{
        position: "fixed",
        top: "20px",
        left: 0,
        right: 0,
        margin: "0 auto",
        width: "calc(100% - 64px)",
        maxWidth: "660px",
        zIndex: 500,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top bar — mirrors the nav */}
      <div
        style={{
          height: "58px",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span
          style={{
            fontFamily: '"Inter Display", system-ui, sans-serif',
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--white)",
          }}
        >
          Lanre Bello
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "grid",
            gridTemplateColumns: "repeat(2, 5px)",
            gridTemplateRows: "repeat(2, 5px)",
            gap: "4px",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "1px",
                background: "rgba(255,255,255,0.8)",
              }}
            />
          ))}
        </button>
      </div>

      {/* Nav links */}
      <nav
        style={{
          padding: "32px 28px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {OVERLAY_LINKS.map((link, i) => (
          <DropdownLink key={link.label} href={link.href} label={link.label} index={i} onClose={onClose} />
        ))}
      </nav>

      {/* Bottom row */}
      <div
        style={{
          padding: "20px 28px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ display: "flex", gap: "24px" }}>
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
        <LiveClock />
      </div>
    </motion.div>
  );
}

function DropdownLink({
  href,
  label,
  index,
  onClose,
}: {
  href: string;
  label: string;
  index: number;
  onClose: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      onClick={onClose}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.15 + index * 0.05,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        fontFamily: '"Inter Display", system-ui, sans-serif',
        fontSize: "clamp(16px, 2.25vw, 28px)",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "-0.01em",
        color: hovered ? "rgba(255,255,255,0.45)" : "var(--white)",
        textDecoration: "none",
        lineHeight: 1.15,
        display: "block",
        transition: "color 0.2s ease",
      }}
    >
      {label}
    </motion.a>
  );
}

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const t = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Africa/Lagos",
      }).format(new Date());
      setTime(`${t} LAG`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.35)",
      }}
    >
      {time}
    </span>
  );
}
