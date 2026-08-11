import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import revealImg from '@assets/IMG_20260730_235824.png';

const Confetti = () => {
  const pieces = Array.from({ length: 90 }).map((_, i) => ({ id: i, x: (Math.random() - 0.5) * window.innerWidth * 1.2, y: (Math.random() - 1.05) * window.innerHeight, rotation: Math.random() * 720, scale: Math.random() * 0.9 + 0.45, delay: Math.random() * 0.35 }));
  return <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">{pieces.map(p => <motion.span key={p.id} initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }} animate={{ x: p.x, y: p.y, scale: [0, p.scale, p.scale * .7, 0], opacity: [1, 1, .8, 0], rotate: p.rotation }} transition={{ duration: 3.8, ease: 'easeOut', delay: p.delay }} className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-[3px] bg-primary" />)}</div>;
};

const ESCAPE_MOVES = [{ x: 180, y: -80, rotate: -15 }, { x: -200, y: 60, rotate: 20 }, { x: 120, y: 130, rotate: -10 }, { x: -150, y: -110, rotate: 25 }, { x: 220, y: 40, rotate: -20 }, { x: -90, y: 140, rotate: 30 }, { x: 160, y: -130, rotate: -25 }, { x: -220, y: -50, rotate: 15 }];

interface RunawayNoProps { onActualClick: () => void; }
const RunawayNo: React.FC<RunawayNoProps> = ({ onActualClick }) => {
  const [escapeIndex, setEscapeIndex] = useState(0); const [escapeCount, setEscapeCount] = useState(0); const lastEscape = useRef(0);
  const x = useMotionValue(0), y = useMotionValue(0); const springX = useSpring(x, { stiffness: 300, damping: 20 }), springY = useSpring(y, { stiffness: 300, damping: 20 });
  const escape = useCallback(() => { const now = Date.now(); if (now - lastEscape.current < 250) return; lastEscape.current = now; const next = (escapeIndex + 1) % ESCAPE_MOVES.length; setEscapeIndex(next); setEscapeCount(c => c + 1); const move = ESCAPE_MOVES[next]; x.set(Math.min(Math.abs(move.x), 200) * Math.sign(move.x)); y.set(Math.min(Math.abs(move.y), 150) * Math.sign(move.y)); }, [escapeIndex, x, y]);
  return <motion.button style={{ x: springX, y: springY, rotate: ESCAPE_MOVES[escapeIndex]?.rotate ?? 0, position: 'relative', zIndex: 10 }} onMouseEnter={escape} onMouseMove={escape} onTouchStart={escape} onClick={onActualClick} whileTap={{ scale: .92 }} className="rounded-full border border-primary/20 bg-white/70 px-14 py-5 font-sans text-xl font-medium tracking-widest text-muted-foreground shadow-sm backdrop-blur-md transition-shadow hover:shadow-lg" title={escapeCount > 3 ? "She'll never catch me!" : undefined}>No</motion.button>;
};

const RevealParticles = () => <div className="absolute inset-0 pointer-events-none z-[80] overflow-visible">{Array.from({ length: 24 }).map((_, i) => { const angle = i / 24 * Math.PI * 2; const distance = 110 + (i % 4) * 18; return <motion.span key={i} initial={{ x: 0, y: 0, opacity: 0, scale: 0 }} animate={{ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance - 65, opacity: [0, 1, 0], scale: [0, 1, .35], rotate: i * 22 }} transition={{ delay: .58 + i * .018, duration: 1.25, ease: 'easeOut' }} className="absolute left-1/2 top-[46%] text-primary text-lg">{i % 2 ? '✦' : '♥'}</motion.span>; })}</div>;

