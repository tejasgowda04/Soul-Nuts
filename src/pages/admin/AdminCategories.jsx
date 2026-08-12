import { useState, useEffect } from 'react'
import { fetchCategories, createCategory, updateCategory, deleteCategory, generateSlug } from '../../lib/api'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    try {
      const data = await fetchCategories({ activeOnly: false })
      setCategories(data)
    } catch (e) {
      console.error('Error loading categories:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenAddModal = () => {
    setEditingCategory(null)
    setName('')
    setSlug('')
    setDescription('')
    setIsActive(true)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (cat) => {
    setEditingCategory(cat)
    setName(cat.name)
    setSlug(cat.slug)
    setDescription(cat.description || '')
    setIsActive(cat.is_active ?? true)
    setIsModalOpen(true)
  }

  const handleNameChange = (e) => {
    const val = e.target.value
    setName(val)
    if (!editingCategory) {
      setSlug(generateSlug(val))
    }
  }

  const handleToggleActive = async (cat) => {
    try {
      const updated = await updateCategory(cat.id, {
        ...cat,
        is_active: !cat.is_active
      })
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? updated : c)))
    } catch (err) {
      alert(`Failed to update status: ${err.message}`)
    }
  }

  const handleDelete = async (cat) => {
    if (!window.confirm(`Are you sure you want to delete category "${cat.name}"?`)) return
    try {
      await deleteCategory(cat.id)
      setCategories((prev) => prev.filter((c) => c.id !== cat.id))
    } catch (err) {
      alert(`Failed to delete category: ${err.message}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setSubmitting(true)
    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim() || generateSlug(name),
        description: description.trim(),
        is_active: isActive
      }

      if (editingCategory) {
        const updated = await updateCategory(editingCategory.id, payload)
        setCategories((prev) => prev.map((c) => (c.id === editingCategory.id ? updated : c)))
      } else {
        const created = await createCategory(payload)
        setCategories((prev) => [...prev, created])
      }

      setIsModalOpen(false)
    } catch (err) {
      alert(`Failed to save category: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, color: 'var(--pine)', fontWeight: 600 }}>Category Management</h1>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4 }}>
            Organize Sol Nuts harvests into categories (Dry Fruits, Nuts, Seeds, Ladoos, etc.).
          </p>
        </div>

        <button onClick={handleOpenAddModal} className="btn btn-primary" style={{ padding: '11px 22px', fontSize: 14 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add New Category
        </button>
      </div>

      {/* Category Grid Cards */}
      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-soft)' }}>Loading categories...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                background: 'var(--paper)',
                padding: 24,
                borderRadius: 20,
                border: '1px solid var(--line)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--sage)', fontWeight: 700 }}>
                    /{cat.slug}
                  </span>
                  <button
                    onClick={() => handleToggleActive(cat)}
                    style={{
                      fontSize: 10.5,
                      padding: '2px 8px',
                      borderRadius: 100,
                      fontWeight: 700,
                      background: cat.is_active ? '#e6fffa' : '#edf2f7',
                      color: cat.is_active ? '#234e52' : '#4a5568'
                    }}
                  >
                    {cat.is_active ? 'Active' : 'Inactive'}
                  </button>
                </div>

                <h3 style={{ fontSize: 20, color: 'var(--pine)', fontWeight: 600 }}>{cat.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.5 }}>
                  {cat.description || 'No description provided.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                <button
                  onClick={() => handleOpenEditModal(cat)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 8,
                    border: '1px solid var(--line)',
                    background: '#fff',
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: 'var(--ink)'
                  }}
                >
                  Edit Category
                </button>
                <button
                  onClick={() => handleDelete(cat)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #f8b4b4',
                    background: '#fdf2f2',
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: '#9b1c1c'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
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
              maxWidth: 460,
              background: 'var(--paper)',
              borderRadius: 22,
              padding: 32,
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--line)'
            }}
          >
            <h2 style={{ fontSize: 22, color: 'var(--pine)', marginBottom: 20 }}>
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                  CATEGORY NAME *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g. Gift Packs"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--line)', fontSize: 14, outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                  URL SLUG *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="gift-packs"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--line)', fontSize: 14, outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Curated festive boxes..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--line)', fontSize: 14, outline: 'none' }}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: 'var(--pine)' }}
                />
                <span>Active &amp; Visible to Customers</span>
              </label>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 20px', borderRadius: 100, border: '1px solid var(--line)', fontSize: 13.5, fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ padding: '10px 24px', fontSize: 13.5, opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Saving...' : editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
