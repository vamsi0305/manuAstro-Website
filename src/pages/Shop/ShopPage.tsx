import { useState } from 'react'
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import SEOHead from '@/components/SEOHead'
import ProductCard from '@/components/shop/ProductCard'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/api/services/product.service'

const FALLBACK_PRODUCTS = [
  {
    id: 1, name: "Premium Natural Ruby (Manik)", slug: "premium-natural-ruby-manik",
    price: 15000, is_featured: true,
    image_url: "https://manuastro.com/cdn/shop/files/Vedic_Astrology_New_500x500_jpg.jpg?v=1770036692",
    category: { name: "Gemstones" }, rating: 5
  },
  {
    id: 2, name: "Zambian Emerald (Panna)", slug: "zambian-emerald-panna",
    price: 12000, is_featured: true,
    image_url: "https://manuastro.com/cdn/shop/files/Palm_Reading_New_500x500_jpg.jpg?v=1770036747",
    category: { name: "Gemstones" }, rating: 5
  },
  {
    id: 3, name: "Ceylon Yellow Sapphire", slug: "ceylon-yellow-sapphire-pukhraj",
    price: 18000, is_featured: true,
    image_url: "https://manuastro.com/cdn/shop/files/Personal_Consultation_New_500x500_jpg.jpg?v=1770036746",
    category: { name: "Gemstones" }, rating: 5
  },
  {
    id: 4, name: "5 Mukhi Nepali Rudraksha", slug: "5-mukhi-nepali-rudraksha",
    price: 1320, is_featured: true,
    image_url: "https://manuastro.com/cdn/shop/files/01_11.jpg?v=1770928893",
    category: { name: "Rudraksha" }, rating: 5
  },
  {
    id: 5, name: "4 Mukhi Nepali Rudraksha", slug: "4-mukhi-nepali-rudraksha",
    price: 1200, is_featured: false,
    image_url: "https://manuastro.com/cdn/shop/files/01_10.jpg?v=1770927798",
    category: { name: "Rudraksha" }, rating: 5
  },
  {
    id: 6, name: "10 Mukhi Nepali Rudraksha", slug: "10-mukhi-nepali-rudraksha",
    price: 7150, is_featured: true,
    image_url: "https://manuastro.com/cdn/shop/files/10fr_1.jpg?v=1770986595",
    category: { name: "Rudraksha" }, rating: 5
  },
  {
    id: 7, name: "Gauri Shankar Rudraksha", slug: "gauri-shankar-rudraksha",
    price: 9680, is_featured: true,
    image_url: "https://manuastro.com/cdn/shop/files/GSR.png?v=1770991378",
    category: { name: "Rudraksha" }, rating: 5
  },
  {
    id: 8, name: "Shree Yantra Copper", slug: "shree-yantra-copper",
    price: 950, is_featured: true,
    image_url: "https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876",
    category: { name: "Yantra" }, rating: 5
  },
  {
    id: 9, name: "Surya Yantra", slug: "surya-yantra",
    price: 750, is_featured: false,
    image_url: "https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842",
    category: { name: "Yantra" }, rating: 5
  },
  {
    id: 10, name: "Mangal Yantra", slug: "mangal-yantra",
    price: 850, is_featured: true,
    image_url: "https://manuastro.com/cdn/shop/files/Mangal_Yantra.jpg?v=1765298377",
    category: { name: "Yantra" }, rating: 5
  },
]

export default function ShopPage() {
  const [activeCat, setActiveCat] = useState('All Products')
  const [priceRange, setPriceRange] = useState(100000)
  const [searchQuery, setSearchQuery] = useState('')

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories
  })

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', activeCat, searchQuery],
    queryFn: () => productService.getAll({
      category: activeCat !== 'All Products' ? activeCat : undefined,
      q: searchQuery || undefined
    })
  })

  // In ShopPage component — fallback if backend returns empty
  const rawProducts = Array.isArray(products) ? products : []
  const displayProducts = rawProducts.length > 0 ? rawProducts : FALLBACK_PRODUCTS

  // Filter products
  const filteredProducts = displayProducts.filter((p: any) => {
    const matchesCategory = activeCat === 'All Products' || p.category?.name === activeCat
    const matchesPrice = p.price <= priceRange
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesPrice && matchesSearch
  })

  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title="Shop Sacred Items" description="Explore our collection of lab-certified gemstones, energized rudraksha, and sacred yantras for spiritual growth and prosperity." />
      {/* ════ HERO ════ */}
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
            Explore our curated collection of lab-certified Rudrakshas, Gemstones, and Yantras — each item energised through traditional Vedic rituals.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: '500px', margin: '1.5rem auto 0', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search gemstones, rudraksha, yantra..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            {/* Sidebar Filters */}
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
                      border: activeCat === 'All Products'
                        ? '2px solid var(--color-saffron)'
                        : '2px solid var(--color-border)',
                      background: activeCat === 'All Products'
                        ? 'var(--color-saffron)'
                        : 'transparent',
                      color: activeCat === 'All Products'
                        ? 'white'
                        : 'var(--color-text-secondary)',
                    }}
                  >
                    All Products
                  </button>
                  {categories.map((cat: any) => (
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
                        border: activeCat === cat.name
                          ? '2px solid var(--color-saffron)'
                          : '2px solid var(--color-border)',
                        background: activeCat === cat.name
                          ? 'var(--color-saffron)'
                          : 'transparent',
                        color: activeCat === cat.name
                          ? 'white'
                          : 'var(--color-text-secondary)',
                      }}
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
                }}>Price Range</h3>
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

            {/* Product Grid */}
            <div style={{ flex: 1, minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
              <div className="flex flex-wrap gap-4 justify-between items-center mb-8 pb-6 border-b border-[var(--color-gold)]/10">
                <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Showing {filteredProducts.length} items</p>
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
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="card h-[420px] bg-white animate-pulse rounded-3xl" style={{ padding: 0 }} />
                  ))}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', flex: 1 }}>
                  {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p as any} />
                  ))}
                </div>
              )}

              {/* Pagination */}
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
                  background: 'transparent',
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
                  background: 'transparent',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>3</button>
                <button style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  border: '1px solid var(--color-border)',
                  background: 'transparent',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  cursor: 'pointer'
                }}>
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
