import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from './context/CartContext'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Ladoos from './pages/Ladoos'
import About from './pages/About'
import Contact from './pages/Contact'

function MainLayout() {
  const { addItem } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [isToastVisible, setIsToastVisible] = useState(false)

  const showToast = (msg) => {
    setToastMsg(msg)
    setIsToastVisible(true)
    setTimeout(() => {
      setIsToastVisible(false)
    }, 2400)
  }

  const handleAddToCart = (product, weightLabel, price) => {
    addItem(product, weightLabel, price)
    showToast(`${product.name} added to bag`)
    setIsCartOpen(true)
  }

  const handleNewsletterSubscribe = () => {
    showToast("You're on the list — something soulful is coming!")
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav onCartOpen={() => setIsCartOpen(true)} />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onAddToCart={handleAddToCart}
                onSubscribe={handleNewsletterSubscribe}
              />
            }
          />
          <Route
            path="/shop"
            element={<Shop onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/shop/:slug"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/ladoos"
            element={<Ladoos onAddToCart={handleAddToCart} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/contact"
            element={<Contact onSubscribe={handleNewsletterSubscribe} />}
          />
        </Routes>
      </div>

      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toast message={toastMsg} isVisible={isToastVisible} />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <MainLayout />
      </Router>
    </CartProvider>
  )
}
