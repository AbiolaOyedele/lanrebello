"use client";

/** Tab-switched section — bento brand cards with modal detail, tech product grid */

import FadeUp from "@/components/ui/FadeUp";
import MotionButton from "@/components/ui/motion-button";
import { useResponsive } from "@/lib/hooks";
import type { BrandCard, TechCard } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const BRANDS: BrandCard[] = [
  {
    name: "Papa's Grill",
    subtitle: "Grilled & Small Chops",
    desc: "Grilled food, small chops, and quick finger foods. Served fast and hot.",
    color: "#BB0A14",
    href: "#",
    image: "/images/brands/papas-grill.jpg",
    logo: "/images/logos/papas-grill.png",
    logoW: 1260,
    logoH: 1521,
    ceo: "Augusta Ike",
    shareholders: [
      { name: "Lanre Bello", role: "Founder" },
    ],
  },
  {
    name: "City Subs",
    subtitle: "Burgers & Subs",
    desc: "Burgers, subs, sandwiches. Quick service that doesn't cut corners.",
    color: "#F3C606",
    href: "#",
    image: "/images/brands/city-subs.jpg",
    logo: "/images/logos/city-subs.png",
    logoW: 2305,
    logoH: 482,
    ceo: "Sola Ososanya",
    shareholders: [
      { name: "Lanre Bello", role: "Founder" },
      { name: "Tife Akinlade", role: "Co-founder" },
      { name: "Demi Odunubi", role: "Co-founder" },
    ],
  },
  {
    name: "Wings Bistro",
    subtitle: "Wings & Loaded Plates",
    desc: "Chicken and turkey wings, loaded fries, casual meals worth a drive.",
    color: "#E74F4C",
    href: "#",
    image: "/images/brands/wings-bistro.jpg",
    logo: "/images/logos/wings-bistro.png",
    logoW: 549,
    logoH: 375,
    ceo: "Dami Asumah",
    shareholders: [
      { name: "Lanre Bello", role: "Founder" },
      { name: "Dami Asumah", role: "Co-Founder" },
      { name: "Quadri Adeniran", role: "Co-founder" },
    ],
  },
  {
    name: "Spicy Corner",
    subtitle: "Rice & Pasta",
    desc: "Rice and pasta meals built around big, unapologetic flavour.",
    color: "#C21E2B",
    href: "#",
    image: "/images/brands/spicy-corner.png",
    logo: "/images/logos/spicy-corner.png",
    logoW: 1500,
    logoH: 785,
    ceo: "Quadri Adeniran",
    shareholders: [
      { name: "Lanre Bello", role: "Founder" },
      { name: "Quadri Adeniran", role: "Co-Founder" },
      { name: "Olajide Olubusayo", role: "Co-founder" },
      { name: "Olajide Ademola", role: "Co-founder" },
    ],
  },
  {
    name: "Ajebo Chops",
    subtitle: "Premium Comfort",
    desc: "Premium comfort meals. Every plate tastes like home, only finer.",
    color: "#FF4F02",
    href: "#",
    image: "/images/brands/ajebo-chops.png",
    logo: "/images/logos/ajebo-chops.png",
    logoW: 1163,
    logoH: 833,
    ceo: "Yvonne Bello",
    shareholders: [
      { name: "Lanre Bello", role: "Founder" },
      { name: "Yvonne Bello", role: "Co-Founder" },
      { name: "Quadri Adeniran", role: "Co-founder" },
      { name: "Dami Asumah", role: "Co-founder" },
    ],
  },
];

