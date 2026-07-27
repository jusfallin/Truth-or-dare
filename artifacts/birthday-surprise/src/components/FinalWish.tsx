import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FinalWish = () => {
  const [celebrated, setCelebrated] = useState(false);

  const ConfettiBurst = () => {
    const pieces = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * window.innerWidth * 1.5,
      y: (Math.random() - 1) * window.innerHeight * 1.5,
      color: ['#E8B95E', '#BA4B75', '#F7F3EE', '#A78BFA', '#ffffff'][Math.floor(Math.random() * 5)],
      rotation: Math.random() * 720,
      scale: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 0.2
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: window.innerHeight / 2, scale: 0, rotate: 0 }}
            animate={{ 
              x: p.x, 
              y: p.y, 
              scale: [0, p.scale, p.scale * 0.5, 0],
              rotate: p.rotation
            }}
            transition={{ duration: 4, ease: "easeOut", delay: p.delay }}
            className="absolute w-3 h-3 md:w-4 md:h-4 rounded-sm"
            style={{ backgroundColor: p.color }}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center py-32 px-6 relative">
      <AnimatePresence>
        {celebrated && <ConfettiBurst />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h2 className="font-cursive text-7xl md:text-9xl text-primary text-glow mb-8">
          Happy Birthday,
        </h2>
        <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-16">
          Bhavanika.
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCelebrated(true)}
          className="px-12 py-5 bg-primary text-primary-foreground rounded-full font-sans text-xl font-medium shadow-[0_0_40px_rgba(186,75,117,0.4)] hover:shadow-[0_0_60px_rgba(186,75,117,0.6)] transition-shadow duration-300 tracking-wide uppercase"
        >
          Let's Celebrate
        </motion.button>
      </motion.div>

      <div className="absolute bottom-8 text-muted-foreground font-sans text-sm tracking-widest uppercase">
        Made with love
      </div>
    </section>
  );
};

export default FinalWish;
