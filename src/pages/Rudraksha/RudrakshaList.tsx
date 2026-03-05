import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Heart, ShoppingCart } from 'lucide-react'
import ProductCard from '@/components/shop/ProductCard'
import SEOHead from '@/components/SEOHead'

const MUKHI_TABS = [
    'All', '1 Mukhi', '2 Mukhi', '3 Mukhi', '4 Mukhi', '5 Mukhi', '6 Mukhi', '7 Mukhi', '8 Mukhi', '9 Mukhi', '10 Mukhi', '11 Mukhi', '12 Mukhi', '13 Mukhi', '14 Mukhi', 'Gauri Shankar', 'Garbha Gauri'
]

const MOCK_RUDRAKSHA = [
    { id: 'r1', name: 'Gauri Shankar Ganesh Rudraksha (2.25g)', slug: 'gauri-shankar-ganesh-rudraksha', price: 65000, mukhi: 'Gauri Shankar', benefit: 'Balance and obstacle removal.', image: 'https://manuastro.com/cdn/shop/files/GSGR.jpg?v=1770991476' },
    { id: 'r2', name: '10 Mukhi Nepali Rudraksha (2.96g)', slug: '10-mukhi-nepali-rudraksha', price: 7150, mukhi: '10 Mukhi', benefit: 'Protection and peace.', image: 'https://manuastro.com/cdn/shop/files/10fr_1.jpg?v=1770986595' },
    { id: 'r3', name: '5 Mukhi Nepali Rudraksha (6.44g)', slug: '5-mukhi-nepali-rudraksha-6-44', price: 1320, mukhi: '5 Mukhi', benefit: 'Health and academic success.', image: 'https://manuastro.com/cdn/shop/files/01_12.jpg?v=1770928499' },
    { id: 'r4', name: '4 Mukhi Nepali Rudraksha (4.7g)', slug: '4-mukhi-nepali-rudraksha', price: 1200, mukhi: '4 Mukhi', benefit: 'Creativity and knowledge.', image: 'https://manuastro.com/cdn/shop/files/01_10.jpg?v=1770927798' },
    { id: 'r5', name: '5 Mukhi Nepali Rudraksha (5.65g)', slug: '5-mukhi-nepali-rudraksha-5-65', price: 1320, mukhi: '5 Mukhi', benefit: 'General well-being and memory.', image: 'https://manuastro.com/cdn/shop/files/01_11.jpg?v=1770928893' },
    { id: 'r6', name: '16 Mukhi Nepali Rudraksha (2.73g)', slug: '16-mukhi-nepali-rudraksha', price: 110000, mukhi: '16 Mukhi', benefit: 'Victory and security.', image: 'https://manuastro.com/cdn/shop/files/16_FACE_1.jpg?v=1770990686' },
    { id: 'r7', name: '15 Mukhi Nepali Rudraksha (2.73g)', slug: '15-mukhi-nepali-rudraksha', price: 45000, mukhi: '15 Mukhi', benefit: 'Wealth and economic gain.', image: 'https://manuastro.com/cdn/shop/files/15_FACE_1.jpg?v=1770990668' },
    { id: 'r8', name: '14 Mukhi Nepali Rudraksha (2.5g)', slug: '14-mukhi-nepali-rudraksha', price: 40000, mukhi: '14 Mukhi', benefit: 'Dev Mani - Ultimate protection.', image: 'https://manuastro.com/cdn/shop/files/14_FACE_1.jpg?v=1770990639', badge: 'Dev Mani' },
    { id: 'r9', name: '13 Mukhi Nepali Rudraksha (2.27g)', slug: '13-mukhi-nepali-rudraksha', price: 21000, mukhi: '13 Mukhi', benefit: 'Attraction and charisma.', image: 'https://manuastro.com/cdn/shop/files/13_FACE_1.jpg?v=1770990713' },
    { id: 'r10', name: 'Gauri Shankar Rudraksha (3.67g)', slug: 'gauri-shankar-rudraksha', price: 9680, mukhi: 'Gauri Shankar', benefit: 'Unity and relationship harmony.', image: 'https://manuastro.com/cdn/shop/files/GSR.png?v=1770991378' },
]

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
            <SEOHead title="Nepali Rudraksha Collection" description="Authentic Nepali Rudraksha beads from 1 to 21 Mukhi. Laboratory certified with independent X-Ray reports for spiritual seekers." />
            {/* ════ HERO ════ */}
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
                                <div style={{
                                    borderRadius: '1rem 1rem 0 0',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    height: '220px',
                                    background: 'var(--color-bg-secondary)'
                                }}>
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        style={{
                                            width: '100%',
                                            height: '220px',
                                            objectFit: 'cover',
                                            display: 'block',
                                            borderRadius: '1rem 1rem 0 0'
                                        }}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://cdn.shopify.com/s/files/1/0634/2521/6555/files/13_FACE_1.jpg?v=1770990713';
                                        }}
                                    />
                                    {/* Planet badge top-left */}
                                    {p.mukhi && (
                                        <span style={{
                                            position: 'absolute', top: '0.75rem', left: '0.75rem',
                                            background: 'var(--color-saffron)', color: 'white',
                                            fontSize: '0.7rem', fontWeight: 600,
                                            padding: '0.2rem 0.6rem', borderRadius: '1rem',
                                            fontFamily: 'var(--font-accent)', letterSpacing: '0.05em'
                                        }}>
                                            {(p as any).badge || p.mukhi}
                                        </span>
                                    )}
                                    {/* Wishlist heart top-right */}
                                    <button style={{
                                        position: 'absolute', top: '0.75rem', right: '0.75rem',
                                        width: '32px', height: '32px', borderRadius: '50%',
                                        background: 'rgba(255,249,242,0.9)',
                                        border: '1px solid var(--color-border)',
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', cursor: 'pointer',
                                        color: 'var(--color-saffron)'
                                    }}>
                                        ♥
                                    </button>
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
