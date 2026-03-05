import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const GALLERY_CATS = ['Events', 'Customers', 'Rudraksha', 'Yantras', 'Sannidhiya', 'Consultations']

const MOCK_IMAGES = [
  { id: 1, cat: 'Events', url: 'https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311&width=900', title: 'IIM Ahmedabad Event' },
  { id: 2, cat: 'Customers', url: 'https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311&width=900', title: 'Happy Client Session' },
  { id: 3, cat: 'Consultations', url: 'https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311&width=900', title: 'One on One Reading' },
  { id: 4, cat: 'Sannidhiya', url: 'https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311&width=900', title: 'Sannidhiya Meet' }
]

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') || 'Events'
  const [activeTab, setActiveTab] = useState(initialTab)
  const [selectedImg, setSelectedImg] = useState<typeof MOCK_IMAGES[0] | null>(null)

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'Events')
  }, [searchParams])

  const handleTabClick = (val: string) => {
    setActiveTab(val)
    setSearchParams({ tab: val })
  }

  return (
    <div className="bg-[#fdf7ed]">
      {/* ════ HERO ════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1400&auto=format&fit=crop" alt="Visual Journey" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>VISUAL JOURNEY</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Our Sacred Moments
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7 }}>
              Memories from our events, client consultations, and some of our most sacred products and experiences.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      {/* Tabs */}
      <div className="container py-12">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          padding: '0.5rem 0',
          marginBottom: '3rem',
          marginTop: '1rem',
        }}>
          {GALLERY_CATS.map(tab => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
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
          marginBottom: '5rem'
        }}>
          {MOCK_IMAGES.filter(img => activeTab === 'All' || img.cat === activeTab || activeTab === 'Events').map((img, i) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedImg(img)}
              className="card overflow-hidden h-72 relative group cursor-pointer"
              style={{ padding: 0 }}
            >
              <img src={img.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-[var(--color-earth)]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="text-white" size={32} />
              </div>
              <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#faf2e2] mb-1">{img.cat}</p>
                <h4 className="text-sm font-serif text-white">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-earth/95 flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X size={32} /></button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-4xl w-full h-[80vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedImg.url} className="w-full h-full object-contain bg-[#faf2e2]" />
              <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">{selectedImg.cat}</p>
                <h3 className="text-3xl font-serif">{selectedImg.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
