import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Star, ShieldCheck, Truck, FlaskConical, BadgeCheck, Users, Clock, Package } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import SEOHead from '@/components/SEOHead'

/* ─── Real manuastro.com Shopify CDN images ──────────────────────────────── */
const CDN = 'https://cdn.shopify.com/s/files/1/0634/2521/6555/files'
const IMG = {
    // Founder & About
    hero: `https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311`,
    about: `https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311`,
    // Testimonials
    t_sakshi: `https://manuastro.com/cdn/shop/files/sakshi-malik.webp?v=1760455941`,
    t_satyawart: `https://manuastro.com/cdn/shop/files/satyawart-kadian.webp?v=1760456114`,
    t_devendra: `https://manuastro.com/cdn/shop/files/devendra-singh.webp?v=1760456542`,
    // Real Rudraksha product images from manuastro.com
    p_gauri_ganesh: `${CDN}/GSGR.jpg?v=1770991476`,
    p_10_mukhi: `https://manuastro.com/cdn/shop/files/10fr_1.jpg?v=1770986595`,
    p_5_mukhi_644: `https://manuastro.com/cdn/shop/files/01_12.jpg?v=1770928499`,
    p_4_mukhi: `https://manuastro.com/cdn/shop/files/01_10.jpg?v=1770927798`,
    p_5_mukhi_565: `https://manuastro.com/cdn/shop/files/01_11.jpg?v=1770928893`,
    p_16_mukhi: `https://manuastro.com/cdn/shop/files/16_FACE_1.jpg?v=1770990686`,
    p_15_mukhi: `https://manuastro.com/cdn/shop/files/15_FACE_1.jpg?v=1770990668`,
    p_14_mukhi: `https://manuastro.com/cdn/shop/files/14_FACE_1.jpg?v=1770990639`,
    p_13_mukhi: `https://manuastro.com/cdn/shop/files/13_FACE_1.jpg?v=1770990713`,
    p_gauri_shankar: `https://manuastro.com/cdn/shop/files/GSR.png?v=1770991378`,
    // Service Artworks
    s_vedic: `https://manuastro.com/cdn/shop/files/Vedic_Astrology_New_500x500_jpg.jpg?v=1770036692`,
    s_palm: `https://manuastro.com/cdn/shop/files/Palm_Reading_New_500x500_jpg.jpg?v=1770036747`,
    s_personal: `https://manuastro.com/cdn/shop/files/Personal_Consultation_New_500x500_jpg.jpg?v=1770036746`,
    s_vaastu: `https://manuastro.com/cdn/shop/files/Vaastu_Consultation_New_500x500_jpg.jpg?v=1770036851`,
    s_corp: `https://manuastro.com/cdn/shop/files/Corporate_Programs_New500x500_jpg.jpg?v=1770036889`,
    s_face: `https://manuastro.com/cdn/shop/files/Face_Reading_Numerology_New_500x500_jpg.jpg?v=1770038794`,
    // Blog images
    blog1: 'https://manuastro.com/cdn/shop/articles/4.jpg?v=1767595180&width=1000',
    blog2: 'https://manuastro.com/cdn/shop/articles/3.jpg?v=1767595482&width=1000',
    blog3: 'https://manuastro.com/cdn/shop/articles/2.jpg?v=1767595410&width=1000',
}

