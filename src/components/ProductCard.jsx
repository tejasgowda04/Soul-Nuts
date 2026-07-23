import { Link } from 'react-router-dom'
import { getPouchGradient, generateGrainDots } from '../lib/whatsapp'
import { LogoEmblem } from './Icons'

export default function ProductCard({ product, onAddToCart }) {
  const bgGradient = getPouchGradient(product.colorKey)
  const grainDots = generateGrainDots(product.colorKey)

  const catTag =
    product.category === 'ladoos'
      ? 'Home-Made'
      : product.category === 'seeds'
      ? 'Seeds & Blends'
      : 'Dry Fruits & Nuts'

  return (
    <div
      className="p-card"
      style={{
        background: 'var(--paper)',
        borderRadius: 20,
        border: '1px solid var(--line)',
        overflow: 'hidden',
        transition: 'transform .45s var(--ease), box-shadow .45s var(--ease)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Pouch visual */}
      <Link
        to={`/shop/${product.id}`}
        className="pouch"
        style={{
          position: 'relative',
          aspectRatio: '1 / 1.05',
          overflow: 'hidden',
          background: bgGradient,
          display: 'block',
        }}
      >
        {/* Zip line */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            right: 14,
            height: 6,
            borderRadius: 6,
            background: 'rgba(255, 255, 255, 0.35)',
          }}
        />

        {/* Label */}
        <div
          style={{
            position: 'absolute',
            top: 26,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--paper)',
            borderRadius: 10,
            padding: '8px 14px 7px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            boxShadow: '0 8px 18px -8px rgba(0, 0, 0, 0.25)',
            zIndex: 3,
          }}
        >
          <LogoEmblem style={{ width: 20, height: 20 }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 6.5,
              letterSpacing: '.1em',
              color: 'var(--pine)',
              fontWeight: 700,
            }}
          >
            SOULNUTS
          </span>
        </div>

        {/* Grain dots */}
        {grainDots.map((dot, idx) => (
          <span key={idx} className="grain-dot" style={dot} />
        ))}
      </Link>

      {/* Body */}
      <div
        style={{
          padding: '18px 18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          flex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9.5,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--sage)',
          }}
        >
          {catTag}
        </span>

        <Link to={`/shop/${product.id}`}>
          <h4
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: 'var(--ink)',
              transition: 'color 0.2s',
            }}
            className="hover:text-rust"
          >
            {product.name}
          </h4>
        </Link>

        <p
          style={{
            fontSize: 12,
            color: 'var(--ink-soft)',
            lineHeight: 1.5,
            minHeight: 32,
          }}
        >
          {product.description}
        </p>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: 10,
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            ₹{product.price}{' '}
            <small
              style={{
                fontWeight: 400,
                color: 'var(--ink-soft)',
                fontSize: 10.5,
              }}
            >
              / {product.unit}
            </small>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to bag`}
            className="add-btn"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--ink)',
              color: 'var(--ivory)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all .3s var(--ease)',
              flex: 'none',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .p-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow);
        }
        .add-btn:hover {
          background: var(--rust) !important;
          transform: rotate(90deg);
        }
      `}</style>
    </div>
  )
}
