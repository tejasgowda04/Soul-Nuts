import { supabase, isSupabaseConfigured } from './supabase'
import initialProductsData from '../data/products.json'

const LOCAL_STORAGE_PRODUCTS_KEY = 'soulnuts_products_db'
const LOCAL_STORAGE_CATEGORIES_KEY = 'soulnuts_categories_db'
const LOCAL_STORAGE_ORDERS_KEY = 'soulnuts_orders_db'

// Default categories
const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Dry Fruits', slug: 'dry-fruits', description: 'Premium hand-selected dry fruits.', is_active: true },
  { id: 'cat-2', name: 'Nuts', slug: 'nuts', description: 'Creamy and crunchy whole nuts.', is_active: true },
  { id: 'cat-3', name: 'Seeds', slug: 'seeds', description: 'Organic nutrient-rich seeds & blends.', is_active: true },
  { id: 'cat-4', name: 'Ladoos', slug: 'ladoos', description: 'Traditional healthy sweet ladoos.', is_active: true },
  { id: 'cat-5', name: 'Combo Packs', slug: 'combo-packs', description: 'Curated gift boxes and daily pouches.', is_active: true }
]

// Initialize local fallback storage
function getLocalProducts() {
  const data = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY)
  if (data) {
    try {
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    } catch (e) {
      console.error('Failed to parse local products, resetting:', e)
    }
  }

  // Format initial JSON data into table schema
  const formatted = initialProductsData.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.id || generateSlug(p.name),
    description: p.description || '',
    category_slug: p.category,
    price: p.price,
    discount_price: p.discount_price || null,
    stock: p.inStock ? 50 : 0,
    sku: `SN-${p.id.toUpperCase().slice(0, 8)}`,
    unit: p.unit || '250g',
    main_image: p.main_image || '',
    images: p.images || [],
    color_key: p.colorKey || 'almond',
    weight_options: p.weightOptions || [{ label: p.unit || '250g', price: p.price }],
    is_active: p.inStock ?? true,
    featured: p.category === 'ladoos' || p.price > 350,
    created_at: new Date().toISOString()
  }))

  localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(formatted))
  return formatted
}

function saveLocalProducts(products) {
  localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products))
}

function getLocalCategories() {
  const data = localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY)
  if (data) return JSON.parse(data)
  localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES))
  return DEFAULT_CATEGORIES
}

function saveLocalCategories(cats) {
  localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(cats))
}

function getLocalOrders() {
  const data = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY)
  if (data) return JSON.parse(data)
  return []
}

function saveLocalOrders(orders) {
  localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders))
}

// Helper: Auto-generate slug from name
export function generateSlug(name) {
  if (!name) return ''
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/* =========================================================
   PRODUCTS API
   ========================================================= */

export async function fetchProducts({ activeOnly = false, categorySlug = null, featuredOnly = false } = {}) {
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('products').select('*').order('created_at', { ascending: false })
      if (activeOnly) query = query.eq('is_active', true)
      if (featuredOnly) query = query.eq('featured', true)
      if (categorySlug && categorySlug !== 'all') query = query.eq('category_slug', categorySlug)

      const { data, error } = await query
      if (!error && data && data.length > 0) return data
      if (!error && data && data.length === 0) {
        console.info('Supabase table empty, using harvest default products.')
      }
    } catch (e) {
      console.warn('Supabase fetch products error, using fallback:', e)
    }
  }

  // Fallback
  let list = getLocalProducts()
  if (activeOnly) list = list.filter((p) => p.is_active)
  if (featuredOnly) list = list.filter((p) => p.featured)
  if (categorySlug && categorySlug !== 'all') list = list.filter((p) => p.category_slug === categorySlug)
  return list
}

export async function fetchProductBySlug(slug) {
  if (!slug) return null

  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)

  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('products').select('*')
      if (isUUID) {
        query = query.or(`slug.eq.${slug},id.eq.${slug}`)
      } else {
        query = query.eq('slug', slug)
      }

      const { data, error } = await query.maybeSingle()
      if (!error && data) return data
      if (error) {
        console.warn('Supabase product query notice:', error.message)
      }
    } catch (e) {
      console.warn('Supabase fetch product error:', e)
    }
  }

  const list = getLocalProducts()
  const match = list.find(
    (p) =>
      p.slug === slug ||
      p.id === slug ||
      generateSlug(p.name) === slug ||
      (p.slug && p.slug.toLowerCase() === slug.toLowerCase())
  )
  return match || null
}

