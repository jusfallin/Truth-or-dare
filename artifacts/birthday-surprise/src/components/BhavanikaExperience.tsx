import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, ChevronDown, Heart, LockKeyhole, Music2, Sparkles, Volume2, X } from 'lucide-react';

const songs = [
  { title: 'Vizhi Veekura', note: 'the one that feels like us' },
  { title: 'Sidu Sidu', note: 'for our chaotic little moments' },
  { title: 'Kannana Kanne — Ne Kalangatha Di', note: 'the soft one' },
  { title: 'Blue — yung kai', note: 'a little more of our midnight mood' },
];

const reasons = [
  ['01', 'The way you care', 'You make small things feel important.'],
  ['02', 'Your voice', 'Somehow, even a normal conversation feels different when it is you.'],
  ['03', 'Your cuteness', 'Especially the way you talk when you are being completely yourself.'],
  ['04', 'Your fire', 'Your anger, your decisions, your confidence — all the pieces that make you you.'],
  ['05', 'Every little thing', 'Honestly, I stopped trying to choose favourites. I love the whole person.'],
];

const quiz = [
  { q: 'Where did our story begin?', options: ['Instagram', 'ZEPETO', 'College', 'A random café'], answer: 'ZEPETO' },
  { q: 'What do I call you when I am being extra annoying?', options: ['Thangoww', 'Boss', 'Princess', 'Professor'], answer: 'Thangoww' },
  { q: 'Which word fits us best?', options: ['Ordinary', 'Accidental', 'Unexpected', 'Boring'], answer: 'Unexpected' },
];

