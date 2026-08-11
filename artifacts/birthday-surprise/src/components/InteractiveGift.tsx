import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import revealImg from '@assets/IMG_20260730_235824.png';
import catIdle from '@assets/cat-idle.svg';

const noMessages = [
  'Hehe… you almost got me. 🥺',
  'Waittt… are you really trying to press NO? My little heart is nervous. 💔',
  'Thangameyy… that button is making this kitty very sad. 🥹',
  'Look at those eyes… are you sure you want to make me cry? 😭',
  'One tiny YES would turn this sad little face into the happiest kitty. 💛',
  'Okay okay… I’ll keep asking with my cutest face. 🥺🌷',
];

const escapeMoves = [
  { x: 62, y: -14, r: -3 }, { x: -68, y: 18, r: 3 }, { x: 50, y: 26, r: 2 },
  { x: -54, y: -20, r: -3 }, { x: 74, y: 8, r: 4 }, { x: -76, y: 12, r: -4 },
];

function Celebration() {
  const pieces = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    i, x: (Math.random() - .5) * 1000, y: 300 + Math.random() * 650,
    d: Math.random() * .55, r: Math.random() * 720,
  })), []);
  return <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 2, 3], opacity: [0, .65, 0] }} transition={{ duration: 1.7 }} className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd75e] blur-3xl" />
    {pieces.map(p => <motion.span key={p.i} initial={{ x: 0, y: -40, opacity: 0, scale: 0 }} animate={{ x: p.x, y: p.y, rotate: p.r, opacity: [0,1,.9,0], scale: [0,.9,1,0] }} transition={{ duration: 3, delay: p.d, ease: 'easeOut' }} className="absolute left-1/2 top-1/2 h-3 w-2 rounded-full bg-[#e9a93a]" />)}
    {[...Array(18)].map((_, i) => <motion.span key={i} initial={{ opacity: 0, scale: .2 }} animate={{ opacity: [0,1,0], scale: [.2,1.2,.7], x: (Math.random()-.5)*650, y: -100-Math.random()*500 }} transition={{ duration: 2.5, delay: i*.05 }} className="absolute left-1/2 top-[58%] text-3xl">{i%2 ? '💖' : '💛'}</motion.span>)}
  </div>;
}

function RunawayNo({ onAttempt }: { onAttempt: () => void }) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const last = useRef(0);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 30 }), sy = useSpring(y, { stiffness: 500, damping: 30 });
  const move = useCallback(() => {
    const now = Date.now(); if (now-last.current < 250) return; last.current = now;
    const next = (index + 1) % escapeMoves.length; setIndex(next); setStarted(true);
    x.set(escapeMoves[next].x); y.set(escapeMoves[next].y); onAttempt();
  }, [index, onAttempt, x, y]);
  return <motion.button type="button" onPointerDown={move} whileTap={{ scale: .95 }} whileHover={{ scale: started ? 1.03 : 1.05 }} style={{ x: sx, y: sy, rotate: started ? escapeMoves[index].r : 0, zIndex: 50 }} className="rounded-full border border-[#8d3c60]/20 bg-white/95 px-12 py-4 font-sans text-base font-bold tracking-[.12em] text-[#71344f] shadow-[0_12px_35px_rgba(91,30,62,.16)]">NO</motion.button>;
}

