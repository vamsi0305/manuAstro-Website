import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HelpCircle, Eye, Calendar } from 'lucide-react'
import ProductCard from '@/components/shop/ProductCard'

const YANTRA_TABS = [
    'All', 'Copper Platted', 'Export Premium', 'Meru Shree 3D', 'Pyra Silver'
]

const MOCK_YANTRAS = [
    { id: 'y1', name: 'Shree Yantra Copper', slug: 'shree-yantra-copper', type: 'Copper Platted', price: 950 },
    { id: 'y2', name: 'Kuber Yantra Pendent', slug: 'kuber-yantra-pendent', type: 'Pyra Silver', price: 750 },
    { id: 'y3', name: 'Premium Maha Laxmi Yantra', slug: 'maha-laxmi-premium', type: 'Export Premium', price: 2500 },
    { id: 'y4', name: '3D Meru Shree Yantra (Large)', slug: 'meru-shree-3d', type: 'Meru Shree 3D', price: 5500 },
    { id: 'y5', name: 'Vastu Dosh Nivaran Yantra', slug: 'vastu-dosh-yantra', type: 'Copper Platted', price: 1100 },
    { id: 'y6', name: 'Saraswati Yantra Premium', slug: 'saraswati-yantra', type: 'Export Premium', price: 2200 },
    { id: 'y7', name: 'Hanuman Chalisa Yantra', slug: 'hanuman-yantra', type: 'Pyra Silver', price: 850 },
    { id: 'y8', name: 'Silver Ganesha Yantra', slug: 'ganesha-silver', type: 'Pyra Silver', price: 1250 }
]

export default function YantraList() {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialType = searchParams.get('type') || 'All'
    const [activeTab, setActiveTab] = useState(initialType)

    useEffect(() => {
        setActiveTab(searchParams.get('type') || 'All')
    }, [searchParams])

    const handleTabClick = (val: string) => {
        setActiveTab(val)
        setSearchParams({ type: val })
    }

    return (
        <div className="bg-[#fdf7ed]">
            {/* ════ HERO ════ */}
            <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=1400&auto=format&fit=crop" alt="Sacred Yantras" className="w-full h-full object-cover opacity-15" />
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
                            Sacred Yantras are geometrical representations of deities — architectural tools designed to focus cosmic energy and attract prosperity into your space.
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
                    {YANTRA_TABS.map(tab => (
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
                    marginBottom: '6rem'
                }}>
                    {MOCK_YANTRAS.filter(y => activeTab === 'All' || y.type === activeTab).map(y => (
                        <ProductCard key={y.id} product={{ ...y, thumbnail_url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=400', rating: 5 } as any} />
                    ))}
                </div>

                <div className="divider-ornamental mb-24">✦</div>

                {/* Yantra Info - Fix 4 & 10 */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="font-serif" style={{
                        fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
                    }}>
                        Ancient Geometrical Wisdom
                    </h2>
                    <div style={{
                        width: '50px', height: '3px',
                        background: 'var(--color-gold)', margin: '0 auto'
                    }} />
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
                            <h3 className="font-serif" style={{
                                fontSize: '1.2rem', color: 'var(--color-earth)', margin: 0
                            }}>
                                {item.title}
                            </h3>
                            <p style={{
                                color: 'var(--color-text-muted)', fontSize: '0.9rem',
                                lineHeight: 1.6, margin: 0
                            }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
