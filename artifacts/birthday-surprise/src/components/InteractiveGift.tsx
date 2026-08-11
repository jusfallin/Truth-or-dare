import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import revealImg from '@assets/IMG_20260730_235824.png';

const confettiColors = ['#f6c85f', '#e88ab0', '#fff1b8', '#c94f7f', '#ffffff'];

const Celebration = () => {
  const pieces = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 900,
    y: 260 + Math.random() * 650,
    r: Math.random() * 720,
    delay: Math.random() * 0.45,
    scale: 0.55 + Math.random() * 0.9,
    color: confettiColors[i % confettiColors.length],
  })), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden">
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.5, 2.8], opacity: [0, 0.65, 0] }} transition={{ duration: 1.8, ease: 'easeOut' }} className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe28b] blur-3xl" />
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: -30, rotate: 0, scale: 0, opacity: 0 }}
          animate={{ x: p.x, y: p.y, rotate: p.r, scale: [0, p.scale, p.scale * 0.8, 0], opacity: [0, 1, 0.9, 0] }}
          transition={{ duration: 3.2, delay: p.delay, ease: 'easeOut' }}
          style={{ background: p.color }}
          className="absolute left-1/2 top-1/2 h-3 w-2 rounded-full shadow-sm"
        />
      ))}
      {[...Array(14)].map((_, i) => (
        <motion.span
          key={`heart-${i}`}
          initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 0.65], x: (Math.random() - 0.5) * 520, y: -120 - Math.random() * 420 }}
          transition={{ duration: 2.3, delay: i * 0.06, ease: 'easeOut' }}
          className="absolute left-1/2 top-[55%] text-2xl"
        >
          {i % 2 ? '💖' : '💛'}
        </motion.span>
      ))}
    </div>
  );
};

const escapeMoves = [
  { x: 72, y: -18, rotate: -4 },
  { x: -78, y: 22, rotate: 4 },
  { x: 58, y: 34, rotate: 3 },
  { x: -64, y: -24, rotate: -3 },
  { x: 88, y: 8, rotate: 5 },
  { x: -86, y: 14, rotate: -5 },
];

const noMessages = [
  'Hehe… you almost got me. 🥺',
  'Waittt… are you really trying to press NO? 💔',
  'My little heart is getting nervous now… 🥹',
  'One tiny YES would make this kitty smile again. 💛',
  'Okayyy, the NO button is getting shy… 😭',
  'Thangameyy… give my little heart a chance? 🥺💛',
];

const RunawayNo = ({ onAttempt }: { onAttempt: () => void }) => {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const last = useRef(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 520, damping: 30, mass: 0.55 });
  const sy = useSpring(y, { stiffness: 520, damping: 30, mass: 0.55 });

  const move = useCallback(() => {
    const now = Date.now();
    if (now - last.current < 280) return;
    last.current = now;
    const next = (index + 1) % escapeMoves.length;
    setIndex(next);
    setStarted(true);
    x.set(escapeMoves[next].x);
    y.set(escapeMoves[next].y);
    onAttempt();
  }, [index, onAttempt, x, y]);

  return (
    <motion.button
      type="button"
      onPointerDown={move}
      whileHover={{ scale: started ? 1.03 : 1.05 }}
      whileTap={{ scale: 0.96 }}
      style={{ x: sx, y: sy, rotate: started ? escapeMoves[index].rotate : 0, zIndex: 40 }}
      className="rounded-full border border-[#c66b8f]/25 bg-white/90 px-11 py-4 font-serif text-lg font-semibold tracking-[0.12em] text-[#7d3857] shadow-[0_12px_32px_rgba(120,44,77,.12)] backdrop-blur-md"
    >
      NO
    </motion.button>
  );
};

