import React from 'react';
import { motion } from 'framer-motion';

const IntroMessage = () => {
  return (
    <section className="w-full max-w-4xl mx-auto py-32 px-6 md:px-12 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground leading-snug mb-8">
          Another beautifully chaotic, absolutely radiant, wildly successful trip around the sun.
        </h2>
        <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-8" />
        <p className="font-sans text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Some people enter a room and it just gets louder. You enter a room and it gets brighter, warmer, and undeniably more interesting. Today is about celebrating the sheer force of nature that is you.
        </p>
      </motion.div>
    </section>
  );
};

export default IntroMessage;
