import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import coupleImg from '@assets/IMG_20260727_155824_1785148270794.jpg';

/* ─── Confetti ─────────────────────────────────────────────────────────────── */
const Confetti = () => {
  const pieces = Array.from({ length: 90 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * window.innerWidth * 1.3,
    y: (Math.random() - 1.1) * window.innerHeight,
    color: ['#E8B95E', '#BA4B75', '#f9c8e0', '#A78BFA', '#ffffff', '#fcd5ce', '#ffb3c6'][
      Math.floor(Math.random() * 7)
    ],
    rotation: Math.random() * 720,
    scale: Math.random() * 1.3 + 0.4,
    delay: Math.random() * 0.4,
    shape: Math.random() > 0.5 ? 'rounded-sm' : 'rounded-full',
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, p.scale, p.scale * 0.6, 0],
            rotate: p.rotation,
          }}
          transition={{ duration: 3.8, ease: 'easeOut', delay: p.delay }}
          className={`absolute w-3 h-3 md:w-4 md:h-4 ${p.shape}`}
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
};

/* ─── Runaway NO button ─────────────────────────────────────────────────────── */
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

interface RunawayNoProps {
  onActualClick: () => void;
}

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
    if (now - lastEscape.current < 250) return; // throttle
    lastEscape.current = now;

    const next = (escapeIndex + 1) % ESCAPE_MOVES.length;
    setEscapeIndex(next);
    setEscapeCount((c) => c + 1);

    const move = ESCAPE_MOVES[next];

    // clamp so it stays within a safe zone
    const maxX = Math.min(Math.abs(move.x), 200) * Math.sign(move.x);
    const maxY = Math.min(Math.abs(move.y), 150) * Math.sign(move.y);

    x.set(maxX);
    y.set(maxY);
  }, [escapeIndex, x, y]);

  const rotateVal = ESCAPE_MOVES[escapeIndex]?.rotate ?? 0;

  return (
    <motion.button
      style={{ x: springX, y: springY, rotate: rotateVal, position: 'relative', zIndex: 10 }}
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

/* ─── Main component ────────────────────────────────────────────────────────── */
const InteractiveGift = () => {
  const [clickCount, setClickCount] = useState(0);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const clicksNeeded = 3;
  const isOpened = clickCount >= clicksNeeded;

  const handleGiftClick = () => {
    if (isOpened) return;
    setClickCount((prev) => prev + 1);
  };

  const handleYes = () => {
    setAnswer('yes');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5500);
  };

  const handleNo = () => {
    setAnswer('no');
  };

  const getInstruction = () => {
    if (clickCount === 0) return 'Tap to unwrap...';
    if (clickCount === 1) return 'Almost there...';
    if (clickCount === 2) return 'One more tap!';
    return '';
  };

  return (
    <section className="w-full py-32 flex flex-col items-center justify-center relative min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 z-0" />
      {showConfetti && <Confetti />}

      <div className="z-10 w-full max-w-4xl px-6 flex flex-col items-center">
        <AnimatePresence mode="wait">

          {/* ── GIFT BOX ── */}
          {!isOpened && (
            <motion.div
              key="gift"
              exit={{ opacity: 0, scale: 0.4, rotate: 15, filter: 'blur(12px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={handleGiftClick}
            >
              <motion.div
                animate={
                  clickCount > 0
                    ? { rotate: [-6, 6, -6, 6, 0], scale: 1 + clickCount * 0.06 }
                    : { y: [0, -12, 0] }
                }
                transition={{
                  duration: clickCount > 0 ? 0.45 : 2.2,
                  repeat: clickCount > 0 ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-48 h-48 md:w-64 md:h-64"
              >
                {/* box body */}
                <div className="absolute bottom-0 w-full h-3/4 bg-secondary rounded-xl shadow-2xl overflow-hidden border-2 border-primary/20">
                  <div className="absolute inset-0 flex justify-center">
                    <div className="w-12 h-full bg-primary/80" />
                  </div>
                </div>
                {/* lid */}
                <div className="absolute top-4 -left-2 -right-2 h-1/4 bg-secondary rounded-lg shadow-xl z-10 border-2 border-primary/20">
                  <div className="absolute inset-0 flex justify-center">
                    <div className="w-12 h-full bg-primary/80" />
                  </div>
                </div>
                {/* bow */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex justify-center gap-1 z-20">
                  <div className="w-16 h-16 rounded-full border-[10px] border-primary/80 -translate-x-4 translate-y-4 shadow-lg" />
                  <div className="w-16 h-16 rounded-full border-[10px] border-primary/80 translate-x-4 translate-y-4 shadow-lg" />
                </div>
              </motion.div>

              <motion.p
                className="mt-12 font-sans text-xl text-primary font-medium tracking-wide uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              >
                {getInstruction()}
              </motion.p>
            </motion.div>
          )}

          {/* ── OPENED ── */}
          {isOpened && (
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.8, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring' as const, damping: 14, delay: 0.15 }}
              className="flex flex-col items-center w-full gap-10"
            >
              {/* Couple image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative w-full max-w-xl aspect-square rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/30 group"
              >
                <img
                  src={coupleImg}
                  alt="A beautiful moment together"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </motion.div>

              {/* Proposal */}
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

                    {/* Button row — overflow:visible so NO button can escape freely */}
                    <div
                      className="flex gap-8 flex-wrap justify-center items-center"
                      style={{ overflow: 'visible', minHeight: '80px' }}
                    >
                      {/* YES — stays put */}
                      <motion.button
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.93 }}
                        onClick={handleYes}
                        className="px-14 py-5 bg-primary text-primary-foreground rounded-full font-sans text-xl font-semibold shadow-[0_0_40px_rgba(186,75,117,0.5)] hover:shadow-[0_0_65px_rgba(186,75,117,0.75)] transition-all duration-300 tracking-widest uppercase"
                      >
                        Yes
                      </motion.button>

                      {/* NO — runs away */}
                      <RunawayNo onActualClick={handleNo} />
                    </div>
                  </motion.div>
                )}

                {/* YES response */}
                {answer === 'yes' && (
                  <motion.div
                    key="yes-response"
                    initial={{ opacity: 0, scale: 0.65 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' as const, damping: 11 }}
                    className="text-center space-y-4"
                  >
                    <h3 className="font-cursive text-6xl md:text-8xl text-primary text-glow">
                      Forever it is.
                    </h3>
                    <p className="font-sans text-lg text-muted-foreground">
                      You just made me the happiest person alive, Bhavanika.
                    </p>
                  </motion.div>
                )}

                {/* NO response */}
                {answer === 'no' && (
                  <motion.div
                    key="no-response"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-5"
                  >
                    <h3 className="font-serif text-3xl md:text-5xl text-foreground">
                      My heart says... try again.
                    </h3>
                    <p className="font-sans text-muted-foreground text-lg">
                      Because some love stories don't accept "no" as an answer.
                    </p>
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
