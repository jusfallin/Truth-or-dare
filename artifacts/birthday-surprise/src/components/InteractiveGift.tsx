import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import revealImg from '@assets/IMG_20260730_235824.png';
import catImg from '@assets/banana cat';

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
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
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
  { x: 190, y: -90, rotate: -12 },
  { x: -205, y: 70, rotate: 15 },
  { x: 135, y: 125, rotate: -9 },
  { x: -165, y: -120, rotate: 13 },
  { x: 215, y: 45, rotate: -16 },
  { x: -105, y: 135, rotate: 18 },
  { x: 155, y: -135, rotate: -13 },
  { x: -220, y: -55, rotate: 11 },
];

interface RunawayNoProps {
  onSadAttempt: () => void;
}

const RunawayNo: React.FC<RunawayNoProps> = ({ onSadAttempt }) => {
  const [escapeIndex, setEscapeIndex] = useState(0);
  const [escapeCount, setEscapeCount] = useState(0);
  const lastEscape = useRef(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.7 });

  const escape = useCallback(() => {
    const now = Date.now();
    if (now - lastEscape.current < 180) return;
    lastEscape.current = now;
    const next = (escapeIndex + 1) % ESCAPE_MOVES.length;
    setEscapeIndex(next);
    setEscapeCount((c) => c + 1);
    const move = ESCAPE_MOVES[next];
    x.set(move.x);
    y.set(move.y);
    onSadAttempt();
  }, [escapeIndex, onSadAttempt, x, y]);

  return (
    <motion.button
      type="button"
      style={{ x: springX, y: springY, rotate: ESCAPE_MOVES[escapeIndex].rotate, position: 'relative', zIndex: 20 }}
      onMouseEnter={escape}
      onMouseMove={escape}
      onTouchStart={escape}
      onClick={escape}
      whileTap={{ scale: 0.9 }}
      className="rounded-full border border-primary/20 bg-white/75 px-12 py-4 font-sans text-lg font-medium tracking-[0.2em] text-muted-foreground shadow-sm backdrop-blur-md hover:shadow-lg"
      title={escapeCount > 3 ? 'Nope… I am running away 😭' : 'Try clicking me if you can'}
    >
      NO
    </motion.button>
  );
};

