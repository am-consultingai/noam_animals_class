import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { animals, factMeta } from './animals.js'

// אנימציית כניסה מדורגת לכרטיסים
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
}

function Float({ children, size = 120, className = '' }) {
  return (
    <motion.div
      className={`float-emoji ${className}`}
      style={{ fontSize: size }}
      animate={{ y: [0, -16, 0], rotate: [0, 3, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

// ===== אנימציית מגרש: כל חיה מדגימה את התפקיד שלה =====
const LOOP = { repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }

// שחקן/אובייקט בודד על המגרש. ממקמים עם left/top (באחוזים) ומניעים
// left/top (תנועה על המגרש) יחד עם rotate/scale (סיבוב והגדלה).
function Actor({ emoji, size = 46, at = {}, animate, transition, z = 2 }) {
  return (
    <motion.div
      className="fa-actor"
      style={{ fontSize: size, left: at.left, top: at.top, zIndex: z }}
      animate={animate}
      transition={transition ? { ...LOOP, ...transition } : undefined}
    >
      {emoji}
    </motion.div>
  )
}

// טבעות סונאר מתרחבות (לעטלף)
function Sonar({ delay = 0 }) {
  return (
    <motion.div
      className="fa-sonar"
      animate={{ scale: [0.2, 2.6], opacity: [0.9, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay }}
    />
  )
}

const fieldCaptions = {
  bull: 'הפר דוהר ומשגר בעיטת רעם לשער! 💥',
  horse: 'הסוס דוהר ומשאיר את האריה הרחק מאחור! ⚡',
  lizard: 'החרדון חומק בין המגנים עם הכדור 💨',
  frog: 'האריה בועט — והצפרדע מנתרת ועוצרת! 🧤',
  gorilla: 'האריה מנסה לפרוץ — והגורילה עוצרת כמו קיר! 💪',
  bat: 'העטלף שומע מאיפה מגיע הכדור ומרחיק מאחור 👂',
}

function FieldScene({ id }) {
  switch (id) {
    // פר — דוהר, בועט בעיטת עוצמה לשער
    case 'bull':
      return (
        <>
          <Actor emoji="🥅" size={50} at={{ left: '86%', top: '30%' }} z={1} />
          <Actor
            emoji="🐂"
            size={50}
            at={{ top: '46%' }}
            animate={{
              left: ['2%', '38%', '42%', '38%', '2%'],
              rotate: [0, 0, 8, 0, 0],
              scaleX: [-1, -1, -1, 1, 1],
            }}
            transition={{ duration: 2.8, times: [0, 0.35, 0.46, 0.58, 1] }}
          />
          <Actor
            emoji="⚽"
            size={30}
            animate={{
              left: ['52%', '52%', '52%', '78%', '88%', '52%'],
              top: ['64%', '64%', '64%', '42%', '34%', '64%'],
              rotate: [0, 0, 0, 540, 900, 900],
            }}
            transition={{ duration: 2.8, times: [0, 0.4, 0.46, 0.62, 0.74, 1] }}
          />
          <Actor
            emoji="💥"
            size={40}
            at={{ left: '50%', top: '50%' }}
            animate={{ scale: [0, 0, 1.4, 0, 0], opacity: [0, 0, 1, 0, 0] }}
            transition={{ duration: 2.8, times: [0, 0.42, 0.48, 0.56, 1] }}
          />
        </>
      )
    // סוס — דוהר ומשאיר את האריה מאחור, מגיע ראשון לכדור
    case 'horse':
      return (
        <>
          <Actor emoji="🥅" size={48} at={{ left: '88%', top: '30%' }} z={1} />
          <Actor
            emoji="🦁"
            size={40}
            at={{ top: '60%' }}
            animate={{ left: ['18%', '20%', '42%', '48%', '18%'], rotate: [0, 0, 4, 0, 0] }}
            transition={{ duration: 3, times: [0, 0.3, 0.7, 0.85, 1] }}
          />
          <Actor
            emoji="💨"
            size={32}
            animate={{ left: ['2%', '4%', '70%', '70%', '2%'], top: ['44%', '44%', '44%', '44%', '44%'], opacity: [0, 0.9, 0.7, 0, 0] }}
            transition={{ duration: 3, times: [0, 0.3, 0.68, 0.8, 1] }}
          />
          <Actor
            emoji="🐎"
            size={50}
            at={{ top: '40%' }}
            animate={{ left: ['4%', '6%', '78%', '78%', '4%'], scaleX: [-1, -1, -1, 1, 1] }}
            transition={{ duration: 3, times: [0, 0.3, 0.66, 0.82, 1] }}
          />
          <Actor
            emoji="⚽"
            size={28}
            animate={{
              left: ['10%', '12%', '82%', '82%', '10%'],
              top: ['58%', '58%', '54%', '54%', '58%'],
              rotate: [0, 360, 1440, 1440, 0],
            }}
            transition={{ duration: 3, times: [0, 0.3, 0.66, 0.82, 1] }}
          />
        </>
      )
    // חרדון — חומק בזיגזג בין שני מגנים עם הכדור
    case 'lizard':
      return (
        <>
          <Actor emoji="🦁" size={40} at={{ left: '38%', top: '20%' }} z={1} />
          <Actor emoji="🦁" size={40} at={{ left: '62%', top: '62%' }} z={1} />
          <Actor
            emoji="🦎"
            size={46}
            animate={{
              left: ['4%', '28%', '50%', '74%', '92%', '92%', '4%'],
              top: ['52%', '66%', '34%', '66%', '50%', '50%', '52%'],
              scaleX: [-1, -1, -1, -1, -1, 1, 1],
            }}
            transition={{ duration: 3.6, times: [0, 0.16, 0.34, 0.52, 0.7, 0.82, 1] }}
          />
          <Actor
            emoji="⚽"
            size={26}
            animate={{
              left: ['8%', '32%', '54%', '78%', '96%', '96%', '8%'],
              top: ['64%', '78%', '46%', '78%', '62%', '62%', '64%'],
              rotate: [0, 360, 720, 1080, 1440, 1440, 1440],
            }}
            transition={{ duration: 3.6, times: [0, 0.16, 0.34, 0.52, 0.7, 0.82, 1] }}
          />
        </>
      )
    // צפרדע — האריה בועט והיא מנתרת לאוויר ועוצרת את הכדור
    case 'frog':
      return (
        <>
          <Actor emoji="🥅" size={50} at={{ left: '5%', top: '30%' }} z={1} />
          <Actor
            emoji="🦁"
            size={40}
            at={{ left: '82%', top: '52%' }}
            animate={{ rotate: [0, -20, 8, 0, 0] }}
            transition={{ duration: 3, times: [0, 0.12, 0.22, 0.4, 1] }}
          />
          <Actor
            emoji="🐸"
            size={48}
            at={{ left: '17%' }}
            animate={{ top: ['58%', '58%', '20%', '20%', '58%', '58%'], rotate: [0, 0, -8, 6, 0, 0] }}
            transition={{ duration: 3, times: [0, 0.32, 0.5, 0.58, 0.74, 1] }}
          />
          <Actor
            emoji="⚽"
            size={28}
            animate={{
              left: ['78%', '54%', '34%', '28%', '56%', '84%'],
              top: ['54%', '40%', '26%', '30%', '60%', '54%'],
              rotate: [0, 200, 400, 400, 640, 880],
            }}
            transition={{ duration: 3, times: [0, 0.22, 0.44, 0.54, 0.74, 1] }}
          />
        </>
      )
    // גורילה — קיר שעוצר; האריה מסתער עם הכדור והכדור ניתז חזרה
    case 'gorilla':
      return (
        <>
          <Actor
            emoji="🦍"
            size={54}
            at={{ left: '20%', top: '42%' }}
            animate={{ scale: [1, 1, 1.15, 1, 1], rotate: [0, 0, -4, 0, 0] }}
            transition={{ duration: 2.8, times: [0, 0.4, 0.5, 0.6, 1] }}
          />
          <Actor
            emoji="🦁"
            size={40}
            at={{ top: '50%' }}
            animate={{ left: ['84%', '44%', '44%', '84%', '84%'], rotate: [0, 0, 10, 0, 0] }}
            transition={{ duration: 2.8, times: [0, 0.38, 0.46, 0.72, 1] }}
          />
          <Actor
            emoji="⚽"
            size={28}
            animate={{
              left: ['80%', '42%', '36%', '70%', '80%'],
              top: ['58%', '52%', '34%', '64%', '58%'],
              rotate: [0, 360, 540, 900, 900],
            }}
            transition={{ duration: 2.8, times: [0, 0.34, 0.46, 0.66, 1] }}
          />
          <Actor
            emoji="💥"
            size={38}
            at={{ left: '34%', top: '40%' }}
            animate={{ scale: [0, 0, 1.3, 0, 0], opacity: [0, 0, 1, 0, 0] }}
            transition={{ duration: 2.8, times: [0, 0.42, 0.48, 0.56, 1] }}
          />
        </>
      )
    // עטלף — פולט סונאר, מזהה כדור שמגיע מאחור ומרחיק אותו
    case 'bat':
      return (
        <>
          <div className="fa-sonar-wrap" style={{ left: '30%', top: '46%' }}>
            <Sonar delay={0} />
            <Sonar delay={0.9} />
          </div>
          <Actor
            emoji="🦇"
            size={48}
            at={{ left: '30%', top: '40%' }}
            animate={{ y: [0, -8, 0], rotate: [0, 0, -12, 0, 0] }}
            transition={{ duration: 2.8, times: [0, 0.3, 0.5, 0.6, 1] }}
          />
          <Actor
            emoji="⚽"
            size={28}
            animate={{
              left: ['90%', '46%', '40%', '86%', '90%'],
              top: ['38%', '44%', '44%', '36%', '38%'],
              rotate: [0, -360, -540, -900, -900],
            }}
            transition={{ duration: 2.8, times: [0, 0.4, 0.5, 0.74, 1] }}
          />
        </>
      )
    default:
      return null
  }
}

// סוויפ אולטרסאונד: צליל סינוס שעולה מ-300Hz ל-25kHz (Web Audio API).
// מיפוי תדר<->מיקום עם EXP>1 נותן יותר מקום (וגם יותר זמן) לתדרים הגבוהים,
// כך שהסוויפ "מתעכב" מעל 9kHz. אפשר גם לגרור את הסמן ולשמוע תדר ספציפי.
const F0 = 300
const F1 = 25000
const HUMAN = 20000
const SWEEP_SEC = 9
const EXP = 1.5
const F0E = Math.pow(F0, EXP)
const F1E = Math.pow(F1, EXP)
const freqAtPos = (p) => Math.pow(F0E + p * (F1E - F0E), 1 / EXP)
const posAtFreq = (f) => (Math.pow(f, EXP) - F0E) / (F1E - F0E)

const sweepTicks = [
  { f: 300, label: '300Hz' },
  { f: 5000, label: '5kHz' },
  { f: 10000, label: '10kHz' },
  { f: 15000, label: '15kHz' },
  { f: 25000, label: '25kHz' },
]

function UltrasoundSweep() {
  const [playing, setPlaying] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [freq, setFreq] = useState(F0)
  const ctxRef = useRef(null)
  const oscRef = useRef(null)
  const gainRef = useRef(null)
  const rafRef = useRef(0)
  const trackRef = useRef(null)
  const dragRef = useRef(false)

  function stopAudio() {
    cancelAnimationFrame(rafRef.current)
    if (oscRef.current) {
      try { oscRef.current.stop() } catch { /* already stopped */ }
      oscRef.current = null
    }
    if (ctxRef.current) {
      try { ctxRef.current.close() } catch { /* already closed */ }
      ctxRef.current = null
    }
    gainRef.current = null
  }

  function makeAudio() {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return null
    let ctx
    try { ctx = new Ctx({ sampleRate: 96000 }) } catch { ctx = new Ctx() }
    if (ctx.state === 'suspended' && ctx.resume) ctx.resume()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    gain.gain.value = 0.0001
    osc.connect(gain).connect(ctx.destination)
    ctxRef.current = ctx
    oscRef.current = osc
    gainRef.current = gain
    return { ctx, osc, gain }
  }

  function toggleSweep() {
    if (playing) { stopAudio(); setPlaying(false); setFreq(F0); return }
    if (dragRef.current) return
    stopAudio()
    const a = makeAudio()
    if (!a) return
    const { ctx, osc, gain } = a
    const t0 = ctx.currentTime
    // עקומת תדר שנדגמת באופן שווה במיקום — לכן הזמן נמתח היכן שהפס "מרווח" (תדרים גבוהים)
    const N = 256
    const curve = new Float32Array(N)
    for (let i = 0; i < N; i++) curve[i] = freqAtPos(i / (N - 1))
    osc.frequency.setValueCurveAtTime(curve, t0, SWEEP_SEC)
    gain.gain.setValueAtTime(0.0001, t0)
    gain.gain.exponentialRampToValueAtTime(0.16, t0 + 0.08)
    gain.gain.setValueAtTime(0.16, t0 + SWEEP_SEC - 0.15)
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + SWEEP_SEC)
    osc.start(t0)
    osc.stop(t0 + SWEEP_SEC)
    osc.onended = () => { stopAudio(); setPlaying(false); setFreq(F0) }
    setPlaying(true)
    const tick = () => {
      const c = ctxRef.current
      if (!c) return
      const p = Math.min((c.currentTime - t0) / SWEEP_SEC, 1)
      setFreq(Math.round(freqAtPos(p)))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  function posFromEvent(e) {
    const el = trackRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
  }

  function onPointerDown(e) {
    e.preventDefault()
    if (playing) { stopAudio(); setPlaying(false) }
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* unsupported */ }
    dragRef.current = true
    setDragging(true)
    const a = makeAudio()
    if (!a) return
    const { ctx, osc, gain } = a
    const f = freqAtPos(posFromEvent(e))
    osc.frequency.setValueAtTime(f, ctx.currentTime)
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.03)
    osc.start()
    setFreq(Math.round(f))
  }

  function onPointerMove(e) {
    if (!dragRef.current) return
    const ctx = ctxRef.current
    const osc = oscRef.current
    if (!ctx || !osc) return
    const f = freqAtPos(posFromEvent(e))
    osc.frequency.setTargetAtTime(f, ctx.currentTime, 0.012)
    setFreq(Math.round(f))
  }

  function onPointerUp() {
    if (!dragRef.current) return
    dragRef.current = false
    setDragging(false)
    stopAudio()
  }

  // עצירה בעת יציאה מהשקופית
  useEffect(() => () => stopAudio(), [])

  const pct = posAtFreq(freq) * 100
  const humanPct = posAtFreq(HUMAN) * 100
  const inaudible = freq >= HUMAN
  const active = playing || dragging
  const message = !active
    ? 'נגנו סוויפ או גררו את הסמן כדי לשמוע'
    : inaudible
    ? 'רק העטלף שומע עכשיו! 🦇'
    : 'אתם עדיין שומעים? 👂'

  return (
    <div className="sweep">
      <button className={`sweep-btn ${playing ? 'on' : ''}`} onClick={toggleSweep}>
        {playing ? '⏹ עצרו' : '🔊 נגנו סוויפ 300Hz ← 25kHz'}
      </button>
      <div className="sweep-meter" dir="ltr">
        <div
          className={`sweep-track ${dragging ? 'dragging' : ''}`}
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="sweep-human" style={{ left: `${humanPct}%` }}>
            <span className="sweep-human-tag">👂 גבול אדם</span>
          </div>
          <div className="sweep-needle" style={{ left: `${pct}%` }} />
        </div>
        <div className="sweep-ticks">
          {sweepTicks.map((t) => (
            <span
              key={t.f}
              className="sweep-tick"
              style={{
                left: `${posAtFreq(t.f) * 100}%`,
                transform: t.f === F0 ? 'none' : t.f === F1 ? 'translateX(-100%)' : 'translateX(-50%)',
              }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>
      <div className={`sweep-readout ${inaudible ? 'inaudible' : ''}`}>
        <strong>{freq.toLocaleString()} Hz</strong> · {message}
      </div>
    </div>
  )
}

function FieldPlay({ a }) {
  return (
    <motion.div
      className="field-play"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      <div className={`field-anim${a.id === 'bat' ? ' bat' : ''}`}>
        <FieldScene id={a.id} />
      </div>
      {a.id === 'bat' ? (
        <UltrasoundSweep />
      ) : (
        <div className="fa-caption">{fieldCaptions[a.id]}</div>
      )}
    </motion.div>
  )
}

function TitleSlide() {
  return (
    <section className="slide title-slide">
      <motion.div
        className="logos-row"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="brand-logo fifa-logo">
          <span className="fifa-word">FIFA</span>
          <span className="fifa-bar" />
        </div>
        <div className="brand-logo mondial-logo">
          <span className="mondial-cup">🏆</span>
          <span className="mondial-text">
            מונדיאל
            <small>WORLD CUP</small>
          </span>
        </div>
      </motion.div>

      <Float size={118}>⚽</Float>
      <motion.h1
        className="title-main"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      >
        חיות העל וגביע העולם
      </motion.h1>
      <motion.p
        className="subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        מי ינצח במונדיאל של עולם החי?
      </motion.p>
      <motion.div
        className="emoji-strip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        🦁 🐂 🐎 🦎 🐸 🦍 🦇
      </motion.div>
      <motion.p
        className="hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        החליקו באצבע 👆 או דפדפו עם החיצים ⬅️ ➡️
      </motion.p>
    </section>
  )
}

function AgendaSlide() {
  const items = [
    { emoji: '📚', t: 'נלמד על החיות', d: 'מה כוח-העל של כל חיה' },
    { emoji: '🛠️', t: 'נבנה קבוצה', d: 'נבחר שחקן לכל תפקיד' },
    { emoji: '🎮', t: 'נשחק משחקים', d: 'דו-קרב קטן על השולחן' },
  ]
  return (
    <section className="slide agenda-slide">
      <h2 className="slide-title">מה נעשה היום?</h2>
      <motion.div className="card-row" variants={container} initial="hidden" animate="show">
        {items.map((it) => (
          <motion.div className="big-card" variants={item} key={it.t}>
            <div className="big-card-emoji">{it.emoji}</div>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
            <span className="time-badge">15 דקות</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function QuestionSlide() {
  return (
    <section className="slide question-slide">
      <Float size={130}>🦁</Float>
      <motion.h2
        className="huge-q"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        האם אפשר בכלל לנצח קבוצה של 11 אריות?
      </motion.h2>
      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        כולם חושבים שלא... בואו נגלה!
      </motion.p>
    </section>
  )
}

function LionsSlide() {
  return (
    <section className="slide lions-slide">
      <motion.div
        className="lion-row"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        🦁🦁🦁🦁🦁
      </motion.div>
      <h2 className="slide-title light">קבוצת "FC אריות"</h2>
      <motion.div className="card-row" variants={container} initial="hidden" animate="show">
        <motion.div className="info-card" variants={item}>
          <span>👑</span>
          <p>האלופים שאף אחד לא ניצח</p>
        </motion.div>
        <motion.div className="info-card" variants={item}>
          <span>💪</span>
          <p>11 אריות חזקים ומהירים</p>
        </motion.div>
        <motion.div className="info-card" variants={item}>
          <span>👯</span>
          <p>כולם בדיוק... אותו דבר</p>
        </motion.div>
      </motion.div>
      <p className="subtitle light">שימו לב למילים האחרונות — הן הסוד!</p>
    </section>
  )
}

function MissionSlide() {
  return (
    <section className="slide mission-slide">
      <Float size={120}>🎯</Float>
      <h2 className="slide-title light">המשימה שלנו</h2>
      <motion.p
        className="mission-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        לבנות קבוצה שתנצח את האריות —
        <br />
        <strong>לא עם עוד אריות, אלא עם חיות שונות,</strong>
        <br />
        שלכל אחת כוח-על משלה!
      </motion.p>
    </section>
  )
}

function GroupsSlide() {
  return (
    <section className="slide groups-slide">
      <h2 className="slide-title">נכיר את ממלכת החי</h2>
      <p className="subtitle">שש חיות · שש משפחות · שש מעצמות-על</p>
      <motion.div className="grid6" variants={container} initial="hidden" animate="show">
        {animals.map((a) => (
          <motion.div className={`mini-card theme-${a.theme}`} variants={item} key={a.id}>
            <div className="mini-emoji">{a.emoji}</div>
            <h3>{a.name}</h3>
            <span className="group-badge">{a.group}</span>
            <p className="mini-power">
              {a.powerEmoji} {a.power}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function AnimalSlide({ a }) {
  return (
    <section className={`slide animal-slide theme-${a.theme}`}>
      <div className="animal-header">
        <Float size={76}>{a.emoji}</Float>
        <div className="animal-id">
          <h2 className="animal-name">{a.name}</h2>
          <span className="group-badge light">{a.group}</span>
        </div>
      </div>

      <motion.div
        className="power-banner"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <span className="power-emoji">{a.powerEmoji}</span>
        <div>
          <div className="power-label">כוח-על</div>
          <div className="power-name">{a.power}</div>
        </div>
      </motion.div>

      <motion.div
        className="soccer-line"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        ⚽ <strong>{a.position}:</strong> {a.soccer}
      </motion.div>

      <FieldPlay a={a} />

      <motion.div className="facts-row" variants={container} initial="hidden" animate="show">
        {factMeta.map((f) => (
          <motion.div className="fact-card" variants={item} key={f.key}>
            <div className="fact-emoji">{a.factEmoji?.[f.key] ?? f.emoji}</div>
            <div className="fact-label">{f.label}</div>
            <div className="fact-text">{a.facts[f.key]}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="beats-lion"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        🦁 מול האריה: {a.beatsLion}
      </motion.div>
    </section>
  )
}

function Chip({ a }) {
  return (
    <motion.div
      className={`player-chip theme-${a.theme}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 14 }}
    >
      <span className="chip-emoji">{a.emoji}</span>
      <span className="chip-name">{a.name}</span>
      <span className="chip-pos">{a.position}</span>
    </motion.div>
  )
}

function TeamSlide() {
  const byId = Object.fromEntries(animals.map((a) => [a.id, a]))
  return (
    <section className="slide team-slide">
      <h2 className="slide-title light">הקבוצה שלנו מוכנה!</h2>
      <div className="pitch">
        <div className="pitch-row">
          <Chip a={byId.bull} />
        </div>
        <div className="pitch-row">
          <Chip a={byId.lizard} />
          <Chip a={byId.horse} />
          <Chip a={byId.gorilla} />
        </div>
        <div className="pitch-row">
          <Chip a={byId.bat} />
        </div>
        <div className="pitch-row">
          <Chip a={byId.frog} />
        </div>
      </div>
      <p className="subtitle light">שש חיות, שש תפקידים — קבוצה אחת מנצחת</p>
    </section>
  )
}

function ShowdownSlide() {
  return (
    <section className="slide showdown-slide">
      <h2 className="slide-title light">הקבוצה שלנו 🆚 11 אריות</h2>
      <motion.div className="showdown-list" variants={container} initial="hidden" animate="show">
        {animals.map((a) => (
          <motion.div className="showdown-row" variants={item} key={a.id}>
            <span className="sd-emoji">{a.emoji}</span>
            <span className="sd-pos">{a.position}</span>
            <span className="sd-text">{a.beatsLion}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function WhyDiversitySlide() {
  const points = [
    { emoji: '👯', t: 'כל האריות זהים', d: 'אותה חולשה — לכולם' },
    { emoji: '🎯', t: 'ניצחת אחד? ניצחת את כולם', d: 'אותו טריק עובד על כל ה-11' },
    { emoji: '🌈', t: 'הקבוצה שלנו שונה', d: 'אין חולשה אחת — צריך לפתור 6 בעיות!' },
  ]
  return (
    <section className="slide why-slide">
      <h2 className="slide-title">למה דווקא קבוצה מגוונת מנצחת?</h2>
      <motion.div className="card-row" variants={container} initial="hidden" animate="show">
        {points.map((p) => (
          <motion.div className="big-card" variants={item} key={p.t}>
            <div className="big-card-emoji">{p.emoji}</div>
            <h3>{p.t}</h3>
            <p>{p.d}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// אריה בוכה: ראש אריה עם דמעה שזולגת
function CryLion({ delay = 0 }) {
  return (
    <span className="cry-lion">
      🦁
      <motion.span
        className="tear"
        animate={{ y: [0, 16], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeIn', delay }}
      >
        💧
      </motion.span>
    </span>
  )
}

function ClosingSlide() {
  return (
    <section className="slide closing-slide">
      <motion.h2
        className="closing-main"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        11 ה"הכי טובים" הפסידו ל-6 שונים
      </motion.h2>

      {/* האלופות מרימות יחד את גביע העולם */}
      <motion.div
        className="champ-winners"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="champ-cup"
          animate={{ y: [0, -16, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          🏆
        </motion.div>
        <motion.div
          className="champ-team"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          🙌 🐂 🐎 🦎 🐸 🦍 🦇 🙌
        </motion.div>
        <div className="champ-label win">האלופות מרימות את גביע העולם! 🥳</div>
      </motion.div>

      {/* האריות המובסים והעצובים */}
      <motion.div
        className="champ-losers"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className="sad-lions"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CryLion delay={0} />
          <CryLion delay={0.3} />
          <CryLion delay={0.6} />
          <CryLion delay={0.9} />
          <CryLion delay={1.2} />
        </motion.div>
        <div className="champ-label lose">האריות עצובים ומובסים 😢</div>
      </motion.div>

      <motion.p
        className="closing-kicker"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        גם בכיתה שלנו — לכל אחד יש כוח-על משלו 🌟
      </motion.p>
    </section>
  )
}

export const slides = [
  TitleSlide,
  AgendaSlide,
  QuestionSlide,
  LionsSlide,
  MissionSlide,
  GroupsSlide,
  ...animals.map((a) => function Animal() {
    return <AnimalSlide a={a} />
  }),
  TeamSlide,
  ShowdownSlide,
  WhyDiversitySlide,
  ClosingSlide,
]