const GiftArtwork = ({ opening = false }: { opening?: boolean }) => (
  <div className="relative h-[340px] w-[340px] md:h-[410px] md:w-[410px]" style={{ perspective: 1100 }}>
    <motion.div className="absolute bottom-[10%] left-1/2 h-8 w-[66%] -translate-x-1/2 rounded-full bg-black/20 blur-2xl" animate={opening ? { scaleX: .78, opacity: .1 } : { scaleX: [.92, 1, .92], opacity: [.16, .23, .16] }} transition={{ duration: 2.5, repeat: opening ? 0 : Infinity, ease: 'easeInOut' }} />
    {opening && <>
      <motion.div initial={{ opacity: 0, scale: .2 }} animate={{ opacity: [0, .9, .45, 0], scale: [.2, .7, 1.1, 1.35] }} transition={{ duration: 1.45 }} className="absolute left-1/2 top-[46%] z-0 h-48 w-48 -translate-x-1/2 rounded-full bg-rose-100 blur-3xl" />
      <RevealParticles />
      <motion.div initial={{ opacity: 0, scale: .2, y: 12 }} animate={{ opacity: [0, 1, .15, 0], scale: [.2, .85, 1.15, 1.4], y: [12, 0, -4, -8] }} transition={{ delay: .42, duration: 1.6, ease: 'easeOut' }} className="absolute left-1/2 top-[20%] z-[65] h-28 w-28 -translate-x-1/2 rounded-full bg-white/80 blur-2xl" />
      <motion.div initial={{ y: 65, opacity: 0, scale: .78, rotate: -1.5 }} animate={{ y: -58, opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .56, duration: .95, ease: [0.16, 1, 0.3, 1] }} className="absolute left-1/2 top-[34%] z-[50] w-[56%] -translate-x-1/2 overflow-hidden rounded-[24px] border-[6px] border-white bg-white shadow-[0_24px_45px_rgba(70,12,40,.32)] md:w-[55%]">
        <div className="aspect-[4/5] w-full"><img src={revealImg} alt="A beautiful memory together" className="h-full w-full object-cover" /></div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/15" />
      </motion.div>
    </>}

    <div className="absolute bottom-[18%] left-1/2 z-[25] h-[42%] w-[62%] -translate-x-1/2 overflow-hidden rounded-b-[26px] rounded-t-[12px] border border-white/30 bg-gradient-to-br from-[#f6a9c7] via-[#e277a4] to-[#a73e68] shadow-[0_28px_40px_rgba(105,24,62,.28)]">
      <div className="absolute inset-y-0 left-1/2 w-[14%] -translate-x-1/2 bg-gradient-to-r from-[#d46a95] via-[#fff1f7] to-[#d46a95] shadow-[0_0_16px_rgba(255,255,255,.3)]" /><div className="absolute inset-x-0 top-0 h-6 bg-white/15" /><div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
    </div>

    <motion.div initial={false} animate={opening ? { y: -92, rotateZ: -3, rotateX: -8 } : { y: 0, rotateZ: 0, rotateX: 0 }} transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }} className="absolute left-[15%] top-[28%] z-[55] h-[18%] w-[70%] rounded-[16px] border border-white/35 bg-gradient-to-br from-[#ffc5dd] via-[#e786ae] to-[#b34870] shadow-[0_18px_28px_rgba(90,18,55,.28)]" style={{ transformOrigin: '50% 100%', transformStyle: 'preserve-3d' }}>
      <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/35 via-transparent to-black/10" /><div className="absolute inset-y-0 left-1/2 w-[14%] -translate-x-1/2 bg-gradient-to-r from-[#e39ab9] via-[#fff3f8] to-[#d96d99]" />
    </motion.div>

    <motion.div initial={false} animate={opening ? { y: -132, rotateZ: -7, scale: .88, opacity: .98 } : { y: 0, rotateZ: 0, scale: 1, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="absolute left-1/2 top-[20%] z-[65] h-20 w-36 -translate-x-1/2">
      <div className="absolute left-1 top-3 h-14 w-16 -rotate-[28deg] rounded-[70%_30%_70%_30%] border-4 border-[#ef9dbd] bg-gradient-to-br from-[#ffd4e5] to-[#c94f7c] shadow-lg" /><div className="absolute right-1 top-3 h-14 w-16 rotate-[28deg] rounded-[30%_70%_30%_70%] border-4 border-[#ef9dbd] bg-gradient-to-bl from-[#ffd4e5] to-[#c94f7c] shadow-lg" /><div className="absolute left-1/2 top-7 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-[#ffeaf2] bg-[#c9517e] shadow-md" />
    </motion.div>

    <motion.div initial={false} animate={opening ? { y: -118, rotateZ: -12, opacity: 0 } : { y: 0, rotateZ: 0, opacity: 1 }} transition={{ duration: .8 }} className="absolute left-[42%] top-[33%] z-[60] h-16 w-5 -rotate-6 rounded-b-full bg-gradient-to-r from-[#f6b7d0] to-[#d76b98]" />
    <motion.div initial={false} animate={opening ? { y: -112, rotateZ: 12, opacity: 0 } : { y: 0, rotateZ: 0, opacity: 1 }} transition={{ duration: .8 }} className="absolute right-[42%] top-[33%] z-[60] h-16 w-5 rotate-6 rounded-b-full bg-gradient-to-r from-[#d76b98] to-[#f6b7d0]" />
  </div>
);

const InteractiveGift = () => {
  const [clickCount, setClickCount] = useState(0); const [isOpening, setIsOpening] = useState(false); const [answer, setAnswer] = useState<'yes' | 'no' | null>(null); const [showConfetti, setShowConfetti] = useState(false);
  const isOpened = clickCount >= 3 && !isOpening;
  const handleGiftClick = () => { if (isOpening || isOpened) return; if (clickCount < 2) { setClickCount(p => p + 1); return; } setClickCount(3); setIsOpening(true); window.setTimeout(() => setIsOpening(false), 2050); };
  const handleYes = () => { setAnswer('yes'); setShowConfetti(true); window.setTimeout(() => setShowConfetti(false), 5000); };
  const getInstruction = () => isOpening ? 'Opening your surprise...' : clickCount === 0 ? 'A little gift, made with love' : clickCount === 1 ? 'The ribbon is loosening...' : 'One more little tap';

  return <section className="relative flex min-h-[82vh] w-full items-center justify-center overflow-hidden py-24 md:py-32">
    <div className="absolute inset-0 bg-gradient-to-b from-[#fff9fc] via-[#fff2f7] to-[#fdf8fb]" /><div className="absolute left-[8%] top-[18%] h-64 w-64 rounded-full bg-rose-200/20 blur-3xl" /><div className="absolute bottom-[8%] right-[8%] h-72 w-72 rounded-full bg-pink-200/20 blur-3xl" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(221,105,151,.12),transparent_38%)]" />{showConfetti && <Confetti />}
    <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 md:px-8">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="mb-3 text-center"><p className="font-sans text-[11px] font-semibold uppercase tracking-[.32em] text-primary/65">A little something for you</p></motion.div>
      <AnimatePresence mode="wait">
        {isOpening ? <motion.div key="opening" className="flex w-full flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><GiftArtwork opening /><motion.p animate={{ opacity: [.45, 1, .45] }} transition={{ duration: .9, repeat: Infinity }} className="-mt-2 font-sans text-xs font-semibold uppercase tracking-[.24em] text-primary">Opening your surprise...</motion.p></motion.div> : !isOpened ? <motion.div key="closed" exit={{ opacity: 0, scale: .92, y: 18 }} transition={{ duration: .25 }} className="flex cursor-pointer select-none flex-col items-center" onClick={handleGiftClick} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleGiftClick(); }} aria-label="Open your birthday gift">
          <motion.div whileHover={{ scale: 1.035, rotateZ: -1.2 }} animate={clickCount === 0 ? { y: [0, -9, 0], rotateZ: [0, -.7, 0, .7, 0] } : clickCount === 1 ? { rotateZ: [-1.6, 1.6, -1.2, 0], scale: 1.018 } : { rotateZ: [-2.2, 2.2, -1.6, 0], scale: 1.035 }} transition={{ duration: clickCount === 0 ? 2.7 : .42, repeat: clickCount === 0 ? Infinity : 0, ease: 'easeInOut' }}><GiftArtwork /></motion.div>
          <motion.div className="mt-5 text-center" animate={{ opacity: [.55, 1, .55] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}><p className="font-sans text-xs font-semibold uppercase tracking-[.24em] text-primary">{getInstruction()}</p><div className="mt-3 flex items-center justify-center gap-2">{[0, 1, 2].map(step => <span key={step} className={`h-1.5 rounded-full transition-all duration-300 ${step < clickCount ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`} />)}</div></motion.div>
          {clickCount === 0 && <motion.div animate={{ opacity: [.55, 1, .55], y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mt-5 flex items-center gap-2 rounded-full border border-primary/15 bg-white/55 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm shadow-sm"><span>✨</span><span>Three little taps. One big surprise.</span><span>💗</span></motion.div>}
        </motion.div> : <motion.div key="opened" initial={{ opacity: 0, scale: .88, y: 65 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', damping: 15 }} className="flex w-full flex-col items-center gap-10">
          <motion.div initial={{ opacity: 0, scale: .9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .7 }} className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-primary/20 bg-white/60 p-2 shadow-[0_25px_70px_rgba(173,61,108,.18)] backdrop-blur-md group"><img src={revealImg} alt="A beautiful memory together" className="aspect-[4/5] w-full rounded-[22px] object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.025]" /><div className="pointer-events-none absolute inset-2 rounded-[22px] bg-gradient-to-t from-black/30 via-transparent to-white/10" /><div className="pointer-events-none absolute inset-x-5 bottom-5 h-24 rounded-full bg-white/15 blur-2xl" /></motion.div>
          <AnimatePresence mode="wait">{answer === null && <motion.div key="question" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .1 }} className="flex flex-col items-center gap-8 text-center"><h3 className="font-cursive text-5xl leading-tight text-primary text-glow md:text-7xl">Will you be my love forever?</h3><div className="flex min-h-[80px] flex-wrap items-center justify-center gap-8"><motion.button whileHover={{ scale: 1.08, y: -4 }} whileTap={{ scale: .93 }} onClick={handleYes} className="rounded-full bg-primary px-14 py-5 font-sans text-xl font-semibold tracking-widest text-primary-foreground shadow-[0_0_40px_rgba(186,75,117,.5)] transition-all duration-300 hover:shadow-[0_0_65px_rgba(186,75,117,.75)]">Yes</motion.button><RunawayNo onActualClick={() => setAnswer('no')} /></div></motion.div>}{answer === 'yes' && <motion.div key="yes" initial={{ opacity: 0, scale: .65 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 11 }} className="space-y-4 text-center"><h3 className="font-cursive text-6xl text-primary text-glow md:text-8xl">Forever it is.</h3><p className="font-sans text-lg text-muted-foreground">You just made me the happiest person alive, Bhavanika.</p></motion.div>}{answer === 'no' && <motion.div key="no" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 text-center"><h3 className="font-serif text-3xl text-foreground md:text-5xl">My heart says... try again.</h3><p className="font-sans text-lg text-muted-foreground">Because some love stories don't accept "no" as an answer.</p><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} onClick={() => setAnswer(null)} className="mt-4 rounded-full border border-primary/30 bg-primary/10 px-10 py-4 font-sans text-base tracking-widest text-primary transition-all hover:bg-primary/20">Let me answer again</motion.button></motion.div>}</AnimatePresence>
        </motion.div>}
      </AnimatePresence>
    </div>
  </section>;
};

export default InteractiveGift;
