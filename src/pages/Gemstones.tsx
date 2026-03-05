import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Award, Microscope } from 'lucide-react'
import ProductCard from '@/components/shop/ProductCard'

const GEM_CATEGORIES = [
    'All', 'Ruby', 'Emerald', 'Yellow Sapphire', 'Blue Sapphire', 'Pearl', 'Coral', 'Hessonite', 'Cat\'s Eye'
]

const MOCK_GEMS = [
    { id: 'g1', name: 'Premium Natural Ruby (Manik)', slug: 'natural-ruby', price: 25000, comparePrice: 30000, planet: 'Sun', weight: '5.25 Ratti', rating: 5, badge: 'Rules: Sun' },
    { id: 'g2', name: 'Zambian Emerald (Panna)', slug: 'zambian-emerald', price: 18000, comparePrice: 22000, planet: 'Mercury', weight: '4.50 Ratti', rating: 5, badge: 'Rules: Mercury' },
    { id: 'g3', name: 'Ceylon Yellow Sapphire', slug: 'yellow-sapphire', price: 45000, comparePrice: 55000, planet: 'Jupiter', weight: '6.15 Ratti', rating: 5, badge: 'Rules: Jupiter' },
    { id: 'g4', name: 'Natural Blue Sapphire (Neelam)', slug: 'blue-sapphire', price: 65000, comparePrice: 80000, planet: 'Saturn', weight: '5.50 Ratti', rating: 5, badge: 'Rules: Saturn' },
    { id: 'g5', name: 'South Sea Pearl (Moti)', slug: 'south-sea-pearl', price: 8500, comparePrice: 10000, planet: 'Moon', weight: '7.25 Ratti', rating: 4, badge: 'Rules: Moon' },
    { id: 'g6', name: 'Red Coral (Moonga) Italian', slug: 'red-coral', price: 12000, comparePrice: 15000, planet: 'Mars', weight: '8.50 Ratti', rating: 5, badge: 'Rules: Mars' },
    { id: 'g7', name: 'Ceylon Hessonite (Gomed)', slug: 'hessonite-gomed', price: 9500, comparePrice: 12000, planet: 'Rahu', weight: '6.75 Ratti', rating: 4, badge: 'Rules: Rahu' },
    { id: 'g8', name: 'Cat\'s Eye (Lehsunia)', slug: 'cats-eye', price: 11000, comparePrice: 14000, planet: 'Ketu', weight: '5.85 Ratti', rating: 5, badge: 'Rules: Ketu' }
]

const rise = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay }
})

export default function Gemstones() {
    const [activeTab, setActiveTab] = useState('All')

    return (
        <div className="bg-[#fdf7ed]">
            {/* ════ HERO ════ */}
            <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&auto=format&fit=crop" alt="Precious Gemstones" className="w-full h-full object-cover opacity-15" />
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

            {/* Filter Tabs */}
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
                        {GEM_CATEGORIES.map(tab => (
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
                        {MOCK_GEMS.filter(g => activeTab === 'All' || g.name.includes(activeTab)).map((gem, i) => (
                            <ProductCard
                                key={gem.id}
                                product={{
                                    id: gem.id,
                                    name: gem.name,
                                    slug: gem.slug,
                                    price: gem.price,
                                    comparePrice: gem.comparePrice,
                                    thumbnail_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
                                    rating: gem.rating,
                                    badge: gem.badge
                                } as any}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <div className="divider-ornamental my-12">✦</div>

            {/* Science Section - Fix 4 & 10 */}
            <section className="section bg-[#faf2e2]">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 className="font-serif" style={{
                            fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
                        }}>
                            The Science of Gem Therapy
                        </h2>
                        <div style={{
                            width: '50px', height: '3px',
                            background: 'var(--color-gold)', margin: '0 auto'
                        }} />
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
            </section>

            <div className="divider-ornamental my-12">✦</div>

            {/* CTA - Fix 10 */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
                        <h2 className="font-serif" style={{
                            fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
                        }}>
                            Not sure which gemstone is right for you?
                        </h2>
                        <div style={{
                            width: '50px', height: '3px',
                            background: 'var(--color-gold)', margin: '0 auto 2rem'
                        }} />
                        <p className="font-sans" style={{
                            fontSize: '1.1rem', color: 'var(--color-text-muted)',
                            lineHeight: 1.75, marginBottom: '2.5rem'
                        }}>
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
