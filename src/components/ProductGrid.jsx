import { useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({
  products,
  onAddToCart,
  activeCategory: propCategory,
  onCategoryChange,
  showFilters = true,
  title = "Best of the board",
  subtitle = "Our most-loved pouches, weighed and sealed the day they ship."
}) {
  const [internalCategory, setInternalCategory] = useState('all')

  const activeCategory = propCategory !== undefined ? propCategory : internalCategory

  const handleCategoryClick = (cat) => {
    if (onCategoryChange) {
      onCategoryChange(cat)
    } else {
      setInternalCategory(cat)
    }
  }

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'nuts', label: 'Dry Fruits & Nuts' },
    { id: 'seeds', label: 'Seeds & Blends' },
    { id: 'ladoos', label: 'Ladoos' },
  ]

  return (
    <section className="section" id="shop" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        {showFilters && (
          <div
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: 40,
              flexWrap: 'wrap',
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryClick(tab.id)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 100,
                    fontSize: 12.5,
                    fontWeight: 700,
                    border: '1.4px solid var(--line)',
                    background: isActive ? 'var(--ink)' : 'var(--paper)',
                    color: isActive ? 'var(--ivory)' : 'var(--ink)',
                    borderColor: isActive ? 'var(--ink)' : 'var(--line)',
                    transition: 'all .3s var(--ease)',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        )}

        <div className="product-grid-items">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>

      <style>{`
        .product-grid-items {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
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
