import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductBySlug, fetchProducts } from '../lib/api'
import { getPouchGradient, generateGrainDots, buildWhatsAppUrl } from '../lib/whatsapp'
import { LogoEmblem, CheckIcon, WhatsAppIcon } from '../components/Icons'
import ProductCard from '../components/ProductCard'

export default function ProductDetail({ onAddToCart }) {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedImage, setSelectedImage] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    loadProductDetails()
  }, [slug])

  const loadProductDetails = async () => {
    setLoading(true)
    try {
      const prod = await fetchProductBySlug(slug)
      setProduct(prod)

      if (prod) {
        // Set main image or gallery first image
        const initialImg = prod.main_image || (prod.images && prod.images[0]) || ''
        setSelectedImage(initialImg)

        // Set weight option
        const opts =
          prod.weight_options && prod.weight_options.length > 0
            ? prod.weight_options
            : [{ label: prod.unit || '250g', price: prod.price }]
        setSelectedOption(opts[0])

        // Fetch related products
        const catSlug = prod.category_slug || prod.category
        const allProds = await fetchProducts({ activeOnly: true, categorySlug: catSlug })
        setRelatedProducts(allProds.filter((p) => (p.slug || p.id) !== (prod.slug || prod.id)).slice(0, 4))
      }
    } catch (e) {
      console.error('Error loading product details:', e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="wrap" style={{ padding: '120px 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--ink-soft)', fontSize: 16 }}>Loading product details...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="wrap" style={{ padding: '120px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p style={{ margin: '16px 0 24px', color: 'var(--ink-soft)' }}>
          The product you're looking for doesn't exist or has been removed from the harvest.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    )
  }

  const colorKey = product.color_key || product.colorKey || 'almond'
  const bgGradient = getPouchGradient(colorKey)
  const grainDots = generateGrainDots(colorKey)
  const options = product.weight_options && product.weight_options.length > 0
    ? product.weight_options
    : [{ label: product.unit || '250g', price: product.price }]

  const currentPrice = selectedOption ? Number(selectedOption.price) : Number(product.price)
  const isOutOfStock = product.stock !== undefined && product.stock <= 0

  const handleAdd = () => {
    if (isOutOfStock) return
    onAddToCart(product, selectedOption?.label || product.unit, currentPrice, quantity)
  }

  const handleDirectWhatsApp = () => {
    if (isOutOfStock) return
    const singleCartItem = [
      {
        name: product.name,
        price: currentPrice,
        qty: quantity,
        weightLabel: selectedOption?.label || product.unit
      }
    ]
    const url = buildWhatsAppUrl(singleCartItem)
    window.open(url, '_blank')
  }

  const galleryImages = [
    product.main_image,
    ...(product.images || [])
  ].filter(Boolean)

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
            alignItems: 'center'
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

        {/* Detail Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 50,
            alignItems: 'start',
            marginBottom: 90
          }}
        >
          {/* Product Photography & Pouch Visualizer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '1 / 1.05',
                borderRadius: 26,
                overflow: 'hidden',
                background: selectedImage ? '#fff' : bgGradient,
                boxShadow: 'var(--shadow)',
                border: '1px solid var(--line)'
              }}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <>
                  {/* Zip line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      right: 20,
                      height: 8,
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.4)'
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
                      zIndex: 3
                    }}
                  >
                    <LogoEmblem style={{ width: 30, height: 30 }} />
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 9,
                        letterSpacing: '.14em',
                        color: 'var(--pine)',
                        fontWeight: 700
                      }}
                    >
                      SOULNUTS
                    </span>
                  </div>

                  {/* Grain dots */}
                  {grainDots.map((dot, idx) => (
                    <span key={idx} className="grain-dot" style={dot} />
                  ))}
                </>
              )}
            </div>

            {/* Gallery Thumbnails (if uploaded) */}
            {galleryImages.length > 1 && (
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 12,
                      overflow: 'hidden',
                      border: selectedImage === img ? '2.5px solid var(--rust)' : '1px solid var(--line)',
                      opacity: selectedImage === img ? 1 : 0.7,
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Purchase Selector */}
          <div>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: 'var(--sage)'
              }}
            >
              {product.category_slug === 'ladoos' || product.category === 'ladoos'
                ? 'Home-Made Ladoos'
                : product.category_slug === 'seeds' || product.category === 'seeds'
                ? 'Seeds & Blends'
                : 'Dry Fruits & Nuts'}
            </span>

            <h1
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1.1,
                margin: '12px 0 16px'
              }}
            >
              {product.name}
            </h1>

            {/* Price Tag & Stock Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 12,
                marginBottom: 20
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 28,
                  fontWeight: 700,
                  color: 'var(--rust)'
                }}
              >
                ₹{currentPrice}{' '}
                {product.discount_price && (
                  <span style={{ fontSize: 16, color: 'var(--ink-soft)', textDecoration: 'line-through', fontWeight: 400, marginLeft: 6 }}>
                    ₹{product.discount_price}
                  </span>
                )}
                <small
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: 'var(--ink-soft)'
                  }}
                >
                  / {selectedOption?.label || product.unit}
                </small>
              </div>

              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "'Space Mono', monospace",
                  background: isOutOfStock ? '#fed7d7' : product.stock < 10 ? '#feebc8' : '#c6f6d5',
                  color: isOutOfStock ? '#9b1c1c' : product.stock < 10 ? '#744210' : '#22543d'
                }}
              >
                {isOutOfStock ? 'OUT OF STOCK' : product.stock < 10 ? `ONLY ${product.stock} LEFT` : 'IN STOCK'}
              </span>
            </div>

            <p
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: 'var(--ink-soft)',
                marginBottom: 32
              }}
            >
              {product.description}
            </p>

            {/* Weight Options Selector */}
            {options.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '.1em',
                    marginBottom: 10,
                    fontFamily: "'Space Mono', monospace"
                  }}
                >
                  Select Pack Weight
                </label>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {options.map((opt) => {
                    const isSelected = selectedOption?.label === opt.label
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
                          transition: 'all 0.2s'
                        }}
                      >
                        {opt.label} — ₹{opt.price}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Bag CTA */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40, alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1.4px solid var(--line)',
                  borderRadius: 100,
                  padding: '6px 14px',
                  background: 'var(--paper)'
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ fontSize: 16, fontWeight: 700, padding: '4px 8px' }}
                >
                  -
                </button>
                <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, padding: '0 12px', fontSize: 14 }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ fontSize: 16, fontWeight: 700, padding: '4px 8px' }}
                >
                  +
                </button>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1 }}>
                <button
                  onClick={handleAdd}
                  disabled={isOutOfStock}
                  className="btn btn-outline"
                  style={{
                    padding: '16px 28px',
                    fontSize: 14.5,
                    opacity: isOutOfStock ? 0.6 : 1,
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                    flex: 1
                  }}
                >
                  {isOutOfStock ? 'Out of Stock' : `Add to Bag — ₹${currentPrice * quantity}`}
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  disabled={isOutOfStock}
                  className="btn btn-primary"
                  style={{
                    padding: '16px 28px',
                    fontSize: 14.5,
                    background: '#25D366',
                    color: '#fff',
                    boxShadow: '0 8px 20px -6px rgba(37,211,102,0.5)',
                    opacity: isOutOfStock ? 0.6 : 1,
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                    flex: 1
                  }}
                >
                  <WhatsAppIcon width={18} height={18} />
                  Buy on WhatsApp
                </button>
              </div>
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
                color: 'var(--ink-soft)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: 'var(--sage)' }}>
                  <CheckIcon />
                </span>
                <span>Sealed fresh on day of dispatch from Mandya, Karnataka</span>
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
                <span>Direct order tracking &amp; support via WhatsApp</span>
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
                gap: 24
              }}
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id || p.slug} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
