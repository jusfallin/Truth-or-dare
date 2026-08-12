import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown, ChevronLeft, ChevronRight, Heart, Pause, Play, Repeat, Shuffle, Sparkles, Volume2, VolumeX, X } from 'lucide-react';

const photos = Array.from({ length: 14 }, (_, i) => `/bhavanika/${String(i + 1).padStart(2, '0')}.webp`);

const songs = [
  { title: 'Vizhi Veekura', src: '/bhavanika/audio/vizhi-veekura.mp3', note: 'The one I hear and immediately think of you.', memory: 'It has that restless, playful feeling that somehow fits us — like one more conversation turning into another hour together.' },
  { title: 'Sidu Sidu', src: '/bhavanika/audio/sidu-sidu.mp3', note: 'For our chaotic little side.', memory: 'This one belongs to the silly version of us. The version that can turn absolutely nothing into a whole conversation.' },
  { title: 'Kannana Kanne — Ne Kalangatha Di', src: '/bhavanika/audio/kannana-kanne.mp3', note: 'The soft one. No explanation needed.', memory: 'This is the song I would put on when I just want you to feel safe, cared for and reminded that you never have to hide your feelings from me.' },
  { title: 'Blue', src: '/bhavanika/audio/blue.mp3', note: 'For the late-night version of us.', memory: 'This one feels like staring at the ceiling at 2 AM and somehow still wanting to talk to the same person. You.' },
];

const timeline = [
  ['01', 'The game', 'We met in ZEPETO. It was supposed to be just a game. Yeah… that plan did not survive.'],
  ['02', 'The conversations', 'Somewhere between random talks and staying a little longer, you stopped feeling like a random person.'],
  ['03', 'Thangoww × Kelavi', 'The nicknames happened. And somehow they became their own tiny language.'],
  ['04', 'The distance', 'We still have not met in real life. Somehow that has not stopped this from feeling real to me.'],
  ['05', 'Today', '09 September. Your day. And I wanted to make something you could come back to whenever you miss me.'],
];

const reasons = [
  ['your voice', 'I could listen to you talk about the most random thing and still not want the conversation to end.'],
  ['the way you care', 'You notice little things. I notice that you notice.'],
  ['your cuteness', 'Especially when you are not even trying to be cute. That is usually when you are the most dangerous.'],
  ['your fire', 'Your confidence, your decisions, even your little angry moments — they are all part of the person I fell for.'],
  ['all of you', 'I genuinely stopped looking for one favourite thing. It is easier to say I love the whole person.'],
];

const stories = [
  'The beginning. Before either of us knew this would become something worth remembering.',
  'A tiny digital world that somehow became the starting point of a very real feeling.',
  'One of those pictures that makes distance feel slightly less annoying.',
  'Proof that our favourite memories are not always the dramatic ones.',
  'The kind of moment I would save even if nobody else understood why.',
  'Somewhere along the way, “just talking” stopped being just talking.',
  'A little piece of our story I never want to lose.',
  'One screen. Two people. A ridiculous amount of feelings.',
  'This one is for the version of us that stayed when the conversation should have ended.',
  'If I could put a feeling inside a photograph, it would look like this.',
  'A memory I would replay without getting bored.',
  'Still my favourite kind of notification: you.',
  'No grand explanation. I just really like having you in my life.',
  'And somehow, we are still writing the next part.',
];

function TypeLine({ text }: { text: string }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setValue(text.slice(0, i));
      if (i >= text.length) window.clearInterval(timer);
    }, 42);
    return () => window.clearInterval(timer);
  }, [text]);
  return <span>{value}<i className="type-cursor">|</i></span>;
}