export default function BhavanikaExperience() {
  const [entered, setEntered] = useState(false);
  const [musicHint, setMusicHint] = useState(false);
  const [revealedReasons, setRevealedReasons] = useState<number[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftArmed, setGiftArmed] = useState(false);
  const [secretFound, setSecretFound] = useState(false);
  const { scrollYProgress } = useScroll();
  const glow = useTransform(scrollYProgress, [0, 0.45, 1], [0.15, 0.35, 0.12]);

  useEffect(() => {
    if (!entered) return;
    document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [entered]);

  const progressLabel = useMemo(() => {
    if (quizDone) return `${quizScore}/${quiz.length}`;
    return `${quizIndex + 1}/${quiz.length}`;
  }, [quizDone, quizIndex, quizScore]);

  const answerQuiz = (answer: string) => {
    const correct = answer === quiz[quizIndex].answer;
    const nextScore = quizScore + (correct ? 1 : 0);
    setQuizScore(nextScore);
    if (quizIndex === quiz.length - 1) setQuizDone(true);
    else setQuizIndex((i) => i + 1);
  };

  const toggleReason = (index: number) => {
    setRevealedReasons((current) => current.includes(index) ? current.filter((i) => i !== index) : [...current, index]);
  };

  return (
    <div className="bhavanika-world">
      <motion.div className="bhavanika-progress" style={{ scaleX: scrollYProgress }} />
      <motion.div className="ambient-glow" style={{ opacity: glow }} />

      <AnimatePresence>
        {!entered && (
          <motion.div className="entrance-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 1.1 }}>
            <div className="entrance-stars" aria-hidden="true" />
            <motion.div className="entrance-orb" animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }} transition={{ duration: 3.5, repeat: Infinity }} />
            <motion.p className="eyebrow" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>A private little world</motion.p>
            <motion.h1 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.65, duration: 0.8 }}>
              Hey, <span>Bhavanika.</span>
            </motion.h1>
            <motion.p className="entrance-copy" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
              This isn't a birthday page.<br />It's something I built for you to discover.
            </motion.p>
            <motion.button className="enter-button" onClick={() => setEntered(true)} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }} whileTap={{ scale: 0.96 }}>
              <span>Enter my little world</span><ArrowRight size={18} />
            </motion.button>
            <p className="tiny-note"><LockKeyhole size={12} /> just for you</p>
          </motion.div>
        )}
      </AnimatePresence>

      {entered && (
        <>
          <header className="floating-nav">
            <a href="#beginning">B</a>
            <nav>
              <a href="#story">our story</a>
              <a href="#little-things">little things</a>
              <a href="#letter">the letter</a>
              <a href="#gift">the surprise</a>
            </nav>
            <button className="music-pill" onClick={() => setMusicHint(true)} aria-label="Music note">
              <Music2 size={15} /> <span>{musicHint ? 'Music coming soon' : 'our songs'}</span>
            </button>
          </header>

          <main>
            <section id="beginning" className="hero-chapter">
              <div className="hero-noise" />
              <motion.div className="hero-content" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}>
                <motion.p className="eyebrow" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>09 · 09 · 2008</motion.p>
                <motion.h2 variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}>For the girl who somehow<br /><em>became my favourite person.</em></motion.h2>
                <motion.p className="hero-sub" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>No distance, no screen, no game could make this feel ordinary.</motion.p>
                <motion.a href="#story" className="scroll-cue" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>keep going <ArrowDown size={15} /></motion.a>
              </motion.div>
              <div className="hero-ring ring-one" /><div className="hero-ring ring-two" />
            </section>

            <section id="story" className="chapter story-chapter">
              <div className="section-kicker">chapter 01 · the beginning</div>
              <div className="story-grid">
                <div>
                  <h3>We met in a<br /><span>digital world.</span></h3>
                  <p className="lead">ZEPETO was supposed to be just a game. Then somehow, between pixels and conversations, we started caring about each other.</p>
                </div>
                <div className="zepeto-card" onClick={() => setSecretFound(true)} role="button" tabIndex={0}>
                  <div className="orbit orbit-a" /><div className="orbit orbit-b" />
                  <div className="zepeto-core"><span>ZE</span><small>the beginning</small></div>
                  <p>tap the little world</p>
                </div>
              </div>
              <AnimatePresence>{secretFound && <motion.div className="secret-reveal" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Sparkles size={16} /> You found the first secret: <strong>I'm really glad I met you there.</strong><button onClick={() => setSecretFound(false)}><X size={14} /></button></motion.div>}</AnimatePresence>
              <div className="distance-line"><span>you</span><div><i /><i /><i /><i /><i /></div><span>her</span><strong>different screens · same story</strong></div>
            </section>

            <section className="chapter warm-chapter" id="little-things">
              <div className="section-kicker">chapter 02 · the little things</div>
              <div className="center-heading"><h3>I fell for you<br /><em>more than once.</em></h3><p>Probably more than 100 times a day.</p></div>
              <div className="reasons-grid">
                {reasons.map(([num, title, text], index) => {
                  const open = revealedReasons.includes(index);
                  return <motion.button key={num} className={`reason-card ${open ? 'is-open' : ''}`} onClick={() => toggleReason(index)} whileTap={{ scale: 0.98 }}>
                    <span className="reason-num">{num}</span><span className="reason-title">{title}</span><span className="reason-plus">{open ? '−' : '+'}</span>
                    <AnimatePresence initial={false}>{open && <motion.span className="reason-text" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{text}</motion.span>}</AnimatePresence>
                  </motion.button>;
                })}
              </div>
              <p className="micro-love"><Heart size={13} fill="currentColor" /> thangoww · kelavi · my favourite human</p>
            </section>

            <section className="chapter songs-chapter">
              <div className="section-kicker">chapter 03 · our soundtrack</div>
              <div className="songs-layout">
                <div><h3>Some songs<br /><em>sound like us.</em></h3><p>Don't just press play. Pick the one that reminds you of a moment.</p></div>
                <div className="song-stack">{songs.map((song, i) => <motion.button key={song.title} className="song-card" whileHover={{ x: 8 }} whileTap={{ scale: 0.98 }} onClick={() => setMusicHint(true)}><span className="song-index">0{i + 1}</span><span><strong>{song.title}</strong><small>{song.note}</small></span><Volume2 size={16} /></motion.button>)}</div>
              </div>
              <AnimatePresence>{musicHint && <motion.div className="music-toast" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><Music2 size={15} /> Music will be user-initiated — we'll attach the real audio in the media pass.</motion.div>}</AnimatePresence>
            </section>

            <section className="chapter letter-chapter" id="letter">
              <div className="section-kicker">chapter 04 · the thing I really wanted to say</div>
              <div className="letter-stage">
                <motion.div className={`envelope ${letterOpen ? 'opened' : ''}`} animate={letterOpen ? { y: -8 } : { y: 0 }}>
                  <div className="envelope-back" /><div className="envelope-paper"><p>Dear Bhavanika,</p><p>There are things I can say in a chat. Then there are things I wanted to build a whole little world to say.</p><p>We just started to care for both of us — and I guess I already fell for you more than 100 times a day.</p><p>I loved the way you care, your voice, your cuteness in the way you talk, your anger, your decisions, your confidence... every single thing that makes you <em>you.</em></p><p>I know you're focused on your studies and that fear of losing can be real. But I don't want fear to decide the story for us.</p><p>So here is the question hidden inside all of this:</p><p className="letter-question">Will you let this little beginning become a story we keep choosing?</p><p className="letter-sign">— from the boy who calls you thangoww & kelavi</p></div><div className="envelope-front" /><div className="envelope-flap" />
                </motion.div>
                {!letterOpen && <button className="open-letter" onClick={() => setLetterOpen(true)}>break the seal <ArrowRight size={16} /></button>}
                {letterOpen && <motion.p className="letter-after" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>You opened the part I couldn't fit into a normal message.</motion.p>}
              </div>
            </section>

            <section className="chapter quiz-chapter">
              <div className="section-kicker">chapter 05 · prove you know us</div>
              {!quizDone ? <div className="quiz-shell"><div className="quiz-top"><span>OUR LITTLE TEST</span><b>{progressLabel}</b></div><h3>{quiz[quizIndex].q}</h3><div className="quiz-options">{quiz[quizIndex].options.map(option => <button key={option} onClick={() => answerQuiz(option)}>{option}<ArrowRight size={15} /></button>)}</div></div> : <motion.div className="quiz-result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}><span>you know us.</span><strong>{quizScore}/{quiz.length}</strong><p>Okay, okay. You may keep the title of <em>Thangoww's favourite quiz partner.</em></p><button onClick={() => { setQuizDone(false); setQuizIndex(0); setQuizScore(0); }}>play again</button></motion.div>}
            </section>

            <section className="chapter gift-chapter" id="gift">
              <div className="gift-backdrop" />
              <div className="section-kicker">final chapter · don't rush this one</div>
              <h3>There is one thing<br /><em>I saved for last.</em></h3>
              <p className="gift-intro">The website was never the gift. It was just the way I wanted to get you here.</p>
              <div className={`gift-scene ${giftOpen ? 'gift-is-open' : ''} ${giftArmed ? 'gift-is-armed' : ''}`}>
                <motion.button className="gift-box" onClick={() => { setGiftArmed(true); window.setTimeout(() => setGiftOpen(true), 650); }} whileTap={{ scale: 0.97 }} aria-label="Open the gift">
                  <div className="gift-glow" /><div className="gift-lid"><span /><i /></div><div className="gift-body"><span className="ribbon-v" /><span className="ribbon-h" /><div className="gift-light" /></div><div className="gift-bow"><i /><i /></div>
                </motion.button>
                {!giftOpen && <motion.p className="gift-hint" animate={giftArmed ? { opacity: 0 } : { opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>tap to open</motion.p>}
              </div>
              <AnimatePresence>{giftOpen && <motion.div className="final-reveal" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}><Sparkles size={18} /><p>For Bhavanika</p><h4>You were never just someone I met online.</h4><span>You became someone I wanted to keep choosing.</span><div className="reveal-line" /><strong>Happy Birthday, thangoww.</strong><small>09 · 09 · 2008</small></motion.div>}</AnimatePresence>
            </section>
          </main>

          <footer className="final-footer"><p>made with too much thought, probably.</p><Heart size={14} fill="currentColor" /><span>for Bhavanika</span></footer>
        </>
      )}
    </div>
  );
}
