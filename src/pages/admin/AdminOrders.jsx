import { useState, useEffect } from 'react'
import { fetchOrders, updateOrderStatus } from '../../lib/api'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const [selectedOrder, setSelectedOrder] = useState(null)

  const statusOptions = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    try {
      const data = await fetchOrders()
      setOrders(data)
    } catch (e) {
      console.error('Error loading orders:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o)))
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, order_status: newStatus }))
      }
    } catch (err) {
      alert(`Failed to update status: ${err.message}`)
    }
  }

  const filteredOrders = orders.filter((o) => {
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      o.customer_name?.toLowerCase().includes(term) ||
      o.order_number?.toLowerCase().includes(term) ||
      o.email?.toLowerCase().includes(term) ||
      o.phone?.includes(term)
    const matchesStatus = statusFilter === 'all' || o.order_status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, color: 'var(--pine)', fontWeight: 600 }}>Orders Management</h1>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4 }}>
            Track customer orders, review delivery addresses, and update fulfillment statuses.
          </p>
        </div>
      </div>

      {/* Toolbar & Search */}
      <div
        style={{
          background: 'var(--paper)',
          padding: '16px 20px',
          borderRadius: 16,
          border: '1px solid var(--line)',
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', gap: 12, flex: 1, minWidth: 260 }}>
          <input
            type="text"
            placeholder="Search orders by customer name, order #, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid var(--line)',
              background: '#fff',
              fontSize: 13.5,
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)' }}>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid var(--line)',
              background: '#fff',
              fontSize: 13.5,
              fontWeight: 600,
              outline: 'none'
            }}
          >
            <option value="all">All Statuses</option>
            {statusOptions.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div
        style={{
          background: 'var(--paper)',
          borderRadius: 20,
          border: '1px solid var(--line)',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}
      >
        {loading ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--ink-soft)' }}>Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--ink-soft)' }}>
            <h3 style={{ fontSize: 18, color: 'var(--pine)', marginBottom: 8 }}>No orders found</h3>
            <p style={{ fontSize: 13.5 }}>Orders placed by customers will automatically appear here.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13.5 }}>
              <thead>
                <tr
                  style={{
                    background: 'var(--ivory)',
                    borderBottom: '1px solid var(--line)',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'var(--sage)'
                  }}
                >
                  <th style={{ padding: '16px 20px' }}>Order Ref</th>
                  <th style={{ padding: '16px 16px' }}>Customer</th>
                  <th style={{ padding: '16px 16px' }}>Location</th>
                  <th style={{ padding: '16px 16px' }}>Amount</th>
                  <th style={{ padding: '16px 16px' }}>Status</th>
                  <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontWeight: 700, fontFamily: "'Space Mono', monospace", color: 'var(--pine)' }}>
                        {o.order_number || o.id.slice(0, 8)}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
                        {new Date(o.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{o.customer_name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>
                        {o.email} • {o.phone}
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px', color: 'var(--ink-soft)' }}>
                      {o.city}, {o.state || 'Karnataka'} ({o.pincode})
                    </td>

                    <td style={{ padding: '14px 16px', fontFamily: "'Space Mono', monospace", fontWeight: 700, color: 'var(--rust)' }}>
                      ₹{o.total_amount}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={o.order_status || 'Pending'}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 700,
                          background:
                            o.order_status === 'Delivered'
                              ? '#e6fffa'
                              : o.order_status === 'Cancelled'
                              ? '#fdf2f2'
                              : 'rgba(198,161,91,0.15)',
                          color:
                            o.order_status === 'Delivered'
                              ? '#234e52'
                              : o.order_status === 'Cancelled'
                              ? '#9b1c1c'
                              : 'var(--pine)',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {statusOptions.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedOrder(o)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 8,
                          border: '1px solid var(--line)',
                          background: '#fff',
                          fontSize: 12.5,
                          fontWeight: 600,
                          color: 'var(--ink)',
                          cursor: 'pointer'
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 300
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 580,
              background: 'var(--paper)',
              borderRadius: 24,
              padding: 32,
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--line)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--rust)', fontWeight: 700 }}>
                  ORDER DETAILS
                </span>
                <h2 style={{ fontSize: 22, color: 'var(--pine)' }}>{selectedOrder.order_number}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{ fontSize: 18, fontWeight: 700, cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Customer Box */}
              <div style={{ padding: 16, background: 'var(--ivory)', borderRadius: 14 }}>
                <h4 style={{ fontSize: 13, textTransform: 'uppercase', fontFamily: "'Space Mono', monospace", color: 'var(--sage)', marginBottom: 8 }}>
                  Customer Information
                </h4>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{selectedOrder.customer_name}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>
                  Email: {selectedOrder.email}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Phone: {selectedOrder.phone}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 8, lineHeight: 1.4 }}>
                  <strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state || 'Karnataka'} - {selectedOrder.pincode}
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 style={{ fontSize: 13, textTransform: 'uppercase', fontFamily: "'Space Mono', monospace", color: 'var(--sage)', marginBottom: 10 }}>
                  Ordered Items
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(selectedOrder.order_items || []).map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: '1px solid var(--line)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 13.5
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700 }}>{item.product_name}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>
                          Weight: {item.weight_option || 'Standard'} • Qty: {item.quantity}
                        </div>
                      </div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
                        ₹{item.subtotal || item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total & Status */}
              <div style={{ paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Total Order Value:</span>
                  <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--rust)', fontFamily: "'Space Mono', monospace" }}>
                    ₹{selectedOrder.total_amount}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Update Status:</label>
                  <select
                    value={selectedOrder.order_status || 'Pending'}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--line)', fontWeight: 700 }}
                  >
                    {statusOptions.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
