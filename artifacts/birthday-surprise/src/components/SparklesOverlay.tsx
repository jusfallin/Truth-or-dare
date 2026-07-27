import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SparklesOverlay = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only run on client
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize.width === 0) return null;

  // Generate random sparkles
  const sparkles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * windowSize.width,
    y: Math.random() * windowSize.height,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-secondary"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            left: sparkle.x,
            top: sparkle.y,
            boxShadow: '0 0 10px 2px rgba(232, 185, 94, 0.4)',
          }}
          animate={{
            y: [sparkle.y, sparkle.y - 100],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default SparklesOverlay;
