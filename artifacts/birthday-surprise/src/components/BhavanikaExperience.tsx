import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Heart, LockKeyhole, Music2, Sparkles, Volume2, X } from 'lucide-react';

const photoPaths = Array.from({ length: 14 }, (_, i) => `/bhavanika/${String(i + 1).padStart(2, '0')}.webp`);

const memories = [
  ['01', 'the first little world', 'ZEPETO was only supposed to be a game.'],
  ['02', 'somewhere between pixels', 'we started caring about each other.'],
  ['03', 'and then it became us', 'different screens, one story.'],
  ['04', 'the silly moments', 'the kind I would never want to lose.'],
  ['05', 'the soft ones', 'the ones that made distance feel smaller.'],
  ['06', 'my favourite coincidence', 'meeting you there changed everything.'],
];

const songs = [
  ['Vizhi Veekura', 'the one that feels like us'],
  ['Sidu Sidu', 'our chaotic little mood'],
  ['Kannana Kanne — Ne Kalangatha Di', 'the soft one'],
  ['Blue — yung kai', 'for the midnight version of us'],
];

const reasons = [
  ['01', 'the way you care', 'You make small things feel important.'],
  ['02', 'your voice', 'Somehow a normal conversation feels different when it is you.'],
  ['03', 'your cuteness', 'Especially the way you talk when you are completely yourself.'],
  ['04', 'your fire', 'Your anger, decisions and confidence are part of the person I fell for.'],
  ['05', 'every little thing', 'I stopped trying to pick favourites. I love the whole person.'],
];

const quiz = [
  ['Where did our story begin?', ['Instagram', 'ZEPETO', 'College', 'A random café'], 'ZEPETO'],
  ['Which names belong to us?', ['Thangoww + Kelavi', 'Boss + Baby', 'Zoro + Queen', 'Professor + Student'], 'Thangoww + Kelavi'],
  ['What happened after we started talking?', ['Nothing', 'We started caring', 'We forgot each other', 'We met at a café'], 'We started caring'],
];

