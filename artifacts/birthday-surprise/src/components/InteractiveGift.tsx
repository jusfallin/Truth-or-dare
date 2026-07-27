import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cakeImg from '@assets/generated_images/cake.jpg';

const InteractiveGift = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const clicksNeeded = 3;
  const isOpened = clickCount >= clicksNeeded;

  const handleClick = () => {
    if (isOpened) return;
    
    setClickCount(prev => prev + 1);
    
    if (clickCount + 1 === clicksNeeded) {
      setShowConfetti(true);
    }
  };

  const getInstruction = () => {
    if (clickCount === 0) return "Tap to unwrap...";
    if (clickCount === 1) return "Almost there...";
    if (clickCount === 2) return "One more tap!";
    return "";
  };

  const Confetti = () => {
    const pieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * window.innerWidth,
      y: (Math.random() - 0.5) * window.innerHeight,
      color: ['#E8B95E', '#BA4B75', '#F7F3EE', '#A78BFA'][Math.floor(Math.random() * 4)],
      rotation: Math.random() * 360,
    }));

    return (
      <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
            animate={{ 
              x: p.x, 
              y: p.y + 200, 
              scale: [0, 1, 1, 0],
              rotate: p.rotation + 360 
            }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute w-3 h-3 md:w-4 md:h-4 rounded-sm"
            style={{ backgroundColor: p.color }}
          />
        ))}
      </div>
    );
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
              exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              className="flex flex-col items-center cursor-pointer"
              onClick={handleClick}
            >
              <motion.div
                animate={
                  clickCount > 0 
                    ? { rotate: [-5, 5, -5, 5, 0], scale: 1 + clickCount * 0.05 } 
                    : { y: [0, -10, 0] }
                }
                transition={{ 
                  duration: clickCount > 0 ? 0.4 : 2, 
                  repeat: clickCount > 0 ? 0 : Infinity 
                }}
                className="relative w-48 h-48 md:w-64 md:h-64 group"
              >
                {/* CSS Gift Box */}
                <div className="absolute bottom-0 w-full h-3/4 bg-secondary rounded-xl shadow-2xl overflow-hidden border-2 border-primary/20">
                  <div className="absolute inset-0 flex justify-center">
                    <div className="w-12 h-full bg-primary/80" />
                  </div>
                </div>
                {/* Gift Box Lid */}
                <div className="absolute top-4 -left-2 -right-2 h-1/4 bg-secondary rounded-lg shadow-xl z-10 border-2 border-primary/20">
                  <div className="absolute inset-0 flex justify-center">
                    <div className="w-12 h-full bg-primary/80" />
                  </div>
                </div>
                {/* Bow */}
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
              transition={{ type: "spring", damping: 15, delay: 0.2 }}
              className="flex flex-col items-center w-full"
            >
              <div className="relative w-full max-w-2xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20">
                <img 
                  src={cakeImg} 
                  alt="A beautiful birthday cake" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-center text-white">
                  <h3 className="font-cursive text-5xl md:text-7xl mb-2 text-glow">Make a wish...</h3>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveGift;