export async function createProduct(productData) {
  const payload = {
    name: productData.name,
    slug: productData.slug || generateSlug(productData.name),
    description: productData.description || '',
    category_slug: productData.category_slug || 'nuts',
    price: Number(productData.price),
    discount_price: productData.discount_price ? Number(productData.discount_price) : null,
    stock: Number(productData.stock || 0),
    sku: productData.sku || `SN-${Date.now().toString().slice(-6)}`,
    unit: productData.unit || '250g',
    main_image: productData.main_image || '',
    images: productData.images || [],
    color_key: productData.color_key || 'almond',
    weight_options: productData.weight_options || [],
    is_active: productData.is_active ?? true,
    featured: productData.featured ?? false,
    updated_at: new Date().toISOString()
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('products').insert([payload]).select()
      if (!error && data && data.length > 0) return data[0]
      if (error) console.warn('Supabase product insert notice:', error.message)
    } catch (e) {
      console.warn('Supabase product insert error, using local fallback:', e)
    }
  }

  const list = getLocalProducts()
  const newProduct = { ...payload, id: `prod-${Date.now()}`, created_at: new Date().toISOString() }
  list.unshift(newProduct)
  saveLocalProducts(list)
  return newProduct
}

export async function updateProduct(id, productData) {
  const payload = {
    name: productData.name,
    slug: productData.slug || generateSlug(productData.name),
    description: productData.description || '',
    category_slug: productData.category_slug || 'nuts',
    price: Number(productData.price),
    discount_price: productData.discount_price ? Number(productData.discount_price) : null,
    stock: Number(productData.stock || 0),
    sku: productData.sku || `SN-${Date.now().toString().slice(-6)}`,
    unit: productData.unit || '250g',
    main_image: productData.main_image || '',
    images: productData.images || [],
    color_key: productData.color_key || 'almond',
    weight_options: productData.weight_options || [],
    is_active: productData.is_active ?? true,
    featured: productData.featured ?? false,
    updated_at: new Date().toISOString()
  }

  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

  if (isSupabaseConfigured && isUUID) {
    try {
      const { data, error } = await supabase.from('products').update(payload).eq('id', id).select()
      if (!error && data && data.length > 0) return data[0]
      if (error) console.warn('Supabase product update notice:', error.message)
    } catch (e) {
      console.warn('Supabase product update error:', e)
    }
  }

  const list = getLocalProducts()
  const idx = list.findIndex((p) => p.id === id || p.slug === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...payload }
    saveLocalProducts(list)
    return list[idx]
  }

  const newProduct = { ...payload, id: id || `prod-${Date.now()}`, created_at: new Date().toISOString() }
  list.unshift(newProduct)
  saveLocalProducts(list)
  return newProduct
}

export async function deleteProduct(id) {
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

  if (isSupabaseConfigured && isUUID) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (!error) return true
    } catch (e) {
      console.warn('Supabase product delete notice:', e)
    }
  }

  const list = getLocalProducts().filter((p) => p.id !== id && p.slug !== id)
  saveLocalProducts(list)
  return true
}

/* =========================================================
   CATEGORIES API
   ========================================================= */

export async function fetchCategories({ activeOnly = false } = {}) {
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('categories').select('*').order('name', { ascending: true })
      if (activeOnly) query = query.eq('is_active', true)

      const { data, error } = await query
      if (!error && data && data.length > 0) return data
    } catch (e) {
      console.warn('Supabase fetch categories error:', e)
    }
  }

  let list = getLocalCategories()
  if (activeOnly) list = list.filter((c) => c.is_active)
  return list
}

export async function createCategory(catData) {
  const payload = {
    name: catData.name,
    slug: catData.slug || generateSlug(catData.name),
    description: catData.description || '',
    image: catData.image || '',
    is_active: catData.is_active ?? true
  }

  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('categories').insert([payload]).select().single()
    if (error) throw new Error(error.message)
    return data
  }

  const list = getLocalCategories()
  const newCat = { ...payload, id: `cat-${Date.now()}`, created_at: new Date().toISOString() }
  list.push(newCat)
  saveLocalCategories(list)
  return newCat
}

export async function updateCategory(id, catData) {
  const payload = {
    name: catData.name,
    slug: catData.slug || generateSlug(catData.name),
    description: catData.description || '',
    image: catData.image || '',
    is_active: catData.is_active ?? true,
    updated_at: new Date().toISOString()
  }

  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('categories').update(payload).eq('id', id).select().single()
    if (error) throw new Error(error.message)
    return data
  }

  const list = getLocalCategories()
  const idx = list.findIndex((c) => c.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...payload }
    saveLocalCategories(list)
    return list[idx]
  }
  throw new Error('Category not found')
}

export async function deleteCategory(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) throw new Error(error.message)
    return true
  }

  const list = getLocalCategories().filter((c) => c.id !== id)
  saveLocalCategories(list)
  return true
}

/* =========================================================
   ORDERS API
   ========================================================= */

export async function fetchOrders() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false })
      if (!error && data) return data
    } catch (e) {
      console.warn('Supabase fetch orders error:', e)
    }
  }

  return getLocalOrders()
}

