import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogoEmblem } from '../Icons'

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      exact: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    },
    {
      label: 'Products',
      path: '/admin/products',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 8L12 3 3 8v8l9 5 9-5V8z" />
          <path d="M3 8l9 5 9-5" />
          <path d="M12 13v8" />
        </svg>
      )
    },
    {
      label: 'Orders',
      path: '/admin/orders',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    }
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f1e8', color: 'var(--ink)' }}>
      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99
          }}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}
        style={{
          width: 260,
          background: 'var(--pine)',
          color: 'var(--ivory)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          transition: 'transform 0.3s var(--ease)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.15)'
        }}
      >
        {/* Logo & Brand Header */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid var(--line-dark)',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <LogoEmblem style={{ width: 38, height: 38 }} lightMode />
          <div>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                letterSpacing: '.16em',
                color: 'var(--gold)',
                display: 'block',
                fontWeight: 700
              }}
            >
              ADMIN PANEL
            </span>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--ivory)'
              }}
            >
              Soul Nuts
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                color: isActive ? 'var(--ivory)' : 'rgba(248, 243, 230, 0.7)',
                background: isActive ? 'var(--rust)' : 'transparent',
                transition: 'all 0.2s',
                textDecoration: 'none'
              })}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Info & Store Link */}
        <div
          style={{
            padding: 16,
            borderTop: '1px solid var(--line-dark)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }}
        >
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.08)',
              fontSize: 12.5,
              fontWeight: 600,
              color: 'var(--gold-soft)',
              textDecoration: 'none'
            }}
          >
            <span>View Live Website</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6 }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ivory)', truncate: true }}>
                {user?.email || 'admin@soulnuts.in'}
              </div>
              <div style={{ fontSize: 10, color: 'var(--gold)', fontFamily: "'Space Mono', monospace" }}>
                Mandya, Karnataka
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                padding: 8,
                borderRadius: 8,
                color: 'rgba(248, 243, 230, 0.6)',
                background: 'transparent',
                transition: 'color 0.2s'
              }}
              className="hover:text-rust"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: 260, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header (Mobile & Desktop) */}
        <header
          style={{
            height: 64,
            background: 'var(--paper)',
            borderBottom: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 90
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                padding: 8,
                borderRadius: 6,
                border: '1px solid var(--line)',
                display: 'none'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--sage)',
                fontWeight: 700
              }}
            >
              SOUL NUTS MANAGEMENT SYSTEM
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 100,
                background: 'rgba(31, 59, 44, 0.1)',
                color: 'var(--pine)',
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'Space Mono', monospace"
              }}
            >
              ● LIVE
            </span>
          </div>
        </header>

        {/* Dashboard View Body */}
        <main style={{ flex: 1, padding: '32px 28px', maxWidth: 1400, width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        .admin-nav-link:hover:not(.active) {
          background: rgba(255, 255, 255, 0.08) !important;
          color: var(--ivory) !important;
        }
        @media (max-width: 900px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          div[style*="margin-left: 260px"] {
            margin-left: 0 !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}