const CatReaction = ({ answer, sadCount }: { answer: 'yes' | null; sadCount: number }) => {
  const sad = answer !== 'yes' && sadCount > 0;
  const happy = answer === 'yes';

  const sadLines = [
    'Awww thangameyy… why are you trying to say no? 🥺',
    'Please don’t break my little heart… I just want you forever. 😿',
    'Thangameyy, that button is making me cryyy… choose YES for us. 💔',
    'I’ll keep running from that NO until you choose me. 😭💕',
  ];

  return (
    <motion.div
      className="relative mt-10 flex w-full max-w-xl flex-col items-center text-center"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative [perspective:1000px]">
        <motion.div
          animate={happy
            ? { y: [0, -18, 0], rotateY: [-7, 7, -4, 0], rotateZ: [0, -3, 3, 0], scale: [1, 1.08, 1] }
            : sad
              ? { y: [0, 8, 0], rotateZ: [-3, 3, -2, 2, 0], rotateY: [0, -8, 8, 0], scale: [1, 0.97, 1] }
              : { y: [0, -7, 0], rotateZ: [-1.5, 1.5, 0] }}
          transition={{ duration: happy ? 1.8 : sad ? 1.2 : 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative h-40 w-40 md:h-48 md:w-48 [transform-style:preserve-3d]"
        >
          <div className={`absolute -inset-5 rounded-full blur-3xl ${happy ? 'bg-yellow-200/70' : sad ? 'bg-blue-200/55' : 'bg-rose-200/35'}`} />
          <img src={catImg} alt="Our little love cat" className="relative h-full w-full object-contain drop-shadow-[0_25px_24px_rgba(70,20,50,.2)] [transform:translateZ(24px)]" />

          {sad && (
            <>
              <motion.span animate={{ y: [0, 24, 55], opacity: [0, 1, 0] }} transition={{ duration: 1.1, repeat: Infinity, delay: 0.05 }} className="absolute left-[36%] top-[45%] text-2xl">💧</motion.span>
              <motion.span animate={{ y: [0, 26, 58], opacity: [0, 1, 0] }} transition={{ duration: 1.1, repeat: Infinity, delay: 0.55 }} className="absolute left-[58%] top-[45%] text-2xl">💧</motion.span>
            </>
          )}

          {happy && (
            <>
              {['💛', '✨', '💖', '⭐'].map((emoji, i) => (
                <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.15, 0.7], y: [5, -28 - i * 8, -55 - i * 10], x: [0, (i - 1.5) * 25, (i - 1.5) * 42] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.22 }} className="absolute left-1/2 top-1/4 text-xl">{emoji}</motion.span>
              ))}
            </>
          )}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {happy ? (
          <motion.div key="happy" initial={{ opacity: 0, scale: 0.8, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-5">
            <p className="font-cursive text-3xl text-primary md:text-4xl">Yes! I knew you would choose me! 💛</p>
            <p className="mt-2 font-serif text-lg italic text-foreground/70">Thanks… I love you, thangameyy. Forever and ever. 🥹💕</p>
          </motion.div>
        ) : sad ? (
          <motion.div key={`sad-${sadCount}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-5 px-5">
            <p className="font-serif text-xl leading-relaxed text-foreground/80 md:text-2xl">{sadLines[Math.min(sadCount - 1, sadLines.length - 1)]}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary/65">The NO button is not cooperating anyway… 😭</p>
          </motion.div>
        ) : (
          <motion.p key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 font-serif text-xl italic text-foreground/70">Hehe… I’m waiting for your answer, my love. 💛</motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const GiftArtwork = ({ opening = false }: { opening?: boolean }) => (
  <div className="relative h-[340px] w-[340px] md:h-[410px] md:w-[410px] [perspective:1100px]">
    <motion.div className="absolute bottom-[10%] left-1/2 h-8 w-[66%] -translate-x-1/2 rounded-full bg-black/20 blur-2xl" animate={opening ? { scaleX: 0.78, opacity: 0.1 } : { scaleX: [0.92, 1, 0.92], opacity: [0.16, 0.23, 0.16] }} transition={{ duration: 2.5, repeat: opening ? 0 : Infinity, ease: 'easeInOut' }} />
    {opening && (
      <>
        <motion.div initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: [0, 0.9, 0.45, 0], scale: [0.2, 0.7, 1.1, 1.35] }} transition={{ duration: 1.45 }} className="absolute left-1/2 top-[46%] z-0 h-48 w-48 -translate-x-1/2 rounded-full bg-rose-100 blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: [0, 1, 0], scale: [0.2, 1.1, 1.4] }} transition={{ delay: 0.45, duration: 1.4 }} className="absolute left-1/2 top-[25%] z-[65] -translate-x-1/2 text-5xl">💛</motion.div>
        <motion.div initial={{ y: 65, opacity: 0, scale: 0.78, rotate: -1.5 }} animate={{ y: -58, opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.56, duration: 0.95, ease: [0.16, 1, 0.3, 1] }} className="absolute left-1/2 top-[34%] z-[50] w-[56%] -translate-x-1/2 overflow-hidden rounded-[24px] border-[6px] border-white bg-white shadow-[0_24px_45px_rgba(70,12,40,.32)] md:w-[55%]">
          <div className="aspect-[4/5] w-full"><img src={revealImg} alt="A beautiful memory together" className="h-full w-full object-cover" /></div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/15" />
        </motion.div>
      </>
    )}
    <div className="absolute bottom-[18%] left-1/2 z-[25] h-[42%] w-[62%] -translate-x-1/2 overflow-hidden rounded-b-[26px] rounded-t-[12px] border border-white/30 bg-gradient-to-br from-[#f6a9c7] via-[#e277a4] to-[#a73e68] shadow-[0_28px_40px_rgba(105,24,62,.28)]">
      <div className="absolute inset-y-0 left-1/2 w-[14%] -translate-x-1/2 bg-gradient-to-r from-[#d46a95] via-[#fff1f7] to-[#d46a95] shadow-[0_0_16px_rgba(255,255,255,.3)]" />
      <div className="absolute inset-x-0 top-0 h-6 bg-white/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
    </div>
    <motion.div initial={false} animate={opening ? { y: -92, rotateZ: -3, rotateX: -8 } : { y: 0, rotateZ: 0, rotateX: 0 }} transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }} className="absolute left-[15%] top-[28%] z-[55] h-[18%] w-[70%] rounded-[16px] border border-white/35 bg-gradient-to-br from-[#ffc5dd] via-[#e786ae] to-[#b34870] shadow-[0_18px_28px_rgba(90,18,55,.28)] [transform-origin:50%_100%] [transform-style:preserve-3d]">
      <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/35 via-transparent to-black/10" /><div className="absolute inset-y-0 left-1/2 w-[14%] -translate-x-1/2 bg-gradient-to-r from-[#e39ab9] via-[#fff3f8] to-[#d96d99]" />
    </motion.div>
    <motion.div initial={false} animate={opening ? { y: -132, rotateZ: -7, scale: 0.88, opacity: 0.98 } : { y: 0, rotateZ: 0, scale: 1, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="absolute left-1/2 top-[20%] z-[65] h-20 w-36 -translate-x-1/2">
      <div className="absolute left-1 top-3 h-14 w-16 -rotate-[28deg] rounded-[70%_30%_70%_30%] border-4 border-[#ef9dbd] bg-gradient-to-br from-[#ffd4e5] to-[#c94f7c] shadow-lg" /><div className="absolute right-1 top-3 h-14 w-16 rotate-[28deg] rounded-[30%_70%_30%_70%] border-4 border-[#ef9dbd] bg-gradient-to-bl from-[#ffd4e5] to-[#c94f7c] shadow-lg" /><div className="absolute left-1/2 top-7 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-[#ffeaf2] bg-[#c9517e] shadow-md" />
    </motion.div>
    <motion.div initial={false} animate={opening ? { y: -118, rotateZ: -12, opacity: 0 } : { y: 0, rotateZ: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="absolute left-[42%] top-[33%] z-[60] h-16 w-5 -rotate-6 rounded-b-full bg-gradient-to-r from-[#f6b7d0] to-[#d76b98]" />
    <motion.div initial={false} animate={opening ? { y: -112, rotateZ: 12, opacity: 0 } : { y: 0, rotateZ: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="absolute right-[42%] top-[33%] z-[60] h-16 w-5 rotate-6 rounded-b-full bg-gradient-to-r from-[#d76b98] to-[#f6b7d0]" />
  </div>
);

const InteractiveGift = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [answer, setAnswer] = useState<'yes' | null>(null);
  const [sadCount, setSadCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const isOpened = clickCount >= 3 && !isOpening;

  const handleGiftClick = () => {
    if (isOpening || isOpened) return;
    if (clickCount < 2) setClickCount((p) => p + 1);
    else {
      setClickCount(3);
      setIsOpening(true);
      window.setTimeout(() => setIsOpening(false), 2050);
    }
  };

  const handleYes = () => {
    setAnswer('yes');
    setSadCount(0);
    setShowConfetti(true);
    window.setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleSadAttempt = () => {
    if (answer === 'yes') return;
    setSadCount((c) => c + 1);
  };

  const getInstruction = () => isOpening ? 'Opening your surprise...' : clickCount === 0 ? 'A little gift, made with love' : clickCount === 1 ? 'The ribbon is loosening...' : 'One more little tap';

  return (
    <section className="relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff9fc] via-[#fff2f7] to-[#fdf8fb]" />
      <div className="absolute left-[8%] top-[18%] h-64 w-64 rounded-full bg-rose-200/20 blur-3xl" />
      <div className="absolute bottom-[8%] right-[8%] h-72 w-72 rounded-full bg-yellow-100/30 blur-3xl" />
      {showConfetti && <Confetti />}

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 md:px-8">
        <AnimatePresence mode="wait">
          {isOpening ? (
            <motion.div key="opening" className="flex w-full flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GiftArtwork opening />
              <motion.p animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 0.9, repeat: Infinity }} className="-mt-2 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary">Opening your surprise...</motion.p>
            </motion.div>
          ) : !isOpened ? (
            <motion.div key="closed" exit={{ opacity: 0, scale: 0.92, y: 18 }} transition={{ duration: 0.25 }} className="flex cursor-pointer select-none flex-col items-center" onClick={handleGiftClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGiftClick(); }} aria-label="Open your birthday gift">
              <motion.div whileHover={{ scale: 1.035, rotateZ: -1.2 }} animate={clickCount === 0 ? { y: [0, -9, 0], rotateZ: [0, -0.7, 0, 0.7, 0] } : clickCount === 1 ? { rotateZ: [-1.6, 1.6, -1.2, 0], scale: 1.018 } : { rotateZ: [-2.2, 2.2, -1.6, 0], scale: 1.035 }} transition={{ duration: clickCount === 0 ? 2.7 : 0.42, repeat: clickCount === 0 ? Infinity : 0, ease: 'easeInOut' }}>
                <GiftArtwork />
              </motion.div>
              <motion.div className="mt-5 text-center" animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary">{getInstruction()}</p>
                <div className="mt-3 flex items-center justify-center gap-2">{[0, 1, 2].map((step) => <span key={step} className={`h-1.5 rounded-full transition-all duration-300 ${step < clickCount ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`} />)}</div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="question" className="flex w-full flex-col items-center text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">One question from my heart</motion.p>
              <motion.h2 className="max-w-4xl font-serif text-4xl font-semibold leading-tight text-foreground md:text-6xl lg:text-7xl">
                WILL YOU BE MY <span className="font-cursive text-primary">YELLOW</span> FOREVER?
              </motion.h2>
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }} className="my-6 text-3xl">💛</motion.div>
              <p className="max-w-xl font-serif text-lg italic leading-relaxed text-foreground/65 md:text-xl">Not just today. Not just for a little while. I want you beside me through all the ordinary days, silly moments, favorite songs, and every beautiful tomorrow. 🥹</p>

              <CatReaction answer={answer} sadCount={sadCount} />

              <div className="relative mt-10 flex min-h-[82px] w-full max-w-xl items-center justify-center gap-5 overflow-visible">
                <motion.button type="button" onClick={handleYes} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} animate={answer === 'yes' ? { scale: [1, 1.08, 1], boxShadow: ['0 10px 30px rgba(190,70,120,.12)', '0 15px 45px rgba(190,70,120,.28)', '0 10px 30px rgba(190,70,120,.12)'] } : {}} transition={{ duration: 1.4, repeat: answer === 'yes' ? Infinity : 0 }} className="rounded-full bg-primary px-12 py-4 font-sans text-lg font-semibold tracking-[0.16em] text-white shadow-[0_12px_30px_rgba(190,70,120,.22)]">YES 💛</motion.button>
                <RunawayNo onSadAttempt={handleSadAttempt} />
              </div>

              {answer === 'yes' && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-full border border-primary/15 bg-white/60 px-6 py-3 text-sm text-muted-foreground shadow-sm backdrop-blur-md">💛 Officially my yellow forever. No take-backs. 💛</motion.div>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveGift;
