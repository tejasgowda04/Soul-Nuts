import { WhatsAppIcon } from './Icons'

export default function LadooSpotlight() {
  const ladooPositions = [
    [10, 20, 120],
    [130, 60, 150],
    [40, 180, 110],
    [190, 220, 100],
    [220, 40, 90],
    [70, 270, 90],
  ]

  return (
    <section className="section" id="ladoos" style={{ background: 'var(--pine)', color: 'var(--ivory)', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
        
        {/* Ladoo spheres art */}
        <div style={{ position: 'relative', height: 380, width: '100%', maxWidth: 450, margin: '0 auto' }}>
          {ladooPositions.map(([left, top, size], idx) => {
            const isAlt = idx % 2 === 0
            const primaryColor = isAlt ? '#c46a2c' : '#a6541e'
            const secondaryColor = isAlt ? '#a6541e' : '#8c4419'
            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left,
                  top,
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 30%, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: 'inset -10px -14px 22px rgba(0,0,0,.28), 0 20px 40px -16px rgba(0,0,0,.5)',
                }}
              />
            )
          })}
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