const TECH_PRODUCTS: TechCard[] = [
  {
    name: "IPC",
    subtitle: "Parent · Holding",
    desc: "The parent that builds and operates the technology layer for every brand in the group.",
    color: "#07271C",
    href: "#",
    logo: "/images/logos/ipc.png",
    logoW: 3924,
    logoH: 1084,
    ceo: "Victor Nneji",
    team: [
      { name: "Lanre Bello",    role: "Founder"   },
      { name: "Quadri Adeniran", role: "Director"  },
      { name: "Dami Asumah",    role: "Director"   },
    ],
  },
  {
    name: "Daash",
    subtitle: "Restaurant Software",
    desc: "POS, inventory, storefront, menu, loyalty, reporting. Restaurant management in one place.",
    color: "#1C2B3A",
    href: "#",
    logo: "/images/logos/daash.png",
    logoW: 4096,
    logoH: 4096,
    operatedBy: "Held under IPC",
  },
  {
    name: "GoSource",
    subtitle: "Procurement",
    desc: "Procurement and supply chain platform helping restaurants order goods reliably.",
    color: "#0F3D2E",
    href: "#",
    logo: "/images/logos/gosource.png",
    logoW: 729,
    logoH: 399,
    operatedBy: "Held under IPC",
  },
  {
    name: "Find Eat",
    subtitle: "Discovery & Delivery",
    desc: "Food discovery and delivery platform connecting customers with restaurants.",
    color: "#7A1C10",
    href: "#",
    logo: "/images/logos/find-eat.png",
    logoW: 864,
    logoH: 864,
    operatedBy: "Held under IPC",
  },
  {
    name: "Relay",
    subtitle: "Logistics",
    desc: "Delivery and logistics infrastructure integrated with restaurant operations and orders.",
    color: "#1A1A2E",
    href: "#",
    logo: null,
    logoW: 0,
    logoH: 0,
    operatedBy: "Held under IPC",
  },
];

/** Bento column spans per tech card index on a 4-col desktop grid */
const TECH_BENTO_SPANS = [2, 1, 1, 2, 2] as const;

const CONTENT_EASE = [0.25, 0.1, 0.25, 1] as const;
const MODAL_EASE   = [0.76, 0, 0.24, 1] as const;

type TabId = "brands" | "tech";

export default function WhatIBuilt() {
  const [activeTab, setActiveTab] = useState<TabId>("brands");
  const [activeBrand, setActiveBrand] = useState<BrandCard | null>(null);
  const [activeTech, setActiveTech]   = useState<TechCard | null>(null);
  const { isMobile } = useResponsive();

  /** Lock body scroll when any modal is open */
  useEffect(() => {
    document.body.style.overflow = (activeBrand || activeTech) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeBrand, activeTech]);

  return (
    <>
      <section
        id="built"
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
          }}
        >
          {/* Header */}
          <FadeUp delay={0}>
            <div
              style={{
                display: "flex",
                alignItems: isMobile ? "flex-start" : "center",
                justifyContent: "space-between",
                marginBottom: "48px",
                flexWrap: "wrap" as const,
                gap: "24px",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
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
                    What I&apos;ve Built
                  </span>
                </div>
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
                  Five brands. Four products.
                </h2>
              </div>

              {/* Tab switcher */}
              <div
                style={{
                  display: "flex",
                  backgroundColor: "var(--cream-2)",
                  borderRadius: "999px",
                  padding: "4px",
                  gap: "2px",
                }}
              >
                <TabButton
                  label="Food Brands"
                  active={activeTab === "brands"}
                  onClick={() => setActiveTab("brands")}
                />
                <TabButton
                  label="Technology"
                  active={activeTab === "tech"}
                  onClick={() => setActiveTab("tech")}
                />
              </div>
            </div>
          </FadeUp>

          {/* Content area */}
          <AnimatePresence mode="wait">
            {activeTab === "brands" ? (
              <motion.div
                key="brands"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: CONTENT_EASE }}
              >
                <BrandsGrid onSelect={setActiveBrand} />
              </motion.div>
            ) : (
              <motion.div
                key="tech"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: CONTENT_EASE }}
              >
                <TechGrid onSelect={setActiveTech} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Brand detail modal */}
      <AnimatePresence>
        {activeBrand && (
          <BrandModal brand={activeBrand} onClose={() => setActiveBrand(null)} />
        )}
      </AnimatePresence>

      {/* Tech detail modal */}
      <AnimatePresence>
        {activeTech && (
          <TechModal tech={activeTech} onClose={() => setActiveTech(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Tab button ─────────────────────────────────────────────────────────── */

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "13px",
        fontWeight: 500,
        color: active ? "var(--white)" : "#666666",
        backgroundColor: active ? "var(--green-800)" : "transparent",
        border: "none",
        borderRadius: "999px",
        /* 44px minimum touch target */
        minHeight: "44px",
        padding: "10px 20px",
        cursor: "pointer",
        transition: "all 0.25s ease",
      }}
    >
      {label}
    </button>
  );
}

