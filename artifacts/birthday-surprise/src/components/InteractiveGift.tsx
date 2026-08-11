import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import revealImg from '@assets/IMG_20260730_235824.png';

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
  { x: 190, y: -90, rotate: -12 }, { x: -205, y: 70, rotate: 15 }, { x: 135, y: 125, rotate: -9 },
  { x: -165, y: -120, rotate: 13 }, { x: 215, y: 45, rotate: -16 }, { x: -105, y: 135, rotate: 18 },
  { x: 155, y: -135, rotate: -13 }, { x: -220, y: -55, rotate: 11 },
];

interface RunawayNoProps { onSadAttempt: () => void; }

const RunawayNo: React.FC<RunawayNoProps> = ({ onSadAttempt }) => {
  const [escaped, setEscaped] = useState(false);
  const [escapeIndex, setEscapeIndex] = useState(0);
  const lastEscape = useRef(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 360, damping: 24, mass: 0.65 });
  const springY = useSpring(y, { stiffness: 360, damping: 24, mass: 0.65 });

  const escape = useCallback(() => {
    const now = Date.now();
    if (now - lastEscape.current < 220) return;
    lastEscape.current = now;
    const next = (escapeIndex + 1) % ESCAPE_MOVES.length;
    setEscapeIndex(next);
    setEscaped(true);
    const move = ESCAPE_MOVES[next];
    x.set(move.x); y.set(move.y); onSadAttempt();
  }, [escapeIndex, onSadAttempt, x, y]);

  return (
    <motion.button type="button" style={{ x: springX, y: springY, rotate: escaped ? ESCAPE_MOVES[escapeIndex].rotate : 0, position: 'relative', zIndex: 20 }} onPointerEnter={escaped ? escape : undefined} onPointerDown={escape} whileHover={{ scale: escaped ? 1 : 1.06 }} whileTap={{ scale: escaped ? 0.92 : 0.96 }} animate={escaped ? { x: springX, y: springY } : { x: 0, y: 0 }} className="rounded-full border border-primary/20 bg-white/75 px-12 py-4 font-sans text-lg font-semibold tracking-[0.16em] text-primary shadow-[0_10px_30px_rgba(190,70,120,.10)] backdrop-blur-md" title={escaped ? 'Catch me if you can 😭' : 'NO'}>
      NO
    </motion.button>
  );
};

