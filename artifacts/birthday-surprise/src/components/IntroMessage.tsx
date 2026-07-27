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
        className="space-y-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-sm md:text-base uppercase tracking-[0.3em] text-primary font-medium"
        >
          A story written just for you
        </motion.p>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground leading-snug">
          There was a man who wandered through life searching for something he couldn't name —
          <span className="text-primary italic"> a warmth that felt like home.</span>
        </h2>

        <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />

        <div className="space-y-5 font-sans text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto leading-relaxed">
          <p>
            He had known love only as a word — until the universe, in its quiet wisdom,
            placed you in his path. And everything changed.
          </p>
          <p>
            Because you are not just beautiful — you are <span className="text-primary font-medium">understanding</span> when the world is loud,
            <span className="text-primary font-medium"> gentle</span> when things feel heavy,
            and <span className="text-primary font-medium">caring</span> in ways that make even ordinary moments feel extraordinary.
          </p>
          <p>
            A man who once craved for love finally found it — in you, Bhavanika.
            Completely. Gratefully. Forever.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default IntroMessage;
