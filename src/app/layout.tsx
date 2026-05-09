import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://lanrebello.com"),
  title: {
    default: "Lanre Bello — Building the FoodTech Ecosystem",
    template: "%s · Lanre Bello",
  },
  description:
    "Founder portfolio site for Lanre Bello, Nigerian foodtech founder. Five food brands, four tech products, one ecosystem in motion.",
  keywords: [
    "Lanre Bello",
    "FoodTech",
    "Nigerian founder",
    "Papa's Grill",
    "IPC",
    "Integrated Platforms Company",
    "Lagos",
    "Abuja",
  ],
  authors: [{ name: "Lanre Bello" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://lanrebello.com",
    siteName: "Lanre Bello",
    title: "Lanre Bello — Building the FoodTech Ecosystem",
    description:
      "From one restaurant in 2016 to a connected group of food brands and technology businesses. Operating in Lagos and Abuja.",
    images: [
      {
        url: "/images/hero-main.jpg",
        width: 1200,
        height: 630,
        alt: "Lanre Bello",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lanre Bello — Building the FoodTech Ecosystem",
    description:
      "From one restaurant in 2016 to a connected group of food brands and technology businesses.",
    images: ["/images/hero-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preload" href="/fonts/InterDisplay-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/InterDisplay-Medium.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/InterDisplay-SemiBold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/InterDisplay-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
