import { useCart } from '../context/CartContext'
import { buildWhatsAppUrl, getPouchGradient } from '../lib/whatsapp'
import { CloseIcon, WhatsAppIcon } from './Icons'

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQty, removeItem, subtotal } = useCart()

  const whatsappUrl = buildWhatsAppUrl(cart)

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <aside className={`cart-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '26px 26px 18px',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <h3 style={{ fontSize: 20 }}>Your Bag</h3>
          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{
              width: 34,
              height: 34,
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

        {/* Cart items list */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 26px',
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
              const bg = getPouchGradient(item.colorKey)
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
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      flex: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      background: bg,
                    }}
                  />

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
                      style={{ width: 20, height: 20, fontSize: 14, fontWeight: 700 }}
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
                      style={{ width: 20, height: 20, fontSize: 14, fontWeight: 700 }}
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

        {/* Footer */}
        <div
          style={{
            borderTop: '1px solid var(--line)',
            padding: '22px 26px 28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 16,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            <span>Subtotal</span>
            <span style={{ fontFamily: "'Space Mono', monospace" }}>
              ₹{subtotal}
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              opacity: cart.length === 0 ? 0.6 : 1,
              pointerEvents: cart.length === 0 ? 'none' : 'auto',
            }}
          >
            <WhatsAppIcon />
            Checkout on WhatsApp
          </a>
          <small
            style={{
              display: 'block',
              textAlign: 'center',
              marginTop: 12,
              fontSize: 11,
              color: 'var(--ink-soft)',
            }}
          >
            Orders are confirmed &amp; fulfilled directly on WhatsApp.
          </small>
        </div>
      </aside>
    </>
  )
}
