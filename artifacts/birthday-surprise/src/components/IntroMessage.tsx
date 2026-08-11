import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import coupleImg from '@assets/scratch-photo.jpg';

const IntroMessage = () => {
  const [secretOpen, setSecretOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden px-6 py-28 md:px-12 md:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#fff4f7] to-background" />
      <div className="pointer-events-none absolute left-[-10rem] top-24 h-80 w-80 rounded-full bg-primary/15 blur-[100px]" />
      <div className="pointer-events-none absolute right-[-10rem] bottom-10 h-96 w-96 rounded-full bg-secondary/25 blur-[110px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -45, rotate: -4 }}
          whileInView={{ opacity: 1, x: 0, rotate: -2 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.95, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            className="absolute -inset-5 rounded-[3rem] bg-primary/20 blur-3xl"
            animate={{ scale: [1, 1.04, 1], opacity: [0.45, 0.65, 0.45] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            whileHover={{ y: -6, rotate: 0, scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/70 p-3 shadow-[0_28px_70px_rgba(116,31,69,.18)] backdrop-blur-xl"
          >
            <div className="relative aspect-square overflow-hidden rounded-[2rem]">
              <img
                src={coupleImg}
                alt="A special memory of us together"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.045]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#35101f]/45 via-transparent to-white/10" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <span className="font-cursive text-3xl text-white drop-shadow-lg md:text-4xl">just us ♡</span>
                <span className="rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-md">
                  my favorite memory
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -7, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-5 -right-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-secondary/90 text-primary shadow-[0_12px_35px_rgba(186,75,117,.25)]"
          >
            <Heart className="h-7 w-7 fill-current" />
          </motion.div>

          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -8, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -left-5 top-10 text-primary/60"
          >
            <Sparkles className="h-7 w-7" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-7 text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.32em] text-primary md:text-sm"
          >
            <span className="h-px w-9 bg-primary/45" />
            To my love
          </motion.p>

          <h2 className="font-serif text-3xl leading-[1.12] text-foreground md:text-5xl lg:text-6xl">
            I didn't know what I was looking for —
            <span className="text-primary italic"> until I found you.</span>
          </h2>

          <div className="h-1 w-20 rounded-full bg-secondary" />

          <div className="max-w-2xl space-y-5 font-sans text-lg leading-relaxed text-foreground/75 md:text-xl">
            <p>
              I could write a thousand beautiful sentences about you and still feel like I haven't said enough. Somewhere between our conversations, our favorite songs, your little ways of caring, and all those moments that are just <span className="font-medium text-primary">ours</span>, you became someone incredibly special to me.
            </p>
            <p>
              I love your voice, your eyes, your positivity, your heart, and even the tiny things you probably don't realize I notice. You make me feel understood, cared for, and ridiculously lucky to call you <span className="font-medium text-primary">my girl</span>.
            </p>
            <p>
              So this isn't just a birthday page. I made it because I wanted you to feel what I sometimes struggle to put into words: <span className="font-medium text-primary">I choose you, I cherish you, and I keep falling for you in all the little moments.</span>
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => setSecretOpen((open) => !open)}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 rounded-full border border-primary/15 bg-white/65 px-5 py-3 text-sm font-medium text-primary shadow-sm backdrop-blur-md transition-all hover:border-primary/30 hover:bg-white/90 hover:shadow-md"
          >
            <Heart className="h-4 w-4 fill-current transition-transform group-hover:scale-110" />
            {secretOpen ? 'Hide my little secret' : 'Tap this, my love'}
          </motion.button>

          <motion.div
            initial={false}
            animate={{ height: secretOpen ? 'auto' : 0, opacity: secretOpen ? 1 : 0, y: secretOpen ? 0 : -8 }}
            className="max-w-xl overflow-hidden"
          >
            <p className="rounded-2xl border border-primary/10 bg-white/55 px-5 py-4 font-serif text-lg italic leading-relaxed text-foreground/75 shadow-sm backdrop-blur-md">
              “And my thangow, if you ever wonder what my favorite part of this whole story is… it's the part where <span className="text-primary not-italic">you and I</span> are still writing it together.” ❤️
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroMessage;
