import { useState } from 'react'
import { ArrowRight, ShieldCheck, Award, Microscope } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import ProductCard from '@/components/shop/ProductCard'
import SEOHead from '@/components/SEOHead'
import { productService } from '@/api/services/product.service'
import type { Product } from '@/types'
import { belongsToCollection, matchesAlias } from '@/utils/productCollections'

const GEM_CATEGORIES = [
  'All', 'Ruby', 'Emerald', 'Yellow Sapphire', 'Blue Sapphire', 'Pearl', 'Coral', 'Hessonite', "Cat's Eye"
]

const GEM_TAB_ALIASES: Record<string, string[]> = {
  Ruby: ['ruby', 'manik'],
  Emerald: ['emerald', 'panna'],
  'Yellow Sapphire': ['yellow sapphire', 'pukhraj'],
  'Blue Sapphire': ['blue sapphire', 'neelam'],
  Pearl: ['pearl', 'moti'],
  Coral: ['coral', 'moonga'],
  Hessonite: ['hessonite', 'gomed'],
  "Cat's Eye": ['cats eye', 'cat eye', 'lehsunia'],
}

export default function Gemstones() {
  const [activeTab, setActiveTab] = useState('All')
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['collection', 'gemstones'],
    queryFn: () => productService.getAll(),
  })

  const gemstoneProducts = products.filter((product) => belongsToCollection(product, 'gemstones'))
  const filteredProducts = gemstoneProducts.filter((product) => (
    activeTab === 'All' || matchesAlias(product, GEM_TAB_ALIASES[activeTab] || [activeTab])
  ))

  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title="Certified Astrological Gemstones" description="Natural, lab-certified gemstones (Ruby, Emerald, Sapphires) for planetary strength and astrological remedies." />

      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://manuastro.com/cdn/shop/files/Vedic_Astrology_New_500x500_jpg.jpg?v=1770036692" alt="Precious Gemstones" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>PRECIOUS GEMSTONES</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Ethically Sourced Divine Gems
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7 }}>
              100% Natural, Lab-Certified, and astrologically potent gemstones to align your energy and enhance your fortune through planetary vibrations.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      <section className="pb-20">
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
            {GEM_CATEGORIES.map((tab) => (
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
                No gemstone products found yet. Add or edit gemstone items in the admin dashboard and they will appear here.
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="divider-ornamental my-12">*</div>

      <section className="section bg-[#faf2e2]">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>
              The Science of Gem Therapy
            </h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { icon: <ShieldCheck />, title: 'How to Wear', desc: 'Detailed guidance on the correct finger, metal, and auspicious day (Muhurta) for wearing your gemstone.' },
              { icon: <Award />, title: 'Who Should Wear', desc: 'Personalized recommendations based on your birth chart (Kundli) for maximum astrological benefit.' },
              { icon: <Microscope />, title: 'Our Certification', desc: 'Every gemstone comes with an independent, world-class lab certificate verifying authenticity and origin.' }
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
      </section>

      <div className="divider-ornamental my-12">*</div>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>
              Not sure which gemstone is right for you?
            </h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto 2rem' }} />
            <p className="font-sans" style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              Our experts can analyze your planetary positions to find the perfect match for your life goals.
            </p>
            <a href="https://calendly.com/manuastro2022/30min" className="btn-primary">
              Book Consultation <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
