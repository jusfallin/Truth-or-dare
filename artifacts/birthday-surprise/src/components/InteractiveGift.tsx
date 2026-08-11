import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

import revealImg from '@assets/IMG_20260730_235824.png';
const catImg = 'https://raw.githubusercontent.com/jusfallin/Truth-or-dare/main/artifacts/birthday-surprise/src/assets/cat-idle.svg';

const noMessages = [
  'Hehe… you almost got me. 🥺',
  'Waittt… my little heart is getting nervous. 💔',
  'Thangameyy… that button is making this kitty sad. 🥹',
  'Look at those eyes… are you really sure? 😭',
  'One tiny YES would make this kitty ridiculously happy. 💛',
  'Okay okay… I’ll keep waiting with my cutest face. 🥺🌷',
];

const escapeMoves = [
  { x: 72, y: -18, r: -3 }, { x: -78, y: 18, r: 3 }, { x: 58, y: 28, r: 2 },
  { x: -62, y: -22, r: -3 }, { x: 84, y: 10, r: 4 }, { x: -88, y: 14, r: -4 },
];

function Celebration() {
  const pieces = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    i, x: (Math.random() - .5) * 1000, y: 260 + Math.random() * 700,
    d: Math.random() * .6, r: Math.random() * 720,
  })), []);
  return <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 2.5, 3.5], opacity: [0, .55, 0] }} transition={{ duration: 1.8 }} className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd76a] blur-3xl" />
    {pieces.map(p => <motion.span key={p.i} initial={{ x: 0, y: -30, opacity: 0, scale: 0 }} animate={{ x: p.x, y: p.y, rotate: p.r, opacity: [0,1,.9,0], scale: [0,.9,1,0] }} transition={{ duration: 3.1, delay: p.d, ease: 'easeOut' }} className="absolute left-1/2 top-1/2 h-3 w-2 rounded-full bg-[#e9a93a]" />)}
    {[...Array(22)].map((_, i) => <motion.span key={i} initial={{ opacity: 0, scale: .2 }} animate={{ opacity: [0,1,0], scale: [.2,1.15,.7], x: (Math.random()-.5)*700, y: -100-Math.random()*520 }} transition={{ duration: 2.7, delay: i*.04 }} className="absolute left-1/2 top-[62%] text-3xl">{i%2 ? '💖' : '💛'}</motion.span>)}
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
  return <motion.button type="button" onPointerDown={move} whileTap={{ scale: .94 }} whileHover={{ scale: 1.04 }} style={{ x: sx, y: sy, rotate: started ? escapeMoves[index].r : 0, zIndex: 50 }} className="rounded-full border border-white/70 bg-white/90 px-10 py-4 font-sans text-sm font-bold tracking-[.12em] text-[#67364d] shadow-[0_14px_34px_rgba(55,19,38,.2)] backdrop-blur-sm">NO</motion.button>;
}

