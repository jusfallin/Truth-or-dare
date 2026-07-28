import React from 'react';
import { motion } from 'framer-motion';
import flowersImg from '@assets/generated_images/flowers.jpg';

const IntroMessage = () => {
  return (
    <section className="relative w-full overflow-hidden px-6 py-28 md:px-12 md:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/35 to-background" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -35, rotate: -4 }}
          whileInView={{ opacity: 1, x: 0, rotate: -3 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-5 rounded-[2.5rem] bg-primary/20 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/60 bg-white/25 p-2 shadow-2xl backdrop-blur-sm">
            <img src={flowersImg} alt="A soft bouquet of flowers" className="h-full w-full rounded-[1.5rem] object-cover" />
            <div className="absolute inset-2 rounded-[1.5rem] bg-gradient-to-t from-[#4f102d]/45 via-transparent to-white/20" />
            <span className="absolute bottom-7 left-7 font-cursive text-4xl text-white drop-shadow-md">my favorite person</span>
          </div>
          <div className="absolute -bottom-5 -right-5 flex h-16 w-16 items-center justify-center rounded-full border border-secondary/60 bg-secondary/80 text-2xl text-primary shadow-lg">♥</div>
        </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="space-y-8 text-left"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-sm font-medium uppercase tracking-[0.3em] text-primary"
        >
          A story written just for you
        </motion.p>

        <h2 className="font-serif text-3xl leading-snug text-foreground md:text-5xl lg:text-6xl">
          There was a man who wandered through life searching for something he couldn't name —
          <span className="text-primary italic"> a warmth that felt like home.</span>
        </h2>

        <div className="h-1 w-24 rounded-full bg-secondary" />

        <div className="max-w-2xl space-y-5 font-sans text-lg leading-relaxed text-foreground/75 md:text-xl">
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
      </div>
    </section>
  );
};

export default IntroMessage;
