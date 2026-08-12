import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowDown, ChevronLeft, ChevronRight, CakeSlice, Heart, Mail, Pause, Play,
  Repeat, Shuffle, Sparkles, Star, Volume2, VolumeX, X
} from 'lucide-react';

const photos = Array.from({ length: 14 }, (_, i) => `/bhavanika/${String(i + 1).padStart(2, '0')}.jpg`);

const songs = [
  { title: 'Vizhi Veekura', src: '/bhavanika/audio/vizhi-veekura.mp3', note: 'the one that feels like us', memory: 'For the restless little feeling of wanting one more conversation… and then one more.' },
  { title: 'Sidu Sidu', src: '/bhavanika/audio/sidu-sidu.mp3', note: 'our chaotic little corner', memory: 'For every random conversation that somehow became a memory I never want to lose.' },
  { title: 'Kannana Kanne — Ne Kalangatha Di', src: '/bhavanika/audio/kannana-kanne.mp3', note: 'the soft one', memory: 'For the quiet moments when I just want you to feel safe, loved and never alone.' },
];

const timeline = [
  ['ZEPETO', 'It was supposed to be a game. Then you became the part I kept coming back for.'],
  ['We kept talking', 'Random conversations slowly became the conversations I looked forward to the most.'],
  ['Our little language', 'Thangoww, en aval, bujji kuttyy, pookie — tiny names, somehow carrying huge feelings.'],
  ['The distance', 'We have not met in real life yet, but somehow you already feel so close to my everyday life.'],
  ['Your birthday', 'So I made this little world for you — something you can come back to whenever you want.'],
];

const reasons = [
  ['your voice', 'I could listen to you talk about the most random thing and still wish the call had a few more minutes.'],
  ['the way you care', 'You remember little things. You notice moods. You make ordinary moments feel warmer without even trying.'],
  ['your cuteness', 'Especially when you are completely unaware of it. Those tiny expressions are unfairly adorable.'],
  ['your fire', 'Your confidence, stubbornness, anger and strong little opinions are part of the girl I fell for too.'],
  ['your heart', 'The way you worry, love, protect and make space for people tells me so much about who you are.'],
  ['all of you', 'I stopped trying to choose one favourite thing because every answer kept leading me back to you.'],
];

const stories = [
  'The beginning of something neither of us planned.',
  'A tiny digital world that quietly became the start of a real feeling.',
  'One of those memories I can look at twice and still smile.',
  'The ordinary moments are the ones I keep closest.',
  'A little piece of us I would save even if nobody else understood why.',
  'Somewhere along the way, talking to you stopped feeling like just talking.',
  'A picture that makes the distance feel a little less annoying.',
  'One screen, two people, a ridiculous amount of feelings.',
  'For the version of us that stayed even after the conversation should have ended.',
  'If I could put one feeling inside a photograph, it would look like this.',
  'A memory I would happily replay.',
  'Still one of my favourite kinds of notifications: you.',
  'No grand explanation. I just really love having you in my life.',
  'And somehow, we are still writing the next part.',
];

const openWhen = [
  ['when you miss me', 'Come here for a second. Look at a photo, breathe slowly, and remember that the distance is only where we are — it is not what we are.'],
  ['when you feel like giving up', 'You do not have to solve everything tonight. Take one breath, do one small thing, and be gentle with yourself. I will always want to see you win.'],
  ['when you are angry at me', 'Okay, en aval, you are allowed to be mad. Tell me what I did, roast me if necessary, then come back to me when your heart feels a little lighter.'],
  ['when you need a smile', 'Bujji kuttyy, remember there is someone who genuinely loves your random expressions, your silly moods and even the tiny things you think nobody notices.'],
];

