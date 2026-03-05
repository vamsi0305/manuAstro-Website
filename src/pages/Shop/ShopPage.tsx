import { useState } from 'react'
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import ProductCard from '@/components/shop/ProductCard'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/api/services/product.service'

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

  // Filter local price (as a fallback or additional filter)
  const filteredProducts = products.filter(p => p.price <= priceRange)

  return (
    <div className="bg-[#fdf7ed]">
      {/* ════ HERO ════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=1400&auto=format&fit=crop" alt="Sacred Shop" className="w-full h-full object-cover opacity-10" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.8 }} />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>SACRED SHOP</span>
              <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                Divine Items for your Spiritual Journey
              </h1>
              <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
              <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '540px', lineHeight: 1.7 }}>
                Explore our curated collection of lab-certified Rudrakshas, Gemstones, and Yantras — each item energised through traditional Vedic rituals.
              </p>
            </div>

            <div className="flex justify-start lg:justify-end">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-8 py-5 rounded-2xl border border-gold/20 bg-white/80 backdrop-blur-sm focus:ring-4 focus:ring-saffron/5 outline-none text-text-primary transition-all shadow-sm"
                />
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      <div className="divider-ornamental">*</div>

      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-[280px_1fr] gap-16">
            {/* Sidebar Filters */}
            <aside className="space-y-12">
              <div>
                <h3 className="font-serif text-[var(--color-earth)] mb-6 flex items-center gap-2" style={{ fontSize: '1.25rem' }}>
                  <SlidersHorizontal size={18} className="text-[var(--color-saffron)]" /> Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveCat('All Products')}
                    className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeCat === 'All Products'
                      ? 'bg-[var(--color-earth)] text-white shadow-xl'
                      : 'bg-white text-[var(--color-text-muted)] hover:bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/5'
                      }`}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCat(cat.name)}
                      className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeCat === cat.name
                        ? 'bg-[var(--color-earth)] text-white shadow-xl'
                        : 'bg-white text-[var(--color-text-muted)] hover:bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/5'
                        }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-[var(--color-earth)] mb-6" style={{ fontSize: '1.25rem' }}>Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-[var(--color-saffron)]"
                />
                <div className="flex justify-between mt-4 text-[10px] font-bold text-[var(--color-earth)] uppercase tracking-widest">
                  <span>₹0</span>
                  <span className="bg-[var(--color-bg-secondary)] px-3 py-1 rounded-full border border-[var(--color-gold)]/20">Up to ₹{priceRange.toLocaleString()}</span>
                </div>
              </div>

              <div className="card p-8 bg-[var(--color-earth)] text-[#fdf7ed] text-center border-0 shadow-2xl">
                <h4 className="font-serif text-lg mb-3">Need Help Choosing?</h4>
                <p className="text-xs opacity-80 mb-6 leading-relaxed">Book a 5-minute quick consultation with our expert.</p>
                <a href="https://calendly.com/manuastro2022/30min" className="btn-gold py-3 text-[10px] w-full justify-center">Chat with Expert</a>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="min-h-[600px]">
              <div className="flex flex-wrap gap-4 justify-between items-center mb-12 pb-6 border-b border-[var(--color-gold)]/10">
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="card h-[420px] bg-white animate-pulse rounded-3xl" style={{ padding: 0 }} />
                  ))}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p as any} />
                  ))}
                </div>
              )}

              {/* Pagination - Fix 10 */}
              <div className="flex justify-center mt-20 gap-3">
                <button className="w-10 h-10 rounded-xl bg-[var(--color-earth)] text-white flex items-center justify-center text-xs font-bold shadow-xl">1</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-[var(--color-gold)]/10 flex items-center justify-center text-xs font-bold text-[var(--color-text-muted)] hover:border-[var(--color-saffron)] transition-all">2</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-[var(--color-gold)]/10 flex items-center justify-center text-xs font-bold text-[var(--color-text-muted)] hover:border-[var(--color-saffron)] transition-all">3</button>
                <button className="px-6 h-10 rounded-xl bg-white border border-[var(--color-gold)]/10 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-earth)] hover:border-[var(--color-saffron)] transition-all">Next</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
