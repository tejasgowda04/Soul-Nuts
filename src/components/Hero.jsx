import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { LogoEmblem, ArrowRight, WhatsAppIcon } from './Icons'

const WHEEL_LABELS = [
  ['Almond', '#c99a63'],
  ['Pistachio', '#7e8f60'],
  ['Cashew', '#d4c9a8'],
  ['Walnut', '#6e4a2e'],
  ['Fig', '#8b4a49'],
  ['Date', '#4a2e1c'],
  ['Seed Mix', '#8a7a4d'],
  ['Raisin', '#3c2a1e'],
]

const MARQUEE_WORDS = [
  'THE SOULFUL WAY TO SNACK',
  'PREMIUM GLOBAL IMPORTS',
  'MINDFULLY SOURCED',
  'NO REFINED SUGAR',
  'SNACK CLEAN. FEEL GREAT.',
]

export default function Hero() {
  const wheelRef = useRef(null)
  const stageRef = useRef(null)

  // Pause wheel on hover
  useEffect(() => {
    const stage = stageRef.current
    const wheel = wheelRef.current
    if (!stage || !wheel) return

    const pause = () => wheel.classList.add('paused')
    const resume = () => wheel.classList.remove('paused')

    stage.addEventListener('mouseenter', pause)
    stage.addEventListener('mouseleave', resume)
    return () => {
      stage.removeEventListener('mouseenter', pause)
      stage.removeEventListener('mouseleave', resume)
    }
  }, [])

  const marqueeContent = [...MARQUEE_WORDS, ...MARQUEE_WORDS]

  return (
    <>
      <section
        style={{
          position: 'relative',
          padding: '150px 0 0',
          background: 'var(--ivory)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 32px 90px',
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 40,
            alignItems: 'center',
          }}
          className="hero-inner"
        >
          {/* Copy */}
          <div>
            <span className="eyebrow">Premium Dry Fruits &amp; Nuts</span>
            <h1
              style={{
                fontSize: 'clamp(42px, 5.6vw, 74px)',
                lineHeight: 0.98,
                margin: '20px 0 24px',
              }}
            >
              Every handful
              <br />
              has a{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--rust)' }}>
                heart.
              </em>
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: 'var(--ink-soft)',
                maxWidth: 440,
                marginBottom: 34,
              }}
            >
              Mindfully sourced almonds, pistachios, cashews, seeds &amp; home-made ladoos
              — cleaned, curated, and packed with soul. No shortcuts, no refined sugar,
              just the honest crunch nature intended.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
              <Link to="/shop" className="btn btn-primary">
                <ArrowRight />
                Shop the Harvest
              </Link>
              <a
                href="https://wa.me/918310440354?text=Hi%20Soulnuts%2C%20I%27d%20like%20to%20know%20more%20about%20your%20products!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <WhatsAppIcon />
                Order on WhatsApp
              </a>
            </div>

            {/* Trust row */}
            <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap' }}>
              {['100% Natural', 'No Refined Sugar', 'Hygienic Packaging'].map((t) => (
                <div
                  key={t}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 12.5, fontWeight: 700, color: 'var(--ink-soft)',
                  }}
                >
                  <span
                    style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'var(--sage)', display: 'inline-block',
                    }}
                  />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Wheel */}
          <div
            ref={stageRef}
            style={{
              position: 'relative',
              height: 520,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Dashed rings */}
            {[340, 480].map((size) => (
              <div
                key={size}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  border: '1px dashed rgba(18,36,26,0.18)',
                  borderRadius: '50%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}

            {/* Orbit */}
            <div
              ref={wheelRef}
              className="wheel-orbit"
              style={{ animation: 'spin 46s linear infinite' }}
            >
              {/* Center */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: 'var(--pine)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 30px 60px -20px rgba(31,59,44,.55)',
                  border: '1px solid var(--line-dark)',
                }}
              >
                <LogoEmblem
                  lightMode
                  style={{ width: 78, height: 78 }}
                />
              </div>

              {/* Nodes */}
              {WHEEL_LABELS.map(([label, color], i) => {
                const angle = (360 / WHEEL_LABELS.length) * i
                return (
                  <div
                    key={label}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 74,
                      height: 74,
                      margin: '-37px',
                      transformOrigin: 'center',
                      transform: `rotate(${angle}deg) translate(180px) rotate(-${angle}deg)`,
                    }}
                  >
                    <div
                      className="wheel-node chip"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: color,
                        animation: 'counterspin 46s linear infinite',
                        boxShadow: '0 14px 28px -12px rgba(18,36,26,.35)',
                        border: '2px solid var(--paper)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 9.5,
                          fontWeight: 700,
                          color: 'var(--paper)',
                          letterSpacing: '.02em',
                          textAlign: 'center',
                          lineHeight: 1.15,
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div
          style={{
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            background: 'var(--ivory-2)',
            padding: '14px 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <div className="marquee-track">
            {marqueeContent.map((word, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic',
                  fontSize: 20,
                  fontWeight: 400,
                  color: 'var(--ink-soft)',
                  padding: '0 26px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 26,
                }}
              >
                {word}
                <span style={{ color: 'var(--rust)', fontStyle: 'normal' }}>•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .hero-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
