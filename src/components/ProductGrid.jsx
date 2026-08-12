import ProductCard from './ProductCard'

export default function ProductGrid({
  products = [],
  loading = false,
  onAddToCart,
  title = "Best of the board",
  subtitle = "Our most-loved pouches, weighed and sealed the day they ship."
}) {
  return (
    <section className="section" id="shop" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        {loading ? (
          <div className="product-grid-items">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                style={{
                  height: 320,
                  borderRadius: 20,
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  opacity: 0.5,
                  animation: 'pulse 1.5s infinite'
                }}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              background: 'var(--paper)',
              borderRadius: 20,
              border: '1px dashed var(--line)'
            }}
          >
            <h3 style={{ fontSize: 20, color: 'var(--pine)' }}>No products found</h3>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6 }}>
              There are currently no active products in the harvest.
            </p>
          </div>
        ) : (
          <div className="product-grid-items">
            {products.map((product) => (
              <ProductCard
                key={product.id || product.slug}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .product-grid-items {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @media (max-width: 1100px) {
          .product-grid-items {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .product-grid-items {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 380px) {
          .product-grid-items {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }
      `}</style>
    </section>
  )
}
