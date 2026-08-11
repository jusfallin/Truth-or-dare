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

const GiftParticles = ({ opening }: { opening: boolean }) => (
  <AnimatePresence>
    {opening && (
      <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
        {Array.from({ length: 28 }).map((_, i) => {
          const angle = (i / 28) * Math.PI * 2;
          const distance = 90 + (i % 5) * 24;
          return (
            <motion.span
              key={i}
              initial={{ x: 0, y: 20, scale: 0, opacity: 0 }}
              animate={{
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance - 80,
                scale: [0, 1, 0.2],
                opacity: [0, 1, 0],
                rotate: 360,
              }}
              transition={{ duration: 1.05, ease: 'easeOut', delay: i * 0.012 }}
              className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]"
            />
          );
        })}
      </div>
    )}
  </AnimatePresence>
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
    window.setTimeout(() => setIsOpening(false), 1350);
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
          {!isOpened && (
            <motion.div
              key="gift"
              exit={{ opacity: 0, scale: 0.4, rotate: 10, filter: 'blur(12px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center cursor-pointer select-none"
              onClick={handleGiftClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGiftClick(); }}
              aria-label="Open your birthday gift"
            >
              <motion.div
                whileHover={!isOpening ? { scale: 1.035, rotateZ: -1.2 } : undefined}
                animate={
                  isOpening
                    ? { scale: [1.08, 1.12, 0.98], rotateZ: [0, -2, 2, 0] }
                    : clickCount > 0
                      ? { rotateZ: [-2, 2, -2, 0], scale: 1 + clickCount * 0.025 }
                      : { y: [0, -10, 0], rotateZ: [0, -0.8, 0, 0.8, 0] }
                }
                transition={{
                  duration: isOpening ? 0.75 : clickCount > 0 ? 0.42 : 2.6,
                  repeat: !isOpening && clickCount === 0 ? Infinity : 0,
                  ease: 'easeInOut',
                }}
                className="relative w-[min(78vw,430px)] aspect-square"
              >
                <GiftParticles opening={isOpening} />

                <motion.div
                  animate={{ opacity: isOpening ? [0.35, 1, 0.75] : [0.3, 0.55, 0.3], scale: isOpening ? [0.85, 1.35, 1.1] : [0.95, 1.05, 0.95] }}
                  transition={{ duration: isOpening ? 1.1 : 2.4, repeat: isOpening ? 0 : Infinity, ease: 'easeInOut' }}
                  className="absolute left-1/2 top-[48%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300/35 blur-3xl"
                />

                <div className="absolute -bottom-1 left-1/2 h-7 w-[58%] -translate-x-1/2 rounded-[50%] bg-black/20 blur-xl" />

                {/* The exact gift image already stored in the project is used here. */}
                <motion.div
                  className="absolute inset-0"
                  animate={isOpening ? { y: 4, scale: [1, 1.04, 1.01] } : undefined}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                >
                  <img
                    src={giftBoxImg}
                    alt="Pink birthday gift box"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_28px_28px_rgba(190,70,120,0.28)]"
                  />
                </motion.div>

                {/* A clipped duplicate creates a convincing lid-opening illusion without needing a second image. */}
                {isOpening && (
                  <motion.div
                    initial={{ y: 0, rotateZ: 0, opacity: 1 }}
                    animate={{ y: -105, rotateZ: -7, x: 8, opacity: 0.98 }}
                    transition={{ duration: 0.92, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ clipPath: 'inset(0 0 57% 0)' }}
                  >
                    <img
                      src={giftBoxImg}
                      alt=""
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_18px_20px_rgba(210,70,125,0.35)]"
                    />
                  </motion.div>
                )}

                {isOpening && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.2, 1.2, 1.8] }}
                    transition={{ duration: 1.05, ease: 'easeOut' }}
                    className="absolute left-1/2 top-[45%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 blur-2xl pointer-events-none"
                  />
                )}
              </motion.div>

              <motion.div
                className="mt-8 md:mt-10 text-center"
                animate={{ opacity: isOpening ? [0.7, 1, 0.7] : [0.55, 1, 0.55] }}
                transition={{ duration: isOpening ? 0.7 : 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  {getInstruction()}
                </p>
                {!isOpening && clickCount < 3 && (
                  <div className="mt-3 flex items-center justify-center gap-2" aria-hidden="true">
                    {[0, 1, 2].map((step) => (
                      <span key={step} className={`h-1.5 rounded-full transition-all duration-300 ${step <= clickCount ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`} />
                    ))}
                  </div>
                )}
              </motion.div>

              {!isOpening && clickCount === 0 && (
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
          )}

          {isOpened && (
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.82, y: 70 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 14, delay: 0.1 }}
              className="flex flex-col items-center w-full gap-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.8 }}
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
                    transition={{ duration: 0.7, delay: 0.3 }}
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
