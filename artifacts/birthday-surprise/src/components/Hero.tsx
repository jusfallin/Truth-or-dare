import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import flowersImg from '@assets/generated_images/flowers.jpg';

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
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#4f102d]">
      <motion.div
        className="absolute inset-0"
        style={{ y: y1 }}
      >
        <img
          src={flowersImg}
          alt=""
          aria-hidden="true"
          className="h-[115%] w-full object-cover object-center opacity-80 scale-110"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#3c0b25]/60 via-[#7e3451]/45 to-[#4d0c2e]/95" />
      <div className="absolute inset-0 bg-[#8f425b]/25 mix-blend-multiply" />

      <motion.div 
        className="text-center z-10 px-7 max-w-2xl"
        style={{ y: y1, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-5 text-5xl leading-none text-[#f6c84f] md:text-6xl"
        >
          “
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35 }}
          className="font-serif text-3xl font-normal italic leading-[1.35] text-white drop-shadow-lg md:text-5xl"
        >
          You make the world feel a little more colorful just by being in it.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 font-serif text-sm italic tracking-wide text-white/80 md:text-base"
        >
          — Someone who thinks you're pretty great
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.45 }}
          className="mt-12 font-cursive text-4xl text-[#ffd46b] md:text-5xl"
        >
          For Bhavanika
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-white/75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
      >
        <span className="text-[10px] uppercase tracking-[0.32em]">Scroll to unfold</span>
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
