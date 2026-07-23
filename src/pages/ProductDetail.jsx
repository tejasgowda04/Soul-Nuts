import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react'
import productsData from '../data/products.json'
import { getPouchGradient, generateGrainDots } from '../lib/whatsapp'
import { LogoEmblem, ArrowRight, CheckIcon } from '../components/Icons'
import ProductCard from '../components/ProductCard'

export default function ProductDetail({ onAddToCart }) {
  const { slug } = useParams()
  const navigate = useNavigate()

  const product = productsData.find((p) => p.id === slug)

  if (!product) {
    return (
      <div className="wrap" style={{ padding: '120px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p style={{ margin: '16px 0 24px', color: 'var(--ink-soft)' }}>
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    )
  }

  // Weight option selection
  const options = product.weightOptions || [{ label: product.unit, price: product.price }]
  const [selectedOption, setSelectedOption] = useState(options[0])

  // Related products
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const bgGradient = getPouchGradient(product.colorKey)
  const grainDots = generateGrainDots(product.colorKey)

  const handleAdd = () => {
    onAddToCart(product, selectedOption.label, selectedOption.price)
  }

  return (
    <main style={{ padding: '40px 0 100px' }}>
      <div className="wrap">
        {/* Breadcrumbs */}
        <div
          style={{
            fontSize: 13,
            color: 'var(--ink-soft)',
            marginBottom: 32,
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <Link to="/" style={{ textDecoration: 'underline' }}>
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" style={{ textDecoration: 'underline' }}>
            Shop
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* Detail grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 50,
            alignItems: 'start',
            marginBottom: 90,
          }}
        >
          {/* Large Pouch Visual */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '1 / 1.05',
              borderRadius: 26,
              overflow: 'hidden',
              background: bgGradient,
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--line)',
            }}
          >
            {/* Zip line */}
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                right: 20,
                height: 8,
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.4)',
              }}
            />

            {/* Label */}
            <div
              style={{
                position: 'absolute',
                top: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--paper)',
                borderRadius: 14,
                padding: '12px 24px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
                boxShadow: '0 12px 24px -8px rgba(0,0,0,.25)',
                zIndex: 3,
              }}
            >
              <LogoEmblem style={{ width: 30, height: 30 }} />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9,
                  letterSpacing: '.14em',
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
          </div>

          {/* Product info & purchase selector */}
          <div>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: 'var(--sage)',
              }}
            >
              {product.category === 'ladoos'
                ? 'Home-Made Ladoos'
                : product.category === 'seeds'
                ? 'Seeds & Blends'
                : 'Dry Fruits & Nuts'}
            </span>

            <h1
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1.1,
                margin: '12px 0 16px',
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 24,
                fontWeight: 700,
                color: 'var(--rust)',
                marginBottom: 20,
              }}
            >
              ₹{selectedOption.price}{' '}
              <small
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'var(--ink-soft)',
                }}
              >
                / {selectedOption.label}
              </small>
            </div>

            <p
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: 'var(--ink-soft)',
                marginBottom: 32,
              }}
            >
              {product.description}
            </p>

            {/* Weight Options */}
            {options.length > 1 && (
              <div style={{ marginBottom: 32 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '.1em',
                    marginBottom: 10,
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  Select Pack Weight
                </label>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {options.map((opt) => {
                    const isSelected = selectedOption.label === opt.label
                    return (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedOption(opt)}
                        style={{
                          padding: '10px 18px',
                          borderRadius: 100,
                          fontSize: 13,
                          fontWeight: 700,
                          border: isSelected
                            ? '2px solid var(--rust)'
                            : '1.4px solid var(--line)',
                          background: isSelected ? 'var(--paper)' : 'transparent',
                          color: 'var(--ink)',
                          transition: 'all 0.2s',
                        }}
                      >
                        {opt.label} — ₹{opt.price}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Add to Bag CTA */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
              <button
                onClick={handleAdd}
                className="btn btn-primary"
                style={{ padding: '16px 36px', fontSize: 15 }}
              >
                Add to Bag — ₹{selectedOption.price}
              </button>
            </div>

            {/* Guarantees */}
            <div
              style={{
                borderTop: '1px solid var(--line)',
                paddingTop: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                fontSize: 13,
                color: 'var(--ink-soft)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: 'var(--sage)' }}>
                  <CheckIcon />
                </span>
                <span>Sealed fresh on day of dispatch</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: 'var(--sage)' }}>
                  <CheckIcon />
                </span>
                <span>No refined sugar, preservatives, or artificial additives</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: 'var(--sage)' }}>
                  <CheckIcon />
                </span>
                <span>Order confirmed &amp; tracked via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="section-head">
              <h2>You might also love</h2>
              <p>More soulful picks from the same harvest category.</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 24,
              }}
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
