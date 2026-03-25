import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import SEOHead from '@/components/SEOHead'
import ProductCard from '@/components/shop/ProductCard'
import { productService } from '@/api/services/product.service'

interface Product {
  id: number | string
  name: string
  slug: string
  price: number
  compare_price?: number
  image_url?: string
  category?: { name: string }
  rating?: number
  is_featured?: boolean
  stock?: number
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q')?.trim() || ''
  const [activeCat, setActiveCat] = useState('All Products')
  const [priceRange, setPriceRange] = useState(100000)
  const selectedCategory = queryFromUrl ? 'All Products' : activeCat

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
  })

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', activeCat, queryFromUrl],
    queryFn: () => productService.getAll({
      category: selectedCategory !== 'All Products' && !queryFromUrl ? selectedCategory : undefined,
      q: queryFromUrl || undefined,
    }),
  })

  const displayProducts = Array.isArray(products) ? products : []

  const handleSearchChange = (value: string) => {
    const nextQuery = value.trim()
    const nextParams = new URLSearchParams(searchParams)

    if (nextQuery) {
      nextParams.set('q', nextQuery)
    } else {
      nextParams.delete('q')
    }

    setSearchParams(nextParams, { replace: true })
  }

  const filteredProducts = displayProducts.filter((product: Product) => {
    const matchesCategory = selectedCategory === 'All Products' || queryFromUrl || product.category?.name === selectedCategory
    const matchesPrice = product.price <= priceRange
    const matchesSearch = !queryFromUrl || product.name.toLowerCase().includes(queryFromUrl.toLowerCase())
    return Boolean(matchesCategory) && matchesPrice && matchesSearch
  })

  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title="Shop Sacred Items" description="Explore our collection of lab-certified gemstones, energized rudraksha, and sacred yantras for spiritual growth and prosperity." />

      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311" alt="Sacred Shop" className="w-full h-full object-cover opacity-10" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.8 }} />
        </div>

        <div className="container relative z-10 text-center">
          <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block', fontFamily: 'var(--font-accent)', color: 'var(--color-saffron)', backgroundColor: 'transparent', padding: 0 }}>
            SACRED SHOP
          </span>
          <h1 className="font-serif" style={{ fontSize: '3rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Divine Items for your Spiritual Journey
          </h1>
          <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', margin: '0 auto 1.5rem' }} />
          <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7, margin: '0 auto' }}>
            Explore our curated collection of lab-certified Rudrakshas, Gemstones, and Yantras, each item energised through traditional Vedic rituals.
          </p>

          <div style={{ maxWidth: '500px', margin: '1.5rem auto 0', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search gemstones, rudraksha, yantra..."
              value={queryFromUrl}
              onChange={(e) => handleSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                borderRadius: '2rem',
                border: '1px solid var(--color-border)',
                background: 'white',
                outline: 'none',
              }}
            />
            <Search style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} size={20} />
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>
      <div className="divider-ornamental">*</div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <aside style={{
              width: '280px',
              flexShrink: 0,
              alignSelf: 'flex-start',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '1rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  color: 'var(--color-earth)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}>
                  <SlidersHorizontal size={18} className="text-[var(--color-saffron)]" /> Categories
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setActiveCat('All Products')}
                    style={{
                      padding: '0.4rem 1rem',
                      borderRadius: '2rem',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-accent)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: selectedCategory === 'All Products' ? '2px solid var(--color-saffron)' : '2px solid var(--color-border)',
                      background: selectedCategory === 'All Products' ? 'var(--color-saffron)' : 'transparent',
                      color: selectedCategory === 'All Products' ? 'white' : 'var(--color-text-secondary)',
                    }}
                  >
                    All Products
                  </button>
                  {categories.map((cat: { id: number | string; name: string }) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCat(cat.name)}
                      style={{
                        padding: '0.4rem 1rem',
                        borderRadius: '2rem',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-accent)',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: selectedCategory === cat.name ? '2px solid var(--color-saffron)' : '2px solid var(--color-border)',
                        background: selectedCategory === cat.name ? 'var(--color-saffron)' : 'transparent',
                        color: selectedCategory === cat.name ? 'white' : 'var(--color-text-secondary)',
                        opacity: queryFromUrl ? 0.65 : 1,
                      }}
                      disabled={Boolean(queryFromUrl)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 0 }} />

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  color: 'var(--color-earth)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}>
                  Price Range
                </h3>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full"
                  style={{ accentColor: 'var(--color-saffron)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>₹0</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Up to ₹{priceRange.toLocaleString()}</span>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 0 }} />

              <div className="card" style={{ padding: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
                <h4 className="font-serif" style={{ fontSize: '1rem', color: 'var(--color-earth)', margin: 0 }}>Need Help Choosing?</h4>
                <a href="https://calendly.com/manuastro2022/30min" className="btn-gold w-full" style={{ display: 'flex', justifyContent: 'center' }}>Chat with Expert</a>
              </div>
            </aside>

            <div style={{ flex: 1, minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
              <div className="flex flex-wrap gap-4 justify-between items-center mb-8 pb-6 border-b border-[var(--color-gold)]/10">
                <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
                  {queryFromUrl ? `Search results for "${queryFromUrl}"` : `Showing ${filteredProducts.length} items`}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Sort by:</span>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-[var(--color-gold)]/10 rounded-xl px-6 py-2.5 text-xs font-bold uppercase tracking-widest pr-12 focus:ring-0 outline-none text-[var(--color-earth)] cursor-pointer hover:border-[var(--color-saffron)] transition-all">
                      <option>Latest Arrivals</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Top Rated</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="card h-[420px] bg-white animate-pulse rounded-3xl" style={{ padding: 0 }} />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', flex: 1 }}>
                  {filteredProducts.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="card" style={{ padding: '3rem', textAlign: 'center', background: 'white' }}>
                  {queryFromUrl
                    ? `No products found for "${queryFromUrl}". Try a different product name or keyword.`
                    : 'No products found yet. Add products in the admin dashboard and they will appear here automatically.'}
                </div>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '3rem',
                paddingBottom: '2rem'
              }}>
                <button style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-saffron)',
                  color: 'white',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>1</button>
                <button style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--color-border)',
                  background: 'white',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>2</button>
                <button style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--color-border)',
                  background: 'white',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>3</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
