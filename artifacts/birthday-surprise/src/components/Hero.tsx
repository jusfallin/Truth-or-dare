import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Heart, Sparkles } from 'lucide-react';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const letterContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const name = "Bhavanika";

  const continueToNext = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#fffaf5] via-background to-[#f8e4eb]">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-secondary/30 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />

      <motion.div aria-hidden="true" className="pointer-events-none absolute left-[13%] top-[20%] text-primary/50" animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <Sparkles className="h-7 w-7" />
      </motion.div>
      <motion.div aria-hidden="true" className="pointer-events-none absolute right-[14%] top-[28%] text-secondary" animate={{ y: [0, 10, 0], rotate: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}>
        <Sparkles className="h-5 w-5" />
      </motion.div>

      <motion.div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 text-center" style={{ y: y1, opacity }}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-primary md:text-sm">
          <span className="h-px w-8 bg-primary/50" />A little celebration for you<span className="h-px w-8 bg-primary/50" />
        </motion.p>

        <motion.h1 initial="hidden" animate="visible" variants={letterContainerVariants} className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
          HAPPY BIRTHDAY
          <span className="block font-cursive text-7xl font-normal leading-[1.05] text-primary text-glow md:text-9xl">{name}</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.85 }} className="my-7 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-white/70 text-primary shadow-[0_8px_30px_rgba(186,75,117,0.18)] backdrop-blur-sm">
          <Heart className="h-6 w-6 fill-current" />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.05 }} className="max-w-lg font-serif text-lg italic leading-relaxed text-foreground/75 md:text-2xl">
          “You make every ordinary day feel beautiful. Today is all about celebrating the beautiful person you are.”
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.45 }} className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-primary/75">
          With all my love, always
        </motion.p>
      </motion.div>

      <motion.div className="absolute bottom-8 z-20 flex flex-col items-center gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8 }}>
        <motion.button type="button" onClick={continueToNext} whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.96 }} className="group flex items-center gap-2 rounded-full border border-primary/20 bg-primary px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_30px_rgba(186,75,117,0.25)] transition-shadow hover:shadow-[0_14px_38px_rgba(186,75,117,0.32)]">
          Continue <Heart className="h-3.5 w-3.5 fill-current" />
        </motion.button>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} className="text-primary/45" aria-hidden="true">
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
