import { StarIcon } from './Icons'

export default function Testimonials() {
  const reviews = [
    {
      q: "The pistachios taste like they were roasted yesterday. Genuinely the freshest I've had.",
      n: 'Ananya R.',
      t: 'Verified Buyer',
      c: '#7e8f60',
    },
    {
      q: 'Ordered the ladoo box for Diwali gifting — every single person asked where it was from.',
      n: 'Karthik M.',
      t: 'Verified Buyer',
      c: '#a6541e',
    },
    {
      q: 'Packaging feels premium and the pouches actually stay fresh till the last handful.',
      n: 'Divya S.',
      t: 'Verified Buyer',
      c: '#c6a15b',
    },
  ]

  return (
    <section className="section" id="story">
      <div className="wrap">
        <div className="section-head">
          <h2>Loved, one handful at a time</h2>
          <p>A few words from people who've made Soulnuts part of their routine.</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {reviews.map((r, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 20,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              <div style={{ display: 'flex', gap: 3, color: 'var(--gold)' }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              <q
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic',
                  fontSize: 17,
                  lineHeight: 1.5,
                  fontWeight: 400,
                  color: 'var(--ink)',
                }}
              >
                {r.q}
              </q>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#fff',
                    background: r.c,
                  }}
                >
                  {r.n.split(' ').map((w) => w[0]).join('')}
                </div>
                <div>
                  <span style={{ fontSize: 12.5, fontWeight: 700, display: 'block' }}>{r.n}</span>
                  <small style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{r.t}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