function TypeLine({ text }: { text: string }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setValue(text.slice(0, i));
      if (i >= text.length) window.clearInterval(timer);
    }, 28);
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
  const [volume, setVolume] = useState(0.42);
  const [ambientMuted, setAmbientMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reel, setReel] = useState(0);
  const [openedWhen, setOpenedWhen] = useState<number | null>(null);
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [wishBurst, setWishBurst] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();
  const progressSpring = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const currentSong = songs[track];
  const displayPhoto = useMemo(() => photos[(track * 4 + 2) % photos.length], [track]);
  const allCandlesOut = candles.every(v => !v);

  useEffect(() => {
    if (!entered) return;
    const ambient = ambientAudioRef.current;
    if (!ambient) return;
    ambient.volume = ambientMuted ? 0 : 0.12;
    ambient.loop = true;
    ambient.play().catch(() => {});
  }, [entered, ambientMuted]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setProgress(0);
    if (playing) {
      ambientAudioRef.current?.pause();
      audioRef.current.play().catch(() => setPlaying(false));
    }
  }, [track]);

  useEffect(() => {
    if (!entered) return;
    const timer = window.setInterval(() => setReel(v => (v + 1) % photos.length), 4200);
    return () => window.clearInterval(timer);
  }, [entered]);

  useEffect(() => {
    if (!allCandlesOut) return;
    setWishBurst(true);
    const timer = window.setTimeout(() => setWishBurst(false), 4200);
    return () => window.clearTimeout(timer);
  }, [allCandlesOut]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPhoto(null);
      if (e.code === 'Space' && (e.target as HTMLElement)?.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function startAmbient() {
    const ambient = ambientAudioRef.current;
    if (!ambient) return;
    ambient.volume = ambientMuted ? 0 : 0.12;
    ambient.loop = true;
    ambient.play().catch(() => {});
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      startAmbient();
    } else {
      ambientAudioRef.current?.pause();
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  function selectTrack(index: number) {
    ambientAudioRef.current?.pause();
    if (index === track && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      return;
    }
    setTrack(index);
    setPlaying(true);
  }

  function nextTrack() {
    const next = shuffle ? Math.floor(Math.random() * songs.length) : (track + 1) % songs.length;
    selectTrack(next);
  }

  function previousTrack() {
    selectTrack((track - 1 + songs.length) % songs.length);
  }

  function handleEnded() {
    if (repeat && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setPlaying(false));
      return;
    }
    setPlaying(false);
    startAmbient();
    if (shuffle) nextTrack();
  }

  function blowCandle(index: number) {
    setCandles(v => v.map((lit, i) => i === index ? false : lit));
  }

  return (
    <div className="bhavanika-world">
      <motion.div className="bhavanika-progress" style={{ scaleX: progressSpring }} />
      <div className="ambient-field" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => <span key={i} className={`ambient-particle particle-${i + 1}`}>{i % 3 === 0 ? '♡' : i % 3 === 1 ? '✦' : '·'}</span>)}
      </div>

      <AnimatePresence>
        {!entered && (
          <motion.div className="entrance-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 1 }}>
            <div className="entrance-sun" /><div className="entrance-halo" /><div className="entrance-sparkles">✦　·　♡　·　✧　·　♡　·　✦</div>
            <motion.button className="entrance-polaroid" whileHover={{ y: -8, rotate: -2 }} whileTap={{ scale: .97 }} onClick={() => setPhoto(0)}><img src={photos[0]} alt="Bhavanika" /><span>tap me ♡</span></motion.button>
            <p className="eyebrow">a little place made only for you</p><h1>For <em>Bhavanika.</em></h1>
            <div className="entrance-copy"><strong>Wait… don't rush this part.</strong><span>I made a tiny world for you.<br />Come in slowly and find the little things I hid for you.</span></div>
            <button className="enter-button" onClick={() => { setEntered(true); window.setTimeout(startAmbient, 120); }}><Heart size={16} fill="currentColor" /> come in, pookie</button>
            <p className="tiny-note">headphones on · tap things · take your time · there are surprises hidden here</p>
          </motion.div>
        )}
      </AnimatePresence>

      {entered && (
        <>
          <audio ref={ambientAudioRef} src="/bhavanika/audio/blue.mp3" preload="auto" />
          <audio ref={audioRef} src={currentSong.src} preload="metadata" onTimeUpdate={e => setProgress((e.currentTarget.currentTime / (e.currentTarget.duration || 1)) * 100)} onEnded={handleEnded} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
          <header className="floating-nav"><a className="nav-mark" href="#home">B<span>♡</span></a><nav><a href="#story">story</a><a href="#about">her</a><a href="#memories">memories</a><a href="#timeline">us</a><a href="#songs">songs</a><a href="#letter">letter</a></nav><button className="mini-player" onClick={() => document.getElementById('songs')?.scrollIntoView({ behavior: 'smooth' })}><span className={ambientMuted ? 'equalizer' : 'equalizer is-playing'}><i /><i /><i /></span><span>Blue · background</span></button></header>

          <main>
            <section id="home" className="hero-chapter"><div className="hero-sun" /><div className="hero-petal-layer" /><motion.div className="hero-photo hero-photo-a" animate={{ y: [0, -12, 0], rotate: [3, 1, 3] }} transition={{ duration: 7, repeat: Infinity }} onClick={() => setPhoto(0)}><img src={photos[0]} alt="A memory of us" /><span>the beginning</span></motion.div><motion.div className="hero-photo hero-photo-b" animate={{ y: [0, 14, 0], rotate: [-4, -2, -4] }} transition={{ duration: 8, repeat: Infinity }} onClick={() => setPhoto(5)}><img src={photos[5]} alt="Another memory" /><span>still us</span></motion.div><div className="hero-content"><p className="eyebrow">a birthday love letter, but make it a website</p><h2>Somehow, you became<br /><em>my favourite person.</em></h2><p className="hero-sub"><TypeLine text="I could have written you another paragraph. Instead, I wanted to give you a place that feels a little like us." /></p><div className="hero-buttons"><a className="scroll-cue primary" href="#story">start our story <ArrowDown size={15} /></a><button className="ghost-pill" onClick={togglePlay}>{playing ? <Pause size={15} /> : <Play size={15} />} {playing ? 'pause my song' : 'play my song'}</button></div></div><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /></section>

            <section id="story" className="chapter story-chapter"><div className="section-kicker">the part where everything changed</div><div className="story-grid"><motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }}><p className="micro-label">I still think about this sometimes</p><h3>It was only<br /><em>a game…</em><br />until it wasn't.</h3><p className="lead">I logged into ZEPETO expecting nothing more than a game. Then I met you. We talked, joked, stayed a little longer, came back again… and somehow you became someone I started looking for even before I realised I was doing it.</p><div className="secret-note"><Sparkles size={16} /><span>I am ridiculously glad that one random game led me to you.</span></div></motion.div><motion.button className="story-photo-card" whileHover={{ scale: 1.02, rotate: -1 }} onClick={() => setPhoto(0)}><img src={photos[0]} alt="The beginning" /><span>tap the memory</span><div className="photo-caption">the beginning of my favourite chapter</div></motion.button></div><div className="distance-line"><span>you</span><div><i /><i /><i /><i /><i /></div><span>me</span><strong>different screens · somehow still so close</strong></div></section>

            <section id="about" className="chapter about-chapter"><div className="section-kicker">if I had to explain why I fell</div><div className="about-heading"><div><h3>Six little<br /><em>confessions.</em></h3><p>Don't just read them. Tap one. I hid the real answer underneath.</p></div><div className="about-stamp"><Heart size={18} fill="currentColor" /><span>made<br />for you</span></div></div><div className="reasons-grid">{reasons.map(([title, copy], i) => <motion.button key={title} className={`reason-card ${reason === i ? 'is-open' : ''}`} whileTap={{ scale: .98 }} onClick={() => setReason(reason === i ? null : i)}><span className="reason-icon">{reason === i ? '♡' : '✦'}</span><strong>{title}</strong><i>{reason === i ? 'hide' : 'tap to read'}</i><AnimatePresence>{reason === i && <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>{copy}</motion.p>}</AnimatePresence></motion.button>)}</div><div className="nickname-strip"><span>a few names I keep for you</span><b>thangoww</b><i>♡</i><b>en aval</b><i>♡</i><b>bujji kuttyy</b><i>♡</i><b>pookie</b></div></section>

            <section id="memories" className="chapter memory-chapter"><div className="section-kicker">little pieces I never want to lose</div><div className="memory-heading"><h3>A photo album<br /><em>you can touch.</em></h3><p>Tap a memory to open it. On desktop you can hover to peek; on mobile, every card is built for touch.</p></div><div className="photo-mosaic">{photos.map((src, i) => <motion.button key={src} className={`memory-card memory-${i + 1}`} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 35 }} viewport={{ once: true, amount: .1 }} whileHover={{ y: -9 }} onClick={() => setPhoto(i)}><div className="memory-inner"><div className="memory-front"><img src={src} alt={`Memory ${i + 1}`} loading="lazy" /><span>{String(i + 1).padStart(2, '0')}</span><small>tap to open</small></div><div className="memory-back"><Sparkles size={16} /><strong>{stories[i]}</strong><small>open the full memory</small></div></div></motion.button>)}</div></section>

            <section className="chapter reel-chapter"><div className="reel-copy"><div className="section-kicker">a memory that keeps moving</div><h3>Let the pictures<br /><em>say it for me.</em></h3><p className="lead">This one moves because memories do too. Tap the arrows, tap the picture, or just let it drift.</p><div className="reel-controls"><button onClick={() => setReel(v => (v - 1 + photos.length) % photos.length)}><ChevronLeft /></button><div><span>{String(reel + 1).padStart(2, '0')}</span> / 14</div><button onClick={() => setReel(v => (v + 1) % photos.length)}><ChevronRight /></button></div></div><motion.button className="reel-stage" whileHover={{ scale: 1.015 }} onClick={() => setPhoto(reel)}><AnimatePresence mode="wait"><motion.img key={reel} src={photos[reel]} alt="Moving memory" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .65 }} /></AnimatePresence><div className="reel-overlay"><span>memory {String(reel + 1).padStart(2, '0')}</span><strong>{stories[reel]}</strong></div></motion.button></section>

            <AnimatePresence>{photo !== null && <motion.div className="photo-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPhoto(null)}><motion.div className="photo-modal" initial={{ scale: .92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94 }} onClick={e => e.stopPropagation()}><img src={photos[photo]} alt={`Memory ${photo + 1}`} /><button className="close-button" onClick={() => setPhoto(null)}><X size={18} /></button><div className="modal-story"><span>memory {String(photo + 1).padStart(2, '0')}</span><p>{stories[photo]}</p><small>keep this little one close ♡</small></div></motion.div></motion.div>}</AnimatePresence>

            <section id="timeline" className="chapter timeline-chapter"><div className="section-kicker">the little timeline of us</div><div className="timeline-layout"><div><p className="micro-label">from pixels to something real</p><h3>Look how far<br /><em>one random hello</em><br />brought me.</h3><p className="lead">I still think it is funny that something so ordinary could lead to someone who became such a big part of my everyday life.</p></div><div className="timeline-card"><div className="timeline-count">chapter {timelineStep + 1} / 5</div><div className="timeline-photo"><img src={photos[(timelineStep * 2) % photos.length]} alt="Timeline memory" /></div><p className="timeline-title">{timeline[timelineStep][0]}</p><p className="timeline-copy">{timeline[timelineStep][1]}</p><div className="timeline-controls"><button onClick={() => setTimelineStep(v => (v - 1 + timeline.length) % timeline.length)}><ChevronLeft size={18} /></button><div>{timeline.map((_, i) => <button key={i} aria-label={`Timeline ${i + 1}`} className={i === timelineStep ? 'active' : ''} onClick={() => setTimelineStep(i)} />)}</div><button onClick={() => setTimelineStep(v => (v + 1) % timeline.length)}><ChevronRight size={18} /></button></div></div></div></section>

            <section className="chapter quote-chapter"><div className="quote-orb">♡</div><p>I don't need a perfect story. I just want ours to keep having another page.</p><span>and if I get to write some of those pages with you, even better.</span></section>

            <section className="chapter openwhen-chapter"><div className="section-kicker">little envelopes for the days you need me</div><div className="center-heading"><h3>Open one<br /><em>when your heart asks.</em></h3><p>Tap one. Read slowly. These are little pieces of me you can keep for later.</p></div><div className="openwhen-grid">{openWhen.map(([title, copy], i) => <button key={title} className={`openwhen-card ${openedWhen === i ? 'opened' : ''}`} onClick={() => setOpenedWhen(openedWhen === i ? null : i)}><div className="envelope-icon"><Mail size={20} /></div><span>{title}</span><i>{openedWhen === i ? 'close the note' : 'open the note'}</i><AnimatePresence>{openedWhen === i && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>{copy}</motion.p>}</AnimatePresence></button>)}</div><div className="openwhen-footer">{openedWhen === null ? 'four little notes are waiting for you' : `you opened ${openedWhen + 1} of 4 · there are still more little pieces of me here`}</div></section>

            <section id="songs" className="chapter songs-chapter"><div className="section-kicker">our soundtrack</div><div className="songs-layout"><div><p className="micro-label">Blue is already playing softly</p><h3>Read this part<br /><em>with a little music.</em></h3><p className="lead">Blue stays with you through the website as the quiet background song. I kept it soft on purpose, so you can still read every word. If you want, pick one of our other songs here and take over the room.</p><div className="now-art"><img src={displayPhoto} alt="Song memory" /><span>{playing ? 'your selected song is playing ♡' : 'Blue is playing softly'}</span></div><button className="ambient-toggle" onClick={() => setAmbientMuted(v => !v)}>{ambientMuted ? <VolumeX size={15} /> : <Volume2 size={15} />} {ambientMuted ? 'turn Blue back on' : 'keep Blue softly playing'}</button></div><div className="player-panel"><div className="album-art"><img src={displayPhoto} alt="Current song memory" /><div className={playing ? 'vinyl-spin is-playing' : 'vinyl-spin'}><span /></div></div><div className="player-info"><span>pick a song</span><h4>{currentSong.title}</h4><p>{currentSong.memory}</p></div><div className="track-list">{songs.map((item, i) => <button key={item.title} className={i === track ? 'track active' : 'track'} onClick={() => selectTrack(i)}><span>0{i + 1}</span><strong>{item.title}</strong><small>{item.note}</small>{i === track && playing ? <Pause size={16} /> : <Play size={16} />}</button>)}</div><div className="player-controls"><button onClick={previousTrack}><ChevronLeft /></button><button className="main-play" onClick={togglePlay}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><button onClick={nextTrack}><ChevronRight /></button><button className={shuffle ? 'control active' : 'control'} onClick={() => setShuffle(v => !v)}><Shuffle size={16} /></button><button className={repeat ? 'control active' : 'control'} onClick={() => setRepeat(v => !v)}><Repeat size={16} /></button></div><div className="progress-row"><span>00</span><input aria-label="Song progress" type="range" min="0" max="100" value={progress} onChange={e => { if (audioRef.current?.duration) audioRef.current.currentTime = (Number(e.target.value) / 100) * audioRef.current.duration; setProgress(Number(e.target.value)); }} /><span>∞</span></div><div className="volume-row"><button onClick={() => setMuted(v => !v)}>{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button><input aria-label="Song volume" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={e => { setVolume(Number(e.target.value)); setMuted(false); }} /></div></div></div></section>

            <section id="letter" className="chapter letter-chapter"><div className="section-kicker">the words I wanted you to keep</div><div className="letter-wrap"><div className="letter-intro"><p className="micro-label">no jokes for a minute</p><h3>Okay.<br /><em>Let me say this properly.</em></h3><p>I can joke around all day, but there are some things I never want you to misunderstand.</p></div><motion.button className={`envelope ${letterOpen ? 'opened' : ''}`} onClick={() => setLetterOpen(v => !v)} whileHover={{ y: -6 }}><div className="envelope-paper"><span>Dear Bhavanika,</span><p>Somewhere between our random conversations and all those little moments, I started caring about you in a way that stopped feeling small.</p><p>I love your voice, your care, your cuteness, your anger, your decisions, your confidence — even the tiny things you probably think are too ordinary to notice. I notice them. I love them because they are you.</p><p>I know you have your studies, your dreams and so many things you want to achieve. I never want to be the reason you step away from them. I want to be the person who cheers when you win and stays beside you when a day feels heavy.</p><p>We started in a game, but what I feel for you is not a game to me. We still have not met in real life, and I know there is a whole distance between us. Still, I want to keep knowing you, keep choosing you, and one day turn all these screens into an actual hello.</p><p>If you ever ask me what I want from us, my honest answer is simple: I want the story to keep going. I want more random calls, more stupid jokes, more little memories, more days where I get to say, “that's my girl.”</p><strong>Happy birthday, my favourite girl. ♡</strong><small>— always yours</small></div><div className="envelope-flap" /><div className="envelope-front"><Heart size={34} fill="currentColor" /></div></motion.button><p className="letter-hint">{letterOpen ? 'you opened it ♡ read it slowly' : 'tap the envelope to open my letter'}</p></div></section>

            <section className="chapter promise-chapter"><div className="section-kicker">three things I mean</div><div className="promise-grid"><div className="promise-card"><Star size={18} /><h4>I want you to keep growing.</h4><p>Your dreams and studies matter. I want to see you become everything you are capable of becoming.</p></div><div className="promise-card featured"><Heart size={18} fill="currentColor" /><h4>I will keep choosing the real you.</h4><p>Not just the cute moments. The angry moments, quiet moments, confused moments and every little in-between.</p></div><div className="promise-card"><Sparkles size={18} /><h4>I want more chapters.</h4><p>More memories, more songs, more late-night conversations — and one day, finally meeting you for real.</p></div></div></section>

            <section className="chapter birthday-chapter"><div className="birthday-card"><div className="birthday-stars"><Sparkles /><Sparkles /><Sparkles /></div><CakeSlice size={28} /><p className="eyebrow">your little birthday moment</p><h3>Make a wish,<br /><em>birthday girl.</em></h3><p>Tap every candle and watch it go out. When the last one disappears, don't scroll — something is waiting for you.</p><div className="candles">{candles.map((lit, i) => <button key={i} aria-label={`Candle ${i + 1}`} className={lit ? 'candle lit' : 'candle blown'} onClick={() => blowCandle(i)}><span className="flame" /><i /><b className="smoke" /></button>)}</div><div className="cake-base"><span>♡</span></div><div className="wish-counter">{candles.filter(Boolean).length === 0 ? 'all five are out ♡' : `${candles.filter(Boolean).length} little flames still glowing`}</div><AnimatePresence>{allCandlesOut && <motion.div className="wish-reveal" initial={{ opacity: 0, scale: .75, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}><Sparkles size={18} /><span>make your wish…</span><strong>and let me keep one little wish for you too.</strong></motion.div>}</AnimatePresence><AnimatePresence>{wishBurst && <motion.div className="wish-burst" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ ['--i' as any]: i }} />)}</motion.div>}</AnimatePresence></div></section>

            <section id="gift" className="chapter finale-chapter"><div className="finale-glow" /><div className="section-kicker">the part I saved for last</div><h3>One more thing.<br /><em>Open it when you're ready.</em></h3><p className="gift-intro">You have already seen the memories, the songs and the things I wanted to say. But I still wanted you to have one little surprise you could actually open.</p><div className={`gift-scene ${giftOpen ? 'open' : ''}`}><button className="gift-box" onClick={() => setGiftOpen(true)} aria-label="Open your birthday gift"><div className="gift-lid"><span /><i /></div><div className="gift-body"><span className="ribbon-v" /><span className="ribbon-h" /><div className="gift-heart">♡</div></div><div className="gift-bow"><i /><i /></div></button>{!giftOpen && <p>tap the bow · then watch carefully</p>}{giftOpen && <div className="gift-sparkles">{Array.from({ length: 16 }, (_, i) => <span key={i}>✦</span>)}</div>}</div><AnimatePresence>{giftOpen && <motion.div className="final-reveal" initial={{ opacity: 0, y: 40, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .8, type: 'spring' }}><div className="final-photo-stack">{[10, 4, 2].map(i => <img key={i} src={photos[i]} alt="A favourite memory" />)}</div><Sparkles size={18} /><span>for the girl who became my favourite person</span><h4>I would choose this little world again.</h4><p>Not because it is perfect. Because every part of it made me think of you.</p><strong>Happy Birthday, pookie ♡</strong><small>come back here whenever you want a little reminder of us</small></motion.div>}</AnimatePresence></section>
          </main>

          <footer className="final-footer"><Heart size={14} fill="currentColor" /><span>made with an unreasonable amount of love · for Bhavanika</span><Heart size={14} fill="currentColor" /></footer>
        </>
      )}
    </div>
  );
}