function Cat({ sadCount, answer }: { sadCount: number; answer: 'yes' | null }) {
  const sad = sadCount > 0 && answer !== 'yes';
  const happy = answer === 'yes';
  const message = happy ? 'YES! I knew you would choose me! 🥹💛' : sad ? noMessages[Math.min(sadCount - 1, noMessages.length - 1)] : 'I’m waiting right here with my cutest little face. 🐾💛';
  return <div className="relative mx-auto mt-6 flex max-w-xl flex-col items-center">
    <motion.div animate={happy ? { y:[0,-12,0], rotate:[-2,2,-2,0], scale:[1,1.05,1] } : sad ? { y:[0,5,0], rotate:[-1,1,-1,0] } : { y:[0,-4,0] }} transition={{ duration: happy ? 1.05 : sad ? .75 : 2.4, repeat: Infinity, ease:'easeInOut' }} className="relative h-[275px] w-[185px] md:h-[330px] md:w-[190px]">
      <div className="absolute inset-0 rounded-[45%] bg-white/30 blur-2xl" />
      <img src={catIdle} alt="cute 3D kitten holding roses" className="relative h-full w-full object-contain drop-shadow-[0_22px_28px_rgba(67,25,42,.28)]" />
      {sad && <>
        <motion.span animate={{ y:[0,18], opacity:[0,1,0] }} transition={{ duration:1, repeat:Infinity }} className="absolute left-[38%] top-[31%] h-12 w-2.5 rounded-full bg-sky-300/90" />
        <motion.span animate={{ y:[0,20], opacity:[0,1,0] }} transition={{ duration:1, repeat:Infinity, delay:.25 }} className="absolute right-[38%] top-[31%] h-12 w-2.5 rounded-full bg-sky-300/90" />
        <motion.div animate={{ scale:[1,.92,1] }} transition={{ duration:.7, repeat:Infinity }} className="absolute left-1/2 top-[42%] h-4 w-8 -translate-x-1/2 rounded-b-full border-b-[3px] border-[#7f294f]" />
      </>}
      {happy && <>
        <motion.div animate={{ scale:[1,1.15,1] }} transition={{ duration:.8, repeat:Infinity }} className="absolute left-1/2 top-[42%] h-4 w-9 -translate-x-1/2 rounded-b-full border-b-[4px] border-[#7f294f]" />
        <div className="absolute -left-5 top-[12%] text-xl">✨</div><div className="absolute -right-5 top-[20%] text-xl">💛</div>
      </>}
    </motion.div>
    <AnimatePresence mode="wait"><motion.p key={`${answer}-${sadCount}`} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} className="mt-2 max-w-lg text-center font-serif text-lg font-semibold text-[#fff8fb] drop-shadow-[0_2px_8px_rgba(60,20,40,.55)] md:text-xl">{message}</motion.p></AnimatePresence>
  </div>;
}

