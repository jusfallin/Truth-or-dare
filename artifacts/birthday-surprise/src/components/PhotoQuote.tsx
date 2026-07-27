import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import flowersImg from '@assets/generated_images/flowers.jpg';

const PhotoQuote = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.3, 0.8], [100, -100]);

  return (
    <section className="w-full py-24 md:py-48 px-6 md:px-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        <motion.div 
          className="w-full md:w-1/2 relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative aspect-[3/4] w-full rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl rotate-[-2deg] group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10" />
            <img 
              src={flowersImg} 
              alt="Elegant bouquet of flowers" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary/30 rounded-full blur-[60px] -z-10" />
          <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/30 rounded-full blur-[60px] -z-10" />
        </motion.div>

        <motion.div 
          className="w-full md:w-1/2"
          style={{ y }}
        >
          <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8 relative">
            <span className="absolute -top-12 -left-8 text-[8rem] text-primary/20 font-cursive leading-none select-none">"</span>
            You make the world feel a little more colorful just by being in it.
            <span className="absolute -bottom-16 -right-0 text-[8rem] text-primary/20 font-cursive leading-none select-none">"</span>
          </h3>
          <p className="font-sans text-lg text-muted-foreground uppercase tracking-[0.2em]">
            — Someone who thinks you're pretty great
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default PhotoQuote;