function Cat({ sadCount, answer }: { sadCount: number; answer: 'yes' | null }) {
  const sad = sadCount > 0 && answer !== 'yes';
  const happy = answer === 'yes';
  const message = happy ? 'You said YES… look how happy I am! 🥹💛' : sad ? noMessages[Math.min(sadCount - 1, noMessages.length - 1)] : 'Your little 3D kitty is waiting right here. 🐾💛';
  return <div className="relative mx-auto mt-5 flex max-w-xl flex-col items-center">
    <motion.div
      animate={happy ? { y:[0,-14,0], rotate:[-2,2,-2,0], scale:[1,1.06,1] } : sad ? { y:[0,6,0], rotate:[-1,1,-1,0] } : { y:[0,-5,0] }}
      transition={{ duration: happy ? 1.05 : sad ? .75 : 2.5, repeat: Infinity, ease:'easeInOut' }}
      className="relative h-[225px] w-[150px] sm:h-[250px] sm:w-[165px] md:h-[300px] md:w-[175px]"
    >
      <div className="absolute inset-0 rounded-[45%] bg-white/30 blur-2xl" />
      <img src={catImg} alt="cute 3D kitten holding roses" className="relative h-full w-full object-contain drop-shadow-[0_22px_28px_rgba(35,12,28,.35)]" />
      {sad && <>
        <motion.span animate={{ y:[0,22], opacity:[0,1,0] }} transition={{ duration:1.05, repeat:Infinity }} className="absolute left-[39%] top-[31%] h-11 w-2.5 rounded-full bg-sky-300/95 shadow-[0_0_8px_rgba(125,211,252,.7)]" />
        <motion.span animate={{ y:[0,24], opacity:[0,1,0] }} transition={{ duration:1.05, repeat:Infinity, delay:.24 }} className="absolute right-[39%] top-[31%] h-11 w-2.5 rounded-full bg-sky-300/95 shadow-[0_0_8px_rgba(125,211,252,.7)]" />
        <motion.div animate={{ scale:[1,.88,1] }} transition={{ duration:.7, repeat:Infinity }} className="absolute left-1/2 top-[43%] h-4 w-8 -translate-x-1/2 rounded-b-full border-b-[3px] border-[#7f294f]" />
      </>}
      {happy && <>
        <motion.div animate={{ scale:[1,1.18,1] }} transition={{ duration:.8, repeat:Infinity }} className="absolute left-1/2 top-[42%] h-4 w-9 -translate-x-1/2 rounded-b-full border-b-[4px] border-[#7f294f]" />
        <motion.span animate={{ y:[0,-7,0], opacity:[.5,1,.5] }} transition={{ duration:1.2, repeat:Infinity }} className="absolute -left-4 top-[10%] text-xl">✨</motion.span>
        <motion.span animate={{ y:[0,-8,0], scale:[1,1.1,1] }} transition={{ duration:1.3, repeat:Infinity, delay:.2 }} className="absolute -right-5 top-[17%] text-xl">💛</motion.span>
      </>}
    </motion.div>
    <AnimatePresence mode="wait"><motion.p key={`${answer}-${sadCount}`} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} className="mt-1 max-w-lg text-center font-sans text-sm font-medium leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(30,5,20,.8)] md:text-base">{message}</motion.p></AnimatePresence>
  </div>;
}

