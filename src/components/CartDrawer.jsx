import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { buildWhatsAppUrl, getPouchGradient } from '../lib/whatsapp'
import { CloseIcon, WhatsAppIcon } from './Icons'

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQty, removeItem, subtotal, clearCart } = useCart()
  const [showAddressForm, setShowAddressForm] = useState(false)

  // Delivery details for WhatsApp prefill
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Mandya',
    pincode: '571401'
  })

  const whatsappUrl = buildWhatsAppUrl(cart, showAddressForm ? customer : null)

  const handleWhatsAppCheckout = (e) => {
    e?.preventDefault()
    if (cart.length === 0) return

    window.open(whatsappUrl, '_blank')
    clearCart()
    setShowAddressForm(false)
    onClose()
  }

  const handleCloseAll = () => {
    setShowAddressForm(false)
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
          <div>
            <h3 style={{ fontSize: 19, color: 'var(--pine)', margin: 0 }}>
              {showAddressForm ? 'Delivery Details for WhatsApp' : 'Your Harvest Bag'}
            </h3>
            <span style={{ fontSize: 11, color: 'var(--sage)', fontFamily: "'Space Mono', monospace" }}>
              ⚡ PURE WHATSAPP ORDERING
            </span>
          </div>

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
              cursor: 'pointer'
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* View Mode: CART ITEMS */}
        {!showAddressForm ? (
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
                    fontSize: 14,
                    padding: '40px 0',
                  }}
                >
                  <p style={{ fontWeight: 600, color: 'var(--pine)', marginBottom: 6 }}>Your bag is empty.</p>
                  <p style={{ fontSize: 12.5 }}>Select products from our harvest to start your WhatsApp order.</p>
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
                        paddingBottom: 14,
                        borderBottom: '1px solid var(--line)'
                      }}
                    >
                      {/* Thumbnail */}
                      <div
                        style={{
                          width: 54,
                          height: 54,
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
                            fontSize: 14,
                            fontWeight: 700,
                            marginBottom: 4,
                            color: 'var(--ink)'
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
                          gap: 6,
                          border: '1.4px solid var(--line)',
                          borderRadius: 100,
                          padding: '4px 10px',
                          background: 'var(--paper)'
                        }}
                      >
                        <button
                          onClick={() => updateQty(item.id, item.weightLabel, item.qty - 1)}
                          style={{ width: 18, height: 18, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
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
                            fontWeight: 700
                          }}
                        >
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.weightLabel, item.qty + 1)}
                          style={{ width: 18, height: 18, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
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
                          fontSize: 13,
                          fontWeight: 700,
                          marginLeft: 4,
                          cursor: 'pointer',
                          padding: 4
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
                gap: 12,
                background: 'var(--paper)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                <span>Estimated Total</span>
                <span style={{ fontFamily: "'Space Mono', monospace", color: 'var(--rust)' }}>
                  ₹{subtotal}
                </span>
              </div>

              {/* Direct WhatsApp Order CTA */}
              <button
                onClick={handleWhatsAppCheckout}
                disabled={cart.length === 0}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '15px',
                  fontSize: 15,
                  background: '#25D366',
                  color: '#fff',
                  boxShadow: '0 10px 24px -8px rgba(37, 211, 102, 0.6)',
                  opacity: cart.length === 0 ? 0.6 : 1,
                  pointerEvents: cart.length === 0 ? 'none' : 'auto',
                  borderRadius: 100,
                  cursor: 'pointer'
                }}
              >
                <WhatsAppIcon width={20} height={20} />
                Order via WhatsApp — ₹{subtotal}
              </button>

              {/* Optional: Add Delivery Address before sending */}
              {cart.length > 0 && (
                <button
                  onClick={() => setShowAddressForm(true)}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '10px',
                    borderRadius: 100,
                    border: '1.4px solid var(--line)',
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: 'var(--ink-soft)',
                    cursor: 'pointer',
                    background: 'transparent'
                  }}
                >
                  + Add Delivery Address before sending
                </button>
              )}
            </div>
          </>
        ) : (
          /* OPTIONAL DELIVERY DETAILS FORM */
          <form
            onSubmit={handleWhatsAppCheckout}
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
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                Fill in your details to include your shipping address directly in your WhatsApp order message.
              </p>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="e.g. Tejas"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 13, outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>
                  PHONE NUMBER *
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 13, outline: 'none' }}
                />
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
                  placeholder="House / Street / Area"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 13, outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
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
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  fontSize: 14.5,
                  background: '#25D366',
                  color: '#fff',
                  borderRadius: 100,
                  fontWeight: 700,
                  boxShadow: '0 8px 20px -6px rgba(37,211,102,0.5)',
                  cursor: 'pointer'
                }}
              >
                <WhatsAppIcon width={18} height={18} />
                Send Order to WhatsApp — ₹{subtotal}
              </button>

              <button
                type="button"
                onClick={() => setShowAddressForm(false)}
                style={{
                  padding: '10px',
                  borderRadius: 100,
                  border: '1px solid var(--line)',
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: 'transparent'
                }}
              >
                ← Back to Bag
              </button>
            </div>
          </form>
        )}
      </aside>
    </>
  )
}
