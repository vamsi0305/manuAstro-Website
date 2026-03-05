import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Share2, Facebook, Twitter, MessageSquare, ChevronLeft } from 'lucide-react'
import SEOHead from '@/components/SEOHead'

const MOCK_BLOG_DATA = {
  title: 'Importance of 1 Mukhi Rudraksha in 2026',
  author: 'Er. Manu Gupta',
  date: 'Feb 15, 2026',
  time: '5 min read',
  cat: 'Rudraksha',
  content: `
    <p className="mb-6">The Eka Mukhi (one-faced) Rudraksha is considered the most auspicious, divine, and powerful gift of nature to mankind. It is the manifestation of Lord Shiva himself, the supreme truth.</p>
    <p className="mb-6">In the current year 2026, as we witness massive shifts in collective consciousness, the grounding and liberating energy of 1 Mukhi has become even more vital for seekers and professionals alike.</p>
    <h3 className="text-2xl font-serif text-earth mb-4 mt-12">The Spiritual Significance</h3>
    <p className="mb-6">Mythologically, it represents the Bindu - the center point of the universe. Wearing it helps in attaining concentration, mental peace, and focus. It is said that the wearer of this bead gets both worldly pleasures and liberation (Moksha).</p>
    <blockquote className="my-12 p-8 bg-[#faf2e2] border-l-4 border-saffron italic text-earth font-serif text-lg">
      "The 1 Mukhi Rudraksha is not just a bead; it is a spiritual antenna that connects you with the cosmic vibration of Shiva."
    </blockquote>
    <h3 className="text-2xl font-serif text-earth mb-4 mt-12">Benefits of Wearing in 2026</h3>
    <ul className="list-disc pl-6 space-y-4 mb-8 text-muted">
      <li>Enhanced Focus & Mental Clarity in a chaotic digital world.</li>
      <li>Protection from negative environmental energies.</li>
      <li>Aids in deep meditative states and self-realization.</li>
      <li>Improves leadership qualities and decision-making power.</li>
    </ul>
    <p className="mb-6">However, due to its rare nature, many fakes are available in the market. Always ensure you buy from a trusted source who provides X-Ray certification for the internal structure of the bead.</p>
  `,
  related: [
    { title: 'Choosing Your First Rudraksha', slug: 'choosing-first-rudraksha' },
    { title: 'The Power of Mantra Chanting', slug: 'power-of-mantra' }
  ]
}

export default function BlogDetail() {
  const { slug } = useParams()

  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title={MOCK_BLOG_DATA.title} description={MOCK_BLOG_DATA.content.substring(0, 150).replace(/<[^>]*>/g, '')} />
      {/* Standardized Hero Header - Fix 11 */}
      <section style={{
        position: 'relative', width: '100%', minHeight: '480px',
        display: 'flex', alignItems: 'center',
        background: 'var(--color-bg)', padding: '4rem 0', overflow: 'hidden'
      }}>
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://manuastro.com/cdn/shop/articles/4.jpg?v=1767595180&width=1000" alt="blog hero"
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
              ARTICLE IN {MOCK_BLOG_DATA.cat}
            </span>
            <h1 className="font-serif" style={{
              fontSize: '3.5rem', color: 'var(--color-earth)',
              lineHeight: 1.2, marginBottom: '1rem'
            }}>
              {MOCK_BLOG_DATA.title}
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)' }} />
          </div>
        </div>
      </section>

      {/* Meta Bar */}
      <div style={{ background: '#faf2e2', borderBottom: '1px solid var(--color-gold-light)', padding: '1.5rem 0' }}>
        <div className="container flex flex-wrap justify-between items-center gap-6">
          <div className="flex flex-wrap gap-8 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
            <span className="flex items-center gap-2"><User size={14} className="text-[var(--color-gold)]" /> By {MOCK_BLOG_DATA.author}</span>
            <span className="flex items-center gap-2"><Calendar size={14} className="text-[var(--color-gold)]" /> {MOCK_BLOG_DATA.date}</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-[var(--color-gold)]" /> {MOCK_BLOG_DATA.time}</span>
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
              dangerouslySetInnerHTML={{ __html: MOCK_BLOG_DATA.content.replace(/text-earth/g, 'font-serif text-[var(--color-earth)]').replace(/text-muted/g, 'text-[var(--color-text-muted)]') }}
            />

            {/* Right Sidebar */}
            <aside className="space-y-12">
              <div className="card" style={{ padding: '2rem' }}>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '1.5rem' }}>Related Reads</h3>
                <div className="space-y-6">
                  {MOCK_BLOG_DATA.related.map(r => (
                    <Link key={r.slug} to={`/blog/${r.slug}`} style={{ textDecoration: 'none' }} className="block group">
                      <h4 style={{
                        fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-earth)',
                        lineHeight: 1.4, margin: '0 0 0.25rem'
                      }} className="group-hover:text-[var(--color-saffron)] transition-colors">{r.title}</h4>
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Read Article →</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: '2rem', background: 'var(--color-earth)', color: 'var(--color-bg)' }}>
                <MessageSquare className="text-[var(--color-gold)]" style={{ marginBottom: '1rem' }} />
                <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Leave a Comment</h3>
                <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '1.5rem', lineHeight: 1.6 }}>Share your thoughts on this topic with our community.</p>
                <button className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>Write Comment</button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
