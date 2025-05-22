"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Search, FileInput, ListFilter, Cog, BarChart3, LineChart } from "lucide-react";

export function PathogenicityTimeline() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate which step should be active based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      // Map the scroll progress value (0-1) to our steps (0-5)
      const step = Math.min(Math.floor(value * 7), 5);
      setActiveStep(step);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Timeline steps data - actual user workflow
  const timelineSteps = [
    {
      icon: <Search />,
      title: "Select Gene",
      description: "Enter the gene of interest (e.g., BRCA1, TP53) in the search input. The system fetches associated data including gene structure, known variants, and transcript information.",
      color: "#ff734d"
    },
    {
      icon: <FileInput />,
      title: "Input DNA Mutation",
      description: "Input the specific mutation or variant (e.g., c.68_69delAG or p.Glu23Ter). The system parses this using HGVS notation and validates your input.",
      color: "#ff734d"
    },
    {
      icon: <ListFilter />,
      title: "Select Analysis Type",
      description: "Choose your analysis purpose: Pathogenicity Prediction, Disease Association, Population Frequency, or Research Comparison.",
      color: "#ff734d"
    },
    {
      icon: <Cog />,
      title: "Run Mutation Analysis",
      description: "Our AI/ML pipeline is triggered to predict functional impact, check existing variant databases (ClinVar, dbSNP, gnomAD), and compare with known pathogenic/benign mutations.",
      color: "#ff734d"
    },
    {
      icon: <BarChart3 />,
      title: "Visualization and Insights",
      description: "View visual genome maps showing mutation location, protein structure impact (if applicable), and conservation across species.",
      color: "#ff734d"
    },
    {
      icon: <LineChart />,
      title: "Pathogenicity Scoring",
      description: "Review results showing classification (Pathogenic/Likely Pathogenic/Benign/Likely Benign/VUS), prediction confidence (%), and supporting evidence from clinical studies.",
      color: "#ff734d"
    }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-[#1d1a19] to-[#0b0908] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-center text-[34px] md:text-[44px] font-bold tracking-tighter bg-gradient-to-b from-[#ff734d] to-[#d64000] text-transparent bg-clip-text mt-5">
            Your Analysis Workflow
          </h2>
          <p className="text-center text-lg leading-[30px] tracking-tight text-neutral-200 mt-3 max-w-2xl mx-auto">
            Our platform guides you through a comprehensive DNA mutation analysis process, leveraging Stanford's Evo 2 AI to deliver accurate pathogenicity assessments.
          </p>
        </div>

        {/* Timeline component */}
        <div className="relative">
          {/* Center line - visible on all screen sizes */}
          <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#ff734d]/10 to-[#ff734d]/30 rounded-full" />
          
          {/* Progress line - animates based on scroll */}
          <motion.div 
            className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-[#ff734d] to-[#d64000] rounded-full"
            style={{ 
              height: useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]),
              top: 0
            }}
          />
          
          {/* Timeline steps */}
          <div className="relative">
            {timelineSteps.map((step, index) => (
              <TimelineStep 
                key={index} 
                step={step} 
                index={index} 
                isActive={index <= activeStep}
                isOdd={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({ step, index, isActive, isOdd }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" });
  
  const baseDelay = 0.1;
  const delay = baseDelay * index;
  
  // Staggered animation for elements
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        staggerChildren: 0.1
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Pulse animation for the dot when it becomes active
  const dotVariants = {
    inactive: { 
      scale: 1,
      backgroundColor: "#2a2a2a"
    },
    active: { 
      scale: [1, 1.5, 1],
      backgroundColor: step.color,
      transition: { 
        duration: 0.5,
        repeat: 0,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <div 
      ref={ref}
      className="flex flex-col md:flex-row my-12 md:my-16 relative"
    >
      {/* The dot in the center of the timeline */}
      <div className="absolute left-8 top-0 transform translate-x-0 md:left-1/2 md:-translate-x-1/2 z-10">
        <motion.div 
          className="w-6 h-6 rounded-full border-4 border-[#0b0908] flex items-center justify-center"
          variants={dotVariants}
          initial="inactive"
          animate={isActive ? "active" : "inactive"}
        >
          <motion.span 
            className="text-xs font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
          >
            {index + 1}
          </motion.span>
        </motion.div>
      </div>

      {/* Timeline content for EVEN steps (left side on desktop) */}
      {!isOdd && (
        <>
          <motion.div 
            className="ml-20 md:ml-0 md:w-5/12 md:pr-12 md:text-right"
            variants={containerVariants}
            initial="hidden"
            animate={isInView && isActive ? "visible" : "hidden"}
          >
            <motion.div 
              className="inline-block p-3 mb-3 rounded-lg bg-[#15100f]"
              variants={childVariants}
              style={{
                border: isActive ? `1px solid ${step.color}` : '1px solid rgba(255,115,77,0.1)',
                color: isActive ? step.color : '#666'
              }}
            >
              {step.icon}
            </motion.div>
            <motion.h3 
              className="text-xl md:text-2xl font-semibold text-white mb-2"
              variants={childVariants}
            >
              {step.title}
            </motion.h3>
            <motion.p 
              className="text-neutral-300 text-sm md:text-base"
              variants={childVariants}
            >
              {step.description}
            </motion.p>
          </motion.div>
          
          {/* Spacer for center alignment on desktop */}
          <div className="hidden md:block md:w-6/12"></div>
        </>
      )}

      {/* Timeline content for ODD steps (right side on desktop) */}
      {isOdd && (
        <>
          {/* Spacer for center alignment on desktop */}
          <div className="hidden md:block md:w-6/12"></div>
          
          <motion.div 
            className="ml-20 md:ml-0 md:w-5/12 md:pl-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView && isActive ? "visible" : "hidden"}
          >
            <motion.div 
              className="inline-block p-3 mb-3 rounded-lg bg-[#15100f]"
              variants={childVariants}
              style={{
                border: isActive ? `1px solid ${step.color}` : '1px solid rgba(255,115,77,0.1)',
                color: isActive ? step.color : '#666'
              }}
            >
              {step.icon}
            </motion.div>
            <motion.h3 
              className="text-xl md:text-2xl font-semibold text-white mb-2"
              variants={childVariants}
            >
              {step.title}
            </motion.h3>
            <motion.p 
              className="text-neutral-300 text-sm md:text-base"
              variants={childVariants}
            >
              {step.description}
            </motion.p>
          </motion.div>
        </>
      )}
    </div>
  );
}