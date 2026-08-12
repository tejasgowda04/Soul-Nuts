import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { buildWhatsAppUrl, getPouchGradient } from '../lib/whatsapp'
import { createOrder } from '../lib/api'
import { CloseIcon, WhatsAppIcon } from './Icons'

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQty, removeItem, subtotal, clearCart } = useCart()
  const [checkoutStep, setCheckoutStep] = useState('cart') // 'cart' | 'checkout' | 'success'

  // Prefilled Customer Details
  const [customer, setCustomer] = useState({
    name: 'Tejas G',
    email: 'tejasprince07@gmail.com',
    phone: '+91 91741122678',
    address: 'Mandya Town',
    city: 'Mandya',
    state: 'Karnataka',
    pincode: '571401'
  })

  const [submittingOrder, setSubmittingOrder] = useState(false)
  const [orderRef, setOrderRef] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Dynamically generated WhatsApp URL with prefilled customer & cart details
  const whatsappUrl = buildWhatsAppUrl(cart, customer)

  const handlePlaceOrder = async (e) => {
    e?.preventDefault()
    if (!customer.name || !customer.phone || !customer.address) {
      setErrorMsg('Please fill in Name, Phone, and Address.')
      return
    }

    setSubmittingOrder(true)
    setErrorMsg('')

    try {
      const orderPayload = {
        name: customer.name,
        email: customer.email || `${customer.phone}@soulnuts.in`,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        totalAmount: subtotal
      }

      const cartItemsFormatted = cart.map((item) => ({
        product: { id: item.id, name: item.name },
        quantity: item.qty,
        price: item.price,
        selectedWeight: item.weightLabel
      }))

      const createdOrder = await createOrder(orderPayload, cartItemsFormatted)
      setOrderRef(createdOrder.order_number || createdOrder.id)
      clearCart()
      setCheckoutStep('success')
    } catch (err) {
      setErrorMsg(err.message || 'Failed to place order.')
    } finally {
      setSubmittingOrder(false)
    }
  }

  const handleWhatsAppDirectCheckout = async () => {
    // Record order in database, then open WhatsApp prefilled link
    try {
      if (customer.name && customer.phone) {
        const orderPayload = {
          name: customer.name,
          email: customer.email || `${customer.phone}@soulnuts.in`,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          pincode: customer.pincode,
          totalAmount: subtotal
        }
        const cartItemsFormatted = cart.map((item) => ({
          product: { id: item.id, name: item.name },
          quantity: item.qty,
          price: item.price,
          selectedWeight: item.weightLabel
        }))
        await createOrder(orderPayload, cartItemsFormatted)
      }
    } catch (e) {
      console.warn('Order background log:', e)
    }

    window.open(whatsappUrl, '_blank')
    clearCart()
    onClose()
  }

  const handleCloseAll = () => {
    setCheckoutStep('cart')
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={handleCloseAll}
      />

      {/* Slide-in panel */}
      <aside className={`cart-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px 24px 18px',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <h3 style={{ fontSize: 19, color: 'var(--pine)' }}>
            {checkoutStep === 'cart'
              ? 'Your Bag'
              : checkoutStep === 'checkout'
              ? 'Prefilled Delivery Info'
              : 'Order Confirmed!'}
          </h3>
          <button
            onClick={handleCloseAll}
            aria-label="Close cart"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--line)',
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* View Mode: CART ITEMS */}
        {checkoutStep === 'cart' && (
          <>
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {cart.length === 0 ? (
                <div
                  style={{
                    margin: 'auto',
                    textAlign: 'center',
                    color: 'var(--ink-soft)',
                    fontSize: 13.5,
                    padding: '40px 0',
                  }}
                >
                  Your bag is empty.
                  <br />
                  Add something soulful.
                </div>
              ) : (
                cart.map((item, idx) => {
                  const bg = getPouchGradient(item.colorKey || 'almond')
                  return (
                    <div
                      key={`${item.id}-${item.weightLabel || idx}`}
                      style={{
                        display: 'flex',
                        gap: 14,
                        alignItems: 'center',
                      }}
                    >
                      {/* Thumbnail */}
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 12,
                          flex: 'none',
                          position: 'relative',
                          overflow: 'hidden',
                          background: item.main_image ? '#fff' : bg,
                          border: '1px solid var(--line)'
                        }}
                      >
                        {item.main_image && (
                          <img src={item.main_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <h5
                          style={{
                            fontSize: 13.5,
                            fontWeight: 700,
                            marginBottom: 4,
                          }}
                        >
                          {item.name}
                        </h5>
                        <div
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 12,
                            color: 'var(--ink-soft)',
                          }}
                        >
                          ₹{item.price} {item.weightLabel ? `(${item.weightLabel})` : ''} × {item.qty}
                        </div>
                      </div>

                      {/* Qty controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          border: '1px solid var(--line)',
                          borderRadius: 100,
                          padding: '4px 8px',
                        }}
                      >
                        <button
                          onClick={() => updateQty(item.id, item.weightLabel, item.qty - 1)}
                          style={{ width: 18, height: 18, fontSize: 13, fontWeight: 700 }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 12,
                            minWidth: 14,
                            textAlign: 'center',
                          }}
                        >
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.weightLabel, item.qty + 1)}
                          style={{ width: 18, height: 18, fontSize: 13, fontWeight: 700 }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id, item.weightLabel)}
                        style={{
                          color: 'var(--rust)',
                          fontSize: 11,
                          fontWeight: 700,
                          marginLeft: 4,
                        }}
                        aria-label={`Remove ${item.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer Actions */}
            <div
              style={{
                borderTop: '1px solid var(--line)',
                padding: '20px 24px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                <span>Subtotal</span>
                <span style={{ fontFamily: "'Space Mono', monospace" }}>
                  ₹{subtotal}
                </span>
              </div>

              {/* Direct WhatsApp Order CTA */}
              <button
                onClick={handleWhatsAppDirectCheckout}
                disabled={cart.length === 0}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  fontSize: 14.5,
                  background: '#25D366',
                  color: '#fff',
                  boxShadow: '0 10px 24px -8px rgba(37, 211, 102, 0.6)',
                  opacity: cart.length === 0 ? 0.6 : 1,
                  pointerEvents: cart.length === 0 ? 'none' : 'auto',
                }}
              >
                <WhatsAppIcon width={18} height={18} />
                Direct WhatsApp Checkout — ₹{subtotal}
              </button>

              {/* Website Form Checkout Option */}
              <button
                onClick={() => setCheckoutStep('checkout')}
                disabled={cart.length === 0}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '11px',
                  borderRadius: 100,
                  border: '1.4px solid var(--line)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--ink)',
                  opacity: cart.length === 0 ? 0.6 : 1,
                  pointerEvents: cart.length === 0 ? 'none' : 'auto',
                }}
              >
                Enter Delivery Details (Website Order)
              </button>
            </div>
          </>
        )}

        {/* View Mode: PREFILLED CHECKOUT FORM */}
        {checkoutStep === 'checkout' && (
          <form
            onSubmit={handlePlaceOrder}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px 24px',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--sage)', fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
                PREFILLED CHECKOUT
              </div>

              {errorMsg && (
                <div style={{ padding: '8px 12px', borderRadius: 8, background: '#fdf2f2', color: '#9b1c1c', fontSize: 12 }}>
                  {errorMsg}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Tejas G"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 13, outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                    PHONE *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="+91 91741122678"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 13, outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="tejasprince07@gmail.com"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 13, outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                  DELIVERY ADDRESS *
                </label>
                <textarea
                  rows={2}
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Mandya Town"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 13, outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                    CITY
                  </label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 12 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                    STATE
                  </label>
                  <input
                    type="text"
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 12 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                    PINCODE
                  </label>
                  <input
                    type="text"
                    value={customer.pincode}
                    onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 12 }}
                  />
                </div>
              </div>
            </div>

            <div style={{ paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 14 }}>
                <span>Total Amount Payable</span>
                <span style={{ fontFamily: "'Space Mono', monospace", color: 'var(--rust)' }}>₹{subtotal}</span>
              </div>

              <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px',
                    fontSize: 13.5,
                    background: '#25D366',
                    color: '#fff',
                    borderRadius: 100,
                    fontWeight: 700,
                    boxShadow: '0 8px 20px -6px rgba(37,211,102,0.5)'
                  }}
                >
                  <WhatsAppIcon width={16} height={16} />
                  Send Order with Prefilled Details on WhatsApp
                </a>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    style={{ padding: '10px 16px', borderRadius: 100, border: '1px solid var(--line)', fontSize: 12.5, fontWeight: 700 }}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={submittingOrder}
                    className="btn btn-primary"
                    style={{ flex: 1, justifyContent: 'center', padding: '10px', fontSize: 13, opacity: submittingOrder ? 0.7 : 1 }}
                  >
                    {submittingOrder ? 'Placing Order...' : 'Confirm Order on Site'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* View Mode: ORDER SUCCESS */}
        {checkoutStep === 'success' && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 32,
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#e6fffa',
                color: '#234e52',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                marginBottom: 16
              }}
            >
              ✓
            </div>

            <h3 style={{ fontSize: 22, color: 'var(--pine)', marginBottom: 6 }}>Order Placed!</h3>
            <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 20 }}>
              Thank you for ordering with Sol Nuts! Your order has been recorded and will be sealed fresh in Mandya.
            </p>

            <div
              style={{
                padding: '12px 20px',
                borderRadius: 12,
                background: 'var(--ivory)',
                border: '1px dashed var(--line)',
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                fontSize: 14,
                color: 'var(--rust)',
                marginBottom: 28
              }}
            >
              REF: {orderRef}
            </div>

            <button onClick={handleCloseAll} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
