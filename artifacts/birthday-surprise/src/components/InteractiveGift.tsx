import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import revealImg from '@assets/IMG_20260730_235824.png';

// The uploaded black cat is embedded so the page does not depend on Replit or an extensionless asset.
const catImg = 'data:image/webp;base64,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';

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
        <motion.span key={p.id} initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }} animate={{ x: p.x, y: p.y, scale: [0, p.scale, p.scale * 0.7, 0], opacity: [1, 1, 0.8, 0], rotate: p.rotation }} transition={{ duration: 3.8, ease: 'easeOut', delay: p.delay }} className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-[3px] bg-primary" />
      ))}
    </div>
  );
};

const ESCAPE_MOVES = [
  { x: 190, y: -90, rotate: -12 }, { x: -205, y: 70, rotate: 15 }, { x: 135, y: 125, rotate: -9 }, { x: -165, y: -120, rotate: 13 },
  { x: 215, y: 45, rotate: -16 }, { x: -105, y: 135, rotate: 18 }, { x: 155, y: -135, rotate: -13 }, { x: -220, y: -55, rotate: 11 },
];

interface RunawayNoProps { onSadAttempt: () => void; }

const RunawayNo: React.FC<RunawayNoProps> = ({ onSadAttempt }) => {
  const [escapeIndex, setEscapeIndex] = useState(0);
  const [escapeCount, setEscapeCount] = useState(0);
  const lastEscape = useRef(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 24, mass: 0.75 });
  const springY = useSpring(y, { stiffness: 300, damping: 24, mass: 0.75 });

  const escape = useCallback(() => {
    const now = Date.now();
    if (now - lastEscape.current < 180) return;
    lastEscape.current = now;
    const next = (escapeIndex + 1) % ESCAPE_MOVES.length;
    setEscapeIndex(next);
    setEscapeCount((c) => c + 1);
    x.set(ESCAPE_MOVES[next].x);
    y.set(ESCAPE_MOVES[next].y);
    onSadAttempt();
  }, [escapeIndex, onSadAttempt, x, y]);

  return (
    <motion.button type="button" style={{ x: springX, y: springY, rotate: ESCAPE_MOVES[escapeIndex].rotate, position: 'relative', zIndex: 30 }} onMouseEnter={escape} onMouseMove={escape} onTouchStart={escape} onClick={escape} whileTap={{ scale: 0.9 }} className="group relative rounded-2xl border border-rose-200 bg-white/80 px-8 py-3.5 font-sans text-sm font-semibold tracking-[0.12em] text-rose-500 shadow-[0_10px_30px_rgba(190,70,120,.10)] backdrop-blur-md transition-shadow hover:shadow-[0_15px_35px_rgba(190,70,120,.18)]">
      <span className="block">NO</span>
      <span className="mt-0.5 block text-[10px] font-medium normal-case tracking-normal text-rose-300">{escapeCount ? 'try again…' : 'don’t make me sad 🥺'}</span>
    </motion.button>
  );
};

