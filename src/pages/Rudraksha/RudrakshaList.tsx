import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Heart, ShoppingCart } from 'lucide-react'
import ProductCard from '@/components/shop/ProductCard'

const MUKHI_TABS = [
    'All', '1 Mukhi', '2 Mukhi', '3 Mukhi', '4 Mukhi', '5 Mukhi', '6 Mukhi', '7 Mukhi', '8 Mukhi', '9 Mukhi', '10 Mukhi', '11 Mukhi', '12 Mukhi', '13 Mukhi', '14 Mukhi', 'Gauri Shankar', 'Garbha Gauri'
]

const MOCK_RUDRAKSHA = Array.from({ length: 14 }, (_, i) => ({
    id: `r${i + 1}`,
    name: `${i + 1} Mukhi Nepali Rudraksha`,
    slug: `${i + 1}-mukhi-nepali`,
    price: 500 * (i + 1),
    mukhi: `${i + 1} Mukhi`,
    benefit: 'Enhances focus and spiritual growth.',
    rating: 5
}))

export default function RudrakshaList() {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialMukhi = searchParams.get('mukhi') || 'All'
    const [activeTab, setActiveTab] = useState(initialMukhi)

    useEffect(() => {
        const mukhi = searchParams.get('mukhi') || 'All'
        setActiveTab(mukhi)
    }, [searchParams])

    const handleTabClick = (value: string) => {
        setActiveTab(value)
        setSearchParams({ mukhi: value })
    }

    const filteredProducts = MOCK_RUDRAKSHA.filter(p => activeTab === 'All' || p.mukhi === activeTab)

    return (
        <div className="bg-[#fdf7ed]">
            {/* ════ HERO ════ */}
            <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src="https://images.unsplash.com/photo-1609743522653-52354461eb27?w=1400&auto=format&fit=crop" alt="Nepali Rudraksha" className="w-full h-full object-cover opacity-15" />
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
                            100% Natural, Lab-Certified beads handpicked from the foothills of the Himalayas — energized through traditional Vedic rituals for your spiritual empowerment.
                        </p>
                    </div>
                </div>
            </section>

            <div className="divider-ornamental">*</div>

            {/* Tabs & Product Grid */}
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
                        {MUKHI_TABS.map(tab => (
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

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: '1.5rem',
                    }}>
                        {filteredProducts.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="card group"
                            >
                                <div className="product-img-wrap h-56 bg-[#faf2e2] relative">
                                    <img src="https://images.unsplash.com/photo-1609743522653-52354461eb27?w=400" className="w-full h-full object-cover" />
                                    <div className="absolute top-4 left-4"><span className="badge-saffron">{p.mukhi}</span></div>
                                    <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-[var(--color-text-muted)] hover:text-saffron transition-all shadow-sm"><Heart size={16} /></button>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-serif text-lg mb-2 text-[var(--color-earth)] group-hover:text-[var(--color-saffron)] transition-colors">{p.name}</h3>
                                    <p className="text-[10px] text-[var(--color-text-muted)] mb-4 uppercase font-bold tracking-widest">{p.benefit}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-gold">₹{p.price.toLocaleString()}</span>
                                        <button className="btn-primary p-2 h-10 w-10 flex items-center justify-center"><ShoppingCart size={16} /></button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section - Fix 9 */}
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
                                <h4 className="font-serif" style={{
                                    fontSize: '1rem', color: 'var(--color-earth)', margin: 0
                                }}>
                                    {item.title}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guide - Fix 9 & 10 */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 className="font-serif" style={{
                            fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
                        }}>
                            How to Wear Your Rudraksha
                        </h2>
                        <div style={{
                            width: '50px', height: '3px',
                            background: 'var(--color-gold)', margin: '0 auto'
                        }} />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1.5rem'
                    }}>
                        {[
                            { title: 'Purification', desc: 'Wash with Ganga Jal or raw milk before the first use.' },
                            { title: 'Chanting', desc: 'Recite "Om Nama Shivaya" 108 times during sunrise.' },
                            { title: 'Wearing', desc: 'Wear on an auspicious day like Monday or Mahashivratri.' }
                        ].map((item, i) => (
                            <div key={i} className="card" style={{
                                padding: '2.5rem 2rem', textAlign: 'center',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: '1rem'
                            }}>
                                <div style={{
                                    width: '52px', height: '52px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '2px solid var(--color-gold)',
                                    color: 'var(--color-saffron)', fontSize: '1.3rem',
                                    fontWeight: 700, fontFamily: 'var(--font-serif)',
                                    background: 'var(--color-bg-secondary)', flexShrink: 0
                                }}>
                                    {i + 1}
                                </div>
                                <h3 className="font-serif" style={{
                                    fontSize: '1.2rem', color: 'var(--color-earth)', margin: 0
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    color: 'var(--color-text-muted)', fontSize: '0.9rem',
                                    lineHeight: 1.7, margin: 0
                                }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