/* ─── Real products from manuastro.com ──────────────────────────────────── */
const PRODUCTS = [
    {
        id: '1', name: 'Gauri Shankar Ganesh Rudraksha (2.25g)',
        slug: 'natural-gauri-shankar-ganesh-rudraksha-2-25-gram',
        price: 65000, compare: 72000, rating: 5.0, reviews: 42, badge: 'Rare',
        img: IMG.p_gauri_ganesh, cat: 'Rudraksha',
    },
    {
        id: '2', name: 'Gauri Shankar Rudraksha (3.67g)',
        slug: 'natural-gauri-shankar-rudraksha3-67-gram',
        price: 9680, compare: 12000, rating: 4.9, reviews: 78, badge: 'Popular',
        img: IMG.p_gauri_shankar, cat: 'Rudraksha',
    },
    {
        id: '3', name: '16 Mukhi Nepali Rudraksha (2.73g)',
        slug: '100-natural-nepali-16-mukhi-rudraksha-2-73-gram',
        price: 110000, compare: 130000, rating: 5.0, reviews: 17, badge: 'Premium',
        img: IMG.p_16_mukhi, cat: 'Rudraksha',
    },
    {
        id: '4', name: '15 Mukhi Nepali Rudraksha (2.73g)',
        slug: '100-natural-nepali-15-mukhi-rudraksha-2-73-gram',
        price: 45000, compare: 55000, rating: 5.0, reviews: 23, badge: 'Premium',
        img: IMG.p_15_mukhi, cat: 'Rudraksha',
    },
    {
        id: '5', name: '14 Mukhi Nepali Rudraksha (2.5g)',
        slug: '100-natural-nepali-14-mukhi-rudraksha-2-5-gram',
        price: 40000, compare: 48000, rating: 4.9, reviews: 31, badge: 'Dev Mani',
        img: IMG.p_14_mukhi, cat: 'Rudraksha',
    },
    {
        id: '6', name: '13 Mukhi Nepali Rudraksha (2.27g)',
        slug: '100-natural-nepali-13-mukhi-rudraksha-2-27-gram',
        price: 21000, compare: 26000, rating: 4.8, reviews: 44, badge: 'Power',
        img: IMG.p_13_mukhi, cat: 'Rudraksha',
    },
    {
        id: '7', name: '5 Mukhi Nepali Rudraksha (6.44g)',
        slug: '100-natural-nepali-5-mukhi-rudraksha-6-44-gram',
        price: 1320, compare: 2000, rating: 4.8, reviews: 62, badge: 'Best Seller',
        img: IMG.p_5_mukhi_644, cat: 'Rudraksha',
    },
    {
        id: '8', name: '10 Mukhi Nepali Rudraksha (2.96g)',
        slug: '100-natural-nepali-10-mukhi-rudraksha-2-96-gram',
        price: 7150, compare: 9000, rating: 4.7, reviews: 89, badge: 'Top Rated',
        img: IMG.p_10_mukhi, cat: 'Rudraksha',
    },
]

const TESTIMONIALS = [
    {
        name: 'Padamshree Sakshi Malik',
        title: 'International Wrestler, Commonwealth Games 2022 Gold Winner',
        img: IMG.t_sakshi,
        rating: 5,
        review: 'Sir aapse baat karke bhout positive feel hota hai… aap bhout acha motivate bhi karte ho.. or aapke btaaye huye uppaye se muje bhout fayda hua hai or professional life or personal life me bhi bhout good changes hue hain.'
    },
    {
        name: 'Satyawart Kadian',
        title: 'International Wrestler, India',
        img: IMG.t_satyawart,
        rating: 5,
        review: 'Bhout jayda positive hua hu sir mai.. or aapse milne k baad aapke uppaye kr baad muje esa lagta hai ki abhi sare kaam ache hi honge.. or mai life me or bhout achieve kar sakta hu.'
    },
    {
        name: 'Devendra Singh',
        title: 'Under Secretary, Government of India',
        img: IMG.t_devendra,
        rating: 5,
        review: 'I appreciate your work and your experience in the field of Astrology, Vastu and allied subjects. Your advice and clarity of subject to your clients is of par excellence. The accuracy of your predictions is almost 100%.'
    },
    {
        name: 'Manu Gupta',
        title: 'Founder, ManuAstro',
        img: IMG.hero,
        rating: 5,
        review: 'Our vision is to make astrology logical, accessible, and globally respected by combining ancient wisdom with modern logic.'
    },
]

const SERVICES = [
    { img: IMG.s_vedic, title: 'Vedic Astrology', desc: 'Birth chart analysis & Jyotish predictions based on classical texts', slug: 'vedic-astrology' },
    { img: IMG.s_palm, title: 'Palm Reading', desc: 'Expert Samudrika Shastra hand analysis for life path guidance', slug: 'palm-reading' },
    { img: IMG.s_personal, title: 'Personal Consultation', desc: 'One-on-one career, marriage & health guidance sessions', slug: 'personal-consultation' },
    { img: IMG.s_vaastu, title: 'Vaastu Consultation', desc: 'Home & office energy harmony for prosperity and health', slug: 'vaastu' },
    { img: IMG.s_corp, title: 'Corporate Programs', desc: 'Astrology-driven team alignment & business insights', slug: 'corporate-programs' },
    { img: IMG.s_face, title: 'Face Reading & Numerology', desc: 'Classical Samudrika facial & numerology personality mapping', slug: 'face-reading' },
]

