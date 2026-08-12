import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  fetchProductBySlug,
  fetchCategories,
  createProduct,
  updateProduct,
  generateSlug
} from '../../lib/api'
import { uploadProductImage } from '../../lib/cloudinary'

export default function AdminProductForm() {
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(isEditMode)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category_slug: 'nuts',
    price: '',
    discount_price: '',
    stock: 50,
    sku: '',
    unit: '250g',
    main_image: '',
    images: [],
    color_key: 'almond',
    is_active: true,
    featured: false
  })

  // Weight Options State
  const [weightOptions, setWeightOptions] = useState([
    { label: '250g', price: '' },
    { label: '500g', price: '' }
  ])

  // Image Upload State
  const [uploadingMain, setUploadingMain] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    loadCategoriesAndProduct()
  }, [id])

  const loadCategoriesAndProduct = async () => {
    try {
      const cats = await fetchCategories({ activeOnly: false })
      setCategories(cats)

      if (isEditMode) {
        const prod = await fetchProductBySlug(id)
        if (prod) {
          setFormData({
            name: prod.name || '',
            slug: prod.slug || '',
            description: prod.description || '',
            category_slug: prod.category_slug || 'nuts',
            price: prod.price || '',
            discount_price: prod.discount_price || '',
            stock: prod.stock ?? 50,
            sku: prod.sku || '',
            unit: prod.unit || '250g',
            main_image: prod.main_image || '',
            images: prod.images || [],
            color_key: prod.color_key || 'almond',
            is_active: prod.is_active ?? true,
            featured: prod.featured ?? false
          })

          if (prod.weight_options && prod.weight_options.length > 0) {
            setWeightOptions(prod.weight_options)
          }
        } else {
          setErrorMsg('Product not found.')
        }
      }
    } catch (e) {
      console.error('Error initializing form:', e)
      setErrorMsg('Failed to load details.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Name change & Auto-generate Slug
  const handleNameChange = (e) => {
    const val = e.target.value
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: !isEditMode || !prev.slug ? generateSlug(val) : prev.slug
    }))
  }

  // Main Image Upload Flow via Cloudinary
  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingMain(true)
    setUploadProgress(0)
    setErrorMsg('')

    try {
      const imageUrl = await uploadProductImage(file, (percent) => {
        setUploadProgress(percent)
      })
      setFormData((prev) => ({ ...prev, main_image: imageUrl }))
    } catch (err) {
      setErrorMsg(err.message || 'Image upload failed.')
    } finally {
      setUploadingMain(false)
    }
  }

  // Additional Images Upload Flow
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return

    setErrorMsg('')
    try {
      const uploadPromises = files.map((file) => uploadProductImage(file))
      const urls = await Promise.all(uploadPromises)
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...urls]
      }))
    } catch (err) {
      setErrorMsg(err.message || 'Gallery images upload failed.')
    }
  }

  const handleRemoveGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  // Weight Option Handlers
  const handleWeightOptionChange = (index, field, value) => {
    setWeightOptions((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleAddWeightOption = () => {
    setWeightOptions((prev) => [...prev, { label: '', price: '' }])
  }

  const handleRemoveWeightOption = (index) => {
    setWeightOptions((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    // Validation
    if (!formData.name.trim()) return setErrorMsg('Product Name is required.')
    if (!formData.price || Number(formData.price) <= 0) return setErrorMsg('Price must be greater than zero.')
    if (Number(formData.stock) < 0) return setErrorMsg('Stock cannot be negative.')

    setSubmitting(true)

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        discount_price: formData.discount_price ? Number(formData.discount_price) : null,
        stock: Number(formData.stock),
        weight_options: weightOptions.filter((opt) => opt.label && opt.price)
      }

      if (isEditMode) {
        await updateProduct(id, payload)
      } else {
        await createProduct(payload)
      }

      navigate('/admin/products')
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save product.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading product details...</div>
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header & Back Link */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link to="/admin/products" style={{ fontSize: 13, color: 'var(--rust)', fontWeight: 700 }}>
            ← Back to Products List
          </Link>
          <h1 style={{ fontSize: 28, color: 'var(--pine)', fontWeight: 600, marginTop: 4 }}>
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
      </div>

      {errorMsg && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: 12,
            background: '#fdf2f2',
            border: '1px solid #f8b4b4',
            color: '#9b1c1c',
            fontSize: 13.5
          }}
        >
          {errorMsg}
        </div>
      )}

      {/* Main Product Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--paper)',
          borderRadius: 24,
          border: '1px solid var(--line)',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}
      >
        {/* Basic Info Section */}
        <div>
          <h3 style={{ fontSize: 17, color: 'var(--pine)', marginBottom: 16 }}>1. Basic Product Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                PRODUCT NAME *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Californian Almonds"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  fontSize: 14,
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                SEO SLUG *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="californian-almonds"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  fontSize: 14,
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                SKU / CODE
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="SN-ALMOND-250"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  fontSize: 14,
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                CATEGORY *
              </label>
              <select
                value={formData.category_slug}
                onChange={(e) => setFormData({ ...formData, category_slug: e.target.value })}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  fontSize: 14,
                  fontWeight: 600,
                  outline: 'none'
                }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                DEFAULT UNIT
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="250g"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  fontSize: 14,
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                PRODUCT DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Crunchy, protein-rich whole almonds — daily-habit ready."
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  fontSize: 14,
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--line)' }} />

        {/* Pricing & Stock Section */}
        <div>
          <h3 style={{ fontSize: 17, color: 'var(--pine)', marginBottom: 16 }}>2. Pricing &amp; Inventory</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                REGULAR PRICE (₹) *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="299"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  fontSize: 14,
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                DISCOUNT / ORIGINAL PRICE (₹)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={formData.discount_price}
                onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
                placeholder="349"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  fontSize: 14,
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
                STOCK COUNT (UNITS) *
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="50"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  fontSize: 14,
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Weight Options Selector */}
          <div style={{ marginTop: 20 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 10 }}>
              PACK WEIGHT VARIATIONS
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {weightOptions.map((opt, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Weight Label (e.g. 250g)"
                    value={opt.label}
                    onChange={(e) => handleWeightOptionChange(idx, 'label', e.target.value)}
                    style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 13 }}
                  />
                  <input
                    type="number"
                    placeholder="Price ₹"
                    value={opt.price}
                    onChange={(e) => handleWeightOptionChange(idx, 'price', e.target.value)}
                    style={{ width: 120, padding: '9px 12px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 13 }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveWeightOption(idx)}
                    style={{ color: '#c53030', padding: 8, fontWeight: 700 }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddWeightOption}
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: 'var(--rust)',
                  marginTop: 4
                }}
              >
                + Add Weight Variant
              </button>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--line)' }} />

        {/* Media / Image Upload Section */}
        <div>
          <h3 style={{ fontSize: 17, color: 'var(--pine)', marginBottom: 16 }}>3. Product Photography (Cloudinary)</h3>

          {/* Main Image */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>
              MAIN PRODUCT IMAGE
            </label>

            {formData.main_image ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <img
                  src={formData.main_image}
                  alt="Main Preview"
                  style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12, border: '1px solid var(--line)' }}
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, main_image: '' })}
                  style={{ fontSize: 12.5, color: '#c53030', fontWeight: 700 }}
                >
                  Remove / Replace Image
                </button>
              </div>
            ) : (
              <div
                style={{
                  border: '2px dashed var(--line)',
                  borderRadius: 14,
                  padding: 24,
                  textAlign: 'center',
                  background: 'var(--ivory)'
                }}
              >
                <input type="file" accept="image/*" onChange={handleMainImageUpload} disabled={uploadingMain} id="main-img-input" style={{ display: 'none' }} />
                <label htmlFor="main-img-input" style={{ cursor: 'pointer', display: 'inline-block' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--pine)' }}>
                    {uploadingMain ? `Uploading to Cloudinary... ${uploadProgress}%` : 'Click to Upload Main Photo'}
                  </div>
                  <span style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>PNG, JPG or WEBP (Max 5MB)</span>
                </label>
              </div>
            )}
          </div>

          {/* Additional Images Gallery */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>
              ADDITIONAL GALLERY IMAGES
            </label>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
              {formData.images.map((imgUrl, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src={imgUrl} alt={`Gallery ${i}`} style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 10, border: '1px solid var(--line)' }} />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(i)}
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      background: '#c53030',
                      color: '#fff',
                      borderRadius: '50%',
                      width: 18,
                      height: 18,
                      fontSize: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} id="gallery-input" style={{ display: 'none' }} />
            <label htmlFor="gallery-input" style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--rust)', cursor: 'pointer' }}>
              + Add Gallery Photos
            </label>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--line)' }} />

        {/* Toggles / Options */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: 'var(--pine)' }}
            />
            <span>Active &amp; Published on Website</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: 'var(--rust)' }}
            />
            <span>Mark as Featured Product</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', marginTop: 12 }}>
          <Link
            to="/admin/products"
            style={{
              padding: '13px 24px',
              borderRadius: 100,
              border: '1.4px solid var(--line)',
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--ink)',
              textDecoration: 'none'
            }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ padding: '13px 32px', fontSize: 14, opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