const Cat = ({ answer, sadCount }: { answer: 'yes' | null; sadCount: number }) => {
  const happy = answer === 'yes';
  const sad = !happy && sadCount > 0;
  const message = sad ? noMessages[Math.min(sadCount - 1, noMessages.length - 1)] : 'Look into those eyes… I’m waiting for your little answer. 💛';

  return (
    <motion.div className="relative mt-5 flex w-full flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <motion.div
        className="relative h-[315px] w-[280px] md:h-[370px] md:w-[330px]"
        animate={happy ? { y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5, 0], scale: [1, 1.045, 1] } : sad ? { y: [0, 7, 0], x: [0, -2, 2, 0], rotate: [-1, 1, -1, 0] } : { y: [0, -5, 0] }}
        transition={{ duration: happy ? 1.25 : sad ? 0.8 : 2.7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 420 470" className="h-full w-full overflow-visible drop-shadow-[0_28px_30px_rgba(112,35,73,.24)]" role="img" aria-label={happy ? 'Smiling pink kitten' : sad ? 'Crying pink kitten' : 'Pink kitten'}>
          <defs>
            {/* Same pink palette as the existing reference-inspired cat; only the geometry/expression was rebuilt. */}
            <radialGradient id="catFur" cx="32%" cy="16%" r="90%"><stop offset="0" stopColor="#ffe8f1"/><stop offset=".28" stopColor="#ffbfd8"/><stop offset=".62" stopColor="#f28eb7"/><stop offset=".86" stopColor="#d34f86"/><stop offset="1" stopColor="#9c285b"/></radialGradient>
            <linearGradient id="catEar" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffe6f0"/><stop offset=".48" stopColor="#ef9ab9"/><stop offset="1" stopColor="#b9366c"/></linearGradient>
            <radialGradient id="catEye" cx="35%" cy="25%" r="78%"><stop stopColor="#756875"/><stop offset=".16" stopColor="#24131f"/><stop offset=".7" stopColor="#07040a"/><stop offset="1" stopColor="#000"/></radialGradient>
            <radialGradient id="catMuzzle"><stop stopColor="#fff7fa"/><stop offset=".6" stopColor="#ffd9e7"/><stop offset="1" stopColor="#f39abb"/></radialGradient>
            <linearGradient id="catDress" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff8fb"/><stop offset=".55" stopColor="#ffddea"/><stop offset="1" stopColor="#ee91b6"/></linearGradient>
            <linearGradient id="catRibbon" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffd4e5"/><stop offset=".5" stopColor="#ef6d9f"/><stop offset="1" stopColor="#b92f68"/></linearGradient>
            <linearGradient id="catRose" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff7d9d"/><stop offset=".5" stopColor="#d51f4d"/><stop offset="1" stopColor="#7f102d"/></linearGradient>
            <filter id="catGlow"><feGaussianBlur stdDeviation="8"/></filter>
          </defs>

          <ellipse cx="210" cy="440" rx="125" ry="18" fill="#7d2451" opacity=".18" filter="url(#catGlow)"/>

          {/* tail */}
          <path d="M322 333 C405 310 421 382 375 407 C348 422 322 398 346 382 C370 366 367 351 334 356" fill="none" stroke="#cf628e" strokeWidth="34" strokeLinecap="round"/>
          <path d="M322 333 C405 310 421 382 375 407" fill="none" stroke="#ffe3ec" strokeWidth="7" strokeLinecap="round" opacity=".45"/>

          {/* body */}
          <path d="M125 282 C91 321 92 390 122 425 C145 451 180 458 210 458 C240 458 275 451 298 425 C328 390 329 321 295 282 C264 248 156 248 125 282Z" fill="url(#catFur)"/>
          <path d="M155 311 C157 365 176 416 210 434 C244 416 263 365 265 311 C249 327 231 334 210 334 C189 334 171 327 155 311Z" fill="url(#catDress)" opacity=".72"/>

          {/* head + ears */}
          <path d="M84 165 C74 90 91 38 123 27 C145 19 177 55 210 55 C243 55 275 19 297 27 C329 38 346 90 336 165 C328 255 279 306 210 306 C141 306 92 255 84 165Z" fill="url(#catFur)"/>
          <path d="M94 143 L83 38 Q80 12 104 29 L164 84 Q126 103 94 143Z" fill="url(#catFur)" stroke="#c94b7f" strokeWidth="3"/>
          <path d="M326 143 L337 38 Q340 12 316 29 L256 84 Q294 103 326 143Z" fill="url(#catFur)" stroke="#c94b7f" strokeWidth="3"/>
          <path d="M105 111 L99 54 L145 89Z" fill="url(#catEar)"/>
          <path d="M315 111 L321 54 L275 89Z" fill="url(#catEar)"/>

          {/* bow */}
          <path d="M276 87 C251 64 239 79 249 105 C261 129 284 129 296 112 C308 129 331 129 343 105 C353 79 341 64 316 87 C303 77 289 77 276 87Z" fill="url(#catRibbon)" stroke="#b73770" strokeWidth="3"/>
          <circle cx="296" cy="108" r="14" fill="#f58ab2" stroke="#b73770" strokeWidth="3"/>

          {/* eyes */}
          <ellipse cx="146" cy="168" rx="43" ry="55" fill="#fff" opacity=".96"/>
          <ellipse cx="274" cy="168" rx="43" ry="55" fill="#fff" opacity=".96"/>
          <ellipse cx="150" cy="172" rx="31" ry="42" fill="url(#catEye)"/>
          <ellipse cx="270" cy="172" rx="31" ry="42" fill="url(#catEye)"/>
          <ellipse cx="138" cy="157" rx="10" ry="15" fill="#fff"/><ellipse cx="258" cy="157" rx="10" ry="15" fill="#fff"/>
          <circle cx="160" cy="191" r="4" fill="#fff" opacity=".55"/><circle cx="280" cy="191" r="4" fill="#fff" opacity=".55"/>

          {/* brows */}
          <path d="M109 128 Q143 102 177 124 M243 124 Q277 102 311 128" fill="none" stroke="#bd3b70" strokeWidth="7" strokeLinecap="round" opacity=".45"/>

          {/* muzzle */}
          <ellipse cx="164" cy="242" rx="48" ry="38" fill="url(#catMuzzle)"/><ellipse cx="256" cy="242" rx="48" ry="38" fill="url(#catMuzzle)"/>
          <path d="M190 230 Q210 216 230 230 Q226 250 210 253 Q194 250 190 230Z" fill="#8d2b56"/>
          {happy ? <path d="M190 257 Q210 280 230 257" fill="none" stroke="#7c1f4b" strokeWidth="6" strokeLinecap="round"/> : sad ? <path d="M190 270 Q210 251 230 270" fill="none" stroke="#7c1f4b" strokeWidth="6" strokeLinecap="round"/> : <path d="M194 259 Q210 268 226 259" fill="none" stroke="#7c1f4b" strokeWidth="5" strokeLinecap="round"/>}
          <ellipse cx="128" cy="248" rx="21" ry="13" fill="#f26f9e" opacity={happy ? .82 : .48}/><ellipse cx="292" cy="248" rx="21" ry="13" fill="#f26f9e" opacity={happy ? .82 : .48}/>

          {/* paws */}
          <path d="M129 319 C103 336 106 386 137 397 C159 405 179 388 174 359 C170 335 153 312 129 319Z" fill="url(#catFur)"/>
          <path d="M291 319 C317 336 314 386 283 397 C261 405 241 388 246 359 C250 335 267 312 291 319Z" fill="url(#catFur)"/>
          <path d="M120 385 Q136 398 151 385 M269 385 Q284 398 300 385" fill="none" stroke="#fff1f6" strokeWidth="4" strokeLinecap="round" opacity=".7"/>

          {/* bouquet */}
          <path d="M207 382 L176 292 M217 382 L199 285 M227 381 L225 289 M237 378 L249 296" stroke="#3d7b50" strokeWidth="6" strokeLinecap="round"/>
          <g fill="url(#catRose)"><ellipse cx="172" cy="286" rx="27" ry="31"/><ellipse cx="201" cy="271" rx="29" ry="34"/><ellipse cx="231" cy="277" rx="29" ry="34"/><ellipse cx="258" cy="292" rx="27" ry="31"/><ellipse cx="207" cy="305" rx="30" ry="35"/></g>
          <path d="M164 319 Q207 298 263 322 Q245 344 210 340 Q179 346 164 319Z" fill="#4c9259" opacity=".9"/>
          <path d="M168 331 Q212 350 266 331 L279 357 Q214 378 153 353Z" fill="url(#catRibbon)" stroke="#b83b6d" strokeWidth="3"/>

          {sad && (
            <>
              <motion.path d="M143 202 C142 234 145 271 153 300" fill="none" stroke="#78cfff" strokeWidth="7" strokeLinecap="round" animate={{ pathLength: [0,1], opacity: [0,1,.2] }} transition={{ duration: 1, repeat: Infinity }}/>
              <motion.path d="M277 202 C278 234 275 271 267 300" fill="none" stroke="#78cfff" strokeWidth="7" strokeLinecap="round" animate={{ pathLength: [0,1], opacity: [0,1,.2] }} transition={{ duration: 1, repeat: Infinity, delay: .3 }}/>
              <motion.circle cx="153" cy="305" r="7" fill="#63c5ff" animate={{ cy: [305,329,305], opacity: [0,1,0] }} transition={{ duration: 1.05, repeat: Infinity }}/>
              <motion.circle cx="267" cy="305" r="7" fill="#63c5ff" animate={{ cy: [305,329,305], opacity: [0,1,0] }} transition={{ duration: 1.05, repeat: Infinity, delay: .3 }}/>
            </>
          )}
          {happy && ['💛','✨','💖','⭐','💛'].map((emoji, i) => (
            <motion.text key={i} x={95 + i * 58} y="80" textAnchor="middle" fontSize="24" initial={{ opacity: 0, y: 110, scale: .4 }} animate={{ opacity: [0,1,0], y: [110, 55 - i * 4, 18 - i * 5], scale: [.4,1.15,.7] }} transition={{ duration: 1.7, delay: i * .12, repeat: Infinity }}>{emoji}</motion.text>
          ))}
        </svg>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={sad ? sadCount : happy ? 'happy' : 'waiting'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl px-4 text-center">
          <p className="font-serif text-lg font-semibold text-[#6f304e] md:text-xl">{happy ? 'You just made this little heart glow. 💛' : message}</p>
          {sad && <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#b65a7d]/75">Maybe the NO button needs a little rethink… 🥺</p>}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const GiftBox = ({ opening, onOpen }: { opening: boolean; onOpen?: () => void }) => (
  <motion.button
    type="button"
    onClick={onOpen}
    disabled={opening}
    aria-label="Open the gift"
    className="group relative h-[390px] w-[350px] cursor-pointer select-none md:h-[455px] md:w-[410px]"
    whileHover={!opening ? { scale: 1.018, y: -3 } : undefined}
    whileTap={!opening ? { scale: .985 } : undefined}
  >
    <div className="absolute bottom-7 left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-full bg-[#6b2947]/20 blur-2xl" />
    <motion.div initial={false} animate={opening ? { scale: 1.2, opacity: 0 } : { scale: [1, 1.03, 1] }} transition={{ duration: opening ? .9 : 2.6, repeat: opening ? 0 : Infinity }} className="absolute left-1/2 top-[29%] h-44 w-44 -translate-x-1/2 rounded-full bg-[#ffe6f0] blur-3xl" />

    {/* inner glow */}
    <motion.div initial={{ opacity: 0 }} animate={opening ? { opacity: [0, .9, 0] } : { opacity: 0 }} transition={{ duration: 1.5 }} className="absolute left-1/2 top-[31%] z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-[#fff3c8] blur-2xl" />

    {/* box body */}
    <div className="absolute bottom-[18%] left-1/2 z-20 h-[43%] w-[66%] -translate-x-1/2 overflow-hidden rounded-[10px_10px_28px_28px] border border-white/45 bg-[linear-gradient(145deg,#ffd0e2_0%,#ec88ad_42%,#c34c79_75%,#8f2855_100%)] shadow-[0_32px_50px_rgba(91,24,55,.28),inset_10px_10px_18px_rgba(255,255,255,.24),inset_-14px_-18px_25px_rgba(92,18,53,.2)]">
      <div className="absolute inset-y-0 left-1/2 w-[15%] -translate-x-1/2 bg-[linear-gradient(90deg,#c14c78,#fff5f8 45%,#d16a96)] shadow-[0_0_18px_rgba(255,255,255,.35)]" />
      <div className="absolute inset-x-0 top-0 h-5 bg-white/25" />
      <div className="absolute inset-x-5 bottom-4 h-1 rounded-full bg-white/15" />
    </div>

    {/* lid */}
    <motion.div
      initial={false}
      animate={opening ? { y: -135, rotateX: -18, rotateZ: -5, scale: .96 } : { y: 0, rotateX: 0, rotateZ: 0, scale: 1 }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-[11%] top-[27%] z-40 h-[17%] w-[78%] rounded-[18px] border border-white/55 bg-[linear-gradient(145deg,#ffe0eb,#ed8fb3_50%,#b94773)] shadow-[0_20px_32px_rgba(88,18,52,.3),inset_7px_7px_13px_rgba(255,255,255,.3)] [transform-origin:50%_100%]"
    >
      <div className="absolute inset-y-0 left-1/2 w-[15%] -translate-x-1/2 bg-[linear-gradient(90deg,#cf5c87,#fff6f9,#d46c97)]" />
      <div className="absolute left-5 right-5 top-2 h-2 rounded-full bg-white/25" />
    </motion.div>

    {/* ribbon tails */}
    <motion.div initial={false} animate={opening ? { y: -105, rotate: -18, opacity: 0 } : { y: 0, rotate: -4, opacity: 1 }} transition={{ duration: .8 }} className="absolute left-[40%] top-[31%] z-50 h-24 w-5 rounded-b-full bg-[linear-gradient(90deg,#f3a7c6,#c64d7d)] shadow-md" />
    <motion.div initial={false} animate={opening ? { y: -105, rotate: 18, opacity: 0 } : { y: 0, rotate: 4, opacity: 1 }} transition={{ duration: .8 }} className="absolute right-[40%] top-[31%] z-50 h-24 w-5 rounded-b-full bg-[linear-gradient(90deg,#c64d7d,#f3a7c6)] shadow-md" />

    {/* bow */}
    <motion.div initial={false} animate={opening ? { y: -145, rotate: -9, scale: .78, opacity: .98 } : { y: 0, rotate: 0, scale: 1, opacity: 1 }} transition={{ duration: .95, ease: [0.16, 1, 0.3, 1] }} className="absolute left-1/2 top-[18%] z-50 h-24 w-40 -translate-x-1/2">
      <div className="absolute left-1 top-6 h-16 w-20 -rotate-[28deg] rounded-[70%_30%_70%_30%] border-4 border-[#efa1bf] bg-[linear-gradient(135deg,#ffd8e7,#c84e7e)] shadow-[0_10px_18px_rgba(96,22,55,.24)]" />
      <div className="absolute right-1 top-6 h-16 w-20 rotate-[28deg] rounded-[30%_70%_30%_70%] border-4 border-[#efa1bf] bg-[linear-gradient(225deg,#ffd8e7,#c84e7e)] shadow-[0_10px_18px_rgba(96,22,55,.24)]" />
      <div className="absolute left-1/2 top-8 h-11 w-11 -translate-x-1/2 rounded-full border-4 border-[#ffeaf2] bg-[#c9517e] shadow-lg" />
    </motion.div>

    {/* sparkle details */}
    {[0,1,2,3].map((i) => <motion.span key={i} animate={{ opacity: [0.25, .9, .25], scale: [0.8, 1.2, .8] }} transition={{ duration: 1.8 + i * .2, repeat: Infinity, delay: i * .25 }} className="absolute z-[70] text-xl text-[#f0bf50]" style={{ left: `${16 + i * 24}%`, top: `${20 + (i % 2) * 9}%` }}>✦</motion.span>)}
  </motion.button>
);

const InteractiveGift = () => {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [answer, setAnswer] = useState<'yes' | null>(null);
  const [sadCount, setSadCount] = useState(0);
  const [celebrate, setCelebrate] = useState(false);

  const openGift = () => {
    if (opening || opened) return;
    setOpening(true);
    window.setTimeout(() => {
      setOpening(false);
      setOpened(true);
    }, 1500);
  };

  const yes = () => {
    setAnswer('yes');
    setSadCount(0);
    setCelebrate(true);
    window.setTimeout(() => setCelebrate(false), 4200);
  };

  const no = () => {
    if (answer === 'yes') return;
    setSadCount((count) => count + 1);
  };

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,216,232,.9),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(255,232,169,.55),transparent_30%),linear-gradient(135deg,#fffafc_0%,#fbeef5_48%,#fff9f1_100%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(142,55,91,.12)_1px,transparent_1px)] [background-size:22px_22px]" />
      {celebrate && <Celebration />}

      <div className="relative z-10 w-full max-w-6xl">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div key="gift" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .92, y: -20 }} className="flex flex-col items-center text-center">
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[.38em] text-[#9c4b6c]">A little something for you</p>
                <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#5c233f] md:text-6xl">Wrapped with a little love</h2>
                <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-[#81566b] md:text-base">There’s a tiny surprise waiting inside. Take your time… and open it when you’re ready. 🎀</p>
              </motion.div>
              <div className="mt-7 rounded-[42px] border border-white/75 bg-white/45 p-3 shadow-[0_35px_100px_rgba(100,38,72,.14)] backdrop-blur-xl md:p-7">
                <GiftBox opening={opening} onOpen={openGift} />
              </div>
              <AnimatePresence>
                {opening ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, .4] }} transition={{ duration: .8, repeat: Infinity }} className="mt-5 font-serif text-base italic text-[#8b3e60]">Something beautiful is opening… ✨</motion.p>
                ) : (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 font-sans text-xs font-semibold uppercase tracking-[.3em] text-[#a35a79]">Tap the gift to open it</motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div key="question" initial={{ opacity: 0, y: 28, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="relative mx-auto max-w-5xl overflow-hidden rounded-[40px] border border-white/80 bg-white/65 px-5 py-10 shadow-[0_40px_120px_rgba(90,32,67,.18)] backdrop-blur-2xl md:px-12 md:py-14">
              <div className="pointer-events-none absolute inset-3 rounded-[34px] border border-[#d59aaf]/20" />
              <div className="pointer-events-none absolute -left-20 top-10 h-52 w-52 rounded-full bg-[#ffdce9] blur-3xl" />
              <div className="pointer-events-none absolute -right-20 bottom-10 h-52 w-52 rounded-full bg-[#ffe8ad] blur-3xl" />

              <div className="relative z-10 text-center">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[.36em] text-[#9b5571]">One little question from my heart</p>
                <h2 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.04] text-[#55223d] md:text-6xl lg:text-7xl">
                  Will you choose to be my <span className="font-cursive text-6xl font-normal text-[#d49a28] md:text-8xl">yellow?</span>
                </h2>
                <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, -4, 4, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="mt-2 text-3xl">💛</motion.div>

                <p className="mx-auto mt-5 max-w-3xl font-serif text-base leading-[1.8] text-[#6d4b5b] md:text-lg">
                  I don’t want to call you my yellow before you choose it too. So I’m asking you properly — will you be the person I get to share my silly moments, our favorite songs, little nicknames, long talks, and all the beautiful tomorrows with? If your heart says yes, I’d love to call you my yellow. 💛
                </p>

                <Cat answer={answer} sadCount={sadCount} />

                <div className="relative mx-auto mt-9 flex min-h-[82px] w-full max-w-2xl items-center justify-center gap-4 overflow-visible md:gap-7">
                  <motion.button type="button" onClick={yes} whileHover={{ scale: 1.07, y: -2 }} whileTap={{ scale: .95 }} animate={answer === 'yes' ? { scale: [1, 1.08, 1], boxShadow: ['0 12px 30px rgba(185,72,120,.2)','0 18px 48px rgba(212,154,40,.38)','0 12px 30px rgba(185,72,120,.2)'] } : undefined} transition={{ duration: 1.5, repeat: answer === 'yes' ? Infinity : 0 }} className="relative rounded-full bg-[linear-gradient(135deg,#d55a92,#b73d72)] px-12 py-4 font-serif text-lg font-semibold tracking-[.1em] text-white shadow-[0_15px_35px_rgba(165,52,99,.25)]">
                    YES 💛
                  </motion.button>
                  <RunawayNo onAttempt={no} />
                </div>

                <AnimatePresence mode="wait">
                  {answer === 'yes' ? (
                    <motion.div key="yes" initial={{ opacity: 0, y: 18, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="mx-auto mt-7 max-w-2xl rounded-[26px] border border-[#e4b84d]/30 bg-[#fff8df]/75 px-6 py-5 shadow-[0_15px_40px_rgba(190,140,45,.12)]">
                      <p className="font-cursive text-4xl text-[#b77a17] md:text-5xl">You said yes. 🥹💛</p>
                      <p className="mt-2 font-serif text-base leading-relaxed text-[#6f5435] md:text-lg">Then from this moment, I get to ask you one very special thing… can I call you my yellow?</p>
                    </motion.div>
                  ) : sadCount > 0 ? (
                    <motion.p key={sadCount} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-5 max-w-xl font-serif text-sm italic text-[#8a4762] md:text-base">{noMessages[Math.min(sadCount - 1, noMessages.length - 1)]}</motion.p>
                  ) : (
                    <motion.p key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 font-serif text-sm italic text-[#8a6072]">No pressure. Just a little question, wrapped in a lot of love. 🌷</motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveGift;
