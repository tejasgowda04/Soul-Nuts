import { useNavigate } from 'react-router-dom'
import { ArrowRight } from './Icons'

export default function CategoryGrid() {
  const navigate = useNavigate()

  const categories = [
    {
      title: 'Dry Fruits & Nuts',
      desc: 'Almonds, walnuts, pistachios, cashews, dates, apricots, figs & raisins.',
      color: '#c99a63',
      bg: '#f3e6d1',
      catParam: 'nuts',
    },
    {
      title: 'Seeds & Blends',
      desc: 'Chia, flax, pumpkin, sunflower & curated trail mixes.',
      color: '#8a7a4d',
      bg: '#eaeedd',
      catParam: 'seeds',
    },
    {
      title: 'Soulnuts Ladoos',
      desc: 'Home-made, hand-rolled, without a grain of refined sugar.',
      color: '#7a4a24',
      bg: '#f1ddd0',
      catParam: 'ladoos',
    },
    {
      title: '30-Day Pouch Pack',
      desc: 'One portioned pouch a day — a full month of clean snacking.',
      color: '#7e8f60',
      bg: '#e7ecdc',
      catParam: 'all',
    },
  ]

  return (
    <section className="section" id="categories">
      <div className="wrap">
        <div className="section-head">
          <h2>Explore the harvest board</h2>
          <p>Four ways to snack soulfully — from raw nuts to ready-made comfort.</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 22,
          }}
        >
          {categories.map((c, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/shop?cat=${c.catParam}`)}
              className="cat-card"
              style={{
                position: 'relative',
                borderRadius: 22,
                padding: '30px 24px',
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflow: 'hidden',
                isolation: 'isolate',
                transition: 'transform .5s var(--ease)',
                border: '1px solid var(--line)',
                background: c.bg,
                cursor: 'pointer',
              }}
            >
              {/* Organic blob */}
              <div
                style={{
                  position: 'absolute',
                  top: -30,
                  right: -30,
                  width: 150,
                  height: 150,
                  borderRadius: '58% 42% 63% 37% / 45% 55% 45% 55%',
                  opacity: 0.35,
                  zIndex: -1,
                  filter: 'blur(2px)',
                  background: c.color,
                }}
              />

              <h3 style={{ fontSize: 21, marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 14 }}>
                {c.desc}
              </p>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--rust)',
                }}
                className="cat-link-label"
              >
                Shop category <ArrowRight width={13} height={13} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cat-card:hover {
          transform: translateY(-8px);
        }
        .cat-card:hover .cat-link-label svg {
          transform: translateX(4px);
        }
        .cat-link-label svg {
          transition: transform 0.3s var(--ease);
        }
      `}</style>
    </section>
  )
}
