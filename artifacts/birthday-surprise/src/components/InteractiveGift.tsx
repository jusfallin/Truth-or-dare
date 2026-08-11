import React, { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import revealImg from '@assets/IMG_20260730_235824.png';

const noMoves = [
  { x: -95, y: -82, rotate: -5 },
  { x: 92, y: -55, rotate: 5 },
  { x: -80, y: 70, rotate: -4 },
  { x: 88, y: 68, rotate: 4 },
  { x: 0, y: -105, rotate: 0 },
];

function Sparkles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[300] overflow-hidden" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 25, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], y: -250 - (i % 4) * 45, x: (i - 6.5) * 34, scale: [0.5, 1, 0.65] }}
          transition={{ duration: 1.9, delay: i * 0.035, ease: 'easeOut' }}
          className="absolute bottom-[30%] left-1/2 text-xl"
        >
          {i % 3 === 0 ? '💛' : i % 3 === 1 ? '✨' : '💖'}
        </motion.span>
      ))}
    </div>
  );
}

function GiftBox({ step, onTap, onFinished }: { step: number; onTap: () => void; onFinished: () => void }) {
  const opened = step === 3;

  useEffect(() => {
    if (!opened) return;
    // Let the photo finish its complete entrance before switching sections.
    const timer = window.setTimeout(onFinished, 2700);
    return () => window.clearTimeout(timer);
  }, [opened, onFinished]);

  return (
    <div className="relative h-[390px] w-[300px] select-none transform-gpu sm:h-[450px] sm:w-[370px]">
      <motion.div
        animate={opened ? { opacity: 0.35 } : { opacity: [0.16, 0.3, 0.16] }}
        transition={{ duration: opened ? 0.6 : 2.2, repeat: opened ? 0 : Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 h-20 w-56 -translate-x-1/2 rounded-full bg-[#ffd76a]/45 blur-xl"
      />

      {/* This exact element is shared with the final memory card using layoutId.
          That prevents the image from snapping/backtracking when the box section closes. */}
      <AnimatePresence>
        {opened && (
          <motion.div
            layoutId="memory-photo"
            initial={{ opacity: 0, y: 72, scale: 0.72, rotate: -2 }}
            animate={{ opacity: 1, y: -18, scale: 1, rotate: 0 }}
            transition={{ duration: 1.65, ease: [0.16, 0.88, 0.28, 1] }}
            className="absolute left-1/2 top-[17%] z-[80] w-[68%] -translate-x-1/2 transform-gpu overflow-hidden rounded-[20px] border-[4px] border-white/95 bg-white p-1.5 shadow-[0_22px_45px_rgba(74,24,47,.25)] will-change-transform"
          >
            <img src={revealImg} alt="A special memory waiting inside the gift" loading="eager" decoding="async" className="block aspect-[4/5] w-full rounded-[14px] object-cover" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={opened ? { opacity: 0, y: 18, scale: 0.97 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.25, delay: 0.12, ease: [0.22, 0.9, 0.32, 1] }}
        className="absolute bottom-[13%] left-1/2 z-20 h-[48%] w-[70%] -translate-x-1/2 transform-gpu overflow-hidden rounded-[14px_14px_28px_28px] border border-white/60 bg-[linear-gradient(145deg,#fff0c4,#e9a73b_48%,#a83d62)] shadow-[0_28px_48px_rgba(67,20,43,.28),inset_6px_6px_16px_rgba(255,255,255,.28)] will-change-transform"
      >
        <div className="absolute inset-y-0 left-1/2 w-[17%] -translate-x-1/2 bg-[linear-gradient(90deg,#c85c7c,#fff7da,#d56c91)]" />
      </motion.div>

      <motion.button
        type="button"
        aria-label="Open the gift lid"
        onClick={step === 0 ? onTap : undefined}
        disabled={step !== 0}
        animate={step >= 1 ? { y: -112, rotateZ: -5, rotateX: -18 } : { y: 0, rotateZ: 0, rotateX: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 0.9, 0.32, 1] }}
        className="absolute left-[8%] top-[29%] z-50 h-[18%] w-[84%] transform-gpu rounded-2xl border border-white/70 bg-[linear-gradient(145deg,#fff1c8,#ed91b2,#a83d62)] shadow-[0_16px_26px_rgba(76,18,47,.28)] [transform-origin:50%_100%] [perspective:900px]"
      >
        <span className="absolute inset-y-0 left-1/2 w-[17%] -translate-x-1/2 bg-[linear-gradient(90deg,#c85c7c,#fff7da,#d56c91)]" />
      </motion.button>

      <motion.button
        type="button"
        aria-label="Loosen the gift ribbon"
        onClick={step === 1 ? onTap : undefined}
        disabled={step !== 1}
        animate={step >= 2 ? { y: -100, scale: 0.8, rotate: -9, opacity: 0.7 } : { y: 0, scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.68, ease: [0.22, 0.9, 0.32, 1] }}
        className="absolute left-1/2 top-[17%] z-[60] h-24 w-44 -translate-x-1/2 transform-gpu"
      >
        <span className="absolute left-0 top-6 h-16 w-24 -rotate-[28deg] rounded-[65%_35%_65%_35%] border-4 border-[#f7bfd0] bg-[linear-gradient(135deg,#ffe8b0,#c94d7d)] shadow-lg" />
        <span className="absolute right-0 top-6 h-16 w-24 rotate-[28deg] rounded-[35%_65%_35%_65%] border-4 border-[#f7bfd0] bg-[linear-gradient(135deg,#ffe8b0,#c94d7d)] shadow-lg" />
        <span className="absolute left-1/2 top-9 h-11 w-11 -translate-x-1/2 rounded-full border-4 border-[#f7bfd0] bg-[#d65b8a] shadow-xl" />
      </motion.button>

      <AnimatePresence>
        {step < 3 && (
          <motion.button
            type="button"
            aria-label={step === 2 ? 'Open the gift' : 'Gift interaction'}
            onClick={step === 2 ? onTap : undefined}
            disabled={step !== 2}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: step === 2 ? [1, 1.045, 1] : 1 }}
            transition={step === 2 ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
            className="absolute left-1/2 top-[40%] z-[90] -translate-x-1/2 rounded-full border-2 border-white/90 bg-[#fff7cf] px-5 py-3 font-sans text-[10px] font-black uppercase tracking-[.2em] text-[#85445f] shadow-lg"
          >
            {step === 2 ? 'Open me ✨' : step === 1 ? 'Untie the ribbon' : 'Tap the lid'}
          </motion.button>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/85 px-5 py-2 font-sans text-xs font-bold text-[#7c3d58] shadow-md">
        {step === 0 ? '1 / 3  •  Tap the lid' : step === 1 ? '2 / 3  •  Tap the ribbon' : step === 2 ? '3 / 3  •  Open the surprise' : 'Your memory is opening… 💛'}
      </div>
    </div>
  );
}

const InteractiveGift = () => {
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState<'yes' | null>(null);
  const [noCount, setNoCount] = useState(0);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0, rotate: 0 });
  const [celebrate, setCelebrate] = useState(false);

  const tapGift = () => setStep((current) => Math.min(current + 1, 3));
  const finishGiftReveal = () => setRevealed(true);

  const yes = () => {
    setAnswer('yes');
    setCelebrate(true);
    window.setTimeout(() => setCelebrate(false), 2800);
  };

  const no = () => {
    if (answer === 'yes') return;
    const nextCount = noCount + 1;
    setNoCount(nextCount);
    setNoOffset(noMoves[(nextCount - 1) % noMoves.length]);
  };

  return (
    <LayoutGroup id="birthday-gift">
      <section className="relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_20%_0%,#fff1c8_0%,transparent_28%),radial-gradient(circle_at_90%_40%,#f6c8d8_0%,transparent_30%),linear-gradient(145deg,#fffaf0,#f8e8ed_52%,#f6e0b8)] px-4 py-12 sm:px-6 sm:py-16">
        {celebrate && <Sparkles />}

        <div className="mx-auto w-full max-w-5xl">
          {!revealed ? (
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex min-h-[80vh] flex-col items-center justify-center text-center">
              <div className="mb-3 rounded-full border border-[#d39a3c]/30 bg-white/70 px-5 py-2 font-sans text-[10px] font-black uppercase tracking-[.34em] text-[#9a5c28] shadow-sm">A tiny surprise, just for you</div>
              <h2 className="font-serif text-4xl font-semibold text-[#6c294b] sm:text-5xl md:text-6xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Something is waiting…</h2>
              <p className="mt-3 max-w-md font-sans text-sm leading-6 text-[#7c5364] sm:text-base">Three little taps. Then the memory inside is yours to discover. 🎀</p>
              <div className="mt-8 rounded-[42px] border border-white/80 bg-white/60 p-4 shadow-[0_28px_70px_rgba(90,25,60,.16)] sm:p-7">
                <GiftBox step={step} onTap={tapGift} onFinished={finishGiftReveal} />
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="mx-auto max-w-4xl">
              <motion.div layout className="relative overflow-hidden rounded-[34px] border-[5px] border-white/80 bg-[#f7eadb] p-2 shadow-[0_28px_80px_rgba(71,24,48,.2)] sm:rounded-[44px] sm:p-3">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,215,103,.28),transparent_38%)]" />
                <motion.div
                  layoutId="memory-photo"
                  transition={{ layout: { duration: 1.05, ease: [0.16, 0.88, 0.28, 1] } }}
                  className="relative z-10 mx-auto overflow-hidden rounded-[25px] border-[2px] border-white/90 bg-white p-1.5 shadow-[0_18px_40px_rgba(71,24,48,.16)] sm:rounded-[34px] sm:p-2"
                >
                  <img src={revealImg} alt="our special memory" loading="eager" decoding="async" className="block max-h-[62vh] w-full rounded-[18px] object-contain sm:rounded-[26px]" />
                </motion.div>
              </motion.div>

              <div className="mt-7 rounded-[34px] border border-white/80 bg-white/65 px-5 py-8 text-center shadow-[0_26px_70px_rgba(70,25,50,.14)] sm:px-9 sm:py-10">
                <p className="font-sans text-[10px] font-black uppercase tracking-[.38em] text-[#a65c72]">A question I’ve been carrying in my heart</p>
                <h1 className="mt-4 font-serif text-[2.45rem] font-semibold leading-[.98] text-[#632442] sm:text-5xl md:text-6xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Will you be my <span className="text-[#e0a52b]" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>yellow?</span>
                </h1>
                <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#e4a62b] via-[#f5cf62] to-[#d86c91]" />
                <p className="mx-auto mt-5 max-w-2xl font-sans text-[14px] font-medium leading-7 text-[#674c59] sm:text-base md:text-lg">I don’t want to give you a name you haven’t chosen for yourself. I just want to ask you, honestly — will you stay beside me for the silly moments, our favorite songs, our little nicknames, the long talks, and all the ordinary days that become special because we share them?</p>

                <div className="relative mx-auto mt-10 flex min-h-[112px] max-w-xl items-center justify-center gap-4 sm:gap-6">
                  {/* NO starts exactly like YES. After each tap it dodges to a new place. */}
                  <motion.button
                    type="button"
                    onClick={yes}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative z-20 min-w-[132px] rounded-full border border-[#ffe8a0] bg-[linear-gradient(135deg,#fff0a8,#f4b62e,#e49a1d)] px-8 py-4 font-sans text-sm font-black tracking-[.12em] text-[#633814] shadow-[0_16px_34px_rgba(224,160,37,.3)] sm:min-w-[150px] sm:text-base"
                  >
                    YES 💛
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={no}
                    animate={{ x: noOffset.x, y: noOffset.y, rotate: noOffset.rotate, scale: noCount ? [1, 1.08, 0.98, 1] : 1 }}
                    transition={{ x: { type: 'spring', stiffness: 420, damping: 22 }, y: { type: 'spring', stiffness: 420, damping: 22 }, rotate: { duration: 0.25 }, scale: { duration: 0.42, ease: 'easeOut' } }}
                    className="relative z-30 min-w-[132px] rounded-full border border-[#ffe8a0] bg-[linear-gradient(135deg,#fff0a8,#f4b62e,#e49a1d)] px-8 py-4 font-sans text-sm font-black tracking-[.12em] text-[#633814] shadow-[0_16px_34px_rgba(224,160,37,.3)] sm:min-w-[150px] sm:text-base"
                  >
                    NO
                  </motion.button>
                </div>

                <AnimatePresence mode="wait">
                  {answer === 'yes' ? (
                    <motion.div key="yes" initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45 }} className="mx-auto mt-5 max-w-2xl rounded-[26px] border border-[#f4d77c] bg-[linear-gradient(135deg,#fffdf3,#fff4cf)] px-5 py-6 shadow-lg sm:px-8">
                      <p className="font-serif text-3xl font-semibold text-[#73334e] sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Then let’s make our little world a little more golden. 💛</p>
                      <p className="mt-3 font-sans text-sm leading-7 text-[#634d56] sm:text-base">Thank you for choosing YES. Here’s to our silly moments, favorite songs, tiny nicknames, long talks, and all the memories we haven’t made yet.</p>
                      <p className="mt-4 text-2xl text-[#b06a24]" style={{ fontFamily: "'Dancing Script', cursive" }}>I’m really happy you said yes, thangameyy. 🥹✨</p>
                    </motion.div>
                  ) : noCount > 0 ? (
                    <motion.p key={noCount} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 font-sans text-xs font-semibold text-[#8b6170]">Nice try 😌 The NO button has other plans… {noCount >= 3 ? '😂💛' : '🏃‍♂️💨'}</motion.p>
                  ) : (
                    <motion.p key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 font-sans text-xs font-semibold text-[#8b6170]">No pressure. Just a little question wrapped in a lot of love. 🌷</motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </LayoutGroup>
  );
};

export default InteractiveGift;
