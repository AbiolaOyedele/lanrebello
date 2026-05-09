"use client";

/** Tab-switched section showing food brands and technology products */

import FadeUp from "@/components/ui/FadeUp";
import ImageReveal from "@/components/ui/image-tiles";
import { useResponsive } from "@/lib/hooks";
import type { BrandCard, TechCard } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const BRANDS: BrandCard[] = [
  {
    name: "Papa's Grill",
    tag: "The beginning. Where the discipline came from.",
    color: "#C8102E",
    image: "/images/brands/papas-grill.jpg",
  },
  {
    name: "City Subs",
    tag: "A second statement. Same hunger, new product.",
    color: "#0F3D2E",
    image: "/images/brands/city-subs.jpg",
  },
  {
    name: "Wings Bistro",
    tag: "Focus and product experience.",
    color: "#1A1A2E",
    image: "/images/brands/wings-bistro.jpg",
  },
  {
    name: "Spicy Corner",
    tag: "Understanding local taste.",
    color: "#E85D04",
    image: "/images/brands/spicy-corner.png",
  },
  {
    name: "Ajebo Chops",
    tag: "Humility, patience, fresh thinking.",
    color: "#1A5D44",
    image: "/images/brands/ajebo-chops.png",
  },
];

const TECH_PRODUCTS: TechCard[] = [
  {
    name: "Daash",
    desc: "Visibility and control across sales, inventory, orders, and operations.",
    tag: "Operations",
  },
  {
    name: "GoSource",
    desc: "Procurement infrastructure for food businesses.",
    tag: "Procurement",
  },
  {
    name: "Find Eat",
    desc: "Connecting customers with good food, helping restaurants find more demand.",
    tag: "Discovery",
  },
  {
    name: "Relay",
    desc: "Delivery and logistics integrated with restaurant operations.",
    tag: "Logistics",
  },
];

const CONTENT_EASE = [0.25, 0.1, 0.25, 1] as const;

type TabId = "brands" | "tech";

export default function WhatIBuilt() {
  const [activeTab, setActiveTab] = useState<TabId>("brands");
  const { isMobile } = useResponsive();

  return (
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
                id="brands"
                label="Food Brands"
                active={activeTab === "brands"}
                onClick={() => setActiveTab("brands")}
              />
              <TabButton
                id="tech"
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
              <BrandsGrid />
            </motion.div>
          ) : (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: CONTENT_EASE }}
            >
              <TechGrid />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  id?: TabId;
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
        color: active ? "var(--white)" : "var(--muted)",
        backgroundColor: active ? "var(--green-800)" : "transparent",
        border: "none",
        borderRadius: "999px",
        padding: "8px 20px",
        cursor: "pointer",
        transition: "all 0.25s ease",
      }}
    >
      {label}
    </button>
  );
}

function BrandsGrid() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 0",
      }}
    >
      <ImageReveal
        images={[
          BRANDS[0].image,
          BRANDS[1].image,
          BRANDS[2].image,
          BRANDS[3].image,
          BRANDS[4].image,
        ]}
      />
    </div>
  );
}


function TechGrid() {
  const { isMobile } = useResponsive();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* IPC parent card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          backgroundColor: "var(--white)",
          borderRadius: "20px",
          border: "1px solid var(--line)",
          padding: isMobile ? "24px" : "36px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "260px 1fr",
          gap: isMobile ? "20px" : "40px",
          alignItems: "center",
        }}
      >
        {!isMobile && (
          <div
            style={{
              aspectRatio: "1 / 1",
              backgroundColor: "var(--green-900)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: '"Inter Display", system-ui, sans-serif',
                fontSize: "48px",
                color: "var(--gold)",
              }}
            >
              IPC
            </span>
          </div>
        )}
        <div>
          <div
            style={{
              display: "inline-block",
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: "var(--green-700)",
              backgroundColor: "var(--green-50)",
              padding: "4px 12px",
              borderRadius: "999px",
              marginBottom: "16px",
            }}
          >
            Parent Company
          </div>
          <h3
            style={{
              fontFamily: '"Inter Display", system-ui, sans-serif',
              fontSize: "32px",
              fontWeight: 700,
              color: "var(--ink)",
              margin: 0,
              marginBottom: "12px",
            }}
          >
            Integrated Platforms Company
          </h3>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              color: "var(--muted)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Born from lived experience — not theory. IPC is the technology arm
            that builds products for food businesses, informed by running five
            of them.
          </p>
        </div>
      </motion.div>

      {/* 4 tech product cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {TECH_PRODUCTS.map((product, i) => (
          <TechCardItem key={product.name} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}

function TechCardItem({ product, index }: { product: TechCard; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 + index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        backgroundColor: "var(--white)",
        borderRadius: "20px",
        border: `1px solid ${hovered ? "var(--green-700)" : "var(--line)"}`,
        padding: "28px",
        y: hovered ? -4 : 0,
        cursor: "pointer",
        transition: "border-color 0.25s ease",
      } as React.CSSProperties}
    >
      <div
        style={{
          display: "inline-block",
          fontFamily: "var(--font-inter)",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color: "var(--green-700)",
          backgroundColor: "var(--green-50)",
          padding: "3px 10px",
          borderRadius: "999px",
          marginBottom: "16px",
        }}
      >
        {product.tag}
      </div>
      <h4
        style={{
          fontFamily: '"Inter Display", system-ui, sans-serif',
          fontSize: "24px",
          fontWeight: 700,
          color: "var(--ink)",
          margin: 0,
          marginBottom: "10px",
        }}
      >
        {product.name}
      </h4>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "14px",
          color: "var(--muted)",
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {product.desc}
      </p>
    </motion.div>
  );
}
