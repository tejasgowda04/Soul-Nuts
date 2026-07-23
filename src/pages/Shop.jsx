import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import productsData from '../data/products.json'

export default function Shop({ onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('cat') || 'all'

  const handleCategoryChange = (cat) => {
    if (cat === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ cat })
    }
  }

  return (
    <main style={{ padding: '40px 0 80px' }}>
      <div className="wrap" style={{ marginBottom: 40 }}>
        <span className="eyebrow">Full Catalog</span>
        <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '12px 0 16px' }}>
          Shop the Harvest
        </h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 16, maxWidth: 520 }}>
          Explore our complete selection of clean, mindfully sourced nuts, seeds, and home-made ladoos.
        </p>
      </div>

      <ProductGrid
        products={productsData}
        onAddToCart={onAddToCart}
        activeCategory={categoryParam}
        onCategoryChange={handleCategoryChange}
        showFilters={true}
        title="All Pouches"
        subtitle="Sorted and sealed fresh to order."
      />
    </main>
  )
}
