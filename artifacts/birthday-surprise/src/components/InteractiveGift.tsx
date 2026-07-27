import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coupleImg from '@assets/IMG_20260727_155824_1785148270794.jpg';

const Confetti = () => {
  const pieces = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * window.innerWidth * 1.2,
    y: (Math.random() - 1) * window.innerHeight,
    color: ['#E8B95E', '#BA4B75', '#f9c8e0', '#A78BFA', '#ffffff', '#fcd5ce'][Math.floor(Math.random() * 6)],
    rotation: Math.random() * 720,
    scale: Math.random() * 1.2 + 0.4,
    delay: Math.random() * 0.3,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
          animate={{ x: p.x, y: p.y, scale: [0, p.scale, p.scale * 0.5, 0], rotate: p.rotation }}
          transition={{ duration: 3.5, ease: 'easeOut', delay: p.delay }}
          className="absolute w-3 h-3 md:w-4 md:h-4 rounded-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
};

const InteractiveGift = () => {
  const [clickCount, setClickCount] = useState(0);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const clicksNeeded = 3;
  const isOpened = clickCount >= clicksNeeded;

  const handleClick = () => {
    if (isOpened) return;
    setClickCount((prev) => prev + 1);
  };

  const handleYes = () => {
    setAnswer('yes');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
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
    <section className="w-full py-32 flex flex-col items-center justify-center relative min-h-[80vh]">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 z-0" />
      {showConfetti && <Confetti />}

      <div className="z-10 w-full max-w-4xl px-6 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="gift"
              exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
              className="flex flex-col items-center cursor-pointer"
              onClick={handleClick}
            >
              <motion.div
                animate={
                  clickCount > 0
                    ? { rotate: [-5, 5, -5, 5, 0], scale: 1 + clickCount * 0.05 }
                    : { y: [0, -10, 0] }
                }
                transition={{ duration: clickCount > 0 ? 0.4 : 2, repeat: clickCount > 0 ? 0 : Infinity }}
                className="relative w-48 h-48 md:w-64 md:h-64"
              >
                <div className="absolute bottom-0 w-full h-3/4 bg-secondary rounded-xl shadow-2xl overflow-hidden border-2 border-primary/20">
                  <div className="absolute inset-0 flex justify-center">
                    <div className="w-12 h-full bg-primary/80" />
                  </div>
                </div>
                <div className="absolute top-4 -left-2 -right-2 h-1/4 bg-secondary rounded-lg shadow-xl z-10 border-2 border-primary/20">
                  <div className="absolute inset-0 flex justify-center">
                    <div className="w-12 h-full bg-primary/80" />
                  </div>
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex justify-center gap-1 z-20">
                  <div className="w-16 h-16 rounded-full border-[10px] border-primary/80 -translate-x-4 translate-y-4 shadow-lg" />
                  <div className="w-16 h-16 rounded-full border-[10px] border-primary/80 translate-x-4 translate-y-4 shadow-lg" />
                </div>
              </motion.div>

              <motion.p
                className="mt-12 font-sans text-xl text-primary font-medium tracking-wide uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {getInstruction()}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring' as const, damping: 15, delay: 0.2 }}
              className="flex flex-col items-center w-full gap-10"
            >
              {/* Couple image */}
              <div className="relative w-full max-w-xl aspect-square rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/20">
                <img
                  src={coupleImg}
                  alt="A beautiful moment together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Proposal question */}
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

                    <div className="flex gap-6 flex-wrap justify-center">
                      <motion.button
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={handleYes}
                        className="px-14 py-5 bg-primary text-primary-foreground rounded-full font-sans text-xl font-semibold shadow-[0_0_40px_rgba(186,75,117,0.5)] hover:shadow-[0_0_60px_rgba(186,75,117,0.7)] transition-all duration-300 tracking-widest uppercase"
                      >
                        Yes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={handleNo}
                        className="px-14 py-5 border-2 border-muted-foreground/30 text-muted-foreground rounded-full font-sans text-xl font-medium hover:border-primary/40 hover:text-foreground transition-all duration-300 tracking-widest uppercase"
                      >
                        No
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {answer === 'yes' && (
                  <motion.div
                    key="yes-response"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' as const, damping: 12 }}
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

                {answer === 'no' && (
                  <motion.div
                    key="no-response"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
