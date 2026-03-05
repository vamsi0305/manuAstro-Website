import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Calendar, Clock, ChevronRight } from 'lucide-react'
import SEOHead from '@/components/SEOHead'
import api from '@/api/axios'

const BLOG_CATS = ['All', 'Astrology', 'Rudraksha', 'Vaastu', 'Numerology', 'Lifestyle']

const MOCK_BLOGS = [
  {
    id: 1,
    title: 'Importance of 1 Mukhi Rudraksha in 2026',
    slug: 'importance-of-1-mukhi',
    cat: 'Rudraksha',
    date: 'Feb 15, 2026',
    time: '5 min read',
    image: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?w=600',
    excerpt: 'The 1 Mukhi Rudraksha is governed by Lord Shiva himself. Learn why it is the most sought-after bead for spiritual awakening.'
  },
  {
    id: 2,
    title: 'How to Arrange Your Living Room as per Vaastu',
    slug: 'vaastu-living-room',
    cat: 'Vaastu',
    date: 'Feb 12, 2026',
    time: '8 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
    excerpt: 'Your living room is the face of your home. Small changes in furniture placement can drastically improve positive energy flow.'
  },
  {
    id: 3,
    title: 'Mercury Retrograde Survival Guide for Professionals',
    slug: 'mercury-retrograde-guide',
    cat: 'Astrology',
    date: 'Feb 10, 2026',
    time: '6 min read',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600',
    excerpt: 'Mercury retrograde can disrupt communication. Here are 5 tips to navigate professional commitments during this phase.'
  }
]

export default function BlogList() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs')
        setBlogs(data)
      } catch (err) {
        console.error('Failed to fetch blogs', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const filteredBlogs = blogs.filter(b => activeTab === 'All' || b.category === activeTab)

  return (
    <div className="bg-[#fdf7ed] pb-16">
      <SEOHead title="Blog — Wisdom & Guidance" description="Explore articles on Vedic astrology, Rudraksha, Vaastu Shastra, and spiritual lifestyle by Er. Manu Gupta." />
      {/* ════ HERO ════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1400&auto=format&fit=crop" alt="Vedic Insights" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>VEDIC INSIGHTS</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Explore Sacred Wisdom
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7, marginBottom: '2rem' }}>
              Deep dive into articles, guides, and updates on Vedic sciences, ancient rituals, and spiritual growth.
            </p>
            <div className="max-w-md relative">
              <input type="text" placeholder="Search articles..." className="w-full px-4 py-3 rounded-xl border border-[var(--color-gold)]/20 bg-white text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)] transition-all" />
              <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            </div>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      {/* Filters */}
      <div className="container">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          padding: '0.5rem 0',
          marginBottom: '3rem',
          marginTop: '1rem',
        }}>
          {BLOG_CATS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '2rem',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-accent)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: activeTab === tab
                  ? '2px solid var(--color-saffron)'
                  : '2px solid var(--color-border)',
                background: activeTab === tab
                  ? 'var(--color-saffron)'
                  : 'transparent',
                color: activeTab === tab
                  ? 'white'
                  : 'var(--color-text-secondary)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '6rem'
        }}>
          {loading ? (
            <div className="col-span-full text-center py-20 font-serif text-earth animate-pulse">Consulting the ancient scrolls...</div>
          ) : filteredBlogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                borderRadius: '1.25rem',
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 4px 16px rgba(58,31,13,0.1)',
                border: '1.5px solid rgba(201,151,42,0.15)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
              onHoverStart={() => { }}
              whileHover={{ y: -5, boxShadow: '0 14px 32px rgba(58,31,13,0.18)' }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                <img
                  src={blog.image}
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.5s ease' }}
                  alt={blog.title}
                />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                  <span className="badge-saffron">{blog.cat}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">
                  <span className="flex items-center gap-1 font-sans">{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1 font-sans">{blog.read_time || '5 min'} read</span>
                </div>

                <h2 className="text-lg font-serif text-[var(--color-earth)] mb-3 leading-tight">
                  {blog.title}
                </h2>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 line-clamp-2">
                  {blog.excerpt}
                </p>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="mt-auto text-sm font-medium text-[var(--color-saffron)] flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Continue Reading <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination placeholder */}
        {blogs.length > 3 && (
          <div className="mt-20 flex justify-center gap-3">
            <button className="w-10 h-10 rounded-xl bg-[var(--color-earth)] text-white shadow-lg font-bold">1</button>
            <button className="w-10 h-10 rounded-xl border border-[var(--color-gold)]/10 text-[var(--color-text-muted)] hover:border-[var(--color-saffron)] font-bold transition-all">2</button>
          </div>
        )}
      </div>
    </div>
  )
}
