import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const letterContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotate: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring" as const, damping: 12, stiffness: 100 }
    },
  };

  const name = "Bhavanika";

  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div className="text-center z-10 px-4"
        style={{ y: y1, opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-primary font-medium tracking-[0.2em] uppercase text-sm md:text-base mb-6"
        >
          Happy Birthday to the magical
        </motion.p>

        <motion.h1
          variants={letterContainerVariants}
          initial="hidden"
          animate="visible"
          className="font-cursive text-7xl md:text-9xl lg:text-[12rem] text-foreground text-glow leading-tight"
        >
          {name.split('').map((char, index) => (
            <motion.span key={index} variants={letterVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>

      <motion.div className="absolute bottom-12 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll to unfold</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
