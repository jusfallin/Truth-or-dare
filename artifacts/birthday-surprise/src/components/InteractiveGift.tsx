import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import coupleImg from '@assets/IMG_20260727_155824_1785148270794.jpg';
import giftBoxImg from '@assets/giftbox.png';

const Confetti = () => {
  const pieces = Array.from({ length: 110 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * window.innerWidth * 1.35,
    y: (Math.random() - 1.05) * window.innerHeight,
    color: ['#f05b8d', '#ff9fc2', '#ffd1e2', '#ffffff', '#f7c6d9', '#d94d7c', '#f8b4d0'][Math.floor(Math.random() * 7)],
    rotation: Math.random() * 900,
    scale: Math.random() * 1.2 + 0.45,
    delay: Math.random() * 0.35,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, scale: [0, p.scale, p.scale * 0.65, 0], rotate: p.rotation, opacity: [1, 1, 0.8, 0] }}
          transition={{ duration: 4, ease: 'easeOut', delay: p.delay }}
          className="absolute h-3 w-3 md:h-4 md:w-4 rounded-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
};

const ESCAPE_MOVES = [
  { x: 180, y: -80, rotate: -15 },
  { x: -200, y: 60, rotate: 20 },
  { x: 120, y: 130, rotate: -10 },
  { x: -150, y: -110, rotate: 25 },
  { x: 220, y: 40, rotate: -20 },
  { x: -90, y: 140, rotate: 30 },
  { x: 160, y: -130, rotate: -25 },
  { x: -220, y: -50, rotate: 15 },
  { x: 80, y: 160, rotate: -30 },
  { x: -170, y: 100, rotate: 22 },
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
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="px-14 py-5 border-2 border-muted-foreground/30 text-muted-foreground rounded-full font-sans text-xl font-medium tracking-widest uppercase select-none cursor-pointer"
      title={escapeCount > 3 ? "She'll never catch me!" : undefined}
    >
      No
    </motion.button>
  );
};

const SparkBurst = () => (
  <div className="absolute inset-0 pointer-events-none z-40 overflow-visible">
    {Array.from({ length: 34 }).map((_, i) => {
      const angle = (i / 34) * Math.PI * 2;
      const distance = 105 + (i % 6) * 22;
      return (
        <motion.span
          key={i}
          initial={{ x: 0, y: 40, scale: 0, opacity: 0 }}
          animate={{
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance - 55,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: i * 35,
          }}
          transition={{ duration: 1.15, ease: 'easeOut', delay: i * 0.01 }}
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)]"
        />
      );
    })}
  </div>
);

/*
 * This is deliberately built as a real 3D CSS object for the opening moment.
 * The static gift image is used before opening; the final tap morphs into this
 * hinged box so the lid, ribbon, depth and contents can move independently.
 */
