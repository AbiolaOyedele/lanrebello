"use client";

/** Homepage — orchestrates loader → nav + hero entrance, then all sections */

import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import Ecosystem from "@/components/sections/Ecosystem";
import Governance from "@/components/sections/Governance";
import Hero from "@/components/sections/Hero";
import InsightQuote from "@/components/sections/InsightQuote";
import InvestorCTA from "@/components/sections/InvestorCTA";
import Traction from "@/components/sections/Traction";
import StorySection from "@/components/sections/StorySection";
import WhatIBuilt from "@/components/sections/WhatIBuilt";
import Loader from "@/components/ui/Loader";
import { useState } from "react";

export default function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaderDone(true)} />
      <Nav loaderDone={loaderDone} />
      <main>
        <Hero loaderDone={loaderDone} />
        <StorySection />
        <InsightQuote />
        <WhatIBuilt />
        <Traction />
        <Ecosystem />
        <Governance />
        <InvestorCTA />
      </main>
      <Footer />
    </>
  );
}