/* ─── Brands bento grid ──────────────────────────────────────────────────── */

/** Derive a very soft tinted background from a brand hex color */
function softBg(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.07)`;
}

function BrandsGrid({ onSelect }: { onSelect: (b: BrandCard) => void }) {
  const { isMobile, isTablet } = useResponsive();

  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: cols,
        gap: isMobile ? "12px" : "16px",
      }}
    >
      {BRANDS.map((brand, i) => (
        <BrandCard
          key={brand.name}
          brand={brand}
          index={i}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function BrandCard({
  brand,
  index,
  onSelect,
}: {
  brand: BrandCard;
  index: number;
  onSelect: (b: BrandCard) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={() => onSelect(brand)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: hovered ? -6 : 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.07 }}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "24px",
        border: "none",
        cursor: "pointer",
        background: "var(--white)",
        padding: "32px 28px 28px",
        textAlign: "left",
        outline: "none",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.1)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* White circle with logo */}
      <motion.div
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "var(--white)",
          border: `0.5px solid ${brand.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          padding: "14px",
          flexShrink: 0,
        }}
      >
        <Image
          src={brand.logo}
          alt={brand.name}
          width={brand.logoW}
          height={brand.logoH}
          style={{
            maxHeight: "44px",
            width: "auto",
            maxWidth: "52px",
            objectFit: "contain",
          }}
        />
      </motion.div>

      {/* Name — brand color */}
      <p
        style={{
          fontFamily: '"Inter Display", system-ui, sans-serif',
          fontSize: "20px",
          fontWeight: 700,
          color: brand.color,
          margin: 0,
          marginBottom: "8px",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}
      >
        {brand.name}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "14px",
          color: "#666666",
          margin: 0,
          lineHeight: 1.65,
        }}
      >
        {brand.desc}
      </p>
    </motion.button>
  );
}

/* ─── Brand modal ────────────────────────────────────────────────────────── */