export default function BhavanikaExperience() {
  const [entered, setEntered] = useState(false);
  const [photo, setPhoto] = useState<number | null>(null);
  const [reason, setReason] = useState<number | null>(null);
  const [timelineStep, setTimelineStep] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.72);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();
  const progressSpring = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });

  const currentSong = songs[track];
  const displayPhoto = useMemo(() => photos[(track * 3 + 1) % photos.length], [track]);

  useEffect(() => {
    if (!entered) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPhoto(null);
      if (e.code === 'Space' && (e.target as HTMLElement)?.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [entered, playing, track]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setProgress(0);
    if (playing) audioRef.current.play().catch(() => setPlaying(false));
  }, [track]);

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  function nextTrack() {
    const next = shuffle ? Math.floor(Math.random() * songs.length) : (track + 1) % songs.length;
    setTrack(next);
    setPlaying(true);
  }

  function previousTrack() {
    setTrack((track - 1 + songs.length) % songs.length);
    setPlaying(true);
  }

  function handleEnded() {
    if (repeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => setPlaying(false));
      }
      return;
    }
    nextTrack();
  }

  return (
    <div className="bhavanika-world">
      <motion.div className="bhavanika-progress" style={{ scaleX: progressSpring }} />

      <AnimatePresence>
        {!entered && (
          <motion.div className="entrance-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 1 }}>
            <div className="entrance-sun" />
            <div className="petals">✦　·　✦　·　✦</div>
            <p className="eyebrow">09 · 09 · 2008</p>
            <h1>For <em>Bhavanika.</em></h1>
            <p className="entrance-copy">Not another copy-paste birthday paragraph.<br />I made you a little world instead.</p>
            <button className="enter-button" onClick={() => setEntered(true)}><Heart size={16} fill="currentColor" /> come in, thangoww</button>
            <p className="tiny-note">take your time · there is music inside</p>
          </motion.div>
        )}
      </AnimatePresence>

      {entered && (
        <>
          <audio ref={audioRef} src={currentSong.src} preload="metadata" onTimeUpdate={e => setProgress((e.currentTarget.currentTime / (e.currentTarget.duration || 1)) * 100)} onEnded={handleEnded} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />

          <header className="floating-nav">
            <a className="nav-mark" href="#home">B</a>
            <nav>
              <a href="#story">story</a><a href="#memories">memories</a><a href="#timeline">us</a><a href="#songs">songs</a><a href="#letter">letter</a>
            </nav>
            <button className="mini-player" onClick={() => { document.getElementById('songs')?.scrollIntoView({ behavior: 'smooth' }); }}><span className={playing ? 'equalizer is-playing' : 'equalizer'}><i /><i /><i /></span><span>{currentSong.title}</span></button>
          </header>

          <main>
            <section id="home" className="hero-chapter">
              <div className="hero-sun" />
              <motion.div className="hero-photo hero-photo-a" animate={{ y: [0, -10, 0], rotate: [3, 1, 3] }} transition={{ duration: 7, repeat: Infinity }}><img src={photos[0]} alt="A memory of us" /></motion.div>
              <motion.div className="hero-photo hero-photo-b" animate={{ y: [0, 12, 0], rotate: [-4, -2, -4] }} transition={{ duration: 8, repeat: Infinity }}><img src={photos[5]} alt="Another memory" /></motion.div>
              <div className="hero-content">
                <p className="eyebrow">a birthday love letter, but make it a website</p>
                <h2>Somehow, you became<br /><em>my favourite person.</em></h2>
                <p className="hero-sub"><TypeLine text="No distance. No screen. No ZEPETO world could make what I feel for you feel ordinary." /></p>
                <a className="scroll-cue" href="#story">start here <ArrowDown size={15} /></a>
              </div>
              <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            </section>

            <section id="story" className="chapter story-chapter">
              <div className="section-kicker">01 · how this even happened</div>
              <div className="story-grid">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }}>
                  <h3>It started<br /><em>with a game.</em></h3>
                  <p className="lead">ZEPETO was supposed to be just a game. Then we started talking. Then talking became something I looked forward to. And somewhere in between all the random conversations, you became… you.</p>
                  <div className="secret-note"><Sparkles size={16} /><span>little secret: I am ridiculously glad I met you there.</span></div>
                </motion.div>
                <motion.button className="story-photo-card" whileHover={{ scale: 1.02, rotate: -1 }} onClick={() => setPhoto(0)}>
                  <img src={photos[0]} alt="The beginning" /><span>tap me</span><div className="photo-caption">the beginning of our little world</div>
                </motion.button>
              </div>
              <div className="distance-line"><span>you</span><div><i /><i /><i /><i /><i /></div><span>me</span><strong>different screens · one very real feeling</strong></div>
            </section>

            <section id="memories" className="chapter memory-chapter">
              <div className="section-kicker">02 · keep scrolling, nosy</div>
              <div className="memory-heading"><h3>Fourteen little<br /><em>pieces of us.</em></h3><p>Some are cute. Some are chaotic. A few are just here because I like looking at you. Fair warning.</p></div>
              <div className="photo-mosaic">
                {photos.map((src, i) => (
                  <motion.button key={src} className={`memory-card memory-${i + 1}`} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 35 }} viewport={{ once: true, amount: .12 }} whileHover={{ y: -9 }} onClick={() => setPhoto(i)}>
                    <div className="memory-inner"><div className="memory-front"><img src={src} alt={`Memory ${i + 1}`} loading="lazy" /><span>{String(i + 1).padStart(2, '0')}</span></div><div className="memory-back"><Sparkles size={16} /><strong>{stories[i]}</strong><small>tap again to close</small></div></div>
                  </motion.button>
                ))}
              </div>
            </section>

            <AnimatePresence>
              {photo !== null && (
                <motion.div className="photo-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPhoto(null)}>
                  <motion.div className="photo-modal" initial={{ scale: .92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94 }} onClick={e => e.stopPropagation()}>
                    <img src={photos[photo]} alt={`Memory ${photo + 1}`} />
                    <button className="close-button" onClick={() => setPhoto(null)}><X size={18} /></button>
                    <div className="modal-story"><span>memory {String(photo + 1).padStart(2, '0')}</span><p>{stories[photo]}</p><small>thangoww × kelavi</small></div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <section id="timeline" className="chapter timeline-chapter">
              <div className="section-kicker">03 · our tiny timeline</div>
              <div className="timeline-layout">
                <div><h3>Look how far<br /><em>“just a game”</em> got.</h3><p className="lead">We have not even met in real life yet, and somehow there are already so many little moments I would miss if they disappeared.</p></div>
                <div className="timeline-card">
                  <div className="timeline-count">{timeline[timelineStep][0]} / {String(timeline.length).padStart(2, '0')}</div>
                  <div className="timeline-photo"><img src={photos[(timelineStep * 2) % photos.length]} alt="Timeline memory" /></div>
                  <p className="timeline-title">{timeline[timelineStep][1]}</p><p className="timeline-copy">{timeline[timelineStep][2]}</p>
                  <div className="timeline-controls"><button onClick={() => setTimelineStep(v => (v - 1 + timeline.length) % timeline.length)}><ChevronLeft size={18} /></button><div>{timeline.map((_, i) => <button key={i} className={i === timelineStep ? 'active' : ''} onClick={() => setTimelineStep(i)} />)}</div><button onClick={() => setTimelineStep(v => (v + 1) % timeline.length)}><ChevronRight size={18} /></button></div>
                </div>
              </div>
            </section>

            <section className="chapter reasons-chapter">
              <div className="center-heading"><div className="section-kicker">04 · things I never get tired of</div><h3>I fell for you<br /><em>in little pieces.</em></h3><p>And then, annoyingly, I fell for the whole thing.</p></div>
              <div className="reasons-grid">{reasons.map(([title, copy], i) => <button key={title} className={`reason-card ${reason === i ? 'is-open' : ''}`} onClick={() => setReason(reason === i ? null : i)}><span>{String(i + 1).padStart(2, '0')}</span><strong>{title}</strong><i>{reason === i ? '−' : '+'}</i><AnimatePresence>{reason === i && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{copy}</motion.p>}</AnimatePresence></button>)}</div>
            </section>

            <section id="songs" className="chapter songs-chapter">
              <div className="section-kicker">05 · press play</div>
              <div className="songs-layout">
                <div><h3>Our soundtrack<br /><em>has a pulse now.</em></h3><p className="lead">I didn't want a list of song names. I wanted you to actually press play and let the page change with the song.</p><div className="now-art"><img src={displayPhoto} alt="Song memory" /><span>{playing ? 'playing for you' : 'choose a song'}</span></div></div>
                <div className="player-panel">
                  <div className="album-art"><img src={displayPhoto} alt="Current song memory" /><div className={playing ? 'vinyl-spin is-playing' : 'vinyl-spin'}><span /></div></div>
                  <div className="player-info"><span>now / selected</span><h4>{currentSong.title}</h4><p>{currentSong.memory}</p></div>
                  <div className="track-list">{songs.map((item, i) => <button key={item.title} className={i === track ? 'track active' : 'track'} onClick={() => { setTrack(i); setPlaying(true); }}><span>0{i + 1}</span><strong>{item.title}</strong><small>{item.note}</small>{i === track && playing ? <Pause size={16} /> : <Play size={16} />}</button>)}</div>
                  <div className="player-controls"><button onClick={previousTrack}><ChevronLeft /></button><button className="main-play" onClick={togglePlay}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><button onClick={nextTrack}><ChevronRight /></button><button className={shuffle ? 'control active' : 'control'} onClick={() => setShuffle(v => !v)}><Shuffle size={16} /></button><button className={repeat ? 'control active' : 'control'} onClick={() => setRepeat(v => !v)}><Repeat size={16} /></button></div>
                  <div className="progress-row"><span>audio</span><input aria-label="Song progress" type="range" min="0" max="100" value={progress} onChange={e => { if (audioRef.current) audioRef.current.currentTime = (Number(e.target.value) / 100) * audioRef.current.duration; setProgress(Number(e.target.value)); }} /><span>∞</span></div>
                  <div className="volume-row"><button onClick={() => setMuted(v => !v)}>{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button><input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={e => { setVolume(Number(e.target.value)); setMuted(false); }} /></div>
                </div>
              </div>
            </section>

            <section id="letter" className="chapter letter-chapter">
              <div className="section-kicker">06 · the part I couldn't fit in WhatsApp</div>
              <div className="letter-wrap">
                <div className="letter-intro"><h3>Okay. One<br /><em>serious thing.</em></h3><p>I can joke around all day. But there are some things I really mean.</p></div>
                <motion.button className={`envelope ${letterOpen ? 'opened' : ''}`} onClick={() => setLetterOpen(v => !v)} whileHover={{ y: -5 }}><div className="envelope-paper"><span>Dear Bhavanika,</span><p>I don't know exactly when you stopped being “someone I met online” and became someone I genuinely care about. I just know it happened.</p><p>I love the way you care. Your voice. Your cuteness. Your anger. Your confidence. The way you make ordinary conversations feel like something I want to keep.</p><p>And yes, I know there is distance. We have not met in real life. But the feeling is still real to me.</p><p>So on your birthday, I don't want to promise some perfect movie-like life. I just want to say this honestly: I want to keep choosing you, keep learning you, and someday close this distance for real.</p><strong>Happy birthday, thangoww.</strong><small>— your kelavi</small></div><div className="envelope-flap" /><div className="envelope-front"><Heart size={34} fill="currentColor" /></div></motion.button>
                <p className="letter-hint">{letterOpen ? 'you opened it ♡' : 'tap the envelope'}</p>
              </div>
            </section>

            <section id="gift" className="chapter finale-chapter">
              <div className="finale-glow" /><div className="section-kicker">07 · one last thing</div><h3>Don't close this yet.<br /><em>I saved the best part.</em></h3><p className="gift-intro">The website is not really the gift. The gift is the reminder that somebody thought about all these tiny details because you matter to him.</p>
              <div className={`gift-scene ${giftOpen ? 'open' : ''}`}><button className="gift-box" onClick={() => setGiftOpen(true)} aria-label="Open your birthday gift"><div className="gift-lid"><span /><i /></div><div className="gift-body"><span className="ribbon-v" /><span className="ribbon-h" /><div className="gift-heart">♡</div></div><div className="gift-bow"><i /><i /></div></button>{!giftOpen && <p>tap the box, kelavi</p>}</div>
              <AnimatePresence>{giftOpen && <motion.div className="final-reveal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}><div className="final-photo-stack">{[10, 4, 2].map(i => <img key={i} src={photos[i]} alt="A favourite memory" />)}</div><Sparkles size={18} /><span>for Bhavanika</span><h4>You were never just someone I met online.</h4><p>You became someone I wanted to keep choosing.</p><strong>Happy Birthday, thangoww ♡</strong><small>09 · 09 · 2008</small></motion.div>}</AnimatePresence>
            </section>
          </main>

          <footer className="final-footer"><Heart size={14} fill="currentColor" /><span>made with an unreasonable amount of love</span><Heart size={14} fill="currentColor" /></footer>
        </>
      )}
    </div>
  );
}