export default function BhavanikaExperience() {
  const [entered, setEntered] = useState(false);
  const [secret, setSecret] = useState(false);
  const [reason, setReason] = useState<number | null>(null);
  const [photo, setPhoto] = useState<number | null>(null);
  const [song, setSong] = useState<number | null>(null);
  const [letter, setLetter] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [gift, setGift] = useState(false);
  const { scrollYProgress } = useScroll();
  const glow = useTransform(scrollYProgress, [0, .5, 1], [.12, .34, .12]);
  const quizLabel = useMemo(() => `${Math.min(quizIndex + 1, quiz.length)}/${quiz.length}`, [quizIndex]);

  function answer(value: string) {
    const current = quiz[quizIndex];
    const next = score + (value === current[2] ? 1 : 0);
    setScore(next);
    if (quizIndex === quiz.length - 1) setQuizDone(true); else setQuizIndex(v => v + 1);
  }

  return <div className="bhavanika-world">
    <motion.div className="bhavanika-progress" style={{ scaleX: scrollYProgress }} />
    <motion.div className="ambient-glow" style={{ opacity: glow }} />

    <AnimatePresence>{!entered && <motion.div className="entrance-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 1 }}>
      <div className="entrance-stars" />
      <motion.div className="entrance-orb" animate={{ scale: [1, 1.08, 1], opacity: [.5, .9, .5] }} transition={{ duration: 3.5, repeat: Infinity }} />
      <p className="eyebrow">a private little world</p>
      <h1>Hey, <span>Bhavanika.</span></h1>
      <p className="entrance-copy">I didn't want to send you just another birthday message.<br />So I made somewhere for you to wander through.</p>
      <button className="enter-button" onClick={() => setEntered(true)}><span>Enter my little world</span><ArrowRight size={18} /></button>
      <p className="tiny-note"><LockKeyhole size={12} /> made only for you</p>
    </motion.div>}</AnimatePresence>

    {entered && <>
      <header className="floating-nav">
        <a href="#beginning">B</a>
        <nav><a href="#story">beginning</a><a href="#memories">memories</a><a href="#heart">feelings</a><a href="#letter">letter</a><a href="#gift">last thing</a></nav>
        <a className="music-pill" href="#songs"><Music2 size={15} /><span>our songs</span></a>
      </header>

      <main>
        <section id="beginning" className="hero-chapter">
          <div className="hero-noise" />
          <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
            <p className="eyebrow">09 · 09 · 2008</p>
            <h2>For the girl who somehow<br /><em>became my favourite person.</em></h2>
            <p className="hero-sub">No distance, no screen, no game could make this feel ordinary.</p>
            <a href="#story" className="scroll-cue">begin the story <ArrowDown size={15} /></a>
          </motion.div>
          <div className="hero-ring ring-one" /><div className="hero-ring ring-two" />
        </section>

        <section id="story" className="chapter story-chapter">
          <div className="section-kicker">chapter 01 · the beginning</div>
          <div className="story-grid">
            <div><h3>We met in a<br /><span>digital world.</span></h3><p className="lead">ZEPETO was supposed to be just a game. Then somehow, between pixels and conversations, we just started to care for both of us.</p><button className="story-trigger" onClick={() => setSecret(v => !v)}><span>open the first secret</span><Sparkles size={16} /></button></div>
            <motion.div className="zepeto-photo-card" whileHover={{ rotate: -2, y: -8 }} onClick={() => setSecret(true)}><img src={photoPaths[0]} alt="Bhavanika and me in our ZEPETO world" /><div className="photo-shine" /><span>tap the memory</span></motion.div>
          </div>
          <AnimatePresence>{secret && <motion.div className="secret-reveal" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Sparkles size={16} /> I am really, really glad I met you there.<button onClick={() => setSecret(false)}><X size={14} /></button></motion.div>}</AnimatePresence>
          <div className="distance-line"><span>you</span><div><i /><i /><i /><i /><i /></div><span>her</span><strong>different screens · same story</strong></div>
        </section>

        <section id="memories" className="chapter memory-chapter">
          <div className="section-kicker">chapter 02 · pieces of us</div>
          <div className="memory-intro"><h3>Not a gallery.<br /><em>A trail of memories.</em></h3><p>Every picture is a door. Open one, then keep wandering.</p></div>
          <div className="memory-wall">
            {memories.map(([num, title, copy], i) => <motion.button key={num} className={`memory-tile tile-${i + 1}`} onClick={() => setPhoto(i)} whileHover={{ y: -10, rotate: i % 2 ? 1.5 : -1.5 }} whileTap={{ scale: .98 }}><img src={photoPaths[i]} alt={title} loading="lazy" /><span className="memory-shade" /><b>{num}</b><strong>{title}</strong><small>{copy}</small></motion.button>)}
          </div>
          <div className="memory-strip">{photoPaths.slice(6).map((src, i) => <button key={src} onClick={() => setPhoto(i + 6)}><img src={src} alt="Another little memory" loading="lazy" /></button>)}</div>
        </section>

        <AnimatePresence>{photo !== null && <motion.div className="photo-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPhoto(null)}><motion.div className="photo-modal" initial={{ scale: .88, y: 25 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .92 }} onClick={e => e.stopPropagation()}><img src={photoPaths[photo]} alt="Our memory" /><button onClick={() => setPhoto(null)}><X size={18} /></button><span>memory {String(photo + 1).padStart(2, '0')} · thangoww × kelavi</span></motion.div></motion.div>}</AnimatePresence>

        <section id="heart" className="chapter warm-chapter">
          <div className="section-kicker">chapter 03 · the little things</div>
          <div className="center-heading"><h3>I fell for you<br /><em>more than once.</em></h3><p>Honestly? Probably more than 100 times a day.</p></div>
          <div className="reasons-grid">{reasons.map(([num, title, copy], i) => <motion.button key={num} className={`reason-card ${reason === i ? 'is-open' : ''}`} onClick={() => setReason(reason === i ? null : i)} whileTap={{ scale: .98 }}><span className="reason-num">{num}</span><span className="reason-title">{title}</span><span className="reason-plus">{reason === i ? '−' : '+'}</span>{reason === i && <motion.span className="reason-text" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{copy}</motion.span>}</motion.button>)}</div>
          <p className="micro-love"><Heart size={13} fill="currentColor" /> thangoww · kelavi · my favourite human</p>
        </section>

        <section id="songs" className="chapter songs-chapter">
          <div className="section-kicker">chapter 04 · our soundtrack</div>
          <div className="songs-layout"><div><h3>Some songs<br /><em>sound like us.</em></h3><p>Pick one. The memory wall changes with it.</p></div><div className="song-stack">{songs.map(([title, note], i) => <motion.button key={title} className={`song-card ${song === i ? 'song-active' : ''}`} whileHover={{ x: 8 }} whileTap={{ scale: .98 }} onClick={() => setSong(i)}><span className="song-index">0{i + 1}</span><span><strong>{title}</strong><small>{note}</small></span><Volume2 size={16} /></motion.button>)}</div></div>
          {song !== null && <motion.div className="song-focus" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}><img src={photoPaths[(song + 7) % photoPaths.length]} alt="Our song memory" /><div><span>now playing in my head</span><h4>{songs[song][0]}</h4><p>Real audio will be attached only after you add the song files. Tap-to-play is intentionally user initiated.</p></div></motion.div>}
        </section>

        <section id="letter" className="chapter letter-chapter">
          <div className="section-kicker">chapter 05 · the thing I couldn't fit in a chat</div>
          <div className="letter-stage"><motion.div className={`envelope ${letter ? 'opened' : ''}`}><div className="envelope-back" /><div className="envelope-paper"><p>Dear Bhavanika,</p><p>We just started to care for both of us — and I guess I already fell for you more than 100 times a day.</p><p>I just loved the way you care, your voice, your cuteness in the way you talk, your anger, your decisions, your confidence — every little thing.</p><p>I love every single thing about you.</p><p>I know you're focused on your studies and have a fear of losing. But I don't want fear to decide what this becomes.</p><p className="letter-question">So can we start our relationship — one I want to end in marriage?</p><p>Yes. I want you to be with me till death.</p><p className="letter-sign">— from your thangoww's kelavi's favourite troublemaker</p></div><div className="envelope-front" /><div className="envelope-flap" /></motion.div>{!letter ? <button className="open-letter" onClick={() => setLetter(true)}>break the seal <ArrowRight size={16} /></button> : <p className="letter-after">you opened the part I couldn't send as an ordinary message.</p>}</div>
        </section>

        <section className="chapter quiz-chapter">
          <div className="section-kicker">chapter 06 · one tiny test</div>
          {!quizDone ? <div className="quiz-shell"><div className="quiz-top"><span>HOW WELL DO YOU KNOW US?</span><b>{quizLabel}</b></div><h3>{quiz[quizIndex][0]}</h3><div className="quiz-options">{(quiz[quizIndex][1] as string[]).map(option => <button key={option} onClick={() => answer(option)}>{option}<ArrowRight size={15} /></button>)}</div></div> : <motion.div className="quiz-result" initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}><span>final score</span><strong>{score}/{quiz.length}</strong><p>Officially certified as someone who knows the little world we built.</p><button onClick={() => { setQuizDone(false); setQuizIndex(0); setScore(0); }}>play again</button></motion.div>}
        </section>

        <section id="gift" className="chapter gift-chapter">
          <div className="gift-backdrop" /><div className="section-kicker">final chapter · don't rush this one</div><h3>There is one thing<br /><em>I saved for last.</em></h3><p className="gift-intro">The website was never the gift. It was the way I wanted to make you discover how much thought went into this.</p>
          <div className={`gift-scene ${gift ? 'gift-is-open' : ''}`}><button className="gift-box" onClick={() => setGift(true)} aria-label="Open the gift"><div className="gift-glow" /><div className="gift-lid"><span /><i /></div><div className="gift-body"><span className="ribbon-v" /><span className="ribbon-h" /><div className="gift-light" /></div><div className="gift-bow"><i /><i /></div></button>{!gift && <motion.p className="gift-hint" animate={{ opacity: [.45, 1, .45] }} transition={{ duration: 1.8, repeat: Infinity }}>tap to open</motion.p>}</div>
          <AnimatePresence>{gift && <motion.div className="final-reveal" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}><div className="reveal-photo-stack">{[10, 4, 2].map(i => <img key={i} src={photoPaths[i]} alt="Us" />)}</div><Sparkles size={18} /><p>For Bhavanika</p><h4>You were never just someone I met online.</h4><span>You became someone I wanted to keep choosing.</span><div className="reveal-line" /><strong>Happy Birthday, thangoww.</strong><small>09 · 09 · 2008</small></motion.div>}</AnimatePresence>
        </section>
      </main>
      <footer className="final-footer"><p>made with too much thought, probably.</p><Heart size={14} fill="currentColor" /><span>for Bhavanika</span></footer>
    </>}
  </div>;
}