const RealisticGiftOpening = ({ coupleImg }: { coupleImg: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.28, ease: 'easeOut' }}
    className="relative w-[min(86vw,470px)] h-[390px] md:h-[440px] flex items-center justify-center"
    style={{ perspective: 1100 }}
  >
    <SparkBurst />

    <motion.div
      className="absolute bottom-10 left-1/2 h-10 w-[58%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-xl"
      animate={{ scale: [1, 0.92, 0.78], opacity: [0.45, 0.3, 0.18] }}
      transition={{ duration: 1.8, ease: 'easeOut' }}
    />

    <motion.div
      initial={{ y: 18, rotateX: 0, rotateZ: 0 }}
      animate={{ y: [18, 10, 0], rotateX: [0, 2, 0], rotateZ: [0, -1.5, 0] }}
      transition={{ duration: 1.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-[270px] h-[205px] md:w-[330px] md:h-[245px]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Warm light escaping from inside the gift */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0, 0.95, 0.65, 0], scale: [0.3, 0.75, 1.15, 1.4] }}
        transition={{ duration: 1.55, ease: 'easeOut' }}
        className="absolute left-1/2 top-[28%] h-40 w-40 -translate-x-1/2 rounded-full bg-pink-100 blur-3xl z-0"
      />

      {/* Interior */}
      <div className="absolute inset-x-0 bottom-0 h-[76%] rounded-[12px_12px_24px_24px] bg-gradient-to-br from-[#7e294c] via-[#a83c63] to-[#4e1630] border border-white/20 shadow-[0_30px_45px_rgba(60,5,30,0.38)] overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,245,250,0.5),transparent_34%)]" />
        <div className="absolute inset-y-0 left-1/2 w-9 -translate-x-1/2 bg-gradient-to-r from-[#f7c6d9] via-[#fff0f6] to-[#d76a98] opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-black/15" />
      </div>

      {/* Contents rising out of the box */}
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.82 }}
        animate={{ y: -34, opacity: 1, scale: 1 }}
        transition={{ delay: 0.32, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-[28%] z-20 h-[145px] w-[112px] md:h-[175px] md:w-[138px] -translate-x-1/2 overflow-hidden rounded-[18px] border-[5px] border-white bg-white shadow-[0_18px_35px_rgba(60,5,30,0.35)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img src={coupleImg} alt="Your surprise" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/20" />
      </motion.div>

      {/* Front face */}
      <div className="absolute left-0 right-0 bottom-0 h-[72%] rounded-[10px_10px_22px_22px] bg-gradient-to-br from-[#f19abd] via-[#d96797] to-[#9d315d] border border-white/25 shadow-[inset_0_2px_0_rgba(255,255,255,0.28)] overflow-hidden z-30" style={{ transform: 'translateZ(22px)' }}>
        <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-gradient-to-r from-[#eeb4cd] via-[#fff0f7] to-[#d35f8d] shadow-[0_0_18px_rgba(255,220,235,0.3)]" />
        <div className="absolute inset-x-0 top-0 h-8 bg-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/15" />
      </div>

      {/* Left side for depth */}
      <div className="absolute left-0 bottom-[4%] h-[66%] w-[13%] rounded-l-[16px] bg-gradient-to-r from-[#7d2347] to-[#d45d8d] z-20" style={{ transform: 'translateZ(2px) rotateY(28deg)', transformOrigin: 'right center' }} />

      {/* Lid, hinged at the back */}
      <motion.div
        initial={{ rotateX: 0, y: -4 }}
        animate={{ rotateX: -112, y: -58, z: 24 }}
        transition={{ delay: 0.08, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[-7%] right-[-7%] top-[9%] h-[29%] rounded-[14px] bg-gradient-to-br from-[#f7b2cc] via-[#dc6e9b] to-[#8f2a52] border border-white/30 shadow-[0_22px_32px_rgba(70,7,35,0.34)] z-50"
        style={{ transformOrigin: '50% 100%', transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-white/30 via-transparent to-black/15" />
        <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-gradient-to-r from-[#e7a8c2] via-[#fff1f7] to-[#cf5b89]" />
        <div className="absolute inset-x-4 top-2 h-1 rounded-full bg-white/60" />
      </motion.div>

      {/* Ribbon falling away from the lid */}
      <motion.div
        initial={{ y: 0, rotate: 0, opacity: 1 }}
        animate={{ y: -65, rotate: -22, opacity: 0.25 }}
        transition={{ delay: 0.08, duration: 0.9, ease: 'easeOut' }}
        className="absolute left-1/2 top-[7%] z-[55] h-[26%] w-9 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#f0bfd3] via-white to-[#d86c99] shadow-[0_0_12px_rgba(255,210,230,0.45)]"
      />

      {/* Bow */}
      <motion.div
        initial={{ y: 0, scale: 1, rotate: 0 }}
        animate={{ y: -90, scale: 0.72, rotate: -16, opacity: 0 }}
        transition={{ delay: 0.08, duration: 0.92, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-[-1%] z-[60] h-20 w-32 -translate-x-1/2"
      >
        <div className="absolute left-0 top-2 h-16 w-16 -rotate-[28deg] rounded-[65%_35%_65%_35%] border-[5px] border-[#e487ac] bg-gradient-to-br from-[#ffbfd8] to-[#b63d6c] shadow-lg" />
        <div className="absolute right-0 top-2 h-16 w-16 rotate-[28deg] rounded-[35%_65%_35%_65%] border-[5px] border-[#e487ac] bg-gradient-to-bl from-[#ffbfd8] to-[#b63d6c] shadow-lg" />
        <div className="absolute left-1/2 top-7 h-8 w-8 -translate-x-1/2 rounded-full border-4 border-[#ffe7f1] bg-[#c54c79] shadow-md" />
      </motion.div>

      {/* Floating hearts make the reveal feel romantic rather than like a generic ecommerce box */}
      {[...Array(7)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 25, x: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0], y: -110 - i * 9, x: (i - 3) * 32, scale: [0.4, 1, 0.7] }}
          transition={{ delay: 0.42 + i * 0.07, duration: 1.45, ease: 'easeOut' }}
          className="absolute left-1/2 top-[35%] z-[70] text-xl md:text-2xl"
        >
          {i % 2 === 0 ? '♥' : '✦'}
        </motion.span>
      ))}
    </motion.div>
  </motion.div>
);

const InteractiveGift = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const clicksNeeded = 3;
  const isOpened = clickCount >= clicksNeeded && !isOpening;

  const handleGiftClick = () => {
    if (isOpening || isOpened) return;

    if (clickCount < clicksNeeded - 1) {
      setClickCount((prev) => prev + 1);
      return;
    }

    setClickCount(clicksNeeded);
    setIsOpening(true);
    window.setTimeout(() => setIsOpening(false), 1900);
  };

  const handleYes = () => {
    setAnswer('yes');
    setShowConfetti(true);
    window.setTimeout(() => setShowConfetti(false), 5500);
  };

  const handleNo = () => setAnswer('no');

  const getInstruction = () => {
    if (isOpening) return 'Opening your surprise...';
    if (clickCount === 0) return 'Tap the gift to unwrap your surprise';
    if (clickCount === 1) return 'The ribbon is coming loose...';
    if (clickCount === 2) return 'One more tap to open it!';
    return '';
  };

  return (
    <section className="w-full py-24 md:py-32 flex flex-col items-center justify-center relative min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 z-0" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(255,150,190,0.22),transparent_42%)]" />
      {showConfetti && <Confetti />}

      <div className="z-10 w-full max-w-5xl px-5 md:px-8 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {isOpening ? (
            <motion.div key="opening" className="flex flex-col items-center w-full">
              <RealisticGiftOpening coupleImg={coupleImg} />
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0.5, 1, 0.5], y: [0, -2, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="mt-2 font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-primary"
              >
                Opening your surprise...
              </motion.p>
            </motion.div>
          ) : !isOpened ? (
            <motion.div
              key="closed-gift"
              exit={{ opacity: 0, scale: 0.88, y: 20, filter: 'blur(8px)' }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center cursor-pointer select-none"
              onClick={handleGiftClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGiftClick(); }}
              aria-label="Open your birthday gift"
            >
              <motion.div
                whileHover={{ scale: 1.035, rotateZ: -1.2 }}
                animate={clickCount > 0 ? { rotateZ: [-1.5, 1.5, -1.5, 0], scale: 1 + clickCount * 0.018 } : { y: [0, -10, 0], rotateZ: [0, -0.8, 0, 0.8, 0] }}
                transition={{ duration: clickCount > 0 ? 0.42 : 2.6, repeat: clickCount === 0 ? Infinity : 0, ease: 'easeInOut' }}
                className="relative w-[min(78vw,430px)] aspect-square"
              >
                <motion.div
                  animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-1/2 top-[48%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300/35 blur-3xl"
                />
                <div className="absolute -bottom-1 left-1/2 h-7 w-[58%] -translate-x-1/2 rounded-[50%] bg-black/20 blur-xl" />
                <img
                  src={giftBoxImg}
                  alt="Pink birthday gift box"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_28px_28px_rgba(190,70,120,0.28)]"
                />
              </motion.div>

              <motion.div
                className="mt-8 md:mt-10 text-center"
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  {getInstruction()}
                </p>
                <div className="mt-3 flex items-center justify-center gap-2" aria-hidden="true">
                  {[0, 1, 2].map((step) => (
                    <span key={step} className={`h-1.5 rounded-full transition-all duration-300 ${step <= clickCount ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`} />
                  ))}
                </div>
              </motion.div>

              {clickCount === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: [0.55, 1, 0.55], y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-5 flex items-center gap-2 rounded-full border border-primary/15 bg-white/55 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm shadow-sm"
                >
                  <span>✨</span>
                  <span>Three little taps. One big surprise.</span>
                  <span>💗</span>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.82, y: 70 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 14, delay: 0.05 }}
              className="flex flex-col items-center w-full gap-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.8 }}
                className="relative w-full max-w-xl aspect-square rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/30 group"
              >
                <img src={coupleImg} alt="A beautiful moment together" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </motion.div>

              <AnimatePresence mode="wait">
                {answer === null && (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex flex-col items-center gap-8 text-center"
                  >
                    <h3 className="font-cursive text-5xl md:text-7xl text-primary text-glow leading-tight">
                      Will you be my love forever?
                    </h3>
                    <div className="flex gap-8 flex-wrap justify-center items-center" style={{ overflow: 'visible', minHeight: '80px' }}>
                      <motion.button
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.93 }}
                        onClick={handleYes}
                        className="px-14 py-5 bg-primary text-primary-foreground rounded-full font-sans text-xl font-semibold shadow-[0_0_40px_rgba(186,75,117,0.5)] hover:shadow-[0_0_65px_rgba(186,75,117,0.75)] transition-all duration-300 tracking-widest uppercase"
                      >
                        Yes
                      </motion.button>
                      <RunawayNo onActualClick={handleNo} />
                    </div>
                  </motion.div>
                )}

                {answer === 'yes' && (
                  <motion.div
                    key="yes-response"
                    initial={{ opacity: 0, scale: 0.65 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 11 }}
                    className="text-center space-y-4"
                  >
                    <h3 className="font-cursive text-6xl md:text-8xl text-primary text-glow">Forever it is.</h3>
                    <p className="font-sans text-lg text-muted-foreground">You just made me the happiest person alive, Bhavanika.</p>
                  </motion.div>
                )}

                {answer === 'no' && (
                  <motion.div
                    key="no-response"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-5"
                  >
                    <h3 className="font-serif text-3xl md:text-5xl text-foreground">My heart says... try again.</h3>
                    <p className="font-sans text-muted-foreground text-lg">Because some love stories don't accept "no" as an answer.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAnswer(null)}
                      className="mt-4 px-10 py-4 bg-primary/10 border border-primary/30 text-primary rounded-full font-sans text-base tracking-widest uppercase hover:bg-primary/20 transition-all duration-300"
                    >
                      Let me answer again
                    </motion.button>
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