export async function createOrder(orderPayload, cartItems) {
  const orderNumber = `SN-ORD-${Date.now().toString().slice(-6)}`
  const orderRecord = {
    order_number: orderNumber,
    customer_name: orderPayload.name,
    email: orderPayload.email,
    phone: orderPayload.phone,
    address: orderPayload.address,
    city: orderPayload.city,
    state: orderPayload.state || 'Karnataka',
    pincode: orderPayload.pincode,
    total_amount: Number(orderPayload.totalAmount),
    payment_status: 'Pending',
    order_status: 'Pending',
    notes: orderPayload.notes || '',
    created_at: new Date().toISOString()
  }

  if (isSupabaseConfigured) {
    try {
      const { data: orderData, error: orderErr } = await supabase
        .from('orders')
        .insert([orderRecord])
        .select()
        .single()

      if (orderErr) throw new Error(orderErr.message)

      const itemsRecords = cartItems.map((item) => ({
        order_id: orderData.id,
        product_id: item.product.id && !item.product.id.startsWith('prod-') ? item.product.id : null,
        product_name: item.product.name,
        quantity: item.quantity,
        price: Number(item.price),
        weight_option: item.selectedWeight || item.product.unit,
        subtotal: Number(item.price) * item.quantity
      }))

      await supabase.from('order_items').insert(itemsRecords)
      return orderData
    } catch (e) {
      console.warn('Supabase order creation failed, storing locally:', e)
    }
  }

  const localOrders = getLocalOrders()
  const fullOrder = {
    ...orderRecord,
    id: `ord-${Date.now()}`,
    order_items: cartItems.map((item) => ({
      id: `item-${Math.random()}`,
      product_name: item.product.name,
      quantity: item.quantity,
      price: item.price,
      weight_option: item.selectedWeight || item.product.unit,
      subtotal: item.price * item.quantity
    }))
  }
  localOrders.unshift(fullOrder)
  saveLocalOrders(localOrders)
  return fullOrder
}

export async function updateOrderStatus(orderId, status) {
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId)

  if (isSupabaseConfigured && isUUID) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ order_status: status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
      if (!error && data && data.length > 0) return data[0]
    } catch (e) {
      console.warn('Supabase update order status error:', e)
    }
  }

  const orders = getLocalOrders()
  const idx = orders.findIndex((o) => o.id === orderId)
  if (idx !== -1) {
    orders[idx].order_status = status
    orders[idx].updated_at = new Date().toISOString()
    saveLocalOrders(orders)
    return orders[idx]
  }
  throw new Error('Order not found')
}

export async function deleteOrder(orderId) {
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId)

  if (isSupabaseConfigured && isUUID) {
    try {
      const { error } = await supabase.from('orders').delete().eq('id', orderId)
      if (!error) return true
    } catch (e) {
      console.warn('Supabase order delete error:', e)
    }
  }

  const orders = getLocalOrders().filter((o) => o.id !== orderId)
  saveLocalOrders(orders)
  return true
}

/* =========================================================
   DASHBOARD STATS API
   ========================================================= */

export async function fetchDashboardStats() {
  const products = await fetchProducts({ activeOnly: false })
  const categories = await fetchCategories({ activeOnly: false })
  const orders = await fetchOrders()

  const activeProducts = products.filter((p) => p.is_active).length
  const lowStockProducts = products.filter((p) => p.stock < 10).length
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0)

  return {
    totalProducts: products.length,
    activeProducts,
    lowStockProducts,
    totalCategories: categories.length,
    totalOrders: orders.length,
    totalRevenue
  }
}

/* =========================================================
   DATABASE SEEDER UTILITY
   ========================================================= */

export async function seedInitialDatabase() {
  const formattedProducts = initialProductsData.map((p) => ({
    name: p.name,
    slug: p.id,
    description: p.description || '',
    category_slug: p.category,
    price: p.price,
    discount_price: null,
    stock: p.inStock ? 50 : 0,
    sku: `SN-${p.id.toUpperCase().slice(0, 8)}`,
    unit: p.unit || '250g',
    main_image: '',
    images: [],
    color_key: p.colorKey || 'almond',
    weight_options: p.weightOptions || [{ label: p.unit || '250g', price: p.price }],
    is_active: p.inStock ?? true,
    featured: p.category === 'ladoos' || p.price > 350
  }))

  if (isSupabaseConfigured) {
    // Seed categories
    await supabase.from('categories').upsert(DEFAULT_CATEGORIES, { onConflict: 'slug' })
    // Seed products
    await supabase.from('products').upsert(formattedProducts, { onConflict: 'slug' })
    return { success: true, message: 'Database seeded into Supabase successfully!' }
  }

  saveLocalCategories(DEFAULT_CATEGORIES)
  saveLocalProducts(formattedProducts.map((p, i) => ({ ...p, id: `prod-seed-${i}`, created_at: new Date().toISOString() })))
  return { success: true, message: 'Local storage database reset & seeded successfully!' }
}
