import { WhatsAppIcon } from './Icons'

export default function LadooSpotlight() {
  const ingredients = [
    { name: 'Kashmiri Walnuts', origin: 'Halves & Bits', color: '#c6a15b' },
    { name: 'Omani Dates', origin: 'Natural Binder', color: '#a6541e' },
    { name: 'Iranian Pistachio', origin: 'Slow Roasted', color: '#7e8f60' },
    { name: 'Californian Almonds', origin: 'Golden Crunch', color: '#c99a63' },
  ]

  return (
    <section className="section" id="ladoos" style={{ background: 'var(--pine)', color: 'var(--ivory)', position: 'relative', overflow: 'hidden' }}>
      {/* Background golden glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198,161,91,0.12) 0%, rgba(31,59,44,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 50, alignItems: 'center' }}>
        
        {/* Replacement Showcase Card replacing abstract 3D balls */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 460, margin: '0 auto' }}>
          <div
            style={{
              background: 'linear-gradient(145deg, rgba(39,71,50,0.9), rgba(18,36,26,0.95))',
              border: '1.5px solid rgba(198,161,91,0.35)',
              borderRadius: 28,
              padding: '36px 30px',
              boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(248,243,230,0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '.14em',
                  color: 'var(--gold-soft)',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(198,161,91,0.3)',
                  padding: '5px 12px',
                  borderRadius: 100,
                  background: 'rgba(198,161,91,0.06)',
                }}
              >
                Artisanal Batch #04
              </span>
              <img src="/logo.png" alt="Soulnuts" style={{ width: 32, height: 32, borderRadius: '50%' }} />
            </div>

            {/* Title */}
            <h3 style={{ fontSize: 24, fontFamily: "'Fraunces', serif", color: 'var(--ivory)', marginBottom: 8 }}>
              Pure Ingredients, Zero Shortcuts
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(248,243,230,0.65)', lineHeight: 1.5, marginBottom: 24 }}>
              Every box of Soulnuts Ladoos is crafted by hand with carefully portioned, slow-roasted nuts bound naturally.
            </p>

            {/* Ingredient Chips Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(248,243,230,0.04)',
                    border: '1px solid rgba(248,243,230,0.08)',
                    borderRadius: 16,
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ivory)' }}>
                    {ing.name}
                  </span>
                  <span style={{ fontSize: 10.5, fontFamily: "'Space Mono', monospace", color: ing.color }}>
                    {ing.origin}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom highlight pill */}
            <div
              style={{
                background: 'rgba(166,84,30,0.18)',
                border: '1px dashed var(--rust)',
                borderRadius: 14,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ivory)' }}>
                100% Refined Sugar Free
              </span>
              <span style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: 'var(--gold-soft)' }}>
                Bound with Dates
              </span>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
            Home-Made · Small Batch
          </span>
          <h2 style={{ fontSize: 'clamp(30px,3.6vw,44px)', margin: '18px 0 20px', color: 'var(--ivory)' }}>
            Soulnuts Ladoos, rolled by hand.
          </h2>
          <p style={{ color: 'rgba(248,243,230,.72)', fontSize: 15, lineHeight: 1.7, maxWidth: 460, marginBottom: 26 }}>
            Dates, almonds, walnuts and pistachios, slow-roasted and bound without a grain of refined sugar. A treat you can actually feel good about — made the way your grandmother would approve of.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10.5, padding: '8px 14px', borderRadius: 100, border: '1px solid var(--line-dark)', color: 'var(--gold-soft)' }}>
              No Refined Sugar
            </span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10.5, padding: '8px 14px', borderRadius: 100, border: '1px solid var(--line-dark)', color: 'var(--gold-soft)' }}>
              Crafted with Love
            </span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10.5, padding: '8px 14px', borderRadius: 100, border: '1px solid var(--line-dark)', color: 'var(--gold-soft)' }}>
              Ready to Dispatch
            </span>
          </div>

          <a
            href="https://wa.me/918310440354?text=Hi%20Soulnuts%2C%20I%27d%20like%20to%20order%20the%20Ladoos%20box!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost-light"
          >
            <WhatsAppIcon />
            Order Ladoos on WhatsApp
          </a>
        </div>

      </div>
    </section>
  )
}
