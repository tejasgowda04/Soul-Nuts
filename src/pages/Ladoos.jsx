import LadooSpotlight from '../components/LadooSpotlight'
import ProductGrid from '../components/ProductGrid'
import productsData from '../data/products.json'

export default function Ladoos({ onAddToCart }) {
  const ladoosProducts = productsData.filter((p) => p.category === 'ladoos')

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
          onAddToCart={onAddToCart}
          showFilters={false}
          title="Order Ladoos"
          subtitle="Sealed boxes ready for home snacking or festive gifting."
        />
      </div>
    </main>
  )
}
