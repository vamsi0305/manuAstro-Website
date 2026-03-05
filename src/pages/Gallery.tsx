import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const GALLERY_CATS = ['Events', 'Customers', 'Rudraksha', 'Yantras', 'Sannidhiya', 'Consultations']

const MOCK_IMAGES = [
  { id: 1, cat: 'Consultations', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop', title: 'Vedic Consultation' },
  { id: 2, cat: 'Rudraksha', url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop', title: 'Gemstones & Crystals' },
  { id: 3, cat: 'Rudraksha', url: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=600&h=400&fit=crop', title: 'Sacred Rudraksha' },
  { id: 4, cat: 'Events', url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop', title: 'Spiritual Space' },
  { id: 5, cat: 'Yantras', url: 'https://images.unsplash.com/photo-1604423043492-41b6d3e9eff3?w=600&h=400&fit=crop', title: 'Sacred Geometry' },
  { id: 6, cat: 'Consultations', url: 'https://images.unsplash.com/photo-1532968961801-574cb4237b27?w=600&h=400&fit=crop', title: 'Astrology Charts' },
  { id: 7, cat: 'Consultations', url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop', title: 'Palm Reading' },
  { id: 8, cat: 'Sannidhiya', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop', title: 'Meditation' },
  { id: 9, cat: 'Events', url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop', title: 'Ritual Candles' },
  { id: 10, cat: 'Customers', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', title: 'Sacred Herbs' },
  { id: 11, cat: 'Events', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop', title: 'Cosmos' },
  { id: 12, cat: 'Sannidhiya', url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop', title: 'Puja Incense' }
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gridAutoRows: 'dense',
          gap: '1.5rem',
          marginBottom: '5rem'
        }}>
          {MOCK_IMAGES.filter(img => activeTab === 'All' || img.cat === activeTab || activeTab === 'Events').map((img) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedImg(img)}
              className="card group cursor-pointer"
              style={{
                padding: '0.75rem',
                borderRadius: '1.25rem',
                display: 'block'
              }}
            >
              <div style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                aspectRatio: '4/3',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <img
                  src={img.url}
                  alt={img.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease'
                  }}
                  className="group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white" size={32} />
                </div>
              </div>
              <div style={{ padding: '1rem 0.5rem 0.25rem', textAlign: 'center' }}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-saffron)] mb-1">{img.cat}</p>
                <h4 className="text-sm font-serif text-[var(--color-earth)]">{img.title}</h4>
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