function GiftBox({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  return <motion.button type="button" onClick={onOpen} disabled={opening} whileHover={!opening ? { scale:1.025, y:-5 } : undefined} whileTap={!opening ? { scale:.97 } : undefined} className="group relative h-[350px] w-[300px] sm:h-[390px] sm:w-[340px] md:h-[450px] md:w-[390px]">
    <motion.div animate={opening ? { scale:1.5, opacity:0 } : { scale:[1,1.08,1], opacity:[.22,.4,.22] }} transition={{ duration:1.8, repeat:opening?0:Infinity }} className="absolute bottom-7 left-1/2 h-20 w-[72%] -translate-x-1/2 rounded-full bg-[#ffd86a] blur-3xl" />
    <motion.div animate={opening ? { opacity:[0,1,0], scale:[.2,1.5,2.2], rotate:[0,30,60] } : {}} transition={{ duration:.9 }} className="absolute left-1/2 top-[27%] z-[80] -translate-x-1/2 text-5xl">✨</motion.div>
    <div className="absolute bottom-7 left-1/2 h-12 w-[75%] -translate-x-1/2 rounded-full bg-[#4b1631]/25 blur-2xl" />
    <motion.div animate={opening ? { scale:1.12, opacity:0 } : {}} transition={{ duration:.75 }} className="absolute bottom-[18%] left-1/2 z-20 h-[45%] w-[67%] -translate-x-1/2 overflow-hidden rounded-[12px_12px_28px_28px] border border-white/50 bg-[linear-gradient(145deg,#ffe1eb,#e98aac_45%,#a72f60)] shadow-[0_35px_55px_rgba(74,17,45,.35),inset_8px_8px_16px_rgba(255,255,255,.25)]">
      <div className="absolute inset-y-0 left-1/2 w-[16%] -translate-x-1/2 bg-[linear-gradient(90deg,#c64e7c,#fff8fa 48%,#d66c96)]" />
    </motion.div>
    <motion.div animate={opening ? { y:-145, rotateZ:-7, rotateX:-24, scale:1.04 } : { y:0, rotateZ:0, rotateX:0 }} transition={{ duration:1.05, ease:[.16,1,.3,1] }} className="absolute left-[10%] top-[30%] z-40 h-[17%] w-[80%] rounded-2xl border border-white/60 bg-[linear-gradient(145deg,#ffe7f0,#ed91b2,#b23d6c)] shadow-[0_20px_32px_rgba(76,18,47,.3)] [transform-origin:50%_100%]">
      <div className="absolute inset-y-0 left-1/2 w-[16%] -translate-x-1/2 bg-[linear-gradient(90deg,#c64e7c,#fff8fa,#d66c96)]" />
    </motion.div>
    <motion.div animate={opening ? { y:-156, scale:.78, rotate:-8 } : { y:0, scale:1, rotate:0 }} transition={{ duration:1.0, ease:[.16,1,.3,1] }} className="absolute left-1/2 top-[18%] z-50 h-24 w-44 -translate-x-1/2">
      <motion.div animate={!opening ? { rotate:[-2,2,-2] } : {}} transition={{ duration:1.8, repeat:opening?0:Infinity }} className="absolute inset-0">
        <div className="absolute left-0 top-6 h-16 w-24 -rotate-[28deg] rounded-[65%_35%_65%_35%] border-4 border-[#f2a8c4] bg-[linear-gradient(135deg,#ffdce9,#c94d7d)] shadow-lg" />
        <div className="absolute right-0 top-6 h-16 w-24 rotate-[28deg] rounded-[35%_65%_35%_65%] border-4 border-[#f2a8c4] bg-[linear-gradient(135deg,#ffdce9,#c94d7d)] shadow-lg" />
        <div className="absolute left-1/2 top-9 h-11 w-11 -translate-x-1/2 rounded-full border-4 border-[#f2a8c4] bg-[#d65b8a] shadow-xl" />
      </motion.div>
    </motion.div>
    <motion.div animate={opening ? { opacity:0, y:-20 } : { opacity:[.45,1,.45], y:[0,-4,0] }} transition={{ duration:1.7, repeat:opening?0:Infinity }} className="absolute left-1/2 top-[72%] z-[70] -translate-x-1/2 rounded-full border border-white/70 bg-white/75 px-5 py-2 font-sans text-[10px] font-black uppercase tracking-[.28em] text-[#8d4162] shadow-lg backdrop-blur-sm">Tap me ✨</motion.div>
  </motion.button>;
}

const InteractiveGift = () => {
  const [opened,setOpened]=useState(false), [opening,setOpening]=useState(false), [answer,setAnswer]=useState<'yes'|null>(null), [sadCount,setSadCount]=useState(0), [celebrate,setCelebrate]=useState(false);
  const openGift=()=>{ if(opening||opened)return; setOpening(true); window.setTimeout(()=>{setOpening(false);setOpened(true)},1450); };
  const yes=()=>{setAnswer('yes');setSadCount(0);setCelebrate(true);window.setTimeout(()=>setCelebrate(false),4200);};
  const no=()=>{if(answer!=='yes')setSadCount(c=>c+1)};

  return <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#f5e8e7] px-3 py-10 sm:px-5 sm:py-14 md:py-20">
    {celebrate&&<Celebration/>}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,214,230,.8),transparent_34%),radial-gradient(circle_at_85%_85%,rgba(255,226,160,.55),transparent_30%)]" />
    <div className="relative z-10 mx-auto w-full max-w-6xl">
      <AnimatePresence mode="wait">
        {!opened ? <motion.div key="gift" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.94}} className="flex flex-col items-center text-center">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[.38em] text-[#9d4f70] sm:text-[11px]">A little something from my heart</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-[#5d2342] sm:text-5xl md:text-6xl">Wrapped just for you 🎀</h2>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-[#80576b] md:text-base">There’s one little surprise inside. Tap the gift once… and let it surprise you. 💗</p>
          <div className="mt-7 rounded-[38px] border border-white/80 bg-white/55 p-2 shadow-[0_35px_100px_rgba(90,25,60,.16)] backdrop-blur-xl sm:p-4 md:p-6"><GiftBox opening={opening} onOpen={openGift}/></div>
          <p className="mt-2 font-sans text-xs font-semibold text-[#a25b79]">{opening?'Wait for it… ✨':'One tap. One little surprise. 💛'}</p>
        </motion.div> : <motion.div key="question" initial={{opacity:0,y:25,scale:.98}} animate={{opacity:1,y:0,scale:1}} className="relative overflow-hidden rounded-[30px] border border-white/70 shadow-[0_35px_100px_rgba(48,16,35,.3)] sm:rounded-[40px]">
          <div className="absolute inset-0 bg-[#c99e9f]" />
          <img src={revealImg} alt="our special memory" className="absolute inset-0 h-full w-full object-contain md:object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,13,25,.42)_0%,rgba(45,14,31,.28)_34%,rgba(47,14,32,.48)_66%,rgba(26,8,22,.7)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,246,212,.18),transparent_34%)]" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1d0b18]/30 to-transparent" />
          <div className="relative z-10 min-h-[880px] px-4 py-9 sm:min-h-[900px] sm:px-8 sm:py-12 md:min-h-[900px] md:px-12 md:py-14">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[.34em] text-[#fff0b5] drop-shadow-lg sm:text-[11px] sm:tracking-[.38em]">One little question from my heart</p>
              <h2 className="mt-4 font-serif text-[2.45rem] font-semibold leading-[1.02] text-white drop-shadow-[0_4px_16px_rgba(25,5,18,.85)] sm:text-5xl md:text-6xl lg:text-7xl">Will you choose to be my <span className="text-[#ffd85a]" style={{fontFamily:"'Dancing Script', cursive", fontWeight:700}}>yellow?</span></h2>
              <motion.div animate={{scale:[1,1.12,1],rotate:[0,-4,4,0]}} transition={{duration:2.4,repeat:Infinity}} className="mt-3 text-3xl drop-shadow-lg sm:text-4xl">💛</motion.div>
              <p className="mx-auto mt-4 max-w-3xl font-sans text-[14px] font-medium leading-[1.75] text-white drop-shadow-[0_2px_8px_rgba(20,4,15,.9)] sm:text-base md:text-lg">I don’t want to give you a name you haven’t chosen for yourself. I just want to ask you, honestly and with all the love I have — will you stay beside me for the silly moments, our favorite songs, our little nicknames, the long talks, and all the ordinary days that become special because we share them?</p>
              <Cat answer={answer} sadCount={sadCount}/>
              <AnimatePresence mode="wait">
                {answer==='yes' ? <motion.div key="yes" initial={{opacity:0,y:22,scale:.94}} animate={{opacity:1,y:0,scale:1}} className="mx-auto mt-5 max-w-2xl rounded-[26px] border border-white/70 bg-[#fffaf0]/95 px-5 py-6 shadow-[0_22px_60px_rgba(48,12,32,.3)] backdrop-blur-md sm:px-8 sm:py-7">
                  <p className="font-serif text-3xl font-semibold leading-tight text-[#7b3f56] sm:text-4xl md:text-5xl" style={{fontFamily:"'Playfair Display', Georgia, serif"}}>Okay… it’s official. 💛</p>
                  <p className="mt-3 font-sans text-sm leading-7 text-[#5f4650] sm:text-base md:text-lg">You just turned a little word into something that belongs to us. From silly moments and favorite songs to our weird little nicknames and the long talks — I want all of it with you.</p>
                  <p className="mt-4 font-serif text-xl font-semibold text-[#a66b12] sm:text-2xl" style={{fontFamily:"'Dancing Script', cursive"}}>Thank you for choosing me, thangameyy. 🥹💛</p>
                  <p className="mt-3 font-sans text-[10px] font-bold uppercase tracking-[.2em] text-[#a37a42] sm:text-xs">My favorite answer. My favorite person. ✨</p>
                </motion.div> : <div className="mt-5 flex items-center justify-center gap-5 overflow-visible md:gap-8">
                  <motion.button type="button" onClick={yes} whileHover={{scale:1.07,y:-2}} whileTap={{scale:.95}} className="rounded-full bg-[linear-gradient(135deg,#ffe27a,#f1b52f)] px-10 py-4 font-sans text-sm font-black tracking-[.1em] text-[#633615] shadow-[0_16px_40px_rgba(226,171,53,.38)] sm:px-12 sm:text-base">YES 💛</motion.button>
                  <RunawayNo onAttempt={no}/>
                </div>}
              </AnimatePresence>
              {answer!=='yes' && <AnimatePresence mode="wait"><motion.p key={sadCount} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="mx-auto mt-4 max-w-xl font-sans text-xs font-medium text-white/90 drop-shadow-lg sm:text-sm">{sadCount>0 ? noMessages[Math.min(sadCount-1,noMessages.length-1)] : 'No pressure. Just a little question wrapped in a lot of love. 🌷'}</motion.p></AnimatePresence>}
            </div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </div>
  </section>;
};

export default InteractiveGift;
