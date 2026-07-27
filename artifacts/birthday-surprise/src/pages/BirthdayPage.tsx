import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import IntroMessage from '@/components/IntroMessage';
import PhotoQuote from '@/components/PhotoQuote';
import InteractiveGift from '@/components/InteractiveGift';
import HeartfeltMessage from '@/components/HeartfeltMessage';
import FinalWish from '@/components/FinalWish';
import SparklesOverlay from '@/components/SparklesOverlay';

export default function BirthdayPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground relative overflow-hidden selection:bg-primary/30">
      <SparklesOverlay />
      
      <main className="relative z-10 flex flex-col items-center">
        <Hero />
        <IntroMessage />
        <InteractiveGift />
        <PhotoQuote />
        <HeartfeltMessage />
        <FinalWish />
      </main>
    </div>
  );
}
