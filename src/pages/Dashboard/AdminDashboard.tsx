import { useCallback, useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { Link, Navigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, Tag, ShoppingCart,
  Users, FileText, Mail, Ticket, Calendar,
  Plus, Edit2, Trash2, X, Upload,
  TrendingUp, AlertCircle
} from 'lucide-react'
import api from '@/api/axios'
import toast from 'react-hot-toast'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Product {
  id: number; name: string; slug: string; price: number; compare_price?: number
  stock: number; category_id?: number; is_active: boolean
  image_url?: string; description?: string; discount_type?: string
  discount_value?: number; is_featured?: boolean; weight?: string
  material?: string; origin?: string; sku?: string
}
interface Category { id: number; name: string; slug: string; description?: string; image_url?: string }
interface Order { id: number; status: string; total: number; payment_status: string; created_at: string; user?: { id: number; full_name: string; email: string } }
interface User { id: number; full_name: string; email: string; is_admin: boolean; is_active: boolean; created_at: string }
interface Booking { id: number; service_type?: string; date?: string; time_slot?: string; status: string; amount?: number; created_at: string; user?: { id: number; full_name: string; email: string } }
interface Coupon { id: number; code: string; discount_type: string; discount_value: number; is_active: boolean; used_count: number }
interface Blog { id: number; title: string; slug: string; is_published: boolean; created_at: string }
interface Contact { id: number; name: string; email: string; message: string; is_read: boolean; created_at: string }
interface Stats { total_products: number; total_orders: number; total_users: number; total_revenue: number; pending_orders: number; unread_contacts: number; total_bookings: number }
type AdminTab = 'overview' | 'products' | 'categories' | 'orders' | 'users' | 'bookings' | 'coupons' | 'blogs' | 'contacts'
const API_ORIGIN = new URL(import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1').origin

function resolveAssetUrl(url?: string) {
  if (!url) {
    return ''
  }

  if (/^https?:\/\//i.test(url) || url.startsWith('blob:') || url.startsWith('data:')) {
    return url
  }

  return `${API_ORIGIN}${url.startsWith('/') ? url : `/${url}`}`
}

function getStorefrontProductPath(slug?: string) {
  return slug ? `/shop/${slug}` : '/shop'
}

const DEFAULT_CATEGORY_SUGGESTIONS = [
  {
    name: 'Gemstones',
    description: 'Certified gemstones recommended for planetary balance and Vedic remedies.'
  },
  {
    name: 'Rudraksha',
    description: 'Authentic Nepali and Indonesian Rudraksha beads for spiritual growth and protection.'
  },
  {
    name: 'Yantra',
    description: 'Sacred energized Yantras for prosperity, protection, and vastu correction.'
  },
  {
    name: 'Vastu Products',
    description: 'Vastu tools and remedies to improve harmony in homes and workplaces.'
  },
  {
    name: 'Bracelets & Pendants',
    description: 'Wearable spiritual accessories including pendants, malas, and healing bracelets.'
  },
  {
    name: 'Puja Essentials',
    description: 'Daily ritual items used for energizing, worship, and spiritual practice.'
  }
]

// ── Modal Component ───────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'var(--color-bg)',
        borderRadius: '1.5rem',
        width: '100%', maxWidth: '640px',
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(201,151,42,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(250,242,226,0.5)',
          borderRadius: '1.5rem 1.5rem 0 0'
        }}>
          <h3 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-earth)' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: '2rem' }}>{children}</div>
      </div>
    </div>
  )
}

