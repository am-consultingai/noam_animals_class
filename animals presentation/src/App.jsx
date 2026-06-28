import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { slides } from './slides.jsx'

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
}

export default function App() {
  const [[index, dir], setState] = useState([0, 0])

  const go = useCallback((d) => {
    setState(([i]) => {
      const n = i + d
      if (n < 0 || n >= slides.length) return [i, d]
      return [n, d]
    })
  }, [])

  const jump = useCallback((n) => {
    setState(([i]) => [n, n > i ? 1 : -1])
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      // ימין-לשמאל: חץ שמאלה = הבא, חץ ימינה = הקודם
      if (['ArrowLeft', ' ', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        go(1)
      } else if (['ArrowRight', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'Home') {
        jump(0)
      } else if (e.key === 'End') {
        jump(slides.length - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, jump])

  const Current = slides[index]

  return (
    <div className="deck">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={index}
          className="slide-wrap"
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <Current />
        </motion.div>
      </AnimatePresence>

      <div className="nav">
        <button className="nav-btn" onClick={() => go(-1)} disabled={index === 0}>
          הקודם
        </button>
        <span className="counter">
          {index + 1} / {slides.length}
        </span>
        <button
          className="nav-btn primary"
          onClick={() => go(1)}
          disabled={index === slides.length - 1}
        >
          הבא
        </button>
      </div>

      <div className="dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => jump(i)}
            aria-label={`שקופית ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
