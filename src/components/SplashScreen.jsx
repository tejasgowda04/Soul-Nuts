import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Total animation time before fade out starts
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2600)

    // Complete callback after exit transition finishes
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 3300)

    return () => {
      clearTimeout(timer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'var(--pine)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Subtle radial golden glow background */}
          <div
            style={{
              position: 'absolute',
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(198,161,91,0.15) 0%, rgba(31,59,44,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              padding: 24,
            }}
          >
            {/* Outer animated gold ring around logo */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: 140,
                height: 140,
                borderRadius: '50%',
                border: '1.5px solid var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.35), 0 0 30px rgba(198,161,91,0.25)',
                background: 'var(--paper)',
                marginBottom: 26,
                padding: 14,
                overflow: 'hidden',
              }}
            >
              {/* Logo Image */}
              <motion.img
                src="/logo.png"
                alt="Soulnuts Logo"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '50%',
                }}
              />
            </motion.div>

            {/* Brand Name Reveal Animation */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center' }}
            >
              <h1
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'clamp(38px, 6vw, 58px)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--ivory)',
                  margin: 0,
                  lineHeight: 1.1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                {'Soulnuts'.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.06,
                      ease: 'easeOut',
                    }}
                    style={{
                      display: 'inline-block',
                      color: index >= 4 ? 'var(--gold-soft)' : 'var(--ivory)',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

              {/* Gold line expanding */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 140, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4, ease: 'easeInOut' }}
                style={{
                  height: 1.5,
                  background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                  margin: '14px auto',
                }}
              />

              {/* Tagline Reveal */}
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 0.85, letterSpacing: '0.24em' }}
                transition={{ duration: 0.9, delay: 1.6, ease: 'easeOut' }}
                style={{
                  display: 'block',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10.5,
                  textTransform: 'uppercase',
                  color: 'var(--ivory)',
                  fontWeight: 400,
                }}
              >
                The Soulful Way to Snack
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