/* Real blog posts from manuastro.com */
const BLOG = [
    {
        slug: 'best-numerology-reading-online-bangalore',
        title: 'How to Choose the Best Numerology Reading Online Bangalore for Life Guidance',
        cat: 'Numerology', date: 'Feb 2026', readTime: '6 min', img: IMG.blog1,
    },
    {
        slug: 'vaastu-expert-bangalore-home-office-before-buying',
        title: 'Why You Need a Vaastu Expert in Bangalore for Home and Office Before Buying Property',
        cat: 'Vaastu', date: 'Feb 2026', readTime: '7 min', img: IMG.blog2,
    },
    {
        slug: 'horoscope-consultation-online-delhi-services',
        title: 'Horoscope Consultation Online Delhi: Accurate Predictions from Trusted Astrologers',
        cat: 'Horoscope', date: 'Feb 2026', readTime: '5 min', img: IMG.blog3,
    },
]

/* ─── Shared styles ──────────────────────────────────────────────────────── */
const rise = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.4, delay },
})

function StarRow({ n }: { n: number }) {
    return (
        <span style={{ color: 'var(--color-gold)', fontSize: '12px', letterSpacing: '1px' }}>
            {'★'.repeat(n)}{'☆'.repeat(5 - n)}
        </span>
    )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Home() {
    const addItem = useCartStore(s => s.addItem)

    return (
        <div style={{ background: '#fdfbf7', fontFamily: 'DM Sans, sans-serif' }}>
            <SEOHead
                title="Home"
                description="Expert Vedic astrology, gemstones, rudraksha and yantra by Er. Manu Gupta — IIM Ahmedabad alumnus with 15+ years of practice."
            />

            {/* ════ HERO ════ */}
            <section style={{
                position: 'relative', width: '100%', minHeight: '520px',
                display: 'flex', alignItems: 'center',
                background: 'var(--color-bg)', padding: '5rem 0', overflow: 'hidden'
            }}>
                {/* Low-opacity background image */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src={IMG.hero} alt="hero"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'var(--color-bg)', opacity: 0.78
                    }} />
                </div>
                {/* Content */}
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* LEFT */}
                        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
                            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                                🕉 BEST ONLINE ASTROLOGY CONSULTATION
                            </span>
                            <h1 className="font-serif" style={{ fontSize: '3.2rem', color: 'var(--color-earth)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                                A Modern Astrologer with a <span style={{ color: 'var(--color-saffron)' }}>Scientific Mindset & Spiritual Soul</span>
                            </h1>
                            <p className="font-sans" style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
                                <strong>Er. Manu Gupta</strong> — IIM Ahmedabad Alumnus, Founder & CEO, MANUASTRO® LLP. Accurate Kundli readings, birth chart analysis, numerology & Vaastu guidance.
                            </p>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer" className="btn-primary">
                                    Book Your Consultation Now <ArrowRight size={18} />
                                </a>
                                <Link to="/shop" className="btn-gold">
                                    <Star size={18} /> Shop Rudraksha
                                </Link>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {['✔ 100% Natural Nepali Rudraksha', '✔ Lab Certified', '✔ IIM Ahmedabad Alumnus', '✔ Global Consultations'].map(t => (
                                    <span key={t} className="badge-gold">{t}</span>
                                ))}
                            </div>
                        </motion.div>
                        {/* RIGHT */}
                        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
                            <div style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '3px solid var(--color-gold)', background: 'var(--color-bg-secondary)', padding: '10px' }}>
                                <img src={IMG.hero} alt="Er. Manu Gupta" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '1rem' }} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="divider-ornamental">*</div>

            {/* ════ TRUST BAR ════ */}
            <section className="section-sm" style={{ background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <ShieldCheck size={26} color="var(--color-saffron)" />, title: 'Secure Payment', desc: 'UPI · Cards · Net Banking' },
                            { icon: <Truck size={26} color="var(--color-saffron)" />, title: 'Free Shipping', desc: 'On orders above ₹999' },
                            { icon: <FlaskConical size={26} color="var(--color-saffron)" />, title: 'Lab Certified', desc: 'X-Ray & IRL certified beads' },
                            { icon: <BadgeCheck size={26} color="var(--color-saffron)" />, title: 'Money-Back', desc: '100% no-questions guarantee' },
                        ].map(t => (
                            <div key={t.title} className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left', flexDirection: 'row' }}>
                                <div style={{
                                    width: '56px', height: '56px', borderRadius: '50%',
                                    border: '2px solid var(--color-gold)',
                                    background: 'var(--color-bg-card)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {t.icon}
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-earth)', fontWeight: 600 }}>{t.title}</div>
                                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{t.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="divider-ornamental">*</div>

            {/* ════ SERVICES ════ */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>SERVICES OFFERED</span>
                        <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>Vedic Sciences We Practice</h2>
                        <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
                        <p className="font-sans" style={{ color: 'var(--color-text-secondary)', marginTop: '1.5rem', maxWidth: '640px', margin: '1.5rem auto 0', lineHeight: 1.7 }}>
                            Authentic guidance rooted in classical texts by Er. Manu Gupta, IIM Ahmedabad Alumnus
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SERVICES.map((s, i) => (
                            <motion.div key={s.slug} {...rise(i * 0.07)}>
                                <Link
                                    to={`/services/${s.slug}`}
                                    style={{
                                        display: 'block',
                                        borderRadius: '1.25rem',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 20px rgba(58,31,13,0.12)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        border: '1.5px solid rgba(201,151,42,0.2)',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
                                            ; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(58,31,13,0.22)'
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                                            ; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(58,31,13,0.12)'
                                    }}
                                >
                                    <img
                                        src={s.img}
                                        alt={s.title}
                                        style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
                                    />
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        padding: '2rem 1.25rem 1.25rem',
                                        background: 'linear-gradient(to top, rgba(58,31,13,0.88) 0%, rgba(58,31,13,0.3) 60%, transparent 100%)',
                                    }}>
                                        <h3 className="font-serif" style={{
                                            color: '#fff', fontSize: '1.25rem', margin: '0 0 0.5rem',
                                            textAlign: 'center', textShadow: '0 2px 6px rgba(0,0,0,0.5)',
                                        }}>{s.title}</h3>
                                        <p className="font-sans" style={{
                                            color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem',
                                            textAlign: 'center', margin: 0, lineHeight: 1.5,
                                        }}>{s.desc}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer" className="btn-primary">
                            Book Your Consultation <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            <div className="divider-ornamental">*</div>

            {/* ════ STATS ════ */}
            <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { num: '10,000+', label: 'HAPPY CLIENTS', icon: <Users size={28} color="var(--color-saffron)" /> },
                            { num: '15+', label: 'YEARS OF PRACTICE', icon: <Clock size={28} color="var(--color-saffron)" /> },
                            { num: '300+', label: 'RUDRAKSHA PRODUCTS', icon: <Package size={28} color="var(--color-saffron)" /> },
                            { num: '4.9 ★', label: 'AVERAGE RATING', icon: <Star size={28} color="var(--color-saffron)" /> },
                        ].map((s, i) => (
                            <motion.div key={s.label} {...rise(i * 0.08)}>
                                <div style={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        border: '2px solid var(--color-gold)',
                                        background: 'var(--color-bg-card)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1rem'
                                    }}>
                                        {s.icon}
                                    </div>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontFamily: 'var(--font-serif)',
                                        color: 'var(--color-saffron)',
                                        fontWeight: 700
                                    }}>{s.num}</div>
                                    <div style={{
                                        fontFamily: 'var(--font-accent)',
                                        fontSize: '0.75rem',
                                        letterSpacing: '0.1em',
                                        color: 'var(--color-text-secondary)',
                                        marginTop: '0.25rem'
                                    }}>{s.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="divider-ornamental">*</div>

            {/* ════ PRODUCTS ════ */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span className="badge-gold" style={{ marginBottom: '1rem', display: 'inline-block' }}>LATEST PRODUCTS</span>
                        <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>Authentic Nepali Rudraksha</h2>
                        <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
                        <p className="font-sans" style={{ color: 'var(--color-text-secondary)', marginTop: '1.5rem', maxWidth: '640px', margin: '1.5rem auto 0', lineHeight: 1.7 }}>
                            Lab-certified, energised through Vedic rituals — each piece hand-selected from Nepal
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PRODUCTS.map((p, i) => (
                            <motion.div key={p.id} {...rise((i % 4) * 0.07)} className="card group" style={{ padding: 0 }}>
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4"><span className="badge-saffron">{p.badge}</span></div>
                                    <div className="absolute top-4 right-4"><span className="badge-gold" style={{ background: 'rgba(255,255,255,0.9)' }}>★ {p.rating}</span></div>
                                </div>
                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <span className="font-sans text-[0.65rem] font-bold text-saffron uppercase tracking-widest">{p.cat}</span>
                                    <h3 className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--color-earth)', minHeight: '2.8rem', lineHeight: 1.3 }}>{p.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span className="font-bold font-serif" style={{ fontSize: '1.3rem', color: 'var(--color-gold)' }}>₹{p.price.toLocaleString()}</span>
                                        <span className="text-sm line-through text-muted" style={{ opacity: 0.6 }}>₹{p.compare.toLocaleString()}</span>
                                        <span className="text-[10px] font-bold bg-green-50 text-green-700 px-2 py-1 rounded ml-auto">
                                            {Math.round((1 - p.price / p.compare) * 100)}% OFF
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button onClick={() => addItem(p as any)} className="btn-primary flex-1 text-xs py-2.5">Add to Cart</button>
                                        <Link to={`/product/${p.slug}`} className="btn-outline px-3 py-2.5"><ArrowRight size={16} /></Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/shop" className="btn-gold">View Full Collection <ArrowRight size={18} /></Link>
                    </div>
                </div>
            </section>

            <div className="divider-ornamental">*</div>

            {/* ════ ABOUT / FOUNDER ════ */}
            <section style={{ background: '#fff', borderTop: '1px solid #f0e4cc', borderBottom: '1px solid #f0e4cc', paddingTop: '60px', paddingBottom: '60px' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '52px', alignItems: 'center' }}>

                        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                            <img src={IMG.about} alt="Er. Manu Gupta — Founder ManuAstro"
                                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '14px', boxShadow: '0 16px 48px rgba(80,40,10,0.14)', display: 'block' }} />
                        </motion.div>

                        <motion.div {...rise(0.1)}>
                            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9972a', marginBottom: '10px' }}>A Modern Astrologer with a Scientific Mindset and a Spiritual Soul</p>
                            <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', fontWeight: 700, color: '#1e0f06', fontFamily: 'Playfair Display, serif', lineHeight: 1.2, margin: '0 0 6px' }}>
                                Er. Manu Gupta
                            </h2>
                            <p style={{ fontSize: '13px', color: '#c74500', fontWeight: 600, marginBottom: '14px' }}>IIM Ahmedabad Alumnus · Founder & CEO, MANUASTRO® LLP</p>
                            <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#5c3618', marginBottom: '16px' }}>
                                With a strong academic background and over 15 years of experience in astrology and allied sciences, Er. Manu Gupta brings a rare combination of logic, intuition, and practical understanding to his work.
                            </p>
                            <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#5c3618', marginBottom: '24px' }}>
                                His expertise has been featured on media platforms such as <strong>Shraddha TV</strong> and <strong>Signature Monthly Magazine</strong>. He has conducted consultations globally and delivered guest lectures at colleges and institutions.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                                {[
                                    'No vague promises — grounded, compassionate solutions',
                                    'No sensationalism — clear explanations and honest guidance',
                                    'Lab & X-ray certified Nepali Rudraksha with reports',
                                    'Global consultations — career, marriage, health & personal growth',
                                    'Simplifying complex astrological concepts for common people',
                                ].map(point => (
                                    <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                        <span style={{ color: '#3a6b3f', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                                        <span style={{ fontSize: '13.5px', color: '#5c3618', lineHeight: 1.5 }}>{point}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <a href="https://www.manuastro.com/pages/about-us" target="_blank" rel="noopener noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 24px', background: 'linear-gradient(135deg,#c74500,#e07818)', color: '#fff', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                                    Discover Now <ArrowRight size={13} />
                                </a>
                                <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', border: '1.5px solid #c74500', color: '#c74500', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                                    Book Consultation
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ════ TESTIMONIALS ════ */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>WHAT OUR CLIENTS SAY</span>
                        <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>Real Transformations</h2>
                        <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
                        <p className="font-sans" style={{ color: 'var(--color-text-secondary)', marginTop: '1.5rem', maxWidth: '640px', margin: '1.5rem auto 0', lineHeight: 1.7 }}>
                            Thousands of lives changed through authentic Vedic guidance
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TESTIMONIALS.map((t, i) => (
                            <div key={t.name} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ color: 'var(--color-gold)', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', gap: '2px' }}>
                                    {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="var(--color-gold)" />)}
                                </div>
                                <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem', flex: 1 }}>
                                    "{t.review}"
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--color-gold)', overflow: 'hidden', background: 'var(--color-bg-secondary)', flexShrink: 0 }}>
                                        <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-sm" style={{ color: 'var(--color-earth)', margin: 0 }}>{t.name}</h4>
                                        <p className="font-sans text-[0.65rem] text-muted uppercase tracking-widest line-clamp-1">{t.title || 'Client'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <a href="https://play.google.com/store/apps/details?id=com.manuastroapp&hl=en_GB" target="_blank" rel="noopener noreferrer" className="btn-outline">
                            📱 Get the ManuAstro App
                        </a>
                    </div>
                </div>
            </section>

            <div className="divider-ornamental">*</div>

            {/* ════ BLOG ════ */}
            <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span className="badge-gold" style={{ marginBottom: '1rem', display: 'inline-block' }}>LATEST BLOGS</span>
                        <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>Vedic Insights & Guidance</h2>
                        <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {BLOG.map((post, i) => (
                            <motion.div key={post.slug} {...rise(i * 0.09)}>
                                <Link
                                    to={`/blog/${post.slug}`}
                                    style={{
                                        display: 'block',
                                        borderRadius: '1.25rem',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 16px rgba(58,31,13,0.10)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        border: '1.5px solid rgba(201,151,42,0.15)',
                                        background: '#fff',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'
                                            ; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 32px rgba(58,31,13,0.18)'
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                                            ; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(58,31,13,0.10)'
                                    }}
                                >
                                    <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                                        <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                                        />
                                        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                                            <span className="badge-saffron" style={{ fontSize: '0.65rem' }}>{post.cat}</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <h3 className="font-serif" style={{ fontSize: '1.15rem', color: 'var(--color-earth)', marginBottom: '1rem', minHeight: '3.2rem', lineHeight: 1.4 }}>{post.title}</h3>
                                        <div className="flex items-center justify-between pt-4 border-t border-gold/10 mt-auto">
                                            <span className="font-sans text-[0.7rem] text-muted">{post.date}</span>
                                            <span className="text-saffron font-bold text-xs">Read More →</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/blog" className="btn-outline">View All Blogs <ArrowRight size={14} /></Link>
                    </div>
                </div>
            </section>

            <div className="divider-ornamental">*</div>

            {/* ════ CTA ════ */}
            <section className="section">
                <div className="container">
                    <div className="card text-center relative overflow-hidden" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', background: 'var(--color-bg-secondary)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔮</div>
                        <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1.5rem' }}>
                            Ready for Your Personalised Cosmic Guidance?
                        </h2>
                        <p className="font-sans" style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                            Book a one-on-one consultation with Er. Manu Gupta — IIM Ahmedabad Alumnus, Vedic Astrologer with 15+ years guiding thousands globally.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer" className="btn-primary px-10">
                                Book Consultation Now <ArrowRight size={20} />
                            </a>
                            <Link to="/pricing" className="btn-gold px-10">
                                View Pricing Plans
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
