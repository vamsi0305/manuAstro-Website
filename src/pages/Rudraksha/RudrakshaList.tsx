import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ShieldCheck } from 'lucide-react'

import ProductCard from '@/components/shop/ProductCard'
import SEOHead from '@/components/SEOHead'
import { productService } from '@/api/services/product.service'
import type { Product } from '@/types'
import { belongsToCollection, matchesAlias } from '@/utils/productCollections'

const MUKHI_TABS = [
  'All', '1 Mukhi', '2 Mukhi', '3 Mukhi', '4 Mukhi', '5 Mukhi', '6 Mukhi', '7 Mukhi', '8 Mukhi', '9 Mukhi', '10 Mukhi', '11 Mukhi', '12 Mukhi', '13 Mukhi', '14 Mukhi', 'Gauri Shankar', 'Garbha Gauri'
]

export default function RudrakshaList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('mukhi') || 'All'
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['collection', 'rudraksha'],
    queryFn: () => productService.getAll(),
  })

  const rudrakshaProducts = products.filter((product) => belongsToCollection(product, 'rudraksha'))
  const filteredProducts = rudrakshaProducts.filter((product) => (
    activeTab === 'All' || matchesAlias(product, [activeTab])
  ))

  const handleTabClick = (value: string) => {
    setSearchParams(value === 'All' ? {} : { mukhi: value })
  }

  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title="Nepali Rudraksha Collection" description="Authentic Nepali Rudraksha beads from 1 to 21 Mukhi. Laboratory certified with independent X-Ray reports for spiritual seekers." />

      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://manuastro.com/cdn/shop/files/16_FACE_1.jpg?v=1770990686" alt="Nepali Rudraksha" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>NEPALI RUDRAKSHA</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Sacred Himalayan Beads
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7 }}>
              100% natural, lab-certified beads selected for spiritual strength, protection, and inner balance.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      <section className="section py-8">
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
            {MUKHI_TABS.map((tab) => (
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
          }}>
            {isLoading ? [1, 2, 3, 4].map((item) => (
              <div key={item} className="card h-[420px] bg-white animate-pulse rounded-3xl" style={{ padding: 0 }} />
            )) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="card" style={{ padding: '3rem', textAlign: 'center', background: 'white', gridColumn: '1 / -1' }}>
                No rudraksha products found yet. Add or edit rudraksha items in the admin dashboard and they will appear here.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section bg-[#faf2e2]">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {[
              { title: 'Authenticity Guaranteed', icon: <ShieldCheck size={28} /> },
              { title: 'Energized by Pandit', icon: <ShieldCheck size={28} /> },
              { title: 'X-Ray Certificate', icon: <ShieldCheck size={28} /> }
            ].map((item, i) => (
              <div key={i} className="card" style={{
                padding: '2rem', textAlign: 'center',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1rem',
                border: '1.5px solid var(--color-gold)',
                background: 'var(--color-bg)'
              }}>
                <div style={{ color: 'var(--color-saffron)' }}>
                  {item.icon}
                </div>
                <h4 className="font-serif" style={{ fontSize: '1rem', color: 'var(--color-earth)', margin: 0 }}>
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
