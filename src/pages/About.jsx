import { Link } from 'react-router-dom'
import PromiseStrip from '../components/PromiseStrip'
import { ArrowRight, WhatsAppIcon } from '../components/Icons'

export default function About() {
  return (
    <main style={{ padding: '40px 0 80px' }}>
      <div className="wrap">
        {/* Header */}
        <div style={{ maxWidth: 720, marginBottom: 60 }}>
          <span className="eyebrow">Our Philosophy</span>
          <h1 style={{ fontSize: 'clamp(38px, 5vw, 64px)', lineHeight: 1.05, margin: '16px 0 24px' }}>
            The story behind every <em>soulful</em> handful.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
            Soulnuts was born out of a simple, uncompromising idea: snacking shouldn't mean sacrificing purity, quality, or joy.
          </p>
        </div>

        {/* Brand story content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 40,
            marginBottom: 80,
          }}
        >
          <div
            style={{
              background: 'var(--paper)',
              padding: 40,
              borderRadius: 24,
              border: '1px solid var(--line)',
            }}
          >
            <h3 style={{ fontSize: 24, marginBottom: 16 }}>Mindfully Sourced</h3>
            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.65, fontSize: 14.5 }}>
              From Californian almond groves to Kashmiri walnut orchards and Iranian pistachio fields, we source directly from growers who share our respect for the land. Every batch is graded for size, crunch, and natural oils before reaching our facility in Mysuru.
            </p>
          </div>

          <div
            style={{
              background: 'var(--paper)',
              padding: 40,
              borderRadius: 24,
              border: '1px solid var(--line)',
            }}
          >
            <h3 style={{ fontSize: 24, marginBottom: 16 }}>No Refined Sugar</h3>
            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.65, fontSize: 14.5 }}>
              Our home-made ladoos are bound naturally using premium dates, figs, and slow-roasted nut oils. We never add artificial sweetners, preservatives, or palm oil. What you taste is pure, unadulterated nature.
            </p>
          </div>
        </div>
      </div>

      <PromiseStrip />

      <div className="wrap" style={{ marginTop: 80, textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, marginBottom: 16 }}>Ready to snack clean?</h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: 16, marginBottom: 32 }}>
          Explore our seasonal harvest or talk to us directly on WhatsApp.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/shop" className="btn btn-primary">
            <ArrowRight />
            Browse Shop
          </Link>
          <a
            href="https://wa.me/918310440354"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <WhatsAppIcon />
            Chat with Us
          </a>
        </div>
      </div>
    </main>
  )
}
