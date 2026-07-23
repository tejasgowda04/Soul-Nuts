export default function PromiseStrip() {
  const promises = [
    {
      title: 'Premium Quality',
      desc: 'Hand-picked lots, graded for size and freshness before they ever reach a pouch.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4l-6.3 4.4 2.3-7.2-6-4.4h7.6z" />
        </svg>
      ),
    },
    {
      title: '100% Natural',
      desc: 'Nothing added, nothing hidden — just the ingredient, exactly as harvested.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C7 6 4 10 4 14a8 8 0 0016 0c0-4-3-8-8-12z" />
        </svg>
      ),
    },
    {
      title: 'Healthy & Wholesome',
      desc: 'Everyday nutrition built for real routines, from morning oats to evening cravings.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 10-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
        </svg>
      ),
    },
    {
      title: 'Delivered with Care',
      desc: 'Sealed fresh, packed gently, and out the door on the day you order.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="8" width="14" height="10" rx="1.5" />
          <path d="M17 11h2.5l1.5 3v4h-4" />
          <circle cx="7.5" cy="19.5" r="1.6" />
          <circle cx="17.5" cy="19.5" r="1.6" />
        </svg>
      ),
    },
  ]

  return (
    <section style={{ background: 'var(--pine)', padding: '56px 0', color: 'var(--ivory)' }}>
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 30,
          }}
        >
          {promises.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                padding: '0 10px',
                borderLeft: idx === 0 ? 'none' : '1px solid var(--line-dark)',
              }}
            >
              <div style={{ width: 30, height: 30, color: 'var(--gold-soft)' }}>
                {item.icon}
              </div>
              <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, margin: 0 }}>
                {item.title}
              </h4>
              <p style={{ fontSize: 12.5, color: 'rgba(248,243,230,.65)', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
