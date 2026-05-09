"use client";

/** Dark footer with 4-column grid, links, and copyright */

import { useResponsive } from "@/lib/hooks";
import Link from "next/link";

const FOOTER_COLS = [
  {
    heading: "The group",
    links: [
      { label: "Food brands", href: "#built" },
      { label: "Technology products", href: "#built" },
      { label: "Procurement", href: "#ecosystem" },
      { label: "Logistics", href: "#ecosystem" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Founder's Story", href: "/founder" },
      { label: "Shareholders", href: "#governance" },
      { label: "Governance", href: "#governance" },
      { label: "Insights · soon", href: "#" },
    ],
  },
  {
    heading: "For investors",
    links: [
      { label: "Notify me · soon", href: "#investors" },
      { label: "Data room · soon", href: "#investors" },
      { label: "Get in touch", href: "#contact" },
    ],
  },
] as const;

export default function Footer() {
  const { isMobile } = useResponsive();

  return (
    <footer
      id="contact"
      style={{
        backgroundColor: "var(--green-900)",
        padding: isMobile ? "60px 0 24px" : "80px 0 32px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "0 24px" : "0 60px",
        }}
      >
        {/* 4-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1.5fr 1fr 1fr 1fr",
            gap: isMobile ? "36px 24px" : "48px",
            marginBottom: isMobile ? "48px" : "64px",
          }}
        >
          {/* Col 1 — Logo + about */}
          <div style={{ gridColumn: isMobile ? "1 / -1" : undefined }}>
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  fontFamily: '"Inter Display", system-ui, sans-serif',
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--white)",
                  margin: 0,
                  marginBottom: "4px",
                }}
              >
                Lanre Bello
              </p>
              <p
                style={{
                  fontFamily: '"Inter Display", system-ui, sans-serif',
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                }}
              >
                Building the FoodTech Ecosystem
              </p>
            </div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                margin: 0,
                maxWidth: "280px",
              }}
            >
              From one restaurant in 2016 to a connected group of food brands
              and technology businesses. Operating in Lagos and Abuja.
            </p>
          </div>

          {/* Cols 2–4 */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.35)",
                  margin: 0,
                  marginBottom: "20px",
                }}
              >
                {col.heading}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "24px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? "8px" : "0",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.25)",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Lanre Bello. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.25)",
              margin: 0,
            }}
          >
            lanrebello.com
          </p>
        </div>
      </div>
    </footer>
  );
}
