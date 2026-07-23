import { useState } from 'react'

export default function Newsletter({ onSubscribe }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    if (onSubscribe) {
      onSubscribe(email)
    }
    setEmail('')
  }

  return (
    <section className="section" style={{ background: 'var(--ink)', color: 'var(--ivory)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
          Stay in the Loop
        </span>
        <h2 style={{ fontSize: 'clamp(32px, 4.4vw, 52px)', margin: '20px 0 16px' }}>
          Something{' '}
          <em style={{ color: 'var(--gold-soft)', fontStyle: 'italic', fontWeight: 400 }}>
            soulful
          </em>
          <br />
          is always on the way.
        </h2>
        <p style={{ color: 'rgba(248,243,230,.6)', fontSize: 15, marginBottom: 34 }}>
          New blends, festive gift boxes and early access — straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            maxWidth: 420,
            margin: '0 auto',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="email"
            placeholder="you@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            style={{
              flex: 1,
              minWidth: 220,
              padding: '15px 20px',
              borderRadius: 100,
              border: '1px solid var(--line-dark)',
              background: 'rgba(248,243,230,.06)',
              color: 'var(--ivory)',
              fontFamily: 'inherit',
              fontSize: 13.5,
            }}
          />
          <button type="submit" className="btn btn-primary">
            Notify Me
          </button>
        </form>

        <p style={{ marginTop: 14, fontSize: 11.5, color: 'rgba(248,243,230,.4)' }}>
          No spam, ever. Just soulful updates.
        </p>
      </div>
    </section>
  )
}
