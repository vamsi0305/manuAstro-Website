import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import SEOHead from '@/components/SEOHead'
import ProductCard from '@/components/shop/ProductCard'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/api/services/product.service'

export default function CategoryPage() {
    const { category } = useParams<{ category: string }>();
    if (!category) return null;

    // REDIRECT MOCK CATEGORIES
    if (category === 'gemstones') return <Navigate to="/gemstones" replace />;
    if (category === 'rudraksha') return <Navigate to="/rudraksha" replace />;
    if (category === 'yantra') return <Navigate to="/yantra" replace />;

    const [priceRange, setPriceRange] = useState(100000)

    const categoryTitle = category
        ?.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: productService.getCategories
    })

    const { data: productsData, isLoading } = useQuery({
        queryKey: ['products', categoryTitle],
        queryFn: () => productService.getAll({
            category: categoryTitle,
        })
    })

    const products = productsData ?? [];
    const filteredProducts = products.filter((p: any) => (p.price || 0) <= priceRange)

    return (
        <div className="bg-[#fdf7ed]">
            <SEOHead title={`${categoryTitle} Collection`} description={`Explore our exclusive collection of ${categoryTitle}. Each item is lab-certified and energized for your spiritual journey.`} />
            {/* ════ HERO ════ */}
            <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src="https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311" alt={categoryTitle} className="w-full h-full object-cover opacity-10" />
                    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.8 }} />
                </div>

                <div className="container relative z-10 text-center">
                    <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block', fontFamily: 'var(--font-accent)', color: 'var(--color-saffron)', backgroundColor: 'transparent', padding: 0 }}>
                        SACRED COLLECTION
                    </span>
                    <h1 className="font-serif" style={{ fontSize: '3rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                        {categoryTitle}
                    </h1>
                    <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', margin: '0 auto 1.5rem' }} />
                    <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7, margin: '0 auto' }}>
                        Explore our curated collection of lab-certified {categoryTitle} — each item energised through traditional Vedic rituals.
                    </p>
                </div>
            </section>

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
                                    {categories.map((cat: any, idx: number) => (
                                        <Link
                                            key={cat.id || cat.name || idx}
                                            to={`/shop/category/${cat.name.toLowerCase().replace(/ /g, '-')}`}
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
                                                border: categoryTitle === cat.name
                                                    ? '2px solid var(--color-saffron)'
                                                    : '2px solid var(--color-border)',
                                                background: categoryTitle === cat.name
                                                    ? 'var(--color-saffron)'
                                                    : 'transparent',
                                                color: categoryTitle === cat.name
                                                    ? 'white'
                                                    : 'var(--color-text-secondary)',
                                                textDecoration: 'none',
                                                display: 'inline-block'
                                            }}
                                        >
                                            {cat.name}
                                        </Link>
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
                                filteredProducts && filteredProducts.length > 0 ? (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', flex: 1 }}>
                                        {filteredProducts.map((p: any, idx: number) => {
                                            const productWithImageFallback = {
                                                ...p,
                                                thumbnail_url: p.thumbnail_url || p.image || 'https://manuastro.com/cdn/shop/files/16_FACE_1.jpg?v=1770990686'
                                            }
                                            return <ProductCard key={p.id || p._id || idx} product={productWithImageFallback} />
                                        })}
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
                                        No products found in this category.
                                    </div>
                                )
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
