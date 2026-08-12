import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import PromiseStrip from '../components/PromiseStrip'
import ProductGrid from '../components/ProductGrid'
import LadooSpotlight from '../components/LadooSpotlight'
import PouchPackBanner from '../components/PouchPackBanner'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import { fetchProducts } from '../lib/api'

export default function Home({ onAddToCart, onSubscribe }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await fetchProducts({ activeOnly: true })
      setProducts(data)
    } catch (e) {
      console.error('Error fetching homepage products:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Hero />
      <PromiseStrip />
      <ProductGrid
        products={products}
        loading={loading}
        onAddToCart={onAddToCart}
        title="Best of the harvest"
        subtitle="Our most-loved pouches, weighed and sealed the day they ship."
      />
      <LadooSpotlight />
      <PouchPackBanner />
      <Testimonials />
      <Newsletter onSubscribe={onSubscribe} />
    </main>
  )
}
