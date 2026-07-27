import React from 'react';
import { motion } from 'framer-motion';

const facts = [
  {
    title: "1. The Outfit Dilemma",
    content: "Will complain about having 'nothing to wear' while standing in front of a wardrobe that could rival a department store."
  },
  {
    title: "2. The 'Five Minutes' Rule",
    content: "Has fundamentally rewritten the laws of physics. When Bhavanika says 'I'm 5 minutes away,' she is currently in a different time zone doing her makeup."
  },
  {
    title: "3. The Vibe Curator",
    content: "Impossible to stay mad at. Will distract you with an incredibly niche meme or a dramatic retelling of a minor inconvenience."
  }
];

const FunFacts = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-24 px-6 relative">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-cursive text-5xl md:text-7xl text-primary text-center mb-16"
      >
        3 undeniable truths...
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {facts.map((fact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="glass-card p-8 rounded-3xl relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h4 className="font-serif text-xl md:text-2xl font-semibold mb-4 text-foreground relative z-10">
              {fact.title}
            </h4>
            <p className="text-muted-foreground leading-relaxed relative z-10">
              {fact.content}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FunFacts;