// ── Form Field Component ──────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-accent)',
        fontSize: '0.7rem',
        letterSpacing: '0.12em',
        color: 'var(--color-earth)',
        fontWeight: 700,
        textTransform: 'uppercase',
        marginBottom: '0.5rem'
      }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '1px solid rgba(201,151,42,0.3)',
  borderRadius: '0.75rem',
  background: 'white',
  color: 'var(--color-earth)',
  fontSize: '0.9rem',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  boxSizing: 'border-box' as const
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuthStore()
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')
  const [stats, setStats] = useState<Stats | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [showModal, setShowModal] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<Product | Category | Order | User | Coupon | Blog | null>(null)
  const [loading, setLoading] = useState(false)
  const [tabLoading, setTabLoading] = useState(false)
  const [tabError, setTabError] = useState('')

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', compare_price: '',
    discount_type: '', discount_value: '', stock: '0',
    category_id: '', is_featured: false, weight: '',
    material: '', origin: '', sku: '', is_active: true
  })
  const [productImage, setProductImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  // Category form
  const [catForm, setCatForm] = useState({ name: '', description: '' })
  const [catImage, setCatImage] = useState<File | null>(null)

  // Coupon form
  const [couponForm, setCouponForm] = useState({
    code: '', discount_type: 'percentage', discount_value: '',
    min_order_amount: '0', max_uses: '', is_active: true, expiry_date: ''
  })

  // Blog form
  const [blogForm, setBlogForm] = useState({
    title: '', content: '', excerpt: '', image_url: '', is_published: true, tags: ''
  })
  const canAccessAdmin = Boolean(isAuthenticated && user?.is_admin)

  const bootstrapCategories = useCallback(async ({ notify = true }: { notify?: boolean } = {}) => {
    for (const category of DEFAULT_CATEGORY_SUGGESTIONS) {
      const formData = new FormData()
      formData.append('name', category.name)
      formData.append('description', category.description)

      try {
        await api.post('/admin/categories', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } catch (error: unknown) {
        const status = typeof error === 'object' && error !== null && 'response' in error
          ? (error as { response?: { status?: number } }).response?.status
          : undefined
        if (status !== 400 && status !== 409) {
          throw error
        }
      }
    }

    const response = await api.get('/admin/categories')
    setCategories(response.data)

    if (notify) {
      toast.success('Suggested categories added.')
    }

    return response.data as Category[]
  }, [])

  const loadData = useCallback(async (tab: AdminTab, { silent = false }: { silent?: boolean } = {}) => {
    if (!canAccessAdmin) {
      return
    }

    try {
      if (!silent) {
        setTabLoading(true)
      }
      setTabError('')

      if (tab === 'overview') {
        const r = await api.get('/admin/stats')
        setStats(r.data)
      } else if (tab === 'products') {
        const [p, c] = await Promise.all([api.get('/admin/products'), api.get('/admin/categories')])
        setProducts(p.data)
        if (c.data.length === 0) {
          await bootstrapCategories({ notify: !silent })
        } else {
          setCategories(c.data)
        }
      } else if (tab === 'categories') {
        const r = await api.get('/admin/categories')
        if (r.data.length === 0) {
          await bootstrapCategories({ notify: !silent })
        } else {
          setCategories(r.data)
        }
      } else if (tab === 'orders') {
        const r = await api.get('/admin/orders')
        setOrders(r.data)
      } else if (tab === 'users') {
        const r = await api.get('/admin/users')
        setUsers(r.data)
      } else if (tab === 'bookings') {
        const r = await api.get('/admin/bookings')
        setBookings(r.data)
      } else if (tab === 'coupons') {
        const r = await api.get('/admin/coupons')
        setCoupons(r.data)
      } else if (tab === 'blogs') {
        const r = await api.get('/admin/blogs')
        setBlogs(r.data)
      } else if (tab === 'contacts') {
        const r = await api.get('/admin/contacts')
        setContacts(r.data)
      }
    } catch (error) {
      console.error(error)
      setTabError(`Failed to load ${tab}. Please try again.`)
    } finally {
      if (!silent) {
        setTabLoading(false)
      }
    }
  }, [bootstrapCategories, canAccessAdmin])

  const refreshActiveTab = useCallback(async () => {
    await loadData(activeTab, { silent: true })
  }, [activeTab, loadData])

  useEffect(() => {
    if (!canAccessAdmin) {
      return
    }

    void loadData(activeTab)
  }, [activeTab, canAccessAdmin, loadData])

  useEffect(() => {
    if (!canAccessAdmin) {
      return
    }

    const refreshTab = () => {
      void loadData(activeTab, { silent: true })
    }

    const intervalId = window.setInterval(refreshTab, 15000)
    window.addEventListener('focus', refreshTab)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', refreshTab)
    }
  }, [activeTab, canAccessAdmin, loadData])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user) {
    return null
  }

  if (!user.is_admin) {
    return <Navigate to="/dashboard" replace />
  }

  // ── Product Submit ──────────────────────────────────────────────────────────
  const handleProductSubmit = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(productForm).forEach(([k, v]) => {
        if (v !== '' && v !== null) formData.append(k, String(v))
      })
      if (productImage) formData.append('image', productImage)

      if (editItem) {
        await api.put(`/admin/products/${editItem.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Product updated!')
      } else {
        await api.post('/admin/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Product created!')
      }
      setShowModal(null); setEditItem(null)
      resetProductForm()
      await refreshActiveTab()
    } catch {
      toast.error('Failed to save product')
    } finally { setLoading(false) }
  }

  const resetProductForm = () => {
    setProductForm({
      name: '', description: '', price: '', compare_price: '',
      discount_type: '', discount_value: '', stock: '0',
      category_id: '', is_featured: false, weight: '',
      material: '', origin: '', sku: '', is_active: true
    })
    setProductImage(null); setImagePreview('')
  }

  const openEditProduct = (p: Product) => {
    setEditItem(p)
    setProductForm({
      name: p.name, description: p.description || '',
      price: String(p.price), compare_price: String(p.compare_price || ''),
      discount_type: p.discount_type || '', discount_value: String(p.discount_value || ''),
      stock: String(p.stock), category_id: String(p.category_id || ''),
      is_featured: p.is_featured || false, weight: p.weight || '',
      material: p.material || '', origin: p.origin || '',
      sku: p.sku || '', is_active: p.is_active
    })
    setImagePreview(resolveAssetUrl(p.image_url))
    setShowModal('product')
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Delete this product?')) return
    await api.delete(`/admin/products/${id}`)
    toast.success('Product deleted')
    await refreshActiveTab()
  }

  // ── Category Submit ─────────────────────────────────────────────────────────
  const handleCatSubmit = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', catForm.name)
      formData.append('description', catForm.description)
      if (catImage) formData.append('image', catImage)

      if (editItem) {
        await api.put(`/admin/categories/${editItem.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Category updated!')
      } else {
        await api.post('/admin/categories', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Category created!')
      }
      setShowModal(null); setEditItem(null)
      setCatForm({ name: '', description: '' }); setCatImage(null)
      await refreshActiveTab()
    } catch { toast.error('Failed to save category') }
    finally { setLoading(false) }
  }

  // ── Coupon Submit ───────────────────────────────────────────────────────────
  const handleCouponSubmit = async () => {
    setLoading(true)
    try {
      await api.post('/admin/coupons', {
        ...couponForm,
        discount_value: parseFloat(couponForm.discount_value),
        min_order_amount: parseFloat(couponForm.min_order_amount || '0'),
        max_uses: couponForm.max_uses ? parseInt(couponForm.max_uses) : null
      })
      toast.success('Coupon created!')
      setShowModal(null)
      setCouponForm({ code: '', discount_type: 'percentage', discount_value: '', min_order_amount: '0', max_uses: '', is_active: true, expiry_date: '' })
      await refreshActiveTab()
    } catch { toast.error('Failed to create coupon') }
    finally { setLoading(false) }
  }

  // ── Blog Submit ─────────────────────────────────────────────────────────────
  const handleBlogSubmit = async () => {
    setLoading(true)
    try {
      const payload = {
        ...blogForm,
        tags: blogForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      }
      if (editItem) {
        await api.put(`/admin/blogs/${editItem.id}`, payload)
        toast.success('Blog updated!')
      } else {
        await api.post('/admin/blogs', payload)
        toast.success('Blog created!')
      }
      setShowModal(null); setEditItem(null)
      setBlogForm({ title: '', content: '', excerpt: '', image_url: '', is_published: true, tags: '' })
      await refreshActiveTab()
    } catch { toast.error('Failed to save blog') }
    finally { setLoading(false) }
  }

  const tabs = [
    { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { id: 'products', icon: <Package size={18} />, label: 'Products' },
    { id: 'categories', icon: <Tag size={18} />, label: 'Categories' },
    { id: 'orders', icon: <ShoppingCart size={18} />, label: 'Orders' },
    { id: 'users', icon: <Users size={18} />, label: 'Users' },
    { id: 'bookings', icon: <Calendar size={18} />, label: 'Bookings' },
    { id: 'coupons', icon: <Ticket size={18} />, label: 'Coupons' },
    { id: 'blogs', icon: <FileText size={18} />, label: 'Blogs' },
    { id: 'contacts', icon: <Mail size={18} />, label: 'Contacts' },
  ]

  const sectionHeader = (label: string, title: string, btnLabel?: string, onBtn?: () => void) => (
    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div>
        <p style={{ fontFamily: 'var(--font-accent)', fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--color-saffron)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</p>
        <h2 className="font-serif" style={{ fontSize: '2rem', color: 'var(--color-earth)' }}>{title}</h2>
        <div style={{ width: '48px', height: '3px', background: 'var(--color-gold)', marginTop: '0.75rem' }} />
      </div>
      {btnLabel && onBtn && (
        <button onClick={onBtn} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
          <Plus size={16} /> {btnLabel}
        </button>
      )}
    </div>
  )

  const tableHeader = (cols: string[]) => (
    <thead>
      <tr style={{ background: 'rgba(250,242,226,0.5)', fontSize: '0.68rem', fontFamily: 'var(--font-accent)', letterSpacing: '0.12em', color: 'var(--color-earth)', fontWeight: 700, textTransform: 'uppercase' }}>
        {cols.map(c => <th key={c} style={{ padding: '1rem 1.5rem', textAlign: 'left', whiteSpace: 'nowrap' }}>{c}</th>)}
      </tr>
    </thead>
  )

  const badge = (text: string, color: 'green' | 'red' | 'orange' | 'gold') => {
    const colors = {
      green: { bg: '#e8f5e9', text: '#2e7d32' },
      red: { bg: '#fce4ec', text: '#c62828' },
      orange: { bg: 'rgba(199,69,0,0.08)', text: 'var(--color-saffron)' },
      gold: { bg: 'rgba(201,151,42,0.1)', text: 'var(--color-gold)' }
    }
    return (
      <span style={{ padding: '0.2rem 0.75rem', borderRadius: '1rem', fontSize: '0.65rem', fontFamily: 'var(--font-accent)', fontWeight: 700, background: colors[color].bg, color: colors[color].text }}>
        {text?.toUpperCase()}
      </span>
    )
  }

  return (
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ paddingTop: '7rem', paddingBottom: '2rem', background: 'linear-gradient(135deg, rgba(199,69,0,0.04), rgba(201,151,42,0.04))', borderBottom: '1px solid rgba(201,151,42,0.1)' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-accent)', fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--color-saffron)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>ADMIN PANEL</p>
          <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Welcome back, {user?.full_name} — Full access enabled</p>
        </div>
      </section>

      <section style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'flex-start' }}>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: '6rem' }}>
              <div style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(201,151,42,0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                    width: '100%', padding: '1rem 1.25rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    fontSize: '0.82rem', fontFamily: 'var(--font-accent)',
                    letterSpacing: '0.04em', fontWeight: 600, cursor: 'pointer',
                    border: 'none', borderBottom: '1px solid rgba(201,151,42,0.06)',
                    borderLeft: activeTab === tab.id ? '3px solid var(--color-saffron)' : '3px solid transparent',
                    background: activeTab === tab.id ? 'linear-gradient(135deg, rgba(199,69,0,0.05), rgba(201,151,42,0.05))' : 'transparent',
                    color: activeTab === tab.id ? 'var(--color-saffron)' : 'var(--color-earth)',
                    transition: 'all 0.2s', textAlign: 'left'
                  }}>
                    <span style={{ color: activeTab === tab.id ? 'var(--color-saffron)' : 'var(--color-gold)' }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <div>
              {tabLoading && (
                <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  Loading {activeTab}...
                </div>
              )}

              {!tabLoading && tabError && (
                <div style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', borderRadius: '0.75rem', background: 'rgba(199,69,0,0.08)', color: 'var(--color-saffron)', fontWeight: 600 }}>
                  {tabError}
                </div>
              )}

              {/* OVERVIEW */}
              {!tabLoading && activeTab === 'overview' && stats && (
                <div>
                  {sectionHeader('DASHBOARD', 'Overview')}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    {[
                      { label: 'Products', val: stats.total_products, icon: <Package size={24} />, color: 'var(--color-gold)' },
                      { label: 'Orders', val: stats.total_orders, icon: <ShoppingCart size={24} />, color: 'var(--color-saffron)' },
                      { label: 'Users', val: stats.total_users, icon: <Users size={24} />, color: 'var(--color-earth)' },
                      { label: 'Revenue', val: `₹${(stats.total_revenue || 0).toLocaleString('en-IN')}`, icon: <TrendingUp size={24} />, color: '#2e7d32' },
                    ].map((s, i) => (
                      <div key={i} style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid rgba(201,151,42,0.12)', textAlign: 'center' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: `2px solid ${s.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, margin: '0 auto 0.75rem' }}>{s.icon}</div>
                        <div style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', color: s.color, fontWeight: 700 }}>{s.val}</div>
                        <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-accent)', letterSpacing: '0.1em', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid rgba(201,151,42,0.12)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <AlertCircle size={20} style={{ color: 'var(--color-saffron)' }} />
                        <span className="font-serif" style={{ color: 'var(--color-earth)' }}>Pending Orders</span>
                      </div>
                      <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-saffron)' }}>{stats.pending_orders}</div>
                    </div>
                    <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid rgba(201,151,42,0.12)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <Mail size={20} style={{ color: 'var(--color-gold)' }} />
                        <span className="font-serif" style={{ color: 'var(--color-earth)' }}>Unread Messages</span>
                      </div>
                      <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>{stats.unread_contacts}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* PRODUCTS */}
              {!tabLoading && activeTab === 'products' && (
                <div>
                  {sectionHeader('CATALOG', 'Products', 'Add Product', () => { resetProductForm(); setEditItem(null); setShowModal('product') })}
                  <div style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(201,151,42,0.12)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      {tableHeader(['Image', 'Name', 'Price', 'Discount', 'Stock', 'Category', 'Status', 'Actions'])}
                      <tbody>
                        {products.map(p => (
                          <tr key={p.id} style={{ borderTop: '1px solid rgba(201,151,42,0.06)', fontSize: '0.875rem' }}>
                            <td style={{ padding: '0.75rem 1.5rem' }}>
                              <Link to={getStorefrontProductPath(p.slug)} style={{ display: 'inline-flex' }}>
                                <img src={resolveAssetUrl(p.image_url) || 'https://via.placeholder.com/48'} alt={p.name} style={{ width: '48px', height: '48px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                              </Link>
                            </td>
                            <td style={{ padding: '0.75rem 1.5rem', color: 'var(--color-earth)', fontWeight: 600 }}>
                              <Link to={getStorefrontProductPath(p.slug)} style={{ color: 'var(--color-earth)', textDecoration: 'none' }}>
                                <div style={{ color: 'var(--color-earth)' }}>{p.name}</div>
                              </Link>
                              {p.sku && <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>SKU: {p.sku}</div>}
                            </td>
                            <td style={{ padding: '0.75rem 1.5rem', color: 'var(--color-earth)', fontWeight: 700 }}>₹{p.price?.toLocaleString('en-IN')}</td>
                            <td style={{ padding: '0.75rem 1.5rem' }}>
                              {p.discount_value ? badge(`${p.discount_type === 'percentage' ? p.discount_value + '%' : '₹' + p.discount_value} off`, 'green') : <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>—</span>}
                            </td>
                            <td style={{ padding: '0.75rem 1.5rem' }}>
                              {badge(String(p.stock), p.stock > 10 ? 'green' : p.stock > 0 ? 'orange' : 'red')}
                            </td>
                            <td style={{ padding: '0.75rem 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                              {categories.find(c => c.id === p.category_id)?.name || '—'}
                            </td>
                            <td style={{ padding: '0.75rem 1.5rem' }}>
                              {badge(p.is_active ? 'Active' : 'Inactive', p.is_active ? 'green' : 'red')}
                            </td>
                            <td style={{ padding: '0.75rem 1.5rem' }}>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Link to={getStorefrontProductPath(p.slug)} style={{ padding: '0.4rem 0.65rem', background: 'rgba(46,125,50,0.08)', borderRadius: '0.5rem', color: '#2e7d32', textDecoration: 'none', fontSize: '0.7rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>
                                  VIEW
                                </Link>
                                <button onClick={() => openEditProduct(p)} style={{ padding: '0.4rem', background: 'rgba(201,151,42,0.1)', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--color-gold)' }}><Edit2 size={14} /></button>
                                <button onClick={() => handleDeleteProduct(p.id)} style={{ padding: '0.4rem', background: 'rgba(199,69,0,0.08)', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--color-saffron)' }}><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {products.length === 0 && (
                      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        No products yet. <button onClick={() => { resetProductForm(); setShowModal('product') }} style={{ color: 'var(--color-saffron)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Add first product →</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CATEGORIES */}
              {activeTab === 'categories' && (
                <div>
                  {sectionHeader('CATALOG', 'Categories', 'Add Category', () => { setCatForm({ name: '', description: '' }); setEditItem(null); setShowModal('category') })}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                    {categories.map(c => (
                      <div key={c.id} style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(201,151,42,0.12)' }}>
                        {c.image_url && <img src={resolveAssetUrl(c.image_url)} alt={c.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />}
                        <div style={{ padding: '1.25rem' }}>
                          <h3 className="font-serif" style={{ color: 'var(--color-earth)', marginBottom: '0.5rem' }}>{c.name}</h3>
                          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>{c.description}</p>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => { setEditItem(c); setCatForm({ name: c.name, description: c.description || '' }); setShowModal('category') }} style={{ flex: 1, padding: '0.5rem', background: 'rgba(201,151,42,0.1)', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--color-gold)', fontFamily: 'var(--font-accent)', fontSize: '0.7rem', fontWeight: 700 }}>EDIT</button>
                            <button onClick={async () => { if (confirm('Delete?')) { await api.delete(`/admin/categories/${c.id}`); await refreshActiveTab() } }} style={{ flex: 1, padding: '0.5rem', background: 'rgba(199,69,0,0.08)', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--color-saffron)', fontFamily: 'var(--font-accent)', fontSize: '0.7rem', fontWeight: 700 }}>DELETE</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {categories.length === 0 && (
                      <div style={{ gridColumn: '1/-1', padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)', background: 'white', borderRadius: '1.25rem', border: '1px dashed rgba(201,151,42,0.25)' }}>
                        <p style={{ marginBottom: '1rem' }}>No categories yet. Add a suggested set based on your current catalog.</p>
                        <button onClick={async () => { try { await bootstrapCategories() } catch { toast.error('Failed to add suggested categories') } }} className="btn-primary">
                          Add Suggested Categories
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ORDERS */}
              {!tabLoading && activeTab === 'orders' && (
                <div>
                  {sectionHeader('MANAGEMENT', 'Orders')}
                  <div style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(201,151,42,0.12)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      {tableHeader(['Order ID', 'User', 'Total', 'Status', 'Payment', 'Date', 'Actions'])}
                      <tbody>
                        {orders.map(o => (
                          <tr key={o.id} style={{ borderTop: '1px solid rgba(201,151,42,0.06)', fontSize: '0.875rem' }}>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-earth)' }}>ORD-{String(o.id).padStart(4, '0')}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{o.user?.email || '—'}</td>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>₹{o.total?.toLocaleString('en-IN')}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{badge(o.status, o.status === 'delivered' ? 'green' : o.status === 'pending' ? 'orange' : 'gold')}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{badge(o.payment_status, o.payment_status === 'paid' ? 'green' : 'red')}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>
                              <select onChange={async (e) => { await api.patch(`/admin/orders/${o.id}?status=${e.target.value}`); toast.success('Status updated'); await refreshActiveTab() }}
                                defaultValue={o.status}
                                style={{ ...inputStyle, padding: '0.3rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}>
                                {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {orders.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No orders yet.</div>}
                  </div>
                </div>
              )}

              {/* USERS */}
              {!tabLoading && activeTab === 'users' && (
                <div>
                  {sectionHeader('MANAGEMENT', 'Users')}
                  <div style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(201,151,42,0.12)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      {tableHeader(['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'])}
                      <tbody>
                        {users.map(u => (
                          <tr key={u.id} style={{ borderTop: '1px solid rgba(201,151,42,0.06)', fontSize: '0.875rem' }}>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-earth)' }}>{u.full_name}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{u.email}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{badge(u.is_admin ? 'Admin' : 'User', u.is_admin ? 'gold' : 'green')}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{badge(u.is_active ? 'Active' : 'Inactive', u.is_active ? 'green' : 'red')}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{new Date(u.created_at).toLocaleDateString('en-IN')}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>
                              <button onClick={async () => { await api.patch(`/admin/users/${u.id}/toggle-active`); await refreshActiveTab() }}
                                style={{ padding: '0.3rem 0.75rem', background: u.is_active ? 'rgba(199,69,0,0.08)' : '#e8f5e9', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', color: u.is_active ? 'var(--color-saffron)' : '#2e7d32', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-accent)' }}>
                                {u.is_active ? 'DEACTIVATE' : 'ACTIVATE'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {users.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No registered users yet.</div>}
                  </div>
                </div>
              )}

              {/* BOOKINGS */}
              {!tabLoading && activeTab === 'bookings' && (
                <div>
                  {sectionHeader('SCHEDULE', 'Bookings')}
                  <div style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(201,151,42,0.12)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      {tableHeader(['User', 'Service', 'Date', 'Time', 'Status', 'Amount'])}
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking.id} style={{ borderTop: '1px solid rgba(201,151,42,0.06)', fontSize: '0.875rem' }}>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-earth)' }}>{booking.user?.email || booking.user?.full_name || '-'}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{booking.service_type || '-'}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{booking.date || '-'}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{booking.time_slot || '-'}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{badge(booking.status, booking.status === 'confirmed' ? 'green' : booking.status === 'pending' ? 'orange' : 'gold')}</td>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>{booking.amount ? `Rs ${booking.amount.toLocaleString('en-IN')}` : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {bookings.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No bookings yet.</div>}
                  </div>
                </div>
              )}

              {/* COUPONS */}
              {!tabLoading && activeTab === 'coupons' && (
                <div>
                  {sectionHeader('DISCOUNTS', 'Coupons', 'Add Coupon', () => setShowModal('coupon'))}
                  <div style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(201,151,42,0.12)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      {tableHeader(['Code', 'Type', 'Value', 'Min Order', 'Used', 'Status', 'Actions'])}
                      <tbody>
                        {coupons.map(c => (
                          <tr key={c.id} style={{ borderTop: '1px solid rgba(201,151,42,0.06)', fontSize: '0.875rem' }}>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-earth)', fontFamily: 'monospace' }}>{c.code}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{badge(c.discount_type, 'gold')}</td>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>{c.discount_type === 'percentage' ? `${c.discount_value}%` : `₹${c.discount_value}`}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>₹{c.discount_value}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{c.used_count}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{badge(c.is_active ? 'Active' : 'Inactive', c.is_active ? 'green' : 'red')}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>
                              <button onClick={async () => { if (confirm('Delete?')) { await api.delete(`/admin/coupons/${c.id}`); await refreshActiveTab() } }}
                                style={{ padding: '0.3rem 0.75rem', background: 'rgba(199,69,0,0.08)', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--color-saffron)', fontSize: '0.7rem', fontWeight: 700 }}>DELETE</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {coupons.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No coupons yet.</div>}
                  </div>
                </div>
              )}

              {/* BLOGS */}
              {!tabLoading && activeTab === 'blogs' && (
                <div>
                  {sectionHeader('CONTENT', 'Blogs', 'Add Blog', () => { setBlogForm({ title: '', content: '', excerpt: '', image_url: '', is_published: true, tags: '' }); setEditItem(null); setShowModal('blog') })}
                  <div style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(201,151,42,0.12)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      {tableHeader(['Title', 'Status', 'Date', 'Actions'])}
                      <tbody>
                        {blogs.map(b => (
                          <tr key={b.id} style={{ borderTop: '1px solid rgba(201,151,42,0.06)', fontSize: '0.875rem' }}>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-earth)' }}>{b.title}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{badge(b.is_published ? 'Published' : 'Draft', b.is_published ? 'green' : 'orange')}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{new Date(b.created_at).toLocaleDateString('en-IN')}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => { setEditItem(b); setBlogForm({ title: b.title, content: '', excerpt: '', image_url: '', is_published: b.is_published, tags: '' }); setShowModal('blog') }} style={{ padding: '0.4rem', background: 'rgba(201,151,42,0.1)', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--color-gold)' }}><Edit2 size={14} /></button>
                                <button onClick={async () => { if (confirm('Delete?')) { await api.delete(`/admin/blogs/${b.id}`); await refreshActiveTab() } }} style={{ padding: '0.4rem', background: 'rgba(199,69,0,0.08)', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--color-saffron)' }}><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {blogs.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No blogs yet.</div>}
                  </div>
                </div>
              )}

              {/* CONTACTS */}
              {!tabLoading && activeTab === 'contacts' && (
                <div>
                  {sectionHeader('INBOX', 'Contact Messages')}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {contacts.map(c => (
                      <div key={c.id} style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: `1px solid ${c.is_read ? 'rgba(201,151,42,0.12)' : 'rgba(199,69,0,0.2)'}`, position: 'relative' }}>
                        {!c.is_read && <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>{badge('NEW', 'orange')}</div>}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-saffron), var(--color-gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, flexShrink: 0 }}>{c.name?.charAt(0)}</div>
                          <div>
                            <p style={{ fontWeight: 700, color: 'var(--color-earth)' }}>{c.name}</p>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{c.email}</p>
                          </div>
                        </div>
                        <p style={{ color: 'var(--color-earth)', marginBottom: '1rem', lineHeight: 1.6 }}>{c.message}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{new Date(c.created_at).toLocaleDateString('en-IN')}</span>
                          {!c.is_read && (
                            <button onClick={async () => { await api.patch(`/admin/contacts/${c.id}/read`); await refreshActiveTab() }}
                              style={{ padding: '0.3rem 0.75rem', background: '#e8f5e9', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', color: '#2e7d32', fontSize: '0.7rem', fontWeight: 700 }}>
                              MARK READ
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {contacts.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No messages yet.</div>}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ── MODALS ── */}

      {/* Product Modal */}
      {showModal === 'product' && (
        <Modal title={editItem ? 'Edit Product' : 'Add New Product'} onClose={() => { setShowModal(null); setEditItem(null); resetProductForm() }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ gridColumn: '1/-1' }}>
              <Field label="Product Name *">
                <input style={inputStyle} value={productForm.name} onChange={e => setProductForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Premium Ruby (Manik)" />
              </Field>
            </div>
            <Field label="Price (₹) *">
              <input style={inputStyle} type="number" value={productForm.price} onChange={e => setProductForm(p => ({ ...p, price: e.target.value }))} placeholder="15000" />
            </Field>
            <Field label="Compare Price (₹)">
              <input style={inputStyle} type="number" value={productForm.compare_price} onChange={e => setProductForm(p => ({ ...p, compare_price: e.target.value }))} placeholder="18000" />
            </Field>
            <Field label="Discount Type">
              <select style={inputStyle} value={productForm.discount_type} onChange={e => setProductForm(p => ({ ...p, discount_type: e.target.value }))}>
                <option value="">No Discount</option>
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </Field>
            <Field label="Discount Value">
              <input style={inputStyle} type="number" value={productForm.discount_value} onChange={e => setProductForm(p => ({ ...p, discount_value: e.target.value }))} placeholder={productForm.discount_type === 'percentage' ? '10' : '500'} disabled={!productForm.discount_type} />
            </Field>
            <Field label="Stock">
              <input style={inputStyle} type="number" value={productForm.stock} onChange={e => setProductForm(p => ({ ...p, stock: e.target.value }))} />
            </Field>
            <Field label="Category">
              <select style={inputStyle} value={productForm.category_id} onChange={e => setProductForm(p => ({ ...p, category_id: e.target.value }))}>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {categories.length === 0 && (
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>No categories available yet.</span>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await bootstrapCategories()
                      } catch {
                        toast.error('Failed to add suggested categories')
                      }
                    }}
                    style={{ padding: '0.45rem 0.75rem', background: 'rgba(201,151,42,0.12)', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--color-earth)', fontWeight: 700, fontSize: '0.75rem' }}
                  >
                    Add Suggested Categories
                  </button>
                </div>
              )}
            </Field>
            <Field label="SKU">
              <input style={inputStyle} value={productForm.sku} onChange={e => setProductForm(p => ({ ...p, sku: e.target.value }))} placeholder="RUB-001" />
            </Field>
            <Field label="Weight">
              <input style={inputStyle} value={productForm.weight} onChange={e => setProductForm(p => ({ ...p, weight: e.target.value }))} placeholder="5 carats" />
            </Field>
            <Field label="Material">
              <input style={inputStyle} value={productForm.material} onChange={e => setProductForm(p => ({ ...p, material: e.target.value }))} placeholder="Natural Ruby" />
            </Field>
            <Field label="Origin">
              <input style={inputStyle} value={productForm.origin} onChange={e => setProductForm(p => ({ ...p, origin: e.target.value }))} placeholder="Burma" />
            </Field>
            <div style={{ gridColumn: '1/-1' }}>
              <Field label="Description">
                <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} value={productForm.description} onChange={e => setProductForm(p => ({ ...p, description: e.target.value }))} placeholder="Product description..." />
              </Field>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <Field label="Product Image">
                <div style={{ border: '2px dashed rgba(201,151,42,0.3)', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', position: 'relative' }}
                  onClick={() => document.getElementById('product-image-input')?.click()}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" style={{ maxHeight: '150px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                  ) : (
                    <div>
                      <Upload size={32} style={{ color: 'var(--color-gold)', margin: '0 auto 0.5rem' }} />
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Click to upload image</p>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>JPG, PNG, WebP supported</p>
                    </div>
                  )}
                  <input id="product-image-input" type="file" accept="image/*" style={{ display: 'none' }}
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setProductImage(file)
                        setImagePreview(URL.createObjectURL(file))
                      }
                    }} />
                </div>
              </Field>
            </div>
            <div style={{ gridColumn: '1/-1', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => { setShowModal(null); setEditItem(null); resetProductForm() }}
                style={{ padding: '0.75rem 1.5rem', background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
                Cancel
              </button>
              <button onClick={handleProductSubmit} disabled={loading} className="btn-primary"
                style={{ padding: '0.75rem 2rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Saving...' : editItem ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Category Modal */}
      {showModal === 'category' && (
        <Modal title={editItem ? 'Edit Category' : 'Add Category'} onClose={() => { setShowModal(null); setEditItem(null) }}>
          <Field label="Category Name *">
            <input style={inputStyle} value={catForm.name} onChange={e => setCatForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Gemstones" />
          </Field>
          <Field label="Description">
            <textarea style={{ ...inputStyle, minHeight: '80px' }} value={catForm.description} onChange={e => setCatForm(p => ({ ...p, description: e.target.value }))} />
          </Field>
          <Field label="Category Image">
            <div style={{ border: '2px dashed rgba(201,151,42,0.3)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center', cursor: 'pointer' }}
              onClick={() => document.getElementById('cat-image-input')?.click()}>
              <Upload size={24} style={{ color: 'var(--color-gold)', margin: '0 auto 0.5rem' }} />
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{catImage ? catImage.name : 'Click to upload'}</p>
              <input id="cat-image-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setCatImage(e.target.files?.[0] || null)} />
            </div>
          </Field>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button onClick={() => { setShowModal(null); setEditItem(null) }} style={{ padding: '0.75rem 1.5rem', background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '0.75rem', cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleCatSubmit} disabled={loading} className="btn-primary">{loading ? 'Saving...' : editItem ? 'Update' : 'Add Category'}</button>
          </div>
        </Modal>
      )}

      {/* Coupon Modal */}
      {showModal === 'coupon' && (
        <Modal title="Add Coupon" onClose={() => setShowModal(null)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ gridColumn: '1/-1' }}>
              <Field label="Coupon Code *">
                <input style={inputStyle} value={couponForm.code} onChange={e => setCouponForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="SAVE10" />
              </Field>
            </div>
            <Field label="Discount Type *">
              <select style={inputStyle} value={couponForm.discount_type} onChange={e => setCouponForm(p => ({ ...p, discount_type: e.target.value }))}>
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </Field>
            <Field label="Discount Value *">
              <input style={inputStyle} type="number" value={couponForm.discount_value} onChange={e => setCouponForm(p => ({ ...p, discount_value: e.target.value }))} placeholder={couponForm.discount_type === 'percentage' ? '10' : '500'} />
            </Field>
            <Field label="Min Order Amount (₹)">
              <input style={inputStyle} type="number" value={couponForm.min_order_amount} onChange={e => setCouponForm(p => ({ ...p, min_order_amount: e.target.value }))} placeholder="0" />
            </Field>
            <Field label="Max Uses">
              <input style={inputStyle} type="number" value={couponForm.max_uses} onChange={e => setCouponForm(p => ({ ...p, max_uses: e.target.value }))} placeholder="Unlimited" />
            </Field>
            <div style={{ gridColumn: '1/-1' }}>
              <Field label="Expiry Date">
                <input style={inputStyle} type="date" value={couponForm.expiry_date} onChange={e => setCouponForm(p => ({ ...p, expiry_date: e.target.value }))} />
              </Field>
            </div>
            <div style={{ gridColumn: '1/-1', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(null)} style={{ padding: '0.75rem 1.5rem', background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '0.75rem', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleCouponSubmit} disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Create Coupon'}</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Blog Modal */}
      {showModal === 'blog' && (
        <Modal title={editItem ? 'Edit Blog' : 'Add Blog Post'} onClose={() => { setShowModal(null); setEditItem(null) }}>
          <Field label="Title *">
            <input style={inputStyle} value={blogForm.title} onChange={e => setBlogForm(p => ({ ...p, title: e.target.value }))} placeholder="Blog title..." />
          </Field>
          <Field label="Excerpt">
            <input style={inputStyle} value={blogForm.excerpt} onChange={e => setBlogForm(p => ({ ...p, excerpt: e.target.value }))} placeholder="Short summary..." />
          </Field>
          <Field label="Content *">
            <textarea style={{ ...inputStyle, minHeight: '200px', resize: 'vertical' }} value={blogForm.content} onChange={e => setBlogForm(p => ({ ...p, content: e.target.value }))} placeholder="Blog content..." />
          </Field>
          <Field label="Cover Image URL">
            <input style={inputStyle} value={blogForm.image_url} onChange={e => setBlogForm(p => ({ ...p, image_url: e.target.value }))} placeholder="https://..." />
          </Field>
          <Field label="Tags (comma separated)">
            <input style={inputStyle} value={blogForm.tags} onChange={e => setBlogForm(p => ({ ...p, tags: e.target.value }))} placeholder="astrology, vedic, gemstones" />
          </Field>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <input type="checkbox" id="published" checked={blogForm.is_published} onChange={e => setBlogForm(p => ({ ...p, is_published: e.target.checked }))} />
            <label htmlFor="published" style={{ color: 'var(--color-earth)', fontSize: '0.875rem' }}>Publish immediately</label>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button onClick={() => { setShowModal(null); setEditItem(null) }} style={{ padding: '0.75rem 1.5rem', background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '0.75rem', cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleBlogSubmit} disabled={loading} className="btn-primary">{loading ? 'Saving...' : editItem ? 'Update Blog' : 'Publish Blog'}</button>
          </div>
        </Modal>
      )}

    </main>
  )
}