const CatReaction = ({ answer, sadCount }: { answer: 'yes' | null; sadCount: number }) => {
  const sad = answer !== 'yes' && sadCount > 0;
  const happy = answer === 'yes';
  const sadLines = [
    'Awww thangameyy… why are you trying to say no? 🥺',
    'Please don’t break my little heart… I just want you forever. 😿',
    'Thangameyy… look at me, I’m cryinggg. Please choose YES. 💔',
    'That NO keeps running away, but my little heart is still waiting for you. 😭💕',
  ];

  return (
    <motion.div className="relative mt-8 flex w-full max-w-3xl flex-col items-center" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="grid w-full items-center gap-5 md:grid-cols-[minmax(190px,240px)_1fr]">
        <div className="relative flex justify-center [perspective:1000px]">
          <motion.div
            animate={happy
              ? { y: [0, -13, 0], rotateY: [-8, 8, -4, 0], rotateZ: [0, -3, 3, 0], scale: [1, 1.08, 1] }
              : sad
                ? { y: [0, 7, 0], rotateZ: [-4, 4, -3, 3, 0], rotateY: [0, -10, 10, 0], scale: [1, .97, 1] }
                : { y: [0, -6, 0], rotateZ: [-1.5, 1.5, 0] }}
            transition={{ duration: happy ? 1.6 : sad ? 1.1 : 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative h-44 w-44 md:h-52 md:w-52 [transform-style:preserve-3d]"
          >
            <div className={`absolute -inset-8 rounded-full blur-3xl ${happy ? 'bg-yellow-200/75' : sad ? 'bg-sky-200/65' : 'bg-rose-200/45'}`} />
            <div className="absolute inset-2 rounded-[45%] bg-white/70 shadow-[0_25px_45px_rgba(70,20,50,.18)] [transform:translateZ(-10px)]" />
            <img src={catImg} alt="Our little love cat" className="relative h-full w-full object-contain drop-shadow-[0_28px_18px_rgba(20,10,20,.28)] [transform:translateZ(28px)]" />
            <div className="pointer-events-none absolute inset-[12%] rounded-full border border-white/50 shadow-[inset_0_0_20px_rgba(255,255,255,.35)] [transform:translateZ(35px)]" />

            {sad && <>
              <motion.span animate={{ y: [0, 22, 55], opacity: [0, 1, 0], scale: [0.7, 1, 0.7] }} transition={{ duration: 1.05, repeat: Infinity, delay: 0.05 }} className="absolute left-[34%] top-[45%] z-20 text-2xl">💧</motion.span>
              <motion.span animate={{ y: [0, 24, 58], opacity: [0, 1, 0], scale: [0.7, 1, 0.7] }} transition={{ duration: 1.05, repeat: Infinity, delay: 0.52 }} className="absolute left-[58%] top-[45%] z-20 text-2xl">💧</motion.span>
              <motion.span animate={{ opacity: [0, 1, 0], y: [0, -3, 0] }} transition={{ duration: .8, repeat: Infinity }} className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl">💔</motion.span>
            </>}
            {happy && <>{['💛', '✨', '💖', '⭐'].map((emoji, i) => <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.15, .7], y: [5, -28 - i * 8, -55 - i * 10], x: [0, (i - 1.5) * 25, (i - 1.5) * 42] }} transition={{ duration: 1.7, repeat: Infinity, delay: i * .2 }} className="absolute left-1/2 top-1/4 z-20 text-xl">{emoji}</motion.span>)}</>}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {happy ? (
            <motion.div key="happy" initial={{ opacity: 0, x: 20, scale: .94 }} animate={{ opacity: 1, x: 0, scale: 1 }} className="rounded-3xl border border-yellow-200/80 bg-white/75 p-6 text-left shadow-[0_15px_45px_rgba(190,140,20,.12)] backdrop-blur-md">
              <p className="font-sans text-2xl font-bold leading-tight text-rose-500 md:text-3xl">Yes! I knew you would choose me! 💛</p>
              <p className="mt-3 font-sans text-base leading-relaxed text-foreground/70 md:text-lg">Thanks… I love you, thangameyy. Forever and ever. 🥹💕</p>
              <div className="mt-4 inline-flex rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">my yellow forever ✨</div>
            </motion.div>
          ) : sad ? (
            <motion.div key={`sad-${sadCount}`} initial={{ opacity: 0, x: 20, scale: .94 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -10 }} className="rounded-3xl border border-rose-200/80 bg-white/80 p-6 text-left shadow-[0_15px_45px_rgba(190,70,120,.12)] backdrop-blur-md">
              <p className="font-sans text-lg font-semibold leading-relaxed text-rose-600 md:text-xl">{sadLines[Math.min(sadCount - 1, sadLines.length - 1)]}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/55">Look at my tiny face… you really want to make me cry? 🥺</p>
            </motion.div>
          ) : (
            <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-3xl border border-primary/10 bg-white/65 p-6 text-left shadow-sm backdrop-blur-md">
              <p className="font-sans text-lg font-semibold text-rose-500">Hehe… I’m waiting for your answer, my love. 💛</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/55">I hope you choose the answer that makes this little cat smile. 🐾</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const GiftArtwork = ({ opening = false }: { opening?: boolean }) => (
  <div className="relative h-[340px] w-[340px] md:h-[410px] md:w-[410px] [perspective:1100px]">
    <motion.div className="absolute bottom-[10%] left-1/2 h-8 w-[66%] -translate-x-1/2 rounded-full bg-black/20 blur-2xl" animate={opening ? { scaleX: .78, opacity: .1 } : { scaleX: [.92, 1, .92], opacity: [.16, .23, .16] }} transition={{ duration: 2.5, repeat: opening ? 0 : Infinity, ease: 'easeInOut' }} />
    {opening && <>
      <motion.div initial={{ opacity: 0, scale: .2 }} animate={{ opacity: [0, .9, .45, 0], scale: [.2, .7, 1.1, 1.35] }} transition={{ duration: 1.45 }} className="absolute left-1/2 top-[46%] z-0 h-48 w-48 -translate-x-1/2 rounded-full bg-rose-100 blur-3xl" />
      <motion.div initial={{ opacity: 0, scale: .2 }} animate={{ opacity: [0, 1, 0], scale: [.2, 1.1, 1.4] }} transition={{ delay: .45, duration: 1.4 }} className="absolute left-1/2 top-[25%] z-[65] -translate-x-1/2 text-5xl">💛</motion.div>
      <motion.div initial={{ y: 65, opacity: 0, scale: .78, rotate: -1.5 }} animate={{ y: -58, opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .56, duration: .95, ease: [.16, 1, .3, 1] }} className="absolute left-1/2 top-[34%] z-[50] w-[56%] -translate-x-1/2 overflow-hidden rounded-[24px] border-[6px] border-white bg-white shadow-[0_24px_45px_rgba(70,12,40,.32)] md:w-[55%]"><div className="aspect-[4/5] w-full"><img src={revealImg} alt="A beautiful memory together" className="h-full w-full object-cover" /></div><div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/15" /></motion.div>
    </>}
    <div className="absolute bottom-[18%] left-1/2 z-[25] h-[42%] w-[62%] -translate-x-1/2 overflow-hidden rounded-b-[26px] rounded-t-[12px] border border-white/30 bg-gradient-to-br from-[#f6a9c7] via-[#e277a4] to-[#a73e68] shadow-[0_28px_40px_rgba(105,24,62,.28)]"><div className="absolute inset-y-0 left-1/2 w-[14%] -translate-x-1/2 bg-gradient-to-r from-[#d46a95] via-[#fff1f7] to-[#d46a95] shadow-[0_0_16px_rgba(255,255,255,.3)]" /><div className="absolute inset-x-0 top-0 h-6 bg-white/15" /><div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" /></div>
    <motion.div initial={false} animate={opening ? { y: -92, rotateZ: -3, rotateX: -8 } : { y: 0, rotateZ: 0, rotateX: 0 }} transition={{ duration: 1.05, ease: [.16, 1, .3, 1] }} className="absolute left-[15%] top-[28%] z-[55] h-[18%] w-[70%] rounded-[16px] border border-white/35 bg-gradient-to-br from-[#ffc5dd] via-[#e786ae] to-[#b34870] shadow-[0_18px_28px_rgba(90,18,55,.28)] [transform-origin:50%_100%] [transform-style:preserve-3d]"><div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/35 via-transparent to-black/10" /><div className="absolute inset-y-0 left-1/2 w-[14%] -translate-x-1/2 bg-gradient-to-r from-[#e39ab9] via-[#fff3f8] to-[#d96d99]" /></motion.div>
    <motion.div initial={false} animate={opening ? { y: -132, rotateZ: -7, scale: .88, opacity: .98 } : { y: 0, rotateZ: 0, scale: 1, opacity: 1 }} transition={{ duration: 1, ease: [.16, 1, .3, 1] }} className="absolute left-1/2 top-[20%] z-[65] h-20 w-36 -translate-x-1/2"><div className="absolute left-1 top-3 h-14 w-16 -rotate-[28deg] rounded-[70%_30%_70%_30%] border-4 border-[#ef9dbd] bg-gradient-to-br from-[#ffd4e5] to-[#c94f7c] shadow-lg" /><div className="absolute right-1 top-3 h-14 w-16 rotate-[28deg] rounded-[30%_70%_30%_70%] border-4 border-[#ef9dbd] bg-gradient-to-bl from-[#ffd4e5] to-[#c94f7c] shadow-lg" /><div className="absolute left-1/2 top-7 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-[#ffeaf2] bg-[#c9517e] shadow-md" /></motion.div>
    <motion.div initial={false} animate={opening ? { y: -118, rotateZ: -12, opacity: 0 } : { y: 0, rotateZ: 0, opacity: 1 }} transition={{ duration: .8 }} className="absolute left-[42%] top-[33%] z-[60] h-16 w-5 -rotate-6 rounded-b-full bg-gradient-to-r from-[#f6b7d0] to-[#d76b98]" />
    <motion.div initial={false} animate={opening ? { y: -112, rotateZ: 12, opacity: 0 } : { y: 0, rotateZ: 0, opacity: 1 }} transition={{ duration: .8 }} className="absolute right-[42%] top-[33%] z-[60] h-16 w-5 rotate-6 rounded-b-full bg-gradient-to-r from-[#d76b98] to-[#f6b7d0]" />
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
            <motion.div key="opening" className="flex w-full flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><GiftArtwork opening /><motion.p animate={{ opacity: [.45, 1, .45] }} transition={{ duration: .9, repeat: Infinity }} className="-mt-2 font-sans text-xs font-semibold uppercase tracking-[.24em] text-primary">Opening your surprise...</motion.p></motion.div>
          ) : !isOpened ? (
            <motion.div key="closed" exit={{ opacity: 0, scale: .92, y: 18 }} transition={{ duration: .25 }} className="flex cursor-pointer select-none flex-col items-center" onClick={handleGiftClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGiftClick(); }} aria-label="Open your birthday gift">
              <motion.div whileHover={{ scale: 1.035, rotateZ: -1.2 }} animate={clickCount === 0 ? { y: [0, -9, 0], rotateZ: [0, -.7, 0, .7, 0] } : clickCount === 1 ? { rotateZ: [-1.6, 1.6, -1.2, 0], scale: 1.018 } : { rotateZ: [-2.2, 2.2, -1.6, 0], scale: 1.035 }} transition={{ duration: clickCount === 0 ? 2.7 : .42, repeat: clickCount === 0 ? Infinity : 0, ease: 'easeInOut' }}><GiftArtwork /></motion.div>
              <motion.div className="mt-5 text-center" animate={{ opacity: [.55, 1, .55] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}><p className="font-sans text-xs font-semibold uppercase tracking-[.24em] text-primary">{getInstruction()}</p><div className="mt-3 flex items-center justify-center gap-2">{[0, 1, 2].map((step) => <span key={step} className={`h-1.5 rounded-full transition-all duration-300 ${step < clickCount ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`} />)}</div></motion.div>
            </motion.div>
          ) : (
            <motion.div key="question" className="flex w-full flex-col items-center text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3 font-sans text-xs font-bold uppercase tracking-[.34em] text-primary/70">A little question from my heart</motion.p>
              <motion.h2 className="max-w-4xl font-sans text-4xl font-extrabold leading-[1.05] tracking-[-.035em] text-foreground md:text-6xl lg:text-7xl">WILL YOU BE MY <span className="text-[#d89b16] drop-shadow-[0_4px_18px_rgba(216,155,22,.22)]">YELLOW</span> FOREVER?</motion.h2>
              <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, -4, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="my-5 text-3xl">💛</motion.div>
              <p className="max-w-2xl font-sans text-base font-medium leading-relaxed text-foreground/65 md:text-lg">Not just today. I want you beside me through our silly moments, favorite songs, little nicknames, long talks, and every beautiful tomorrow. You’re my yellow, thangameyy. 💛</p>

              <CatReaction answer={answer} sadCount={sadCount} />

              <div className="relative mt-7 flex min-h-[86px] w-full max-w-xl items-center justify-center gap-5 overflow-visible">
                <motion.button type="button" onClick={handleYes} whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: .94 }} animate={answer === 'yes' ? { scale: [1, 1.07, 1], boxShadow: ['0 10px 30px rgba(190,70,120,.12)', '0 15px 45px rgba(190,70,120,.28)', '0 10px 30px rgba(190,70,120,.12)'] } : {}} transition={{ duration: 1.4, repeat: answer === 'yes' ? Infinity : 0 }} className="rounded-2xl bg-primary px-10 py-4 font-sans text-base font-bold tracking-[.08em] text-white shadow-[0_12px_30px_rgba(190,70,120,.22)]">YES 💛</motion.button>
                <RunawayNo onSadAttempt={handleSadAttempt} />
              </div>

              {answer === 'yes' && <motion.div initial={{ opacity: 0, y: 15, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="mt-5 rounded-full border border-yellow-200 bg-white/75 px-6 py-3 font-sans text-sm font-semibold text-yellow-700 shadow-sm backdrop-blur-md">💛 Officially my yellow forever. No take-backs. 💛</motion.div>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveGift;
