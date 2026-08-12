import { motion } from 'framer-motion';
import { Heart, Sparkles, Clock3, Gamepad2, Gift, BookHeart } from 'lucide-react';
import { useEffect, useState } from 'react';

const chapters = [
  { id: 'beginning', label: 'Beginning', icon: Sparkles },
  { id: 'story', label: 'Our story', icon: Clock3 },
  { id: 'heart', label: 'From me', icon: BookHeart },
  { id: 'play', label: 'Just us', icon: Gamepad2 },
  { id: 'gift', label: 'Surprise', icon: Gift },
  { id: 'finale', label: 'Always', icon: Heart },
];

export default function ExperienceNav() {
  const [active, setActive] = useState('beginning');

  useEffect(() => {
    const observers = chapters.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(id);
      }, { rootMargin: '-38% 0px -48% 0px', threshold: 0 });
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav aria-label="Birthday chapters" className="fixed right-4 top-1/2 z-[120] hidden -translate-y-1/2 md:block">
        <div className="rounded-full border border-white/40 bg-[#1a1018]/72 p-2 shadow-[0_18px_50px_rgba(34,12,25,.24)] backdrop-blur-xl">
          <div className="flex flex-col gap-1">
            {chapters.map(({ id, label, icon: Icon }) => {
              const selected = active === id;
              return (
                <button key={id} type="button" onClick={() => goTo(id)} aria-label={`Go to ${label}`} aria-current={selected ? 'page' : undefined} className="group relative flex h-10 w-10 items-center justify-center rounded-full text-white/55 transition-colors hover:text-white">
                  {selected && <motion.span layoutId="chapter-pill" className="absolute inset-0 rounded-full bg-[#b96b78] shadow-[0_8px_22px_rgba(185,107,120,.35)]" transition={{ type: 'spring', stiffness: 360, damping: 28 }} />}
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-full border border-white/10 bg-[#1a1018]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <nav aria-label="Birthday chapters" className="fixed bottom-4 left-1/2 z-[120] w-[calc(100%-24px)] -translate-x-1/2 md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between rounded-full border border-white/40 bg-[#1a1018]/82 px-2 py-2 shadow-[0_18px_50px_rgba(34,12,25,.28)] backdrop-blur-xl">
          {chapters.map(({ id, icon: Icon }) => {
            const selected = active === id;
            return (
              <button key={id} type="button" onClick={() => goTo(id)} aria-label={`Go to ${id}`} className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/55">
                {selected && <motion.span layoutId="chapter-pill-mobile" className="absolute inset-0 rounded-full bg-[#b96b78]" transition={{ type: 'spring', stiffness: 360, damping: 28 }} />}
                <Icon className="relative z-10 h-4 w-4" />
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
