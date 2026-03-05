import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Share2, Facebook, Twitter, MessageSquare, ChevronLeft, Mail, Phone, MapPin, Send, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react'
import SEOHead from '@/components/SEOHead'
import api from '@/api/axios'

export default function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // State for the contact form in the sidebar
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await api.post('/contact', formData)
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.response?.data?.detail || 'Something went wrong. Please try again.')
    }
  }

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/blogs/${slug}`)
        setBlog(data)
      } catch (err) {
        console.error('Blog fetch failed', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [slug])

  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([])
  useEffect(() => {
    api.get('/blogs').then(({ data }) => setRelatedBlogs(data.filter((b: any) => b.slug !== slug).slice(0, 2)))
  }, [slug])

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif text-earth">Consulting the Stars...</div>
  if (!blog) return <div className="min-h-screen flex items-center justify-center font-serif text-saffron">Blog not found.</div>

  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title={blog.title} description={blog.excerpt || ''} />
      {/* Standardized Hero Header - Fix 11 */}
      <section style={{
        position: 'relative', width: '100%', minHeight: '480px',
        display: 'flex', alignItems: 'center',
        background: 'var(--color-bg)', padding: '4rem 0', overflow: 'hidden'
      }}>
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={blog.image_url || 'https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311'} alt="blog hero"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'var(--color-bg)', opacity: 0.75
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <Link to="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem',
            textDecoration: 'none'
          }} className="hover:text-[var(--color-saffron)] transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Blogs
          </Link>

          <div style={{ maxWidth: '800px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
              ARTICLE IN {blog.category}
            </span>
            <h1 className="font-serif" style={{
              fontSize: '3.5rem', color: 'var(--color-earth)',
              lineHeight: 1.2, marginBottom: '1rem'
            }}>
              {blog.title}
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)' }} />
          </div>
        </div>
      </section>

      {/* Meta Bar */}
      <div style={{ background: '#faf2e2', borderBottom: '1px solid var(--color-gold-light)', padding: '1.5rem 0' }}>
        <div className="container flex flex-wrap justify-between items-center gap-6">
          <div className="flex flex-wrap gap-8 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
            <span className="flex items-center gap-2"><User size={14} className="text-[var(--color-gold)]" /> By {blog.author_name || 'Er. Manu Gupta'}</span>
            <span className="flex items-center gap-2"><Calendar size={14} className="text-[var(--color-gold)]" /> {new Date(blog.created_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-[var(--color-gold)]" /> {blog.read_time || '5 min'} read</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)]">Share Article:</span>
            <button style={{
              width: '32px', height: '32px', borderRadius: '50%',
              border: '1px solid var(--color-gold-light)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--color-earth)',
              background: 'none', cursor: 'pointer'
            }} className="hover:bg-[var(--color-saffron)] hover:text-white transition-all"><Facebook size={14} /></button>
            <button style={{
              width: '32px', height: '32px', borderRadius: '50%',
              border: '1px solid var(--color-gold-light)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--color-earth)',
              background: 'none', cursor: 'pointer'
            }} className="hover:bg-[var(--color-saffron)] hover:text-white transition-all"><Twitter size={14} /></button>
            <button style={{
              width: '32px', height: '32px', borderRadius: '50%',
              border: '1px solid var(--color-gold-light)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--color-earth)',
              background: 'none', cursor: 'pointer'
            }} className="hover:bg-[var(--color-saffron)] hover:text-white transition-all"><Share2 size={14} /></button>
          </div>
        </div>
      </div>

      {/* Article Body - Fix 11 */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_320px] gap-16">
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/text-earth/g, 'font-serif text-[var(--color-earth)]').replace(/text-muted/g, 'text-[var(--color-text-muted)]') }}
            />

            {/* Right Sidebar */}
            <aside className="space-y-12">
              <div className="card" style={{ padding: '2rem' }}>
                <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '2rem' }}>
                  Send an Enquiry
                </h2>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-6 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-4 text-green-800"
                    >
                      <CheckCircle className="text-green-500" />
                      <div>
                        <p className="font-bold">Message Sent Successfully!</p>
                        <p className="text-sm">Thank you for reaching out. We will get back to you shortly.</p>
                      </div>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-4 text-red-800"
                    >
                      <AlertCircle className="text-red-500" />
                      <div>
                        <p className="font-bold">Delivery Failed</p>
                        <p className="text-sm">{errorMsg}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Your Name</label>
                      <input
                        type="text" required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none text-[var(--color-text-primary)] transition-all" placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Email Address</label>
                      <input
                        type="email" required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none text-[var(--color-text-primary)] transition-all" placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Phone Number</label>
                    <input
                      type="tel" required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none text-[var(--color-text-primary)] transition-all" placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Message</label>
                    <textarea
                      rows={5} required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none text-[var(--color-text-primary)] transition-all" placeholder="How can we help you today?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center py-5 text-lg"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={18} className="ml-2" />
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
