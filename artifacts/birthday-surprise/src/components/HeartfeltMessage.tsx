import React from 'react';
import { motion } from 'framer-motion';

const HeartfeltMessage = () => {
  return (
    <section className="w-full py-32 px-6 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-foreground to-foreground opacity-50" />
      
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="w-12 h-12 mx-auto mb-12">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary w-full h-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>
          </div>

          <h3 className="font-serif text-3xl md:text-5xl text-background mb-12">
            Beyond the jokes and the chaos,
          </h3>

          <div className="font-sans text-lg md:text-xl text-background/80 leading-relaxed space-y-6 text-justify md:text-center">
            <p>
              I just wanted to take a moment to say how incredibly proud I am of the person you are. 
              You carry this rare, beautiful energy with you—a mix of fierce independence and soft, genuine kindness.
            </p>
            <p>
              Life throws a lot at us, but watching you navigate it with your signature humor and grace is nothing short of inspiring. 
              You don't just exist in the world; you curate it, you elevate it, you make it fiercely your own.
            </p>
            <p>
              Never lose that spark. Never settle for ordinary. You deserve every ounce of joy, love, and magic this year has to offer.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeartfeltMessage;
