import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import coupleImg from '@assets/IMG_20260727_155824_1785148270794.jpg';

const Confetti = () => {
  const pieces = Array.from({ length: 90 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * window.innerWidth * 1.2,
    y: (Math.random() - 1.05) * window.innerHeight,
    rotation: Math.random() * 720,
    scale: Math.random() * 0.9 + 0.45,
    delay: Math.random() * 0.35,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, scale: [0, p.scale, p.scale * 0.7, 0], opacity: [1, 1, 0.8, 0], rotate: p.rotation }}
          transition={{ duration: 3.8, ease: 'easeOut', delay: p.delay }}
          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-[3px] bg-primary"
        />
      ))}
    </div>
  );
};

const ESCAPE_MOVES = [
  { x: 180, y: -80, rotate: -15 }, { x: -200, y: 60, rotate: 20 },
  { x: 120, y: 130, rotate: -10 }, { x: -150, y: -110, rotate: 25 },
  { x: 220, y: 40, rotate: -20 }, { x: -90, y: 140, rotate: 30 },
  { x: 160, y: -130, rotate: -25 }, { x: -220, y: -50, rotate: 15 },
];

interface RunawayNoProps { onActualClick: () => void; }

const RunawayNo: React.FC<RunawayNoProps> = ({ onActualClick }) => {
  const [escapeIndex, setEscapeIndex] = useState(0);
  const [escapeCount, setEscapeCount] = useState(0);
  const lastEscape = useRef(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const escape = useCallback(() => {
    const now = Date.now();
    if (now - lastEscape.current < 250) return;
    lastEscape.current = now;
    const next = (escapeIndex + 1) % ESCAPE_MOVES.length;
    setEscapeIndex(next);
    setEscapeCount((c) => c + 1);
    const move = ESCAPE_MOVES[next];
    x.set(Math.min(Math.abs(move.x), 200) * Math.sign(move.x));
    y.set(Math.min(Math.abs(move.y), 150) * Math.sign(move.y));
  }, [escapeIndex, x, y]);

  return (
    <motion.button
      style={{ x: springX, y: springY, rotate: ESCAPE_MOVES[escapeIndex]?.rotate ?? 0, position: 'relative', zIndex: 10 }}
      onMouseEnter={escape}
      onMouseMove={escape}
      onTouchStart={escape}
      onClick={onActualClick}
      whileTap={{ scale: 0.92 }}
      className="rounded-full border border-primary/20 bg-white/70 px-14 py-5 font-sans text-xl font-medium tracking-widest text-muted-foreground shadow-sm backdrop-blur-md transition-shadow hover:shadow-lg"
      title={escapeCount > 3 ? "She'll never catch me!" : undefined}
    >
      No
    </motion.button>
  );
};

/*
 * A completely custom gift made from layered HTML/CSS instead of a stock image.
 * The lid, ribbon, bow, glow and photo are independent pieces so every motion
 * stays visually connected during the opening sequence.
 */
const GiftArtwork = ({ opening = false, coupleImg }: { opening?: boolean; coupleImg?: string }) => (
  <div className="relative h-[330px] w-[330px] md:h-[400px] md:w-[400px]" style={{ perspective: 1100 }}>
    <motion.div
      className="absolute bottom-[10%] left-1/2 h-8 w-[66%] -translate-x-1/2 rounded-full bg-black/20 blur-2xl"
      animate={opening ? { scaleX: 0.78, opacity: 0.12 } : { scaleX: [0.92, 1, 0.92], opacity: [0.16, 0.23, 0.16] }}
      transition={{ duration: 2.5, repeat: opening ? 0 : Infinity, ease: 'easeInOut' }}
    />

    {opening && (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.25 }}
          animate={{ opacity: [0, 0.95, 0.5, 0], scale: [0.25, 0.7, 1.1, 1.35] }}
          transition={{ duration: 1.45, ease: 'easeOut' }}
          className="absolute left-1/2 top-[46%] z-0 h-44 w-44 -translate-x-1/2 rounded-full bg-rose-100 blur-3xl"
        />
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          return (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x: Math.cos(angle) * (95 + (i % 3) * 18), y: Math.sin(angle) * (95 + (i % 3) * 18) - 55, opacity: [0, 1, 0], scale: [0, 1, 0.4] }}
              transition={{ delay: 0.38 + i * 0.025, duration: 1.15, ease: 'easeOut' }}
              className="absolute left-1/2 top-[48%] z-[80] text-lg text-primary"
            >{i % 2 ? '✦' : '♥'}</motion.span>
          );
        })}
      </>
    )}

    {/* Warm inner lining */}
    <motion.div
      initial={false}
      animate={opening ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.35 }}
      className="absolute left-1/2 top-[42%] z-[5] h-[25%] w-[48%] -translate-x-1/2 rounded-[45%] bg-gradient-to-b from-[#fff7fb] via-[#f8d7e5] to-[#d67b9e] shadow-[inset_0_-14px_22px_rgba(120,25,65,.22)]"
    />

    {/* Photo rising from inside */}
    {opening && coupleImg && (
      <motion.div
        initial={{ y: 45, opacity: 0, scale: 0.65, rotate: -2 }}
        animate={{ y: -38, opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.52, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-[34%] z-[42] h-[155px] w-[112px] -translate-x-1/2 overflow-hidden rounded-2xl border-[5px] border-white bg-white shadow-[0_20px_35px_rgba(70,12,40,.3)] md:h-[185px] md:w-[135px]"
      >
        <img src={coupleImg} alt="Your surprise" className="h-full w-full object-cover" />
      </motion.div>
    )}

    {/* Box body */}
    <div className="absolute bottom-[18%] left-1/2 z-[25] h-[42%] w-[62%] -translate-x-1/2 overflow-hidden rounded-b-[26px] rounded-t-[12px] border border-white/30 bg-gradient-to-br from-[#f6a9c7] via-[#e277a4] to-[#a73e68] shadow-[0_28px_40px_rgba(105,24,62,.28)]">
      <div className="absolute inset-y-0 left-1/2 w-[14%] -translate-x-1/2 bg-gradient-to-r from-[#d46a95] via-[#fff1f7] to-[#d46a95] shadow-[0_0_16px_rgba(255,255,255,.3)]" />
      <div className="absolute inset-x-0 top-0 h-6 bg-white/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
    </div>

    {/* Lid */}
    <motion.div
      initial={false}
      animate={opening ? { y: -92, rotateZ: -3, rotateX: -8 } : { y: 0, rotateZ: 0, rotateX: 0 }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-[15%] top-[28%] z-[55] h-[18%] w-[70%] rounded-[16px] border border-white/35 bg-gradient-to-br from-[#ffc5dd] via-[#e786ae] to-[#b34870] shadow-[0_18px_28px_rgba(90,18,55,.28)]"
      style={{ transformOrigin: '50% 100%', transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/35 via-transparent to-black/10" />
      <div className="absolute inset-y-0 left-1/2 w-[14%] -translate-x-1/2 bg-gradient-to-r from-[#e39ab9] via-[#fff3f8] to-[#d96d99]" />
    </motion.div>

    {/* Bow */}
    <motion.div
      initial={false}
      animate={opening ? { y: -132, rotateZ: -7, scale: 0.88, opacity: 0.98 } : { y: 0, rotateZ: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-[20%] z-[65] h-20 w-36 -translate-x-1/2"
    >
      <div className="absolute left-1 top-3 h-14 w-16 -rotate-[28deg] rounded-[70%_30%_70%_30%] border-4 border-[#ef9dbd] bg-gradient-to-br from-[#ffd4e5] to-[#c94f7c] shadow-lg" />
      <div className="absolute right-1 top-3 h-14 w-16 rotate-[28deg] rounded-[30%_70%_30%_70%] border-4 border-[#ef9dbd] bg-gradient-to-bl from-[#ffd4e5] to-[#c94f7c] shadow-lg" />
      <div className="absolute left-1/2 top-7 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-[#ffeaf2] bg-[#c9517e] shadow-md" />
    </motion.div>

    {/* Tiny floating ribbon tails */}
    <motion.div
      initial={false}
      animate={opening ? { y: -118, rotateZ: -12, opacity: 0 } : { y: 0, rotateZ: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute left-[42%] top-[33%] z-[60] h-16 w-5 -rotate-6 rounded-b-full bg-gradient-to-r from-[#f6b7d0] to-[#d76b98]"
    />
    <motion.div
      initial={false}
      animate={opening ? { y: -112, rotateZ: 12, opacity: 0 } : { y: 0, rotateZ: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute right-[42%] top-[33%] z-[60] h-16 w-5 rotate-6 rounded-b-full bg-gradient-to-r from-[#d76b98] to-[#f6b7d0]"
    />
  </div>
);

const InteractiveGift = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const isOpened = clickCount >= 3 && !isOpening;

  const handleGiftClick = () => {
    if (isOpening || isOpened) return;
    if (clickCount < 2) {
      setClickCount((p) => p + 1);
      return;
    }
    setClickCount(3);
    setIsOpening(true);
    window.setTimeout(() => setIsOpening(false), 1900);
  };

  const handleYes = () => {
    setAnswer('yes');
    setShowConfetti(true);
    window.setTimeout(() => setShowConfetti(false), 5000);
  };

  const getInstruction = () => {
    if (isOpening) return 'Opening your surprise...';
    if (clickCount === 0) return 'A little gift, made with love';
    if (clickCount === 1) return 'The ribbon is loosening...';
    if (clickCount === 2) return 'One more little tap';
    return '';
  };

  return (
    <section className="relative flex min-h-[82vh] w-full items-center justify-center overflow-hidden py-24 md:py-32">
      {/* Soft romantic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff9fc] via-[#fff2f7] to-[#fdf8fb]" />
      <div className="absolute left-[8%] top-[18%] h-64 w-64 rounded-full bg-rose-200/20 blur-3xl" />
      <div className="absolute bottom-[8%] right-[8%] h-72 w-72 rounded-full bg-pink-200/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(221,105,151,.12),transparent_38%)]" />
      {showConfetti && <Confetti />}

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 md:px-8">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-3 text-center">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-primary/65">A little something for you</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isOpening ? (
            <motion.div key="opening" className="flex w-full flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GiftArtwork opening coupleImg={coupleImg} />
              <motion.p
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                className="-mt-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-primary"
              >
                Opening your surprise...
              </motion.p>
            </motion.div>
          ) : !isOpened ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35 }}
              className="flex cursor-pointer select-none flex-col items-center"
              onClick={handleGiftClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGiftClick(); }}
              aria-label="Open your birthday gift"
            >
              <motion.div
                animate={
                  clickCount === 0
                    ? { y: [0, -8, 0], rotateZ: [0, -0.5, 0, 0.5, 0] }
                    : clickCount === 1
                      ? { rotateZ: [-1.4, 1.4, -0.8, 0], scale: 1.015 }
                      : { rotateZ: [-2, 2, -1, 0], scale: 1.03 }
                }
                transition={{ duration: clickCount === 0 ? 2.8 : 0.42, repeat: clickCount === 0 ? Infinity : 0, ease: 'easeInOut' }}
                className="relative"
              >
                <GiftArtwork />
              </motion.div>

              <div className="mt-2 text-center">
                <motion.p animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 1.8, repeat: Infinity }} className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  {getInstruction()}
                </motion.p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  {[0, 1, 2].map((step) => (
                    <span key={step} className={`h-1.5 rounded-full transition-all duration-300 ${step < clickCount ? 'w-9 bg-primary' : 'w-2 bg-primary/15'}`} />
                  ))}
                </div>
              </div>

              {clickCount === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.55, 1, 0.55], y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-5 rounded-full border border-primary/10 bg-white/65 px-5 py-2.5 text-xs text-muted-foreground shadow-sm backdrop-blur-md"
                >
                  Tap gently · three little moments · one big surprise
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div key="opened" initial={{ opacity: 0, y: 55, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', damping: 15 }} className="flex w-full flex-col items-center gap-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.75 }}
                className="group relative aspect-square w-full max-w-xl overflow-hidden rounded-[32px] border border-white/70 bg-white p-2 shadow-[0_25px_70px_rgba(117,35,72,.16)]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[26px]">
                  <img src={coupleImg} alt="A beautiful moment together" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/15 px-4 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-md">A memory worth keeping ♡</div>
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                {answer === null && (
                  <motion.div key="question" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.65 }} className="flex flex-col items-center gap-7 text-center">
                    <div className="space-y-2">
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-primary/60">One last question</p>
                      <h3 className="font-cursive text-5xl leading-tight text-primary text-glow md:text-7xl">Will you be my love forever?</h3>
                    </div>
                    <div className="flex min-h-[80px] flex-wrap items-center justify-center gap-6">
                      <motion.button whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.94 }} onClick={handleYes} className="rounded-full bg-primary px-14 py-5 font-sans text-lg font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_12px_35px_rgba(186,75,117,.28)] transition-shadow hover:shadow-[0_18px_45px_rgba(186,75,117,.4)]">Yes</motion.button>
                      <RunawayNo onActualClick={() => setAnswer('no')} />
                    </div>
                  </motion.div>
                )}

                {answer === 'yes' && (
                  <motion.div key="yes" initial={{ opacity: 0, scale: 0.65 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 11 }} className="space-y-4 text-center">
                    <div className="text-4xl">♡</div>
                    <h3 className="font-cursive text-6xl text-primary text-glow md:text-8xl">Forever it is.</h3>
                    <p className="font-sans text-lg text-muted-foreground">You just made me the happiest person alive, Bhavanika.</p>
                  </motion.div>
                )}

                {answer === 'no' && (
                  <motion.div key="no" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 text-center">
                    <h3 className="font-serif text-3xl text-foreground md:text-5xl">My heart says... try again.</h3>
                    <p className="font-sans text-lg text-muted-foreground">Maybe that wasn't the answer your heart wanted to give. ♡</p>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setAnswer(null)} className="rounded-full border border-primary/25 bg-primary/5 px-9 py-4 font-sans text-sm uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/10">Answer again</motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveGift;
