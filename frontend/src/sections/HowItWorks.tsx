"use client";

import { Box, Settings, Sparkles, Microscope, Stethoscope } from "lucide-react";
import { GlowingEffect } from "~/components/ui/glowing-effect";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Features() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-[#d78451] to-[#000000] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-[#804718] to-[#000000] text-transparent bg-clip-text">
            Powerful Analysis Tools
          </h2>
          <p className="section-description">
            Unlock groundbreaking insights with tools built to accelerate research and detect diseases early.
          </p>
        </div>

        <motion.div 
          className="mt-6"
          style={{ y: translateY }}
        >
          <GlowingEffectDemo />
        </motion.div>
      </div>
    </section>
  );
}

function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-[#ff734d]" />}
        title="Predictive Analysis"
        description="Identify potential genetic risks before they manifest into clinical symptoms."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-[#ff734d]" />}
        title="Customizable Workflows"
        description="Configure your analysis pipeline to match your specific research requirements."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Microscope className="h-4 w-4 text-[#ff734d]" />}
        title="Accelerated Research"
        description="Speed up your biotech research with automated, scalable tools built for discovery."
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-[#ff734d]" />}
        title="AI-Enhanced Mutation Detection"
        description="Our advanced algorithms identify even the most subtle genomic variations."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Stethoscope className="h-4 w-4 text-[#ff734d]" />}
        title="Disease Identification"
        description="Detect early signs of inherited and complex diseases through genetic pattern recognition."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-[#ff734d]/20 p-2 md:rounded-3xl md:p-3 bg-[#15100f]">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-[#0b0908] border border-[#ff734d]/10 shadow-[0px_0px_27px_0px_rgba(255,115,77,0.05)]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-[#ff734d]/30 p-2 bg-[#15100f]">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-white md:text-2xl/[1.875rem]">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-neutral-300 md:text-base/[1.375rem] [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};