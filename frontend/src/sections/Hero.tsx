"use client";
import Link from "next/link";
import Image from "next/image";
import productImage from "~/assets/product-image.png";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const Hero = () => {
  const sectionRef = useRef(null);
  const geneticRisksRef = useRef(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // Calculate the width of the "Genetic Risks" text for animation
  useEffect(() => {
    if (geneticRisksRef.current) {
      setUnderlineWidth((geneticRisksRef.current as HTMLElement).offsetWidth);
    }

    // Handle window resize
    const handleResize = () => {
      if (geneticRisksRef.current) {
        setUnderlineWidth((geneticRisksRef.current as HTMLElement).offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants for the underline
  const underlineVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: underlineWidth,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  // Flickering dot animation variants - FIXED
  const flickerVariants: Variants = {
    initial: { opacity: 0.3 },
    animate: {
      opacity: [0.3, 1, 0.3, 1, 0.5, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  // Product image animation variants (rising effect)
  const productImageVariants: Variants = {
    initial: {
      y: 100,
      rotateX: 45,
      scale: 0.9,
      opacity: 0.6,
      transformPerspective: 1000,
    },
    animate: {
      y: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 35,
        delay: 0.6,
        duration: 5,
      },
    },
  };

  // Shadow animation variants
  const shadowVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.7,
    },
    animate: {
      opacity: 0.2,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 1.2,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip bg-gradient-to-b from-[#EAEEFE] to-[#d78451] py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag flex items-center">
              {/* Flickering dot */}
              <motion.div
                className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-[#ff734d] to-[#d64000]"
                variants={flickerVariants}
                initial="initial"
                animate="animate"
              />
              AI-Powered Mutation Insight
            </div>
          </div>
          <h2 className="mt-5 bg-gradient-to-b from-[#ff734d] to-[#d64000] bg-clip-text text-center text-[34px] font-bold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]">
            AI Meets Genomics:
            <br />
            Detect{" "}
            <span className="relative inline-block bg-gradient-to-b from-[#ff734d] to-[#d64000] bg-clip-text text-transparent">
              <span ref={geneticRisksRef}>Genetic Risks</span>
              <motion.span
                className="absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-[#000000] to-[#000000]"
                initial="hidden"
                animate="visible"
                variants={underlineVariants}
              />
            </span>{" "}
            Before They Become Disease
          </h2>
          <p className="mt-5 text-center text-lg leading-[30px] tracking-tight text-[#010D3E]">
            Supercharge your genomics workflow with an AI engine built on
            Stanford&apos;s Evo 2. Analyze DNA mutations, predict disease impact, and
            unlock next-gen insights for faster, smarter diagnostics.
          </p>
          <div className="mt-5 flex items-center justify-center gap-6">
            {/* Analyze button with arrow that moves on hover */}
            <Link
              href="/analyze"
              className="btn btn-primary group relative overflow-hidden"
            >
              <span className="inline-flex items-center">
                Analyze
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>

            {/* Github button with arrow that moves on hover */}
            <Link
              href="https://github.com/sehajmakkar/GenomicsAI"
              target="_blank"
              className="btn btn-text group relative overflow-hidden"
            >
              <span className="inline-flex items-center">
                Github
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <div className="relative mt-16">
          {/* Shadow under the product image */}
          <motion.div
            className="absolute top-6 left-1/2 h-6 w-4/5 -translate-x-1/2 transform rounded-full bg-black blur-md"
            variants={shadowVariants}
            initial="initial"
            animate="animate"
          />

          {/* Animated Product Image */}
          <motion.div
            className="relative z-10"
            variants={productImageVariants}
            initial="initial"
            animate="animate"
          >
            <Image src={productImage} alt="Product Image" className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
