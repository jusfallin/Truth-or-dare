import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown, ChevronLeft, ChevronRight, Gift, Heart, Pause, Play, Repeat, Shuffle, Sparkles, Volume2, VolumeX, X, Star, CakeSlice, Mail, LockKeyhole } from 'lucide-react';

const photos = Array.from({ length: 14 }, (_, i) => `/bhavanika/${String(i + 1).padStart(2, '0')}.jpg`);

const songs = [
  { title: 'Vizhi Veekura', src: '/bhavanika/audio/vizhi-veekura.mp3', note: 'the one that feels like us', memory: 'For the restless, silly little feeling of wanting one more conversation… and then one more.' },
  { title: 'Sidu Sidu', src: '/bhavanika/audio/sidu-sidu.mp3', note: 'our chaotic little corner', memory: 'For every random conversation that somehow became a memory. We really can make anything entertaining.' },
  { title: 'Kannana Kanne — Ne Kalangatha Di', src: '/bhavanika/audio/kannana-kanne.mp3', note: 'the soft one', memory: 'If I could turn one feeling into a song, it would be this: you do not have to carry everything alone.' },
  { title: 'Blue — yung kai', src: '/bhavanika/audio/blue.mp3', note: 'our moonlight song', memory: 'The late-night one. The one that makes distance feel a little quieter and makes me picture you beside me.' },
];

const timeline = [
  ['01', 'ZEPETO', 'We met inside a game. It was not supposed to become this important. Somehow, you did.'],
  ['02', 'Then we kept talking', 'Random talks became the part of my day I would quietly wait for.'],
  ['03', 'Thangoww × Kelavi', 'And then the nicknames happened. At some point they stopped being jokes and became our tiny language.'],
  ['04', 'The distance', 'Different places, different screens, still the same person I wanted to hear from. We have not met IRL yet — and I still treasure what we have.'],
  ['05', 'This birthday', '09 September. Your day. So I made a place where all these tiny pieces can stay.'],
];

const reasons = [
  ['your voice', 'I could listen to you talk about something completely random and still not want the call to end.'],
  ['the way you care', 'You notice little things. I notice that you notice. That matters more than you probably realise.'],
  ['your cuteness', 'Especially when you are not trying. That is usually when you are the most dangerous.'],
  ['your fire', 'Your anger, decisions, confidence and stubborn little moments are not things I fell around. They are part of what I fell for.'],
  ['your heart', 'The way you make space for people, the way you worry, the way you love — I see it.'],
  ['all of you', 'Eventually I stopped trying to pick a favourite thing. The answer became you.'],
];

const stories = [
  'The beginning — before either of us knew this would become worth keeping.',
  'A tiny digital world that somehow became the start of a very real feeling.',
  'One of those memories that makes the distance feel slightly less annoying.',
  'Proof that the ordinary moments are often the ones I keep closest.',
  'A little piece of us I would save even if nobody else understood why.',
  'Somewhere along the way, “just talking” stopped being just talking.',
  'The kind of picture I can look at twice and still smile at.',
  'One screen. Two people. A ridiculous amount of feelings.',
  'For the version of us that stayed even when the conversation should have ended.',
  'If I could put a feeling inside a photograph, it would look a little like this.',
  'A memory I would replay without getting bored.',
  'Still my favourite kind of notification: you.',
  'No grand explanation. I just really like having you in my life.',
  'And somehow, we are still writing the next part.',
];

const openWhen = [
  ['when you miss me', 'Look at the nearest photo and remember: the distance is a location, not a definition of us.'],
  ['when you feel like giving up', 'You do not have to have everything figured out today. Breathe. Do the next small thing. I am cheering for you.'],
  ['when you are angry at me', 'Okay kelavi, fair. Tell me. Roast me if necessary. But do not disappear on me.'],
  ['when you need a smile', 'Remember that somewhere out here is a boy who still thinks your random little expressions are ridiculously cute.'],
];

