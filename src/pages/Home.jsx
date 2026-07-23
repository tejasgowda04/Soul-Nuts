import Hero from '../components/Hero'
import PromiseStrip from '../components/PromiseStrip'
import CategoryGrid from '../components/CategoryGrid'
import ProductGrid from '../components/ProductGrid'
import LadooSpotlight from '../components/LadooSpotlight'
import PouchPackBanner from '../components/PouchPackBanner'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import productsData from '../data/products.json'

export default function Home({ onAddToCart, onSubscribe }) {
  return (
    <main>
      <Hero />
      <PromiseStrip />
      <CategoryGrid />
      <ProductGrid
        products={productsData}
        onAddToCart={onAddToCart}
        title="Best of the board"
        subtitle="Our most-loved pouches, weighed and sealed the day they ship."
      />
      <LadooSpotlight />
      <PouchPackBanner />
      <Testimonials />
      <Newsletter onSubscribe={onSubscribe} />
    </main>
  )
}