const RealisticKitten = ({ answer, sadCount }: { answer: 'yes' | null; sadCount: number }) => {
  const sad = answer !== 'yes' && sadCount > 0;
  const happy = answer === 'yes';
  const sadLines = [
    'Awww thangameyy… please don’t say no to me 🥺',
    'My little heart is breakinggg… choose me? 💔',
    'Why are you trying to click NOOO… I’ll cry 😭',
    'Thangameyy, I just want to be your yellow forever… 🥹💛',
  ];

  return (
    <motion.div className="relative mt-7 flex flex-col items-center" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <motion.div
        className="relative h-[310px] w-[290px] md:h-[360px] md:w-[340px] [perspective:1200px]"
        animate={happy
          ? { y: [0, -10, 0], rotateY: [-4, 4, -2, 0], rotateZ: [0, -1.5, 1.5, 0], scale: [1, 1.045, 1] }
          : sad
            ? { y: [0, 8, 0], rotateZ: [-1.8, 1.8, -1.2, 0], x: [0, -3, 3, -2, 0], scale: [1, .985, 1] }
            : { y: [0, -6, 0], rotateZ: [0, .7, 0] }}
        transition={{ duration: happy ? 1.55 : sad ? .85 : 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 360 390" className="h-full w-full overflow-visible drop-shadow-[0_30px_28px_rgba(113,38,73,.25)]" role="img" aria-label={happy ? 'A smiling cute pink kitten' : sad ? 'A crying cute pink kitten' : 'A cute pink kitten'}>
          <defs>
            <radialGradient id="fur" cx="34%" cy="20%" r="80%">
              <stop offset="0%" stopColor="#ffe8f1" />
              <stop offset="28%" stopColor="#ffbfd8" />
              <stop offset="62%" stopColor="#f28eb7" />
              <stop offset="86%" stopColor="#d34f86" />
              <stop offset="100%" stopColor="#9c285b" />
            </radialGradient>
            <linearGradient id="ear" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffe6f0" />
              <stop offset="45%" stopColor="#ef9ab9" />
              <stop offset="100%" stopColor="#b9366c" />
            </linearGradient>
            <radialGradient id="muzzle" cx="50%" cy="20%" r="85%">
              <stop offset="0%" stopColor="#fff7fa" />
              <stop offset="58%" stopColor="#ffd9e7" />
              <stop offset="100%" stopColor="#f39abb" />
            </radialGradient>
            <radialGradient id="eye" cx="38%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#7d6c78" />
              <stop offset="18%" stopColor="#26131f" />
              <stop offset="70%" stopColor="#08050a" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
            <linearGradient id="chest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff8fb" />
              <stop offset="55%" stopColor="#ffddea" />
              <stop offset="100%" stopColor="#ee91b6" />
            </linearGradient>
            <filter id="softFur"><feTurbulence type="fractalNoise" baseFrequency=".025" numOctaves="2" seed="7" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="1.7" /></filter>
            <filter id="glow"><feGaussianBlur stdDeviation="7" /></filter>
          </defs>

          <ellipse cx="180" cy="365" rx="104" ry="15" fill="#7d2451" opacity=".18" filter="url(#glow)" />

          <motion.g animate={sad ? { rotate: [-2, 2, -2] } : happy ? { rotate: [-1, 1, -1] } : {}} transition={{ duration: .8, repeat: Infinity }} style={{ transformOrigin: '180px 250px' }}>
            <path d="M94 145 C65 175 59 247 74 304 C84 343 113 358 180 358 C247 358 276 343 286 304 C301 247 295 175 266 145 C245 121 216 108 180 108 C144 108 115 121 94 145Z" fill="url(#fur)" filter="url(#softFur)" />
            <path d="M126 276 C133 311 147 340 180 346 C213 340 227 311 234 276 C218 286 199 292 180 292 C161 292 142 286 126 276Z" fill="url(#chest)" opacity=".92" />

            <path d="M100 145 L75 38 Q73 26 84 32 L151 82 Q124 108 100 145Z" fill="url(#fur)" stroke="#c94b7f" strokeWidth="2" />
            <path d="M260 145 L285 38 Q287 26 276 32 L209 82 Q236 108 260 145Z" fill="url(#fur)" stroke="#c94b7f" strokeWidth="2" />
            <path d="M94 111 L86 55 L132 88Z" fill="url(#ear)" opacity=".9" />
            <path d="M266 111 L274 55 L228 88Z" fill="url(#ear)" opacity=".9" />

            <path d="M116 101 Q180 63 244 101" fill="none" stroke="#fff1f6" strokeWidth="5" strokeLinecap="round" opacity=".48" />
            <path d="M147 88 Q158 75 170 68 M190 68 Q202 75 213 88" fill="none" stroke="#c94779" strokeWidth="5" strokeLinecap="round" opacity=".5" />

            <ellipse cx="132" cy="169" rx="39" ry="49" fill="#fff" opacity=".96" />
            <ellipse cx="228" cy="169" rx="39" ry="49" fill="#fff" opacity=".96" />
            <ellipse cx="136" cy="172" rx="28" ry="38" fill="url(#eye)" />
            <ellipse cx="224" cy="172" rx="28" ry="38" fill="url(#eye)" />
            <ellipse cx="125" cy="155" rx="9" ry="13" fill="#fff" />
            <ellipse cx="214" cy="155" rx="9" ry="13" fill="#fff" />
            <circle cx="146" cy="190" r="4" fill="#fff" opacity=".55" />
            <circle cx="234" cy="190" r="4" fill="#fff" opacity=".55" />

            <path d="M106 133 Q130 113 155 125" fill="none" stroke="#bd3b70" strokeWidth="7" strokeLinecap="round" opacity=".45" />
            <path d="M205 125 Q230 113 254 133" fill="none" stroke="#bd3b70" strokeWidth="7" strokeLinecap="round" opacity=".45" />

            <ellipse cx="151" cy="232" rx="39" ry="31" fill="url(#muzzle)" />
            <ellipse cx="209" cy="232" rx="39" ry="31" fill="url(#muzzle)" />
            <path d="M166 224 Q180 214 194 224 Q191 238 180 240 Q169 238 166 224Z" fill="#8d2b56" />
            {happy ? (
              <path d="M164 242 Q180 259 196 242" fill="none" stroke="#7c1f4b" strokeWidth="5" strokeLinecap="round" />
            ) : (
              <path d={sad ? "M164 254 Q180 242 196 254" : "M166 245 Q180 252 194 245"} fill="none" stroke="#7c1f4b" strokeWidth="4" strokeLinecap="round" />
            )}

            <ellipse cx="117" cy="236" rx="19" ry="12" fill="#f26f9e" opacity={happy ? .8 : .48} />
            <ellipse cx="243" cy="236" rx="19" ry="12" fill="#f26f9e" opacity={happy ? .8 : .48} />

            <path d="M145 243 L100 233 M145 249 L98 250 M215 243 L260 233 M215 249 L262 250" stroke="#a83a6b" strokeWidth="2.2" strokeLinecap="round" opacity=".7" />
            <path d="M123 275 Q105 298 106 331 Q119 349 140 332 Q146 306 143 279Z" fill="url(#fur)" />
            <path d="M237 275 Q255 298 254 331 Q241 349 220 332 Q214 306 217 279Z" fill="url(#fur)" />
            <path d="M111 329 Q123 341 137 329 M223 329 Q237 341 249 329" fill="none" stroke="#fff1f6" strokeWidth="4" strokeLinecap="round" opacity=".7" />

            {sad && (
              <>
                <motion.path d="M128 191 C126 224 126 254 132 280" fill="none" stroke="#78cfff" strokeWidth="7" strokeLinecap="round" animate={{ opacity: [0, 1, .2], pathLength: [0, 1, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />
                <motion.path d="M232 191 C234 224 234 254 228 280" fill="none" stroke="#78cfff" strokeWidth="7" strokeLinecap="round" animate={{ opacity: [0, 1, .2], pathLength: [0, 1, 1] }} transition={{ duration: 1.1, repeat: Infinity, delay: .32 }} />
                <motion.circle cx="132" cy="284" r="7" fill="#63c5ff" animate={{ cy: [284, 305, 284], opacity: [0, 1, 0] }} transition={{ duration: 1.1, repeat: Infinity }} />
                <motion.circle cx="228" cy="284" r="7" fill="#63c5ff" animate={{ cy: [284, 307, 284], opacity: [0, 1, 0] }} transition={{ duration: 1.1, repeat: Infinity, delay: .32 }} />
                <motion.path d="M155 145 Q166 153 174 145 M186 145 Q194 153 205 145" fill="none" stroke="#8f2a56" strokeWidth="4" strokeLinecap="round" animate={{ y: [0, 3, 0] }} transition={{ duration: .7, repeat: Infinity }} />
              </>
            )}
            {happy && ['💛', '✨', '💖', '⭐'].map((emoji, i) => (
              <motion.text key={i} x={180 + (i - 1.5) * 35} y={105} textAnchor="middle" fontSize="22" initial={{ opacity: 0, scale: .4 }} animate={{ opacity: [0, 1, 0], y: [105, 55 - i * 7, 25 - i * 8], scale: [.4, 1.1, .7] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * .2 }}>{emoji}</motion.text>
            ))}
          </motion.g>
        </svg>
      </motion.div>

      <AnimatePresence mode="wait">
        {happy ? (
          <motion.div key="happy" className="mt-1 max-w-xl text-center" initial={{ opacity: 0, y: 10, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
            <p className="font-serif text-2xl font-semibold text-primary md:text-3xl">Yes! I knew you would choose me! 💛</p>
            <p className="mt-2 font-sans text-base leading-relaxed text-foreground/75 md:text-lg">Look at that smileee… you just made my little kitty so happy. 🥹💕</p>
          </motion.div>
        ) : sad ? (
          <motion.div key={`sad-${sadCount}`} className="mt-1 max-w-xl text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-sans text-lg leading-relaxed text-foreground/80 md:text-xl">{sadLines[Math.min(sadCount - 1, sadLines.length - 1)]}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary/60">Look at those tears… the NO button really hurt her heart 😭</p>
          </motion.div>
        ) : (
          <motion.p key="waiting" className="mt-1 font-sans text-base italic text-foreground/65 md:text-lg">Hehe… look at my eyes. I’m waiting for your answer, my love. 💛</motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const GiftArtwork = ({ opening = false }: { opening?: boolean }) => (
  <div className="relative h-[340px] w-[340px] md:h-[410px] md:w-[410px] [perspective:1100px]">
    <motion.div className="absolute bottom-[10%] left-1/2 h-8 w-[66%] -translate-x-1/2 rounded-full bg-black/20 blur-2xl" animate={opening ? { scaleX: 0.78, opacity: 0.1 } : { scaleX: [0.92, 1, 0.92], opacity: [0.16, 0.23, 0.16] }} transition={{ duration: 2.5, repeat: opening ? 0 : Infinity, ease: 'easeInOut' }} />
    {opening && <>
      <motion.div initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: [0, 0.9, 0.45, 0], scale: [0.2, 0.7, 1.1, 1.35] }} transition={{ duration: 1.45 }} className="absolute left-1/2 top-[46%] z-0 h-48 w-48 -translate-x-1/2 rounded-full bg-rose-100 blur-3xl" />
      <motion.div initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: [0, 1, 0], scale: [0.2, 1.1, 1.4] }} transition={{ delay: 0.45, duration: 1.4 }} className="absolute left-1/2 top-[25%] z-[65] -translate-x-1/2 text-5xl">💛</motion.div>
      <motion.div initial={{ y: 65, opacity: 0, scale: 0.78, rotate: -1.5 }} animate={{ y: -58, opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.56, duration: 0.95, ease: [0.16, 1, 0.3, 1] }} className="absolute left-1/2 top-[34%] z-[50] w-[56%] -translate-x-1/2 overflow-hidden rounded-[24px] border-[6px] border-white bg-white shadow-[0_24px_45px_rgba(70,12,40,.32)] md:w-[55%]"><div className="aspect-[4/5] w-full"><img src={revealImg} alt="A beautiful memory together" className="h-full w-full object-cover" /></div><div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/15" /></motion.div>
    </>}
    <div className="absolute bottom-[18%] left-1/2 z-[25] h-[42%] w-[62%] -translate-x-1/2 overflow-hidden rounded-b-[26px] rounded-t-[12px] border border-white/30 bg-gradient-to-br from-[#f6a9c7] via-[#e277a4] to-[#a73e68] shadow-[0_28px_40px_rgba(105,24,62,.28)]"><div className="absolute inset-y-0 left-1/2 w-[14%] -translate-x-1/2 bg-gradient-to-r from-[#d46a95] via-[#fff1f7] to-[#d46a95] shadow-[0_0_16px_rgba(255,255,255,.3)]" /><div className="absolute inset-x-0 top-0 h-6 bg-white/15" /><div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" /></div>
    <motion.div initial={false} animate={opening ? { y: -92, rotateZ: -3, rotateX: -8 } : { y: 0, rotateZ: 0, rotateX: 0 }} transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }} className="absolute left-[15%] top-[28%] z-[55] h-[18%] w-[70%] rounded-[16px] border border-white/35 bg-gradient-to-br from-[#ffc5dd] via-[#e786ae] to-[#b34870] shadow-[0_18px_28px_rgba(90,18,55,.28)] [transform-origin:50%_100%] [transform-style:preserve-3d]"><div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/35 via-transparent to-black/10" /><div className="absolute inset-y-0 left-1/2 w-[14%] -translate-x-1/2 bg-gradient-to-r from-[#e39ab9] via-[#fff3f8] to-[#d96d99]" /></motion.div>
    <motion.div initial={false} animate={opening ? { y: -132, rotateZ: -7, scale: 0.88, opacity: 0.98 } : { y: 0, rotateZ: 0, scale: 1, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="absolute left-1/2 top-[20%] z-[65] h-20 w-36 -translate-x-1/2"><div className="absolute left-1 top-3 h-14 w-16 -rotate-[28deg] rounded-[70%_30%_70%_30%] border-4 border-[#ef9dbd] bg-gradient-to-br from-[#ffd4e5] to-[#c94f7c] shadow-lg" /><div className="absolute right-1 top-3 h-14 w-16 rotate-[28deg] rounded-[30%_70%_30%_70%] border-4 border-[#ef9dbd] bg-gradient-to-bl from-[#ffd4e5] to-[#c94f7c] shadow-lg" /><div className="absolute left-1/2 top-7 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-[#ffeaf2] bg-[#c9517e] shadow-md" /></motion.div>
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
    else { setClickCount(3); setIsOpening(true); window.setTimeout(() => setIsOpening(false), 2050); }
  };
  const handleYes = () => { setAnswer('yes'); setSadCount(0); setShowConfetti(true); window.setTimeout(() => setShowConfetti(false), 5000); };
  const handleSadAttempt = () => { if (answer === 'yes') return; setSadCount((c) => c + 1); };
  const getInstruction = () => isOpening ? 'Opening your surprise...' : clickCount === 0 ? 'A little gift, made with love' : clickCount === 1 ? 'The ribbon is loosening...' : 'One more little tap';

  return (
    <section className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8fc] via-[#faedf5] to-[#fff9f7]" />
      <div className="absolute inset-0 opacity-[0.20] bg-[radial-gradient(circle_at_20%_18%,rgba(255,182,211,.85),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(255,223,140,.75),transparent_28%)]" />
      {showConfetti && <Confetti />}
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center px-5 md:px-8">
        <AnimatePresence mode="wait">
          {isOpening ? (
            <motion.div key="opening" className="flex w-full flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><GiftArtwork opening /><motion.p animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 0.9, repeat: Infinity }} className="-mt-2 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary">Opening your surprise...</motion.p></motion.div>
          ) : !isOpened ? (
            <motion.div key="closed" exit={{ opacity: 0, scale: 0.92, y: 18 }} transition={{ duration: 0.25 }} className="flex cursor-pointer select-none flex-col items-center" onClick={handleGiftClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGiftClick(); }} aria-label="Open your birthday gift">
              <motion.div whileHover={{ scale: 1.035, rotateZ: -1.2 }} animate={clickCount === 0 ? { y: [0, -9, 0], rotateZ: [0, -.7, 0, .7, 0] } : clickCount === 1 ? { rotateZ: [-1.6, 1.6, -1.2, 0], scale: 1.018 } : { rotateZ: [-2.2, 2.2, -1.6, 0], scale: 1.035 }} transition={{ duration: clickCount === 0 ? 2.7 : .42, repeat: clickCount === 0 ? Infinity : 0, ease: 'easeInOut' }}><GiftArtwork /></motion.div>
              <motion.div className="mt-5 text-center" animate={{ opacity: [.55, 1, .55] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}><p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary">{getInstruction()}</p><div className="mt-3 flex items-center justify-center gap-2">{[0,1,2].map((step) => <span key={step} className={`h-1.5 rounded-full transition-all duration-300 ${step < clickCount ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`} />)}</div></motion.div>
            </motion.div>
          ) : (
            <motion.div key="question" className="relative flex w-full flex-col items-center text-center overflow-hidden rounded-[34px] border border-white/60 bg-white/55 px-5 py-10 shadow-[0_28px_90px_rgba(102,48,82,.16)] backdrop-blur-md md:px-10 md:py-12">
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,.55),rgba(255,235,247,.65),rgba(255,247,215,.52))]" />
              <motion.div initial={{ scale: .96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-x-8 top-8 -z-10 overflow-hidden rounded-[28px] opacity-30 blur-[1px] md:inset-x-16"><img src={revealImg} alt="Our favorite memory" className="h-64 w-full object-cover object-center md:h-80" /></motion.div>
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/90 to-transparent -z-[5]" />
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary/75">One question from my heart</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-4xl font-sans text-4xl font-extrabold leading-[1.04] tracking-tight text-[#4e243e] md:text-6xl lg:text-7xl">WILL YOU BE MY <span className="bg-gradient-to-r from-[#f0b52e] via-[#ffd85a] to-[#e4a51e] bg-clip-text text-transparent">YELLOW</span> FOREVER?</motion.h2>
              <motion.div animate={{ scale: [1, 1.12, 1], rotate: [0, -3, 3, 0] }} transition={{ duration: 2.2, repeat: Infinity }} className="my-5 text-3xl">💛</motion.div>
              <p className="relative max-w-2xl font-sans text-base font-medium leading-relaxed text-[#5b4552] md:text-lg">Not just today. I want you beside me through our silly moments, favorite songs, little nicknames, long talks, and every beautiful tomorrow. You’re my yellow, thangameyy. 💛</p>
              <RealisticKitten answer={answer} sadCount={sadCount} />
              <div className="relative mt-10 flex min-h-[82px] w-full max-w-xl items-center justify-center gap-5 overflow-visible">
                <motion.button type="button" onClick={handleYes} whileHover={{ scale: 1.08 }} whileTap={{ scale: .94 }} animate={answer === 'yes' ? { scale: [1, 1.07, 1] } : {}} transition={{ duration: 1.4, repeat: answer === 'yes' ? Infinity : 0 }} className="rounded-full bg-gradient-to-r from-[#d65a96] to-[#b94179] px-12 py-4 font-sans text-lg font-bold tracking-[0.14em] text-white shadow-[0_14px_34px_rgba(190,70,120,.24)]">YES 💛</motion.button>
                <RunawayNo onSadAttempt={handleSadAttempt} />
              </div>
              {answer === 'yes' && <motion.div initial={{ opacity: 0, y: 15, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="mt-7 rounded-full border border-[#f1c86b]/30 bg-white/70 px-6 py-3 font-sans text-sm font-semibold text-[#73563c] shadow-sm backdrop-blur-md">💛 Officially my yellow forever. No take-backs. 💛</motion.div>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveGift;
