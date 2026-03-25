import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { HelpCircle, Eye, Calendar } from 'lucide-react'

import ProductCard from '@/components/shop/ProductCard'
import SEOHead from '@/components/SEOHead'
import { productService } from '@/api/services/product.service'
import type { Product } from '@/types'
import { belongsToCollection, matchesAlias } from '@/utils/productCollections'

const YANTRA_TABS = [
  'All', 'Shree', 'Surya', 'Shani', 'Rahu', 'Kuber'
]

export default function YantraList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('focus') || 'All'
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['collection', 'yantra'],
    queryFn: () => productService.getAll(),
  })

  const yantraProducts = products.filter((product) => belongsToCollection(product, 'yantra'))
  const filteredProducts = yantraProducts.filter((product) => (
    activeTab === 'All' || matchesAlias(product, [activeTab])
  ))

  const handleTabClick = (value: string) => {
    setSearchParams(value === 'All' ? {} : { focus: value })
  }

  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title="Sacred Yantras & Geometric Talismans" description="Energized copper and silver Yantras for home and office. Harmonize your environment with sacred Vedic geometry." />

      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876" alt="Sacred Yantras" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>SACRED GEOMETRY</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Ancient Geometrical Wisdom
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7 }}>
              Sacred Yantras are geometrical representations of deities, designed to focus cosmic energy and attract harmony and prosperity into your space.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

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
          {YANTRA_TABS.map((tab) => (
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
                border: activeTab === tab ? '2px solid var(--color-saffron)' : '2px solid var(--color-border)',
                background: activeTab === tab ? 'var(--color-saffron)' : 'transparent',
                color: activeTab === tab ? 'white' : 'var(--color-text-secondary)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '6rem'
        }}>
          {isLoading ? [1, 2, 3, 4].map((item) => (
            <div key={item} className="card h-[420px] bg-white animate-pulse rounded-3xl" style={{ padding: 0 }} />
          )) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="card" style={{ padding: '3rem', textAlign: 'center', background: 'white', gridColumn: '1 / -1' }}>
              No yantra products found yet. Add or edit yantra items in the admin dashboard and they will appear here.
            </div>
          )}
        </div>

        <div className="divider-ornamental mb-24">*</div>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>
            Ancient Geometrical Wisdom
          </h2>
          <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '5rem'
        }}>
          {[
            { icon: <HelpCircle />, title: 'What is a Yantra?', desc: 'A spiritual tool that acts as a focal point for meditative energy.' },
            { icon: <Eye />, title: 'How to Install', desc: 'Ideally placed on the east or north wall of your puja room or office.' },
            { icon: <Calendar />, title: 'Daily Ritual', desc: 'Simply gaze at the center point (Bindu) for 5 minutes daily while reciting the mantra.' }
          ].map((item, i) => (
            <div key={i} className="card" style={{
              padding: '2.5rem 2rem', textAlign: 'center',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '1rem'
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid var(--color-gold)',
                background: 'var(--color-bg-secondary)',
                color: 'var(--color-saffron)',
                fontSize: '1.5rem', flexShrink: 0
              }}>
                {item.icon}
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--color-earth)', margin: 0 }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