function TypeLine({ text }: { text: string }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    let i = 0;
    setValue('');
    const timer = window.setInterval(() => {
      i += 1;
      setValue(text.slice(0, i));
      if (i >= text.length) window.clearInterval(timer);
    }, 34);
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
  const [reel, setReel] = useState(0);
  const [openedWhen, setOpenedWhen] = useState<number | null>(null);
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();
  const progressSpring = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const currentSong = songs[track];
  const displayPhoto = useMemo(() => photos[(track * 3 + 1) % photos.length], [track]);

  useEffect(() => {
    if (!entered) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPhoto(null);
      if (e.code === 'Space' && (e.target as HTMLElement)?.tagName !== 'INPUT') { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [entered, playing]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = muted ? 0 : volume; }, [volume, muted]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setProgress(0);
    if (playing) audioRef.current.play().catch(() => setPlaying(false));
  }, [track]);

  useEffect(() => {
    if (!entered) return;
    const timer = window.setInterval(() => setReel(v => (v + 1) % photos.length), 4200);
    return () => window.clearInterval(timer);
  }, [entered]);

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }
  function nextTrack() {
    const next = shuffle ? Math.floor(Math.random() * songs.length) : (track + 1) % songs.length;
    setTrack(next); setPlaying(true);
  }
  function previousTrack() { setTrack((track - 1 + songs.length) % songs.length); setPlaying(true); }
  function handleEnded() {
    if (repeat && audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => setPlaying(false)); return; }
    nextTrack();
  }

  return (
    <div className="bhavanika-world">
      <motion.div className="bhavanika-progress" style={{ scaleX: progressSpring }} />

      <AnimatePresence>
        {!entered && (
          <motion.div className="entrance-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 1 }}>
            <div className="entrance-sun" />
            <div className="entrance-petal-field">✦ · ✧ · ♡ · ✧ · ✦</div>
            <div className="entrance-polaroid"><img src={photos[0]} alt="Bhavanika" /></div>
            <p className="eyebrow">09 · 09 · 2008 · birthday archive</p>
            <h1>For <em>Bhavanika.</em></h1>
            <p className="entrance-copy">Not another copy-paste birthday paragraph.<br />I made you a little world instead.</p>
            <button className="enter-button" onClick={() => setEntered(true)}><Heart size={16} fill="currentColor" /> come in, thangoww</button>
            <p className="tiny-note">headphones on · take your time · there are things hidden here</p>
          </motion.div>
        )}
      </AnimatePresence>

      {entered && (
        <>
          <audio ref={audioRef} src={currentSong.src} preload="metadata" onTimeUpdate={e => setProgress((e.currentTarget.currentTime / (e.currentTarget.duration || 1)) * 100)} onEnded={handleEnded} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />

          <header className="floating-nav">
            <a className="nav-mark" href="#home">B<span>♡</span></a>
            <nav><a href="#story">story</a><a href="#about">her</a><a href="#memories">memories</a><a href="#timeline">us</a><a href="#songs">songs</a><a href="#letter">letter</a></nav>
            <button className="mini-player" onClick={() => document.getElementById('songs')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className={playing ? 'equalizer is-playing' : 'equalizer'}><i /><i /><i /></span><span>{currentSong.title}</span>
            </button>
          </header>

          <main>
            <section id="home" className="hero-chapter">
              <div className="hero-sun" />
              <div className="hero-petal-layer" />
              <motion.div className="hero-photo hero-photo-a" animate={{ y: [0, -12, 0], rotate: [3, 1, 3] }} transition={{ duration: 7, repeat: Infinity }} onClick={() => setPhoto(0)}><img src={photos[0]} alt="A memory of us" /><span>01 · the beginning</span></motion.div>
              <motion.div className="hero-photo hero-photo-b" animate={{ y: [0, 14, 0], rotate: [-4, -2, -4] }} transition={{ duration: 8, repeat: Infinity }} onClick={() => setPhoto(5)}><img src={photos[5]} alt="Another memory" /><span>05 · still us</span></motion.div>
              <div className="hero-content">
                <p className="eyebrow">a birthday love letter, but make it a website</p>
                <h2>Somehow, you became<br /><em>my favourite person.</em></h2>
                <p className="hero-sub"><TypeLine text="No distance. No screen. No ZEPETO world could make what I feel for you feel ordinary." /></p>
                <div className="hero-buttons"><a className="scroll-cue primary" href="#story">start our story <ArrowDown size={15} /></a><button className="ghost-pill" onClick={togglePlay}>{playing ? <Pause size={15} /> : <Play size={15} />} {playing ? 'pause our song' : 'play our song'}</button></div>
              </div>
              <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            </section>

            <section id="story" className="chapter story-chapter">
              <div className="section-kicker">01 · how this even happened</div>
              <div className="story-grid">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }}>
                  <p className="micro-label">the plot twist nobody planned</p>
                  <h3>It started<br /><em>with a game.</em></h3>
                  <p className="lead">ZEPETO was supposed to be just a game. Then we started talking. Then talking became something I looked forward to. And somewhere between random conversations, your voice, your care and your little moods… you became you.</p>
                  <div className="secret-note"><Sparkles size={16} /><span>little secret: I am ridiculously glad I met you there.</span></div>
                </motion.div>
                <motion.button className="story-photo-card" whileHover={{ scale: 1.02, rotate: -1 }} onClick={() => setPhoto(0)}><img src={photos[0]} alt="The beginning" /><span>tap me</span><div className="photo-caption">the beginning of our little world</div></motion.button>
              </div>
              <div className="distance-line"><span>you</span><div><i /><i /><i /><i /><i /></div><span>me</span><strong>different screens · one very real feeling</strong></div>
            </section>

            <section id="about" className="chapter about-chapter">
              <div className="section-kicker">02 · a tiny field guide to my favourite girl</div>
              <div className="about-heading"><div><h3>Things I notice<br /><em>about you.</em></h3><p>Hover. Tap. Be nosy. Some of these are sweet. Some are dangerously specific.</p></div><div className="about-stamp"><Heart size={18} fill="currentColor" /><span>thangoww<br />edition</span></div></div>
              <div className="reasons-grid">{reasons.map(([title, copy], i) => <button key={title} className={`reason-card ${reason === i ? 'is-open' : ''}`} onClick={() => setReason(reason === i ? null : i)}><span>{String(i + 1).padStart(2, '0')}</span><strong>{title}</strong><i>{reason === i ? '−' : '+'}</i><AnimatePresence>{reason === i && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{copy}</motion.p>}</AnimatePresence></button>)}</div>
              <div className="nickname-strip"><span>our dictionary</span><b>thangoww</b><i>×</i><b>kelavi</b><span>two words that somehow became a whole relationship</span></div>
            </section>

            <section id="memories" className="chapter memory-chapter">
              <div className="section-kicker">03 · fourteen little pieces of us</div>
              <div className="memory-heading"><h3>A photo album<br /><em>you can touch.</em></h3><p>Every card flips. Every photo opens. Nothing is just sitting here for decoration.</p></div>
              <div className="photo-mosaic">{photos.map((src, i) => <motion.button key={src} className={`memory-card memory-${i + 1}`} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 35 }} viewport={{ once: true, amount: .1 }} whileHover={{ y: -9 }} onClick={() => setPhoto(i)}><div className="memory-inner"><div className="memory-front"><img src={src} alt={`Memory ${i + 1}`} loading="lazy" /><span>{String(i + 1).padStart(2, '0')}</span><small>open memory</small></div><div className="memory-back"><Sparkles size={16} /><strong>{stories[i]}</strong><small>click for the full story</small></div></div></motion.button>)}</div>
            </section>

            <section className="chapter reel-chapter">
              <div className="reel-copy"><div className="section-kicker">04 · memory reel</div><h3>Let the pictures<br /><em>tell it for me.</em></h3><p className="lead">This one keeps moving because memories do too. You can take control whenever you want.</p><div className="reel-controls"><button onClick={() => setReel(v => (v - 1 + photos.length) % photos.length)}><ChevronLeft /></button><div><span>{String(reel + 1).padStart(2, '0')}</span> / 14</div><button onClick={() => setReel(v => (v + 1) % photos.length)}><ChevronRight /></button></div></div>
              <motion.button className="reel-stage" whileHover={{ scale: 1.015 }} onClick={() => setPhoto(reel)}><AnimatePresence mode="wait"><motion.img key={reel} src={photos[reel]} alt="Auto-playing memory" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .65 }} /></AnimatePresence><div className="reel-overlay"><span>memory {String(reel + 1).padStart(2, '0')}</span><strong>{stories[reel]}</strong></div></motion.button>
            </section>

            <AnimatePresence>{photo !== null && <motion.div className="photo-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPhoto(null)}><motion.div className="photo-modal" initial={{ scale: .92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94 }} onClick={e => e.stopPropagation()}><img src={photos[photo]} alt={`Memory ${photo + 1}`} /><button className="close-button" onClick={() => setPhoto(null)}><X size={18} /></button><div className="modal-story"><span>memory {String(photo + 1).padStart(2, '0')}</span><p>{stories[photo]}</p><small>thangoww × kelavi · keep this one</small></div></motion.div></motion.div>}</AnimatePresence>

            <section id="timeline" className="chapter timeline-chapter">
              <div className="section-kicker">05 · our tiny timeline</div>
              <div className="timeline-layout"><div><p className="micro-label">from pixels to feelings</p><h3>Look how far<br /><em>“just a game”</em> got.</h3><p className="lead">We have not even met in real life yet, and somehow there are already so many little moments I would miss if they disappeared.</p></div><div className="timeline-card"><div className="timeline-count">{timeline[timelineStep][0]} / 05</div><div className="timeline-photo"><img src={photos[(timelineStep * 2) % photos.length]} alt="Timeline memory" /></div><p className="timeline-title">{timeline[timelineStep][1]}</p><p className="timeline-copy">{timeline[timelineStep][2]}</p><div className="timeline-controls"><button onClick={() => setTimelineStep(v => (v - 1 + timeline.length) % timeline.length)}><ChevronLeft size={18} /></button><div>{timeline.map((_, i) => <button key={i} aria-label={`Timeline ${i + 1}`} className={i === timelineStep ? 'active' : ''} onClick={() => setTimelineStep(i)} />)}</div><button onClick={() => setTimelineStep(v => (v + 1) % timeline.length)}><ChevronRight size={18} /></button></div></div></div>
            </section>

            <section className="chapter quote-chapter"><div className="quote-orb">“</div><p>“I already fell for you more than 100 times a day.”</p><span>— the boy who somehow keeps finding new reasons</span></section>

            <section className="chapter openwhen-chapter">
              <div className="section-kicker">06 · little envelopes for later</div><div className="center-heading"><h3>Open one<br /><em>when you need it.</em></h3><p>Save this part. Future-you might need one of these.</p></div>
              <div className="openwhen-grid">{openWhen.map(([title, copy], i) => <button key={title} className={`openwhen-card ${openedWhen === i ? 'opened' : ''}`} onClick={() => setOpenedWhen(openedWhen === i ? null : i)}><div className="envelope-icon"><Mail size={20} /></div><span>{title}</span><i>{openedWhen === i ? 'close' : 'open'}</i><AnimatePresence>{openedWhen === i && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{copy}</motion.p>}</AnimatePresence></button>)}</div>
            </section>

            <section id="songs" className="chapter songs-chapter">
              <div className="section-kicker">07 · our soundtrack</div><div className="songs-layout"><div><p className="micro-label">press play, thangoww</p><h3>Don't just read<br /><em>the songs.</em></h3><p className="lead">I wanted actual music here. Pick a song, drag the progress, shuffle it, loop it. Let the page become a tiny late-night room for us.</p><div className="now-art"><img src={displayPhoto} alt="Song memory" /><span>{playing ? 'playing for you ♡' : 'choose a song'}</span></div></div><div className="player-panel"><div className="album-art"><img src={displayPhoto} alt="Current song memory" /><div className={playing ? 'vinyl-spin is-playing' : 'vinyl-spin'}><span /></div></div><div className="player-info"><span>now selected</span><h4>{currentSong.title}</h4><p>{currentSong.memory}</p></div><div className="track-list">{songs.map((item, i) => <button key={item.title} className={i === track ? 'track active' : 'track'} onClick={() => { setTrack(i); setPlaying(true); }}><span>0{i + 1}</span><strong>{item.title}</strong><small>{item.note}</small>{i === track && playing ? <Pause size={16} /> : <Play size={16} />}</button>)}</div><div className="player-controls"><button onClick={previousTrack}><ChevronLeft /></button><button className="main-play" onClick={togglePlay}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><button onClick={nextTrack}><ChevronRight /></button><button className={shuffle ? 'control active' : 'control'} onClick={() => setShuffle(v => !v)}><Shuffle size={16} /></button><button className={repeat ? 'control active' : 'control'} onClick={() => setRepeat(v => !v)}><Repeat size={16} /></button></div><div className="progress-row"><span>00</span><input aria-label="Song progress" type="range" min="0" max="100" value={progress} onChange={e => { if (audioRef.current?.duration) audioRef.current.currentTime = (Number(e.target.value) / 100) * audioRef.current.duration; setProgress(Number(e.target.value)); }} /><span>∞</span></div><div className="volume-row"><button onClick={() => setMuted(v => !v)}>{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button><input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={e => { setVolume(Number(e.target.value)); setMuted(false); }} /></div></div></div>
            </section>

            <section id="letter" className="chapter letter-chapter">
              <div className="section-kicker">08 · the part I couldn't fit in WhatsApp</div><div className="letter-wrap"><div className="letter-intro"><p className="micro-label">no jokes for a minute</p><h3>Okay.<br /><em>One serious thing.</em></h3><p>I can joke around all day. But there are some things I really mean.</p></div><motion.button className={`envelope ${letterOpen ? 'opened' : ''}`} onClick={() => setLetterOpen(v => !v)} whileHover={{ y: -6 }}><div className="envelope-paper"><span>Dear Bhavanika,</span><p>We just started caring for each other… and I guess I already fell for you more than 100 times a day.</p><p>I love the way you care, your voice, your cuteness in the way you talk, your anger, your decisions, your confidence — all those little things that make you you. I really do love every single thing about you.</p><p>I know you are focused on your studies, and I know you have that fear of losing. I am not here to distract you from your dreams. I want to be someone who stands beside them.</p><p>We started in a game, but what I feel is not a game to me. We still have not met in real life. Even so, I want to keep knowing you, keep choosing you, and one day close this distance for real.</p><p>So if you ever ask me what I want from all this… honestly? I want the story to keep going. I want the kind of relationship I can look back on one day and say, “yeah, that was my person.”</p><strong>Happy birthday, thangoww.</strong><small>— your kelavi ♡</small></div><div className="envelope-flap" /><div className="envelope-front"><Heart size={34} fill="currentColor" /></div></motion.button><p className="letter-hint">{letterOpen ? 'you opened it ♡ keep reading slowly' : 'tap the envelope'}</p></div>
            </section>

            <section className="chapter promise-chapter"><div className="section-kicker">09 · things I want you to remember</div><div className="promise-grid"><div className="promise-card"><LockKeyhole size={18} /><h4>I won't ask you to shrink.</h4><p>Your studies, your goals, your confidence — I want you to keep becoming the person you want to be.</p></div><div className="promise-card featured"><Star size={18} fill="currentColor" /><h4>I will keep choosing the real you.</h4><p>Not just the cute moments. The angry moments. The confused ones. The quiet ones. All of it.</p></div><div className="promise-card"><Heart size={18} fill="currentColor" /><h4>And I will keep showing up.</h4><p>Until one day “online” is just a chapter we laugh about because we finally got to meet.</p></div></div></section>

            <section className="chapter birthday-chapter"><div className="birthday-card"><div className="birthday-stars"><Sparkles /><Sparkles /><Sparkles /></div><CakeSlice size={28} /><p className="eyebrow">09 · 09 · 2008</p><h3>Make a wish,<br /><em>birthday girl.</em></h3><p>There are five little candles here. Tap them out one by one, then make your secret wish.</p><div className="candles">{candles.map((lit, i) => <button key={i} className={lit ? 'candle lit' : 'candle'} onClick={() => setCandles(v => v.map((x, j) => j === i ? false : x))}><span className="flame" /><i /></button>)}</div><div className="cake-base">♡</div>{candles.every(v => !v) && <motion.div className="wish-reveal" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }}><Sparkles size={18} />wish made. now let the universe do its part.</motion.div>}</div></section>

            <section id="gift" className="chapter finale-chapter"><div className="finale-glow" /><div className="section-kicker">10 · the final scene</div><h3>Don't close this yet.<br /><em>I saved the best part.</em></h3><p className="gift-intro">The website is not really the gift. The gift is the reminder that somebody thought about all these tiny details because you matter to him.</p><div className={`gift-scene ${giftOpen ? 'open' : ''}`}><button className="gift-box" onClick={() => setGiftOpen(true)} aria-label="Open your birthday gift"><div className="gift-lid"><span /><i /></div><div className="gift-body"><span className="ribbon-v" /><span className="ribbon-h" /><div className="gift-heart">♡</div></div><div className="gift-bow"><i /><i /></div></button>{!giftOpen && <p>tap the box, kelavi</p>}</div><AnimatePresence>{giftOpen && <motion.div className="final-reveal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}><div className="final-photo-stack">{[10, 4, 2].map(i => <img key={i} src={photos[i]} alt="A favourite memory" />)}</div><Sparkles size={18} /><span>for Bhavanika</span><h4>You were never just someone I met online.</h4><p>You became someone I wanted to keep choosing.</p><strong>Happy Birthday, thangoww ♡</strong><small>09 · 09 · 2008 · until the next chapter</small></motion.div>}</AnimatePresence></section>
          </main>

          <footer className="final-footer"><Heart size={14} fill="currentColor" /><span>made with an unreasonable amount of love · thangoww × kelavi</span><Heart size={14} fill="currentColor" /></footer>
        </>
      )}
    </div>
  );
}
