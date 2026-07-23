import { Link } from 'react-router-dom'
import { ArrowRight, WhatsAppIcon } from './Icons'

const PRODUCT_CARDS = [
  { name: 'Almonds', color: '#c99a63', accent: '#e6c896', emoji: '🌰' },
  { name: 'Pistachios', color: '#7e8f60', accent: '#a9bb85', emoji: '🥜' },
  { name: 'Cashews', color: '#d4c9a8', accent: '#f5efdd', emoji: '🥜' },
  { name: 'Walnuts', color: '#6e4a2e', accent: '#96684a', emoji: '🌰' },
  { name: 'Figs', color: '#8b4a49', accent: '#c47a6c', emoji: '🫐' },
  { name: 'Dates', color: '#4a2e1c', accent: '#7a5a3c', emoji: '🌴' },
]

const MARQUEE_WORDS = [
  'THE SOULFUL WAY TO SNACK',
  'PREMIUM GLOBAL IMPORTS',
  'MINDFULLY SOURCED',
  'NO REFINED SUGAR',
  'SNACK CLEAN. FEEL GREAT.',
]

export default function Hero() {
  const marqueeContent = [...MARQUEE_WORDS, ...MARQUEE_WORDS]

  return (
    <>
      <section
        style={{
          position: 'relative',
          padding: '140px 0 0',
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

          {/* Product Showcase — Floating cards with logo center */}
          <div className="hero-showcase">
            {/* Central logo */}
            <div className="hero-logo-center">
              <img
                src="/logo.png"
                alt="Soulnuts Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '50%',
                }}
              />
            </div>

            {/* Floating product mini-cards */}
            {PRODUCT_CARDS.map((card, i) => (
              <div
                key={card.name}
                className={`hero-float-card hero-float-card-${i}`}
                style={{
                  background: `linear-gradient(145deg, ${card.color}, ${card.accent})`,
                }}
              >
                <span className="hero-float-emoji">{card.emoji}</span>
                <span className="hero-float-label">{card.name}</span>
              </div>
            ))}

            {/* Decorative dashed rings */}
            <div className="hero-ring hero-ring-1" />
            <div className="hero-ring hero-ring-2" />
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
        .hero-showcase {
          position: relative;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-logo-center {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: var(--paper);
          border: 2px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 24px 60px -20px rgba(31,59,44,.4), 0 0 24px rgba(198,161,91,0.2);
          overflow: hidden;
          padding: 12px;
          z-index: 5;
          position: relative;
        }

        .hero-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(18,36,26,0.14);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .hero-ring-1 { width: 300px; height: 300px; }
        .hero-ring-2 { width: 440px; height: 440px; }

        .hero-float-card {
          position: absolute;
          width: 90px;
          height: 90px;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          box-shadow: 0 16px 32px -14px rgba(18,36,26,0.45);
          border: 2px solid rgba(255,255,255,0.3);
          z-index: 4;
          animation: heroFloat 6s ease-in-out infinite;
        }

        .hero-float-emoji {
          font-size: 24px;
          line-height: 1;
        }

        .hero-float-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          color: var(--paper);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Position each card around the circle */
        .hero-float-card-0 { top: 8%; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
        .hero-float-card-1 { top: 22%; right: 4%; animation-delay: -1s; }
        .hero-float-card-2 { bottom: 22%; right: 4%; animation-delay: -2s; }
        .hero-float-card-3 { bottom: 8%; left: 50%; transform: translateX(-50%); animation-delay: -3s; }
        .hero-float-card-4 { bottom: 22%; left: 4%; animation-delay: -4s; }
        .hero-float-card-5 { top: 22%; left: 4%; animation-delay: -5s; }

        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        /* Override for cards that also have translateX */
        .hero-float-card-0, .hero-float-card-3 {
          animation-name: heroFloatCentered;
        }
        @keyframes heroFloatCentered {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        @media (max-width: 980px) {
          .hero-inner {
            grid-template-columns: 1fr !important;
          }
          .hero-showcase {
            height: 340px;
          }
          .hero-logo-center {
            width: 100px;
            height: 100px;
            padding: 10px;
          }
          .hero-float-card {
            width: 70px;
            height: 70px;
            border-radius: 14px;
          }
          .hero-float-emoji { font-size: 20px; }
          .hero-float-label { font-size: 7.5px; }
          .hero-ring-1 { width: 220px; height: 220px; }
          .hero-ring-2 { width: 320px; height: 320px; }
        }

        @media (max-width: 480px) {
          .hero-showcase {
            height: 280px;
          }
          .hero-logo-center {
            width: 80px;
            height: 80px;
            padding: 8px;
          }
          .hero-float-card {
            width: 60px;
            height: 60px;
            border-radius: 12px;
          }
          .hero-float-emoji { font-size: 17px; }
          .hero-float-label { font-size: 6.5px; }
          .hero-ring-1 { width: 180px; height: 180px; }
          .hero-ring-2 { width: 260px; height: 260px; }
        }
      `}</style>
    </>
  )
}
