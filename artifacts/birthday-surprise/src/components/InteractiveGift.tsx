import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import revealImg from '@assets/IMG_20260730_235824.png';
import catIdle from '@assets/cat-idle.svg';

const noLines = [
  'Wait… don’t click NO yet. 🥺💛',
  'I was really hoping you’d choose YES… 😭',
  'Aww… this kitty is getting tiny tears now. 🥹💔',
  'Pleaseee… I saved my happiest smile for YES. 🥺✨',
];

function Sparkles({ count = 18 }: { count?: number }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    i, x: (Math.random() - .5) * 700, y: -80 - Math.random() * 520,
    d: Math.random() * .5, r: Math.random() * 500,
  })), [count]);
  return <div className="pointer-events-none fixed inset-0 z-[300] overflow-hidden">{items.map(s => <motion.span key={s.i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0,1,0], scale: [0,.9,1.1,0], x:s.x, y:s.y, rotate:s.r }} transition={{ duration:2.8, delay:s.d }} className="absolute left-1/2 top-[65%] text-2xl">{s.i % 3 === 0 ? '💛' : s.i % 3 === 1 ? '✨' : '💖'}</motion.span>)}</div>;
}

function GiftBox({ step, onTap }: { step: number; onTap: () => void }) {
  const opened = step >= 3;
  return <div className="relative h-[330px] w-[300px] select-none sm:h-[380px] sm:w-[340px]">
    <motion.div animate={{ opacity: opened ? 0 : [.2,.45,.2], scale: opened ? 1.5 : [1,1.08,1] }} transition={{ duration:1.8, repeat:opened?0:Infinity }} className="absolute bottom-8 left-1/2 h-24 w-64 -translate-x-1/2 rounded-full bg-[#ffd76a] blur-3xl" />
    <motion.div animate={{ opacity: opened ? 0 : 1 }} className="absolute bottom-[16%] left-1/2 z-20 h-[45%] w-[68%] -translate-x-1/2 overflow-hidden rounded-[14px_14px_28px_28px] border border-white/60 bg-[linear-gradient(145deg,#fff0c4,#e9a73b_48%,#a83d62)] shadow-[0_35px_65px_rgba(67,20,43,.35),inset_8px_8px_20px_rgba(255,255,255,.3)]">
      <div className="absolute inset-y-0 left-1/2 w-[17%] -translate-x-1/2 bg-[linear-gradient(90deg,#c85c7c,#fff7da,#d56c91)]" />
    </motion.div>
    <motion.button type="button" onClick={step === 0 ? onTap : undefined} disabled={step !== 0} animate={step >= 1 ? { y:-130, rotate:-6, rotateX:-20 } : { y:0, rotate:0, rotateX:0 }} transition={{ duration:.9, ease:[.16,1,.3,1] }} className="absolute left-[10%] top-[29%] z-40 h-[17%] w-[80%] rounded-2xl border border-white/70 bg-[linear-gradient(145deg,#fff1c8,#ed91b2,#a83d62)] shadow-[0_20px_32px_rgba(76,18,47,.32)] [transform-origin:50%_100%]">
      <div className="absolute inset-y-0 left-1/2 w-[17%] -translate-x-1/2 bg-[linear-gradient(90deg,#c85c7c,#fff7da,#d56c91)]" />
    </motion.button>
    <motion.button type="button" onClick={step === 1 ? onTap : undefined} disabled={step !== 1} animate={step >= 2 ? { y:-132, scale:.82, rotate:-9 } : { y:0, scale:1, rotate:0 }} transition={{ duration:.8, ease:[.16,1,.3,1] }} className="absolute left-1/2 top-[17%] z-50 h-24 w-44 -translate-x-1/2">
      <div className="absolute left-0 top-6 h-16 w-24 -rotate-[28deg] rounded-[65%_35%_65%_35%] border-4 border-[#f7bfd0] bg-[linear-gradient(135deg,#ffe8b0,#c94d7d)] shadow-lg" />
      <div className="absolute right-0 top-6 h-16 w-24 rotate-[28deg] rounded-[35%_65%_35%_65%] border-4 border-[#f7bfd0] bg-[linear-gradient(135deg,#ffe8b0,#c94d7d)] shadow-lg" />
      <div className="absolute left-1/2 top-9 h-11 w-11 -translate-x-1/2 rounded-full border-4 border-[#f7bfd0] bg-[#d65b8a] shadow-xl" />
    </motion.button>
    <motion.button type="button" onClick={step === 2 ? onTap : undefined} disabled={step !== 2} animate={step >= 3 ? { y:-170, rotate:-10, opacity:0 } : {}} transition={{ duration:1 }} className="absolute left-1/2 top-[39%] z-[70] -translate-x-1/2 rounded-full border-2 border-white/90 bg-[#fff7cf] px-5 py-3 font-sans text-[10px] font-black uppercase tracking-[.2em] text-[#85445f] shadow-xl">{step === 2 ? 'Open me ✨' : step === 1 ? 'Untie the ribbon' : 'Tap the bow'}</motion.button>
    <AnimatePresence>{step < 3 && <motion.div key={step} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{opacity:0}} className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/85 px-5 py-2 font-sans text-xs font-bold text-[#7c3d58] shadow-lg backdrop-blur">{step === 0 ? '1 / 3  •  Tap the lid' : step === 1 ? '2 / 3  •  Tap the ribbon' : '3 / 3  •  Open the little surprise'}</motion.div>}</AnimatePresence>
  </div>;
}

function CatButton({ state, text }: { state: 'sad' | 'happy'; text: string }) {
  const sad = state === 'sad';
  return <motion.div initial={{ opacity:0, scale:.65, y:25 }} animate={{ opacity:1, scale:[.9,1.05,1], y:[15,-8,0] }} transition={{ duration:.55 }} className="pointer-events-none absolute bottom-[72px] left-1/2 z-30 w-[180px] -translate-x-1/2 sm:w-[210px]">
    <div className="relative mx-auto h-[135px] w-[105px] sm:h-[150px] sm:w-[118px]">
      <motion.img src={catIdle} alt="cute 3D kitten" className="h-full w-full object-contain drop-shadow-[0_14px_18px_rgba(40,10,28,.35)]" animate={sad ? { x:[0,-3,3,0], rotate:[0,-2,2,0] } : { y:[0,-8,0], rotate:[-2,2,-2,0] }} transition={{ duration:sad?0.8:1.1, repeat:Infinity }} />
      {sad ? <><motion.span animate={{ y:[0,18], opacity:[0,1,0] }} transition={{ duration:.9, repeat:Infinity }} className="absolute left-[29%] top-[39%] h-8 w-2 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(125,211,252,.8)]" /><motion.span animate={{ y:[0,20], opacity:[0,1,0] }} transition={{ duration:.9, repeat:Infinity, delay:.22 }} className="absolute right-[29%] top-[39%] h-8 w-2 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(125,211,252,.8)]" /></> : <motion.div animate={{ scale:[1,1.2,1] }} transition={{ duration:.8, repeat:Infinity }} className="absolute left-1/2 top-[48%] h-3 w-7 -translate-x-1/2 rounded-b-full border-b-[3px] border-[#8b2d52]" />}
    </div>
    <div className={`mx-auto -mt-1 w-fit max-w-[175px] rounded-2xl border px-3 py-2 text-center text-[11px] font-bold leading-tight shadow-lg backdrop-blur-md ${sad ? 'border-[#f3b5c7]/70 bg-[#fff0f5]/95 text-[#863b59]' : 'border-[#ffe38a] bg-[#fff8db]/95 text-[#8a5b16]'}`}>{text}</div>
  </motion.div>;
}

const InteractiveGift = () => {
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState<'yes' | null>(null);
  const [noCount, setNoCount] = useState(0);
  const [celebrate, setCelebrate] = useState(false);

  const tapGift = () => {
    if (step >= 3) return;
    const next = step + 1;
    setStep(next);
    if (next === 3) window.setTimeout(() => setRevealed(true), 850);
  };
  const yes = () => { setAnswer('yes'); setNoCount(0); setCelebrate(true); window.setTimeout(() => setCelebrate(false), 3800); };
  const no = () => { if (answer !== 'yes') setNoCount(n => n + 1); };

  return <section className="relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_20%_0%,#fff1c8_0%,transparent_28%),radial-gradient(circle_at_90%_40%,#f6c8d8_0%,transparent_30%),linear-gradient(145deg,#fffaf0,#f8e8ed_52%,#f6e0b8)] px-4 py-12 sm:px-6 sm:py-16">
    {celebrate && <Sparkles />}
    <div className="mx-auto w-full max-w-5xl">
      {!revealed ? <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <div className="mb-3 rounded-full border border-[#d39a3c]/30 bg-white/60 px-5 py-2 font-sans text-[10px] font-black uppercase tracking-[.34em] text-[#9a5c28] shadow-sm backdrop-blur">A tiny surprise, just for you</div>
        <h2 className="font-serif text-4xl font-semibold text-[#6c294b] sm:text-5xl md:text-6xl" style={{fontFamily:"'Playfair Display', Georgia, serif"}}>Something is waiting…</h2>
        <p className="mt-3 max-w-md font-sans text-sm leading-6 text-[#7c5364] sm:text-base">Don’t rush it. The little box has three secrets before it opens. 🎀</p>
        <div className="mt-8 rounded-[42px] border border-white/80 bg-white/55 p-4 shadow-[0_35px_100px_rgba(90,25,60,.2)] backdrop-blur-xl sm:p-7"><GiftBox step={step} onTap={tapGift} /></div>
        <p className="mt-4 font-sans text-xs font-bold tracking-[.16em] text-[#9b5c73]">{step === 0 ? 'START WITH THE LID' : step === 1 ? 'THE RIBBON IS LOOSE…' : 'ONE LAST TAP…'}</p>
      </motion.div> : <motion.div initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[34px] border-[5px] border-white/80 bg-[#f7eadb] p-2 shadow-[0_35px_100px_rgba(71,24,48,.24)] sm:rounded-[44px] sm:p-3">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,215,103,.35),transparent_38%)]" />
          <img src={revealImg} alt="our special memory" className="relative z-10 mx-auto block max-h-[62vh] w-full rounded-[25px] object-contain sm:rounded-[34px]" />
          <div className="relative z-20 -mt-4 mx-auto w-fit rounded-full border border-[#f6d67d]/70 bg-[#fff8df]/95 px-5 py-2 font-sans text-[10px] font-black uppercase tracking-[.22em] text-[#8b5b19] shadow-lg">The little memory inside 💛</div>
        </div>

        <div className="mt-7 rounded-[34px] border border-white/80 bg-white/55 px-5 py-8 text-center shadow-[0_30px_80px_rgba(70,25,50,.16)] backdrop-blur-xl sm:px-9 sm:py-10">
          <p className="font-sans text-[10px] font-black uppercase tracking-[.38em] text-[#a65c72]">A question I’ve been carrying in my heart</p>
          <h1 className="mt-4 font-serif text-[2.45rem] font-semibold leading-[.98] text-[#632442] sm:text-5xl md:text-6xl" style={{fontFamily:"'Playfair Display', Georgia, serif"}}>Will you be my <span className="text-[#e0a52b] drop-shadow-sm" style={{fontFamily:"'Dancing Script', cursive", fontWeight:700}}>yellow?</span></h1>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#e4a62b] via-[#f5cf62] to-[#d86c91]" />
          <p className="mx-auto mt-5 max-w-2xl font-sans text-[14px] font-medium leading-7 text-[#674c59] sm:text-base md:text-lg">I don’t want to give you a name you haven’t chosen for yourself. I just want to ask you, honestly — will you stay beside me for the silly moments, our favorite songs, our little nicknames, the long talks, and all the ordinary days that become special because we share them?</p>

          <div className="relative mx-auto mt-9 flex max-w-md items-center justify-center gap-4 pt-16 sm:gap-6">
            {answer === 'yes' && <CatButton state="happy" text="You chose YES! I’m the happiest kitty! 🥹💛" />}
            {answer !== 'yes' && noCount > 0 && <CatButton state="sad" text={noLines[Math.min(noCount - 1, noLines.length - 1)]} />}
            <motion.button type="button" onClick={yes} whileHover={{scale:1.07,y:-4}} whileTap={{scale:.95}} className="relative z-20 min-w-[132px] rounded-full border border-[#ffe8a0] bg-[linear-gradient(135deg,#fff0a8,#f4b62e,#e49a1d)] px-8 py-4 font-sans text-sm font-black tracking-[.12em] text-[#633814] shadow-[0_18px_45px_rgba(224,160,37,.34)] sm:min-w-[150px] sm:text-base">YES 💛</motion.button>
            <motion.button type="button" onClick={no} whileHover={{scale:1.04}} whileTap={{scale:.94}} animate={noCount > 0 ? {x:[0,-5,5,0]} : {}} transition={{duration:.35}} className="relative z-20 min-w-[132px] rounded-full border border-white bg-[#fff8fc] px-8 py-4 font-sans text-sm font-black tracking-[.12em] text-[#793e59] shadow-[0_15px_35px_rgba(83,35,58,.16)] sm:min-w-[150px] sm:text-base">NO</motion.button>
          </div>

          <AnimatePresence mode="wait">{answer === 'yes' ? <motion.div key="yes" initial={{opacity:0,y:15,scale:.96}} animate={{opacity:1,y:0,scale:1}} className="mx-auto mt-7 max-w-2xl rounded-[26px] border border-[#f4d77c] bg-[linear-gradient(135deg,#fffdf3,#fff4cf)] px-5 py-6 shadow-xl sm:px-8">
            <p className="font-serif text-3xl font-semibold text-[#73334e] sm:text-4xl" style={{fontFamily:"'Playfair Display', Georgia, serif"}}>Then let’s make the ordinary days special. 💛</p>
            <p className="mt-3 font-sans text-sm leading-7 text-[#634d56] sm:text-base">Thank you for choosing YES. I’ll keep this little moment close — our songs, silly talks, tiny nicknames, and every memory still waiting to be made.</p>
            <p className="mt-4 text-2xl text-[#b06a24]" style={{fontFamily:"'Dancing Script', cursive"}}>Thank you, thangameyy. 🥹✨</p>
          </motion.div> : <motion.p key={noCount} initial={{opacity:0}} animate={{opacity:1}} className="mt-5 font-sans text-xs font-semibold text-[#8b6170]">{noCount === 0 ? 'No pressure. Just a little question wrapped in a lot of love. 🌷' : 'The kitty is still waiting for your YES… 🥺💛'}</motion.p>}</AnimatePresence>
        </div>
      </motion.div>}
    </div>
  </section>;
};

export default InteractiveGift;
