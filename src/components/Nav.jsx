import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { CartIcon } from './Icons'

export default function Nav({ onCartOpen }) {
  const { itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const drawerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on outside click
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { to: '/shop', label: 'Shop' },
    { to: '/shop?cat=nuts', label: 'Dry Fruits & Nuts' },
    { to: '/ladoos', label: 'Ladoos' },
    { to: '/about', label: 'Our Story' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 32px',
          background: scrolled ? 'rgba(248,243,230,0.94)' : 'rgba(248,243,230,0.88)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--line)',
          transition: 'background 0.3s var(--ease)',
        }}
      >
        {/* Brandmark with clean circular logo framing */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: 'var(--paper)',
              border: '1.2px solid var(--gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              boxShadow: '0 4px 12px rgba(18,36,26,0.08)',
              overflow: 'hidden',
              flex: 'none',
            }}
          >
            <img
              src="/logo.png"
              alt="Soulnuts Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '50%',
              }}
            />
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 20, letterSpacing: '.01em', color: 'var(--ink)' }}>
            Soulnuts
            <span style={{
              display: 'block', fontFamily: "'Space Mono', monospace",
              fontSize: '8.5px', letterSpacing: '.22em', color: 'var(--ink-soft)',
              fontWeight: 400, marginTop: 1, textTransform: 'uppercase',
            }}>
              The Soulful Way to Snack
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav style={{ display: 'flex', gap: 34, alignItems: 'center' }} className="hidden md:flex">
          {navLinks.map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              style={{
                fontSize: 14, fontWeight: 600, position: 'relative', padding: '4px 0',
              }}
              className="nav-link-item"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* Cart */}
          <button
            onClick={onCartOpen}
            aria-label={`Open cart, ${itemCount} items`}
            style={{
              position: 'relative', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%', transition: 'background .25s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ivory-2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <CartIcon />
            {itemCount > 0 && (
              <span style={{
                position: 'absolute', top: -2, right: -2,
                background: 'var(--rust)', color: '#fff',
                fontFamily: "'Space Mono', monospace", fontSize: 10,
                width: 18, height: 18, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700,
              }}>
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>

          {/* Shop Now — desktop only */}
          <Link
            to="/shop"
            className="btn btn-primary"
            style={{ padding: '11px 22px', display: 'none' }}
            id="nav-shop-btn"
          >
            Shop Now
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{
              width: 38, height: 38, display: 'flex',
              flexDirection: 'column', justifyContent: 'center', gap: 5,
            }}
          >
            <span style={{ width: 20, height: 1.6, background: 'var(--ink)', marginLeft: 'auto', display: 'block' }} />
            <span style={{ width: 20, height: 1.6, background: 'var(--ink)', marginLeft: 'auto', display: 'block' }} />
            <span style={{ width: 20, height: 1.6, background: 'var(--ink)', marginLeft: 'auto', display: 'block' }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(18,36,26,0.4)',
            backdropFilter: 'blur(4px)', zIndex: 150,
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, width: 300, maxWidth: '85vw',
          background: 'var(--ivory)', zIndex: 151,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s var(--ease)',
          display: 'flex', flexDirection: 'column', padding: '80px 28px 40px',
          boxShadow: '30px 0 60px rgba(18,36,26,0.12)',
        }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute', top: 22, right: 22,
            width: 34, height: 34, borderRadius: '50%',
            border: '1px solid var(--line)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: 18, fontFamily: "'Fraunces', serif", fontWeight: 500,
                padding: '12px 0', borderBottom: '1px solid var(--line)',
                color: 'var(--ink)',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          to="/shop"
          className="btn btn-primary"
          onClick={() => setMobileOpen(false)}
          style={{ marginTop: 32, justifyContent: 'center' }}
        >
          Shop Now
        </Link>
      </div>

      {/* Spacer */}
      <div style={{ height: 76 }} />

      <style>{`
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--rust);
          transition: width 0.3s var(--ease);
        }
        .nav-link-item:hover::after { width: 100%; }
        @media (min-width: 768px) {
          #nav-shop-btn { display: inline-flex !important; }
        }
      `}</style>
    </>
  )
}