function GiftBox({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  return <motion.button type="button" onClick={onOpen} disabled={opening} whileHover={!opening ? { scale:1.02, y:-4 } : undefined} whileTap={!opening ? { scale:.98 } : undefined} className="relative h-[390px] w-[340px] md:h-[450px] md:w-[390px]">
    <div className="absolute bottom-7 left-1/2 h-12 w-[75%] -translate-x-1/2 rounded-full bg-[#4b1631]/25 blur-2xl" />
    <div className="absolute left-1/2 top-[35%] h-40 w-40 -translate-x-1/2 rounded-full bg-[#fff0b8]/50 blur-3xl" />
    <motion.div animate={opening ? { scale:1.15, opacity:0 } : {}} transition={{ duration:.7 }} className="absolute bottom-[18%] left-1/2 z-20 h-[45%] w-[67%] -translate-x-1/2 overflow-hidden rounded-[12px_12px_28px_28px] border border-white/50 bg-[linear-gradient(145deg,#ffe1eb,#e98aac_45%,#a72f60)] shadow-[0_35px_55px_rgba(74,17,45,.35),inset_8px_8px_16px_rgba(255,255,255,.25)]">
      <div className="absolute inset-y-0 left-1/2 w-[16%] -translate-x-1/2 bg-[linear-gradient(90deg,#c64e7c,#fff8fa 48%,#d66c96)]" />
      <div className="absolute inset-x-5 bottom-4 h-1 rounded-full bg-white/20" />
    </motion.div>
    <motion.div animate={opening ? { y:-140, rotateZ:-5, rotateX:-18 } : { y:0, rotateZ:0, rotateX:0 }} transition={{ duration:1.05, ease:[.16,1,.3,1] }} className="absolute left-[10%] top-[30%] z-40 h-[17%] w-[80%] rounded-2xl border border-white/60 bg-[linear-gradient(145deg,#ffe7f0,#ed91b2,#b23d6c)] shadow-[0_20px_32px_rgba(76,18,47,.3)] [transform-origin:50%_100%]">
      <div className="absolute inset-y-0 left-1/2 w-[16%] -translate-x-1/2 bg-[linear-gradient(90deg,#c64e7c,#fff8fa,#d66c96)]" />
    </motion.div>
    <motion.div animate={opening ? { y:-150, scale:.78, rotate:-8 } : { y:0, scale:1, rotate:0 }} transition={{ duration:.95 }} className="absolute left-1/2 top-[18%] z-50 h-24 w-44 -translate-x-1/2">
      <div className="absolute left-0 top-6 h-16 w-24 -rotate-[28deg] rounded-[65%_35%_65%_35%] border-4 border-[#f2a8c4] bg-[linear-gradient(135deg,#ffdce9,#c94d7d)] shadow-lg" />
      <div className="absolute right-0 top-6 h-16 w-24 rotate-[28deg] rounded-[35%_65%_35%_65%] border-4 border-[#f2a8c4] bg-[linear-gradient(135deg,#ffdce9,#c94d7d)] shadow-lg" />
      <div className="absolute left-1/2 top-9 h-11 w-11 -translate-x-1/2 rounded-full border-4 border-[#f2a8c4] bg-[#d65b8a] shadow-xl" />
    </motion.div>
    <motion.div animate={opening ? { opacity:0 } : { opacity:[.4,1,.4] }} transition={{ duration:2, repeat:opening?0:Infinity }} className="absolute left-[20%] top-[20%] z-[60] text-2xl text-[#f1c44c]">✦</motion.div>
    <motion.div animate={opening ? { opacity:0 } : { opacity:[1,.35,1] }} transition={{ duration:1.8, repeat:opening?0:Infinity }} className="absolute right-[20%] top-[30%] z-[60] text-xl text-[#f1c44c]">✦</motion.div>
  </motion.button>;
}

const InteractiveGift = () => {
  const [opened,setOpened]=useState(false), [opening,setOpening]=useState(false), [answer,setAnswer]=useState<'yes'|null>(null), [sadCount,setSadCount]=useState(0), [celebrate,setCelebrate]=useState(false);
  const openGift=()=>{ if(opening||opened)return; setOpening(true); window.setTimeout(()=>{setOpening(false);setOpened(true)},1200); };
  const yes=()=>{setAnswer('yes');setSadCount(0);setCelebrate(true);window.setTimeout(()=>setCelebrate(false),4200);};
  const no=()=>{if(answer!=='yes')setSadCount(c=>c+1)};
  return <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#fff7fa] px-4 py-16 md:py-24">
    {celebrate&&<Celebration/>}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,214,230,.8),transparent_34%),radial-gradient(circle_at_85%_85%,rgba(255,226,160,.5),transparent_30%)]" />
    <div className="relative z-10 mx-auto w-full max-w-6xl">
      <AnimatePresence mode="wait">
        {!opened ? <motion.div key="gift" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.94}} className="flex flex-col items-center text-center">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[.4em] text-[#9d4f70]">A little something from my heart</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-[#5d2342] md:text-6xl">Wrapped just for you 🎀</h2>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-[#80576b] md:text-base">There’s one little surprise inside. Take a breath, smile a little, and open it when you’re ready. 💗</p>
          <div className="mt-8 rounded-[42px] border border-white/80 bg-white/55 p-3 shadow-[0_35px_100px_rgba(90,25,60,.16)] backdrop-blur-xl md:p-7"><GiftBox opening={opening} onOpen={openGift}/></div>
          <p className="mt-4 font-sans text-xs font-bold uppercase tracking-[.3em] text-[#a25b79]">{opening?'Something beautiful is opening… ✨':'Tap the gift to open it'}</p>
        </motion.div> : <motion.div key="question" initial={{opacity:0,y:25,scale:.98}} animate={{opacity:1,y:0,scale:1}} className="relative overflow-hidden rounded-[42px] border border-white/80 shadow-[0_40px_120px_rgba(68,22,50,.28)]">
          <img src={revealImg} alt="our special memory" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,9,28,.48),rgba(63,16,40,.55)_48%,rgba(35,8,26,.72))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,239,187,.25),transparent_35%)]" />
          <div className="relative z-10 px-5 py-10 md:px-12 md:py-14">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[.38em] text-[#ffe9a8]">One little question from my heart</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.04] text-white md:text-6xl lg:text-7xl drop-shadow-[0_4px_16px_rgba(30,5,20,.6)]">Will you choose to be my <span className="font-cursive text-[#ffd45d]">yellow?</span></h2>
              <motion.div animate={{scale:[1,1.12,1],rotate:[0,-4,4,0]}} transition={{duration:2.4,repeat:Infinity}} className="mt-3 text-4xl">💛</motion.div>
              <p className="mx-auto mt-5 max-w-3xl font-serif text-base leading-[1.8] text-white/95 md:text-lg drop-shadow-[0_2px_8px_rgba(30,5,20,.65)]">I don’t want to give you a name you haven’t chosen for yourself. I just want to ask you, honestly and with all the love I have — will you stay beside me for the silly moments, our favorite songs, our little nicknames, the long talks, and all the ordinary days that become special because we share them? If your heart says yes, then maybe we can make “yellow” ours. 💛</p>
              <Cat answer={answer} sadCount={sadCount}/>
              <div className="relative mx-auto mt-7 flex min-h-[82px] max-w-xl items-center justify-center gap-5 overflow-visible md:gap-8">
                <motion.button type="button" onClick={yes} whileHover={{scale:1.07,y:-2}} whileTap={{scale:.95}} className="rounded-full bg-[linear-gradient(135deg,#ffd45e,#f0ad25)] px-12 py-4 font-sans text-base font-black tracking-[.12em] text-[#6a3516] shadow-[0_16px_40px_rgba(226,171,53,.35)]">YES 💛</motion.button>
                <RunawayNo onAttempt={no}/>
              </div>
              <AnimatePresence mode="wait">
                {answer==='yes' ? <motion.div key="yes" initial={{opacity:0,y:18,scale:.92}} animate={{opacity:1,y:0,scale:1}} className="mx-auto mt-6 max-w-2xl rounded-[28px] border border-[#ffe38b]/50 bg-[#fff7d9]/95 px-6 py-6 shadow-[0_18px_50px_rgba(80,25,40,.25)]">
                  <p className="font-cursive text-4xl text-[#a66b12] md:text-5xl">YES! I knew you’d choose me! 🥹💛</p>
                  <p className="mt-3 font-serif text-base leading-relaxed text-[#674a35] md:text-lg">Thanks… I love you, thangameyy. You just made my heart the happiest little place in the world. From this moment, I’m keeping this YES very close to my heart. 💖✨</p>
                  <p className="mt-3 font-sans text-xs font-black uppercase tracking-[.25em] text-[#b27a20]">My favorite answer. My favorite person. 💛</p>
                </motion.div> : sadCount>0 ? <motion.p key={sadCount} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="mx-auto mt-4 max-w-xl font-serif text-sm italic text-white/95 drop-shadow-lg">{noMessages[Math.min(sadCount-1,noMessages.length-1)]}</motion.p> : <motion.p key="wait" initial={{opacity:0}} animate={{opacity:1}} className="mt-4 font-serif text-sm italic text-white/85">No pressure. Just a little question wrapped in a lot of love. 🌷</motion.p>}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </div>
  </section>;
};

export default InteractiveGift;
