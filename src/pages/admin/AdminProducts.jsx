import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchCategories, updateProduct, deleteProduct } from '../../lib/api'
import { getPouchGradient } from '../../lib/whatsapp'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Deletion state modal
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [prods, cats] = await Promise.all([
        fetchProducts({ activeOnly: false }),
        fetchCategories({ activeOnly: false })
      ])
      setProducts(prods)
      setCategories(cats)
    } catch (e) {
      console.error('Error loading products data:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (product) => {
    try {
      const updated = await updateProduct(product.id, {
        ...product,
        is_active: !product.is_active
      })
      setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)))
    } catch (err) {
      alert(`Failed to update status: ${err.message}`)
    }
  }

  const handleToggleFeatured = async (product) => {
    try {
      const updated = await updateProduct(product.id, {
        ...product,
        featured: !product.featured
      })
      setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)))
    } catch (err) {
      alert(`Failed to update featured flag: ${err.message}`)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await deleteProduct(deleteTarget.id)
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      alert(`Failed to delete product: ${err.message}`)
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCat = selectedCategory === 'all' || p.category_slug === selectedCategory
    return matchesSearch && matchesCat
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header & Actions */}
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
          <h1 style={{ fontSize: 28, color: 'var(--pine)', fontWeight: 600 }}>Product Catalog</h1>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4 }}>
            Manage pricing, stock levels, imagery, and product visibility.
          </p>
        </div>

        <Link to="/admin/products/new" className="btn btn-primary" style={{ padding: '11px 22px', fontSize: 14 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add New Product
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
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
            placeholder="Search by product name or SKU..."
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
          <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)' }}>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Data Table */}
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
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--ink-soft)', fontSize: 14 }}>
            Loading products catalog...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--ink-soft)' }}>
            <h3 style={{ fontSize: 18, color: 'var(--pine)', marginBottom: 8 }}>No products found</h3>
            <p style={{ fontSize: 13.5 }}>Try adjusting your search query or category filter.</p>
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
                  <th style={{ padding: '16px 20px' }}>Product</th>
                  <th style={{ padding: '16px 16px' }}>Category</th>
                  <th style={{ padding: '16px 16px' }}>Price</th>
                  <th style={{ padding: '16px 16px' }}>Stock</th>
                  <th style={{ padding: '16px 16px' }}>Featured</th>
                  <th style={{ padding: '16px 16px' }}>Status</th>
                  <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: '1px solid var(--line)',
                      transition: 'background 0.2s'
                    }}
                  >
                    {/* Image & Product Info */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            overflow: 'hidden',
                            flexShrink: 0,
                            background: p.main_image ? '#fff' : getPouchGradient(p.color_key),
                            border: '1px solid var(--line)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {p.main_image ? (
                            <img src={p.main_image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--pine)', fontFamily: "'Space Mono', monospace" }}>
                              SN
                            </span>
                          )}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--ink-soft)', fontFamily: "'Space Mono', monospace" }}>
                            SKU: {p.sku || 'N/A'} • {p.unit}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: '14px 16px', color: 'var(--ink-soft)', textTransform: 'capitalize' }}>
                      {p.category_slug || 'General'}
                    </td>

                    {/* Price */}
                    <td style={{ padding: '14px 16px', fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
                      ₹{p.price}
                      {p.discount_price && (
                        <span style={{ fontSize: 11, color: 'var(--rust)', marginLeft: 6, fontWeight: 400 }}>
                          (<s>₹{p.discount_price}</s>)
                        </span>
                      )}
                    </td>

                    {/* Stock Indicator */}
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '4px 10px',
                          borderRadius: 100,
                          fontSize: 12,
                          fontWeight: 700,
                          fontFamily: "'Space Mono', monospace",
                          background: p.stock < 10 ? 'rgba(197,48,48,0.1)' : 'rgba(31,59,44,0.08)',
                          color: p.stock < 10 ? '#c53030' : 'var(--pine)'
                        }}
                      >
                        {p.stock} units
                      </span>
                    </td>

                    {/* Featured Quick Toggle */}
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 600,
                          border: '1px solid var(--line)',
                          background: p.featured ? 'var(--gold-soft)' : '#fff',
                          color: p.featured ? 'var(--pine)' : 'var(--ink-soft)',
                          cursor: 'pointer'
                        }}
                      >
                        {p.featured ? '★ Featured' : '☆ Normal'}
                      </button>
                    </td>

                    {/* Active/Inactive Status Toggle */}
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => handleToggleActive(p)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 100,
                          fontSize: 11.5,
                          fontWeight: 700,
                          background: p.is_active ? '#e6fffa' : '#edf2f7',
                          color: p.is_active ? '#234e52' : '#4a5568',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {p.is_active ? '● Active' : '○ Inactive'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                        <Link
                          to={`/admin/products/${p.id}/edit`}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 8,
                            border: '1px solid var(--line)',
                            background: '#fff',
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: 'var(--ink)',
                            textDecoration: 'none'
                          }}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 8,
                            border: '1px solid #f8b4b4',
                            background: '#fdf2f2',
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: '#9b1c1c',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
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
              maxWidth: 440,
              background: 'var(--paper)',
              borderRadius: 20,
              padding: 28,
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--line)'
            }}
          >
            <h3 style={{ fontSize: 20, color: 'var(--pine)', marginBottom: 12 }}>Delete Product?</h3>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 24 }}>
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeleteTarget(null)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 100,
                  border: '1px solid var(--line)',
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: 'var(--ink)'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                style={{
                  padding: '10px 20px',
                  borderRadius: 100,
                  background: '#c53030',
                  color: '#fff',
                  fontSize: 13.5,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  opacity: isDeleting ? 0.6 : 1
                }}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