function BrandModal({ brand, onClose }: { brand: BrandCard; onClose: () => void }) {
  const { isMobile } = useResponsive();

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(7, 39, 28, 0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 1000,
        }}
      />

      {/* Centring wrapper */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1001,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          padding: isMobile ? "16px" : "40px",
        }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.45, ease: MODAL_EASE }}
          style={{
            pointerEvents: "all",
            width: "100%",
            maxWidth: isMobile ? "100%" : "880px",
            maxHeight: isMobile ? "92vh" : "86vh",
            backgroundColor: "var(--white)",
            borderRadius: "28px",
            overflow: "hidden",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            boxShadow: "0 40px 100px rgba(0,0,0,0.32)",
          }}
        >
          {/* ── Left — inset image panel ─────────────────────────────────── */}
          <div
            style={{
              width: isMobile ? "100%" : "44%",
              minHeight: isMobile ? "260px" : "auto",
              flexShrink: 0,
              padding: isMobile ? "12px 12px 0" : "12px 0 12px 12px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: isMobile ? "236px" : "auto",
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#0A0A0A",
              }}
            >
              {/* Animated image */}
              <motion.div
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  style={{ objectFit: "cover", opacity: 0.7 }}
                  sizes="(max-width: 768px) 100vw, 44vw"
                />
              </motion.div>

              {/* Dark gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
                }}
              />

              {/* Logo bottom-left */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "24px",
                }}
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={brand.logoW}
                  height={brand.logoH}
                  style={{
                    maxHeight: "40px",
                    width: "auto",
                    maxWidth: "140px",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* ── Right — text content ─────────────────────────────────────── */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: isMobile ? "28px 20px 28px" : "36px 40px",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {/* Close */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--line)",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  color: "#888888",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* Name + subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ marginBottom: "16px" }}
            >
              <h2
                style={{
                  fontFamily: '"Inter Display", system-ui, sans-serif',
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 700,
                  color: "var(--ink)",
                  margin: 0,
                  marginBottom: "6px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {brand.name}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: brand.color,
                  margin: 0,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {brand.subtitle}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                color: "#666666",
                margin: 0,
                marginBottom: "28px",
                lineHeight: 1.75,
              }}
            >
              {brand.desc}
            </motion.p>

            <div style={{ width: "100%", height: "1px", backgroundColor: "var(--line)", marginBottom: "24px" }} />

            {/* CEO */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ marginBottom: "24px" }}
            >
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#888888", margin: 0, marginBottom: "8px" }}>
                CEO
              </p>
              <p style={{ fontFamily: '"Inter Display", system-ui, sans-serif', fontSize: "16px", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
                {brand.ceo}
              </p>
            </motion.div>

            <div style={{ width: "100%", height: "1px", backgroundColor: "var(--line)", marginBottom: "24px" }} />

            {/* Shareholders */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#888888", margin: 0, marginBottom: "14px" }}>
                Shareholders · {brand.shareholders.length}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {brand.shareholders.map((s) => (
                  <div key={s.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: '"Inter Display", system-ui, sans-serif', fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>
                      {s.name}
                    </span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "#888888", backgroundColor: "var(--cream)", padding: "3px 10px", borderRadius: "999px", border: "1px solid var(--line)" }}>
                      {s.role}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ paddingTop: "28px" }}
            >
              <a href={brand.href} style={{ textDecoration: "none", display: "inline-block" }}>
                <MotionButton label={`Visit ${brand.name}`} color={brand.color} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ─── Tech bento grid ────────────────────────────────────────────────────── */

function TechGrid({ onSelect }: { onSelect: (t: TechCard) => void }) {
  const { isMobile, isTablet } = useResponsive();

  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: cols,
        gap: isMobile ? "12px" : "16px",
      }}
    >
      {TECH_PRODUCTS.map((product, i) => (
        <TechCardItem
          key={product.name}
          product={product}
          index={i}
          colSpan={1}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}


function TechCardItem({
  product,
  index,
  colSpan,
  onSelect,
}: {
  product: TechCard;
  index: number;
  colSpan: number;
  onSelect: (t: TechCard) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={() => onSelect(product)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: hovered ? -6 : 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.07 }}
      style={{
        gridColumn: `span ${colSpan}`,
        display: "flex",
        flexDirection: "column",
        borderRadius: "24px",
        border: "none",
        cursor: "pointer",
        background: "var(--white)",
        padding: "32px 28px 28px",
        textAlign: "left",
        outline: "none",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.1)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* White circle with logo or monogram */}
      <motion.div
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "var(--white)",
          border: `0.5px solid ${product.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          padding: "14px",
          flexShrink: 0,
        }}
      >
        {product.logo ? (
          <Image
            src={product.logo}
            alt={product.name}
            width={product.logoW}
            height={product.logoH}
            style={{
              maxHeight: "44px",
              width: "auto",
              maxWidth: "52px",
              objectFit: "contain",
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: '"Inter Display", system-ui, sans-serif',
              fontSize: "22px",
              fontWeight: 800,
              color: "var(--ink-soft)",
              letterSpacing: "-0.03em",
              userSelect: "none",
            }}
          >
            {product.name[0]}
          </span>
        )}
      </motion.div>

      {/* Name */}
      <p
        style={{
          fontFamily: '"Inter Display", system-ui, sans-serif',
          fontSize: "20px",
          fontWeight: 700,
          color: product.color,
          margin: 0,
          marginBottom: "6px",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}
      >
        {product.name}
      </p>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          color: "#888888",
          margin: 0,
          marginBottom: "12px",
        }}
      >
        {product.subtitle}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "14px",
          color: "#666666",
          margin: 0,
          lineHeight: 1.65,
        }}
      >
        {product.desc}
      </p>
    </motion.button>
  );
}

/* ─── Tech modal ─────────────────────────────────────────────────────────── */

function TechModal({ tech, onClose }: { tech: TechCard; onClose: () => void }) {
  const { isMobile } = useResponsive();

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="tech-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(7, 39, 28, 0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 1000,
        }}
      />

      {/* Centring wrapper */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1001,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          padding: isMobile ? "16px" : "40px",
        }}
      >
        <motion.div
          key="tech-modal"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.45, ease: MODAL_EASE }}
          style={{
            pointerEvents: "all",
            width: "100%",
            maxWidth: isMobile ? "100%" : "800px",
            maxHeight: isMobile ? "92vh" : "86vh",
            backgroundColor: "var(--white)",
            borderRadius: "28px",
            overflow: "hidden",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            boxShadow: "0 40px 100px rgba(0,0,0,0.32)",
          }}
        >
          {/* ── Left — inset dark panel with logo ───────────────────────── */}
          <div
            style={{
              width: isMobile ? "100%" : "42%",
              minHeight: isMobile ? "220px" : "auto",
              flexShrink: 0,
              padding: isMobile ? "12px 12px 0" : "12px 0 12px 12px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: isMobile ? "196px" : "auto",
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#0A0A0A",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Colour glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  bottom: "-60px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "240px",
                  height: "240px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${tech.color}88 0%, transparent 70%)`,
                  filter: "blur(32px)",
                  pointerEvents: "none",
                }}
              />

              {/* Logo or monogram */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ position: "relative", zIndex: 1, padding: "24px" }}
              >
                {tech.logo ? (
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={tech.logoW}
                    height={tech.logoH}
                    style={{
                      maxHeight: "52px",
                      width: "auto",
                      maxWidth: "160px",
                      objectFit: "contain",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: '"Inter Display", system-ui, sans-serif',
                      fontSize: "clamp(48px, 6vw, 72px)",
                      fontWeight: 800,
                      color: "rgba(255,255,255,0.9)",
                      letterSpacing: "-0.04em",
                      userSelect: "none",
                    }}
                  >
                    {tech.name}
                  </span>
                )}
              </motion.div>
            </div>
          </div>

          {/* ── Right — text content ─────────────────────────────────────── */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: isMobile ? "28px 20px 28px" : "36px 40px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Close */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--line)",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  color: "#888888",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* Name + subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ marginBottom: "16px" }}
            >
              <h2
                style={{
                  fontFamily: '"Inter Display", system-ui, sans-serif',
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 700,
                  color: "var(--ink)",
                  margin: 0,
                  marginBottom: "6px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {tech.name}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: tech.color,
                  margin: 0,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {tech.subtitle}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                color: "#666666",
                margin: 0,
                marginBottom: "28px",
                lineHeight: 1.75,
              }}
            >
              {tech.desc}
            </motion.p>

            {/* CEO */}
            {tech.ceo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div style={{ width: "100%", height: "1px", backgroundColor: "var(--line)", marginBottom: "24px" }} />
                <div style={{ marginBottom: "24px" }}>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#888888", margin: 0, marginBottom: "8px" }}>
                    CEO
                  </p>
                  <p style={{ fontFamily: '"Inter Display", system-ui, sans-serif', fontSize: "16px", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
                    {tech.ceo}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Executive team */}
            {tech.team && tech.team.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.34, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div style={{ width: "100%", height: "1px", backgroundColor: "var(--line)", marginBottom: "24px" }} />
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#888888", margin: 0, marginBottom: "14px" }}>
                  Executive Team · {tech.team.length}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {tech.team.map((m) => (
                    <div key={m.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: '"Inter Display", system-ui, sans-serif', fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>
                        {m.name}
                      </span>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "#888888", backgroundColor: "var(--cream)", padding: "3px 10px", borderRadius: "999px", border: "1px solid var(--line)" }}>
                        {m.role}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Operated by */}
            {tech.operatedBy && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div style={{ width: "100%", height: "1px", backgroundColor: "var(--line)", marginBottom: "24px" }} />
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#888888", margin: 0, marginBottom: "8px" }}>
                  Operated By
                </p>
                <p style={{ fontFamily: '"Inter Display", system-ui, sans-serif', fontSize: "16px", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
                  {tech.operatedBy}
                </p>
              </motion.div>
            )}

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ paddingTop: "28px" }}
            >
              <a href={tech.href} style={{ textDecoration: "none", display: "inline-block" }}>
                <MotionButton label={`Visit ${tech.name}`} color={tech.color} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
