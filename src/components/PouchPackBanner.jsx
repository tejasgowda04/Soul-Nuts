import { WhatsAppIcon } from './Icons'

export default function PouchPackBanner() {
  const packColors = ['#c99a63', '#7e8f60', '#e9dfc2', '#6e4a2e', '#c6a15b', '#a6541e']

  return (
    <section className="section" style={{ background: 'var(--ivory-2)' }}>
      <div className="wrap">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
            border: '1px solid var(--line)',
            borderRadius: 26,
            padding: '50px 56px',
            background: 'var(--paper)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: 480 }}>
            <span
              style={{
                display: 'inline-block',
                background: 'var(--rust)',
                color: '#fff',
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                padding: '6px 12px',
                borderRadius: 100,
                marginBottom: 16,
                letterSpacing: '.08em',
              }}
            >
              30-DAY DAILY POUCH PACK
            </span>
            <h3 style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: 12 }}>
              One pouch a day, for a healthier you.
            </h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.6 }}>
              Thirty single-serve pouches, portioned and sealed — your entire month of clean snacking, sorted in one box.
            </p>
          </div>

          {/* Coloured pouch pills visual */}
          <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
            {packColors.map((color, idx) => (
              <div
                key={idx}
                style={{
                  width: 20,
                  height: 56,
                  borderRadius: 8,
                  background: color,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
            ))}
          </div>

          <a
            href="https://wa.me/918310440354?text=Hi%20Soulnuts%2C%20I%27d%20like%20to%20order%20the%2030-Day%20Pouch%20Pack!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <WhatsAppIcon />
            Get the Pack
          </a>
        </div>
      </div>
    </section>
  )
}
