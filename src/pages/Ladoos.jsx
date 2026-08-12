import { useState, useEffect } from 'react'
import LadooSpotlight from '../components/LadooSpotlight'
import ProductGrid from '../components/ProductGrid'
import { fetchProducts } from '../lib/api'

export default function Ladoos({ onAddToCart }) {
  const [ladoosProducts, setLadoosProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLadoos()
  }, [])

  const loadLadoos = async () => {
    try {
      const data = await fetchProducts({ activeOnly: true, categorySlug: 'ladoos' })
      setLadoosProducts(data)
    } catch (e) {
      console.error('Error fetching ladoos:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ paddingBottom: 80 }}>
      {/* Top Banner */}
      <div className="wrap" style={{ padding: '40px 32px 30px' }}>
        <span className="eyebrow">Home-Made &amp; Hand-Rolled</span>
        <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '12px 0 16px' }}>
          Soulnuts Ladoos
        </h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 16, maxWidth: 520 }}>
          Crafted in small batches with dates, nuts, seeds, and slow-roasted dry fruits — zero refined sugar.
        </p>
      </div>

      <LadooSpotlight />

      <div style={{ marginTop: 60 }}>
        <ProductGrid
          products={ladoosProducts}
          loading={loading}
          onAddToCart={onAddToCart}
          showFilters={false}
          title="Order Ladoos"
          subtitle="Sealed boxes ready for home snacking or festive gifting."
        />
      </div>
    </main>
  )
}
