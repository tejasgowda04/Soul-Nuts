import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchDashboardStats, fetchOrders } from '../../lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    lowStockProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const data = await fetchDashboardStats()
      setStats(data)

      const orders = await fetchOrders()
      setRecentOrders(orders.slice(0, 5))
    } catch (e) {
      console.error('Error loading dashboard stats:', e)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      subtitle: `${stats.activeProducts} Active catalog items`,
      color: 'var(--pine)',
      bg: 'rgba(31, 59, 44, 0.08)',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 8L12 3 3 8v8l9 5 9-5V8z" />
        </svg>
      )
    },
    {
      title: 'Active Products',
      value: stats.activeProducts,
      subtitle: 'Visible on customer site',
      color: 'var(--sage)',
      bg: 'rgba(126, 143, 96, 0.12)',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    },
    {
      title: 'Low Stock Products',
      value: stats.lowStockProducts,
      subtitle: 'Items under 10 units',
      color: stats.lowStockProducts > 0 ? '#c53030' : 'var(--ink-soft)',
      bg: stats.lowStockProducts > 0 ? 'rgba(197, 48, 48, 0.08)' : 'rgba(0,0,0,0.04)',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      subtitle: `₹${stats.totalRevenue.toLocaleString('en-IN')} total value`,
      color: 'var(--rust)',
      bg: 'rgba(166, 84, 30, 0.1)',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        </svg>
      )
    }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, color: 'var(--pine)', fontWeight: 600 }}>Dashboard Overview</h1>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4 }}>
            Welcome back! Here is a summary of Soul Nuts store performance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/admin/products/new" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 13.5 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add New Product
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20
        }}
      >
        {statCards.map((card) => (
          <div
            key={card.title}
            style={{
              background: 'var(--paper)',
              padding: '22px 20px',
              borderRadius: 18,
              border: '1px solid var(--line)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--ink-soft)',
                  letterSpacing: '.06em'
                }}
              >
                {card.title}
              </span>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: card.bg,
                  color: card.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {card.icon}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 32,
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  color: card.color,
                  lineHeight: 1.1
                }}
              >
                {loading ? '...' : card.value}
              </div>
              <span style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 6, display: 'block' }}>
                {card.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Cards & Recent Orders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
        {/* Quick Management Shortcuts */}
        <div
          style={{
            background: 'var(--paper)',
            padding: 24,
            borderRadius: 20,
            border: '1px solid var(--line)'
          }}
        >
          <h3 style={{ fontSize: 18, color: 'var(--pine)', marginBottom: 16 }}>Quick Shortcuts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link
              to="/admin/products/new"
              style={{
                padding: '14px 18px',
                borderRadius: 12,
                background: 'var(--ivory)',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--ink)',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                transition: 'transform 0.2s'
              }}
            >
              <span>+ Add New Product to Catalog</span>
              <span style={{ color: 'var(--rust)' }}>→</span>
            </Link>

            <Link
              to="/admin/products"
              style={{
                padding: '14px 18px',
                borderRadius: 12,
                background: 'var(--ivory)',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--ink)',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                transition: 'transform 0.2s'
              }}
            >
              <span>Manage Catalog &amp; Pricing</span>
              <span style={{ color: 'var(--rust)' }}>→</span>
            </Link>

            <Link
              to="/admin/orders"
              style={{
                padding: '14px 18px',
                borderRadius: 12,
                background: 'var(--ivory)',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--ink)',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none'
              }}
            >
              <span>View Customer Orders</span>
              <span style={{ color: 'var(--rust)' }}>→</span>
            </Link>
          </div>
        </div>

        {/* Recent Orders List */}
        <div
          style={{
            background: 'var(--paper)',
            padding: 24,
            borderRadius: 20,
            border: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, color: 'var(--pine)' }}>Recent Orders</h3>
            <Link to="/admin/orders" style={{ fontSize: 13, color: 'var(--rust)', fontWeight: 700 }}>
              View All
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div
              style={{
                padding: '30px 20px',
                textAlign: 'center',
                background: 'var(--ivory)',
                borderRadius: 14,
                color: 'var(--ink-soft)',
                fontSize: 13
              }}
            >
              No orders placed yet. Test orders will appear here.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'var(--ivory)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 13
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{order.customer_name}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-soft)', fontFamily: "'Space Mono', monospace" }}>
                      {order.order_number}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: 'var(--rust)', fontFamily: "'Space Mono', monospace" }}>
                      ₹{order.total_amount}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        padding: '2px 6px',
                        borderRadius: 4,
                        background: 'rgba(31,59,44,0.1)',
                        color: 'var(--pine)',
                        fontWeight: 700
                      }}
                    >
                      {order.order_status || 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
