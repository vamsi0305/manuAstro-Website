import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Star } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'

/* ─── Real manuastro.com Shopify CDN images ──────────────────────────────── */
const CDN = 'https://cdn.shopify.com/s/files/1/0634/2521/6555/files'
const IMG = {
    // Founder & About
    hero: `https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311&width=900`,
    about: `https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311&width=900`,
    // Real Rudraksha product images from manuastro.com
    p_gauri_ganesh: `${CDN}/GSGR.jpg?v=1770991476`,
    p_10_mukhi: `${CDN}/10fr02.jpg?v=1770984663`,
    p_11_mukhi: `${CDN}/11fr02.jpg?v=1770989986`,
    p_13_mukhi: `${CDN}/13_FACE_1.jpg?v=1770990713`,
    p_14_mukhi: `${CDN}/14_FACE_1.jpg?v=1770990639`,
    p_15_mukhi: `${CDN}/15_FACE_1.jpg?v=1770990668`,
    p_16_mukhi: `${CDN}/16_FACE_1.jpg?v=1770990686`,
    p_gauri_shankar: `${CDN}/GSR.png?v=1770991378`,
    p_garbh_gauri: `${CDN}/GarbhGauri.png?v=1770990982`,
    // Service Artworks
    s_vedic: `https://manuastro.com/cdn/shop/files/Vedic_Astrology_New_500x500_jpg.jpg?v=1770036692&width=1920`,
    s_palm: `https://manuastro.com/cdn/shop/files/Palm_Reading_New_500x500_jpg.jpg?v=1770036747&width=1920`,
    s_personal: `https://manuastro.com/cdn/shop/files/Personal_Consultation_New_500x500_jpg.jpg?v=1770036746&width=1920`,
    s_vaastu: `https://manuastro.com/cdn/shop/files/Vaastu_Consultation_New_500x500_jpg.jpg?v=1770036851&width=1920`,
    s_corp: `https://manuastro.com/cdn/shop/files/Corporate_Programs_New500x500_jpg.jpg?v=1770036889&width=1920`,
    s_face: `https://manuastro.com/cdn/shop/files/Face_Reading_Numerology_New_500x500_jpg.jpg?v=1770038794&width=1920`,
    // Blog images
    blog1: 'https://manuastro.com/cdn/shop/articles/4.jpg?v=1767595180&width=1000',
    blog2: 'https://manuastro.com/cdn/shop/articles/3.jpg?v=1767595482&width=1000',
    blog3: 'https://manuastro.com/cdn/shop/articles/2.jpg?v=1767595410&width=1000',
}

/* ─── Real products from manuastro.com ──────────────────────────────────── */
const PRODUCTS = [
    {
        id: '1', name: 'Natural Gauri Shankar Ganesh Rudraksha (2.25 Gram)',
        slug: 'natural-gauri-shankar-ganesh-rudraksha-2-25-gram',
        price: 65000, compare: 72000, rating: 5.0, reviews: 42, badge: 'Rare',
        img: IMG.p_gauri_ganesh, cat: 'Rudraksha',
    },
    {
        id: '2', name: 'Natural Gauri Shankar Rudraksha (3.67 Gram)',
        slug: 'natural-gauri-shankar-rudraksha3-67-gram',
        price: 9680, compare: 12000, rating: 4.9, reviews: 78, badge: 'Popular',
        img: IMG.p_gauri_shankar, cat: 'Rudraksha',
    },
    {
        id: '3', name: '100% Natural Nepali 16 Mukhi Rudraksha (2.73 Gram)',
        slug: '100-natural-nepali-16-mukhi-rudraksha-2-73-gram',
        price: 110000, compare: 130000, rating: 5.0, reviews: 17, badge: 'Premium',
        img: IMG.p_16_mukhi, cat: 'Rudraksha',
    },
    {
        id: '4', name: '100% Natural Nepali 15 Mukhi Rudraksha (2.73 Gram)',
        slug: '100-natural-nepali-15-mukhi-rudraksha-2-73-gram',
        price: 45000, compare: 55000, rating: 5.0, reviews: 23, badge: 'Premium',
        img: IMG.p_15_mukhi, cat: 'Rudraksha',
    },
    {
        id: '5', name: '100% Natural Nepali 14 Mukhi Rudraksha (2.5 Gram)',
        slug: '100-natural-nepali-14-mukhi-rudraksha-2-5-gram',
        price: 40000, compare: 48000, rating: 4.9, reviews: 31, badge: 'Dev Mani',
        img: IMG.p_14_mukhi, cat: 'Rudraksha',
    },
    {
        id: '6', name: '100% Natural Nepali 13 Mukhi Rudraksha (2.27 Gram)',
        slug: '100-natural-nepali-13-mukhi-rudraksha-2-27-gram',
        price: 21000, compare: 26000, rating: 4.8, reviews: 44, badge: 'Power',
        img: IMG.p_13_mukhi, cat: 'Rudraksha',
    },
    {
        id: '7', name: '100% Natural Nepali 11 Mukhi Rudraksha (3.07 Gram)',
        slug: '100-natural-nepali-11-mukhi-rudraksha-2-68-gram-copy',
        price: 9680, compare: 12000, rating: 4.8, reviews: 62, badge: 'Best Seller',
        img: IMG.p_11_mukhi, cat: 'Rudraksha',
    },
    {
        id: '8', name: '100% Natural Nepali 10 Mukhi Rudraksha (2.96 Gram)',
        slug: '100-natural-nepali-10-mukhi-rudraksha-2-96-gram',
        price: 7150, compare: 9000, rating: 4.7, reviews: 89, badge: 'Top Rated',
        img: IMG.p_10_mukhi, cat: 'Rudraksha',
    },
]

const TESTIMONIALS = [
    { name: 'Priya Sharma', city: 'Bengaluru', initials: 'PS', color: '#c74500', rating: 5, review: 'Manu Ji\'s Vedic reading transformed my career. His predictions were spot-on and the Rudraksha he recommended brought incredible peace of mind.' },
    { name: 'Rajesh Nair', city: 'Mumbai', initials: 'RN', color: '#c9972a', rating: 5, review: 'After the Vaastu consultation, our business revenue doubled in 3 months. The changes were simple but the impact was remarkable.' },
    { name: 'Ananya K.', city: 'Chennai', initials: 'AK', color: '#3a6b3f', rating: 5, review: 'The palm reading session was deeply insightful. Manu Ji read details about my past that nobody else knew. A true master of ancient sciences.' },
    { name: 'Vikram Malhotra', city: 'Delhi', initials: 'VM', color: '#7a3012', rating: 5, review: 'Ordered the Rudraksha — beautiful packaging, genuine quality, truly energised. Manu Ji\'s guidance on wearing it was thorough and helpful.' },
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
const W = 'w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10'

const card: React.CSSProperties = {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s, transform 0.2s',
}

const rise = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.4, delay },
})

function StarRow({ n }: { n: number }) {
    return (
        <span style={{ color: '#c9972a', fontSize: '12px', letterSpacing: '1px' }}>
            {'★'.repeat(n)}{'☆'.repeat(5 - n)}
        </span>
    )
}

function SectionLabel({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
    return (
        <motion.div {...rise()} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9972a', marginBottom: '8px' }}>
                {eyebrow}
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#1e0f06', fontFamily: 'Playfair Display, serif', lineHeight: 1.25, marginBottom: '10px' }}>
                {title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: sub ? '12px' : 0 }}>
                <div style={{ height: '1px', width: '32px', background: 'linear-gradient(90deg, transparent, #c9972a)' }} />
                <span style={{ color: '#c9972a', fontSize: '12px' }}>✦</span>
                <div style={{ height: '1px', width: '32px', background: 'linear-gradient(90deg, #c9972a, transparent)' }} />
            </div>
            {sub && <p style={{ fontSize: '14px', color: '#7a5030', maxWidth: '460px', margin: '0 auto', lineHeight: 1.6 }}>{sub}</p>}
        </motion.div>
    )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Home() {
    const addItem = useCartStore(s => s.addItem)

    return (
        <div style={{ background: '#fdfbf7', fontFamily: 'DM Sans, sans-serif' }}>

            {/* ════ HERO ════ */}
            <section style={{ background: 'linear-gradient(150deg, #fef8ec 0%, #fdfbf7 55%, #fff7f0 100%)', borderBottom: '1px solid #f0e4cc' }}>
                <div className={W} style={{ paddingTop: '56px', paddingBottom: '56px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>

                        {/* LEFT */}
                        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px', borderRadius: '100px', background: 'rgba(199,69,0,0.07)', border: '1px solid rgba(199,69,0,0.15)', marginBottom: '22px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', color: '#c74500', textTransform: 'uppercase' }}>
                                    🕉 &nbsp;Best Online Astrology Consultation
                                </span>
                            </div>

                            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, color: '#1e0f06', fontFamily: 'Playfair Display, serif', margin: '0 0 18px' }}>
                                A Modern Astrologer with a<br />
                                <span style={{ color: '#c74500' }}>Scientific Mindset & Spiritual Soul</span>
                            </h1>

                            <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#5c3618', marginBottom: '10px', maxWidth: '440px' }}>
                                <strong>Er. Manu Gupta</strong> — IIM Ahmedabad Alumnus, Founder & CEO, MANUASTRO® LLP
                            </p>
                            <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#5c3618', marginBottom: '28px', maxWidth: '440px' }}>
                                Accurate Kundli readings, birth chart analysis, numerology & Vaastu guidance. Trusted Vedic astrologer with 15+ years of experience guiding thousands globally.
                            </p>

                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                                <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #c74500, #e07818)', color: '#fff', padding: '12px 26px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 3px 14px rgba(199,69,0,0.28)' }}>
                                    Book Your Consultation Now <ArrowRight size={15} />
                                </a>
                                <Link to="/shop"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#c74500', border: '1.5px solid #c74500', padding: '11px 22px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                                    <Star size={14} /> Shop Rudraksha
                                </Link>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {['✔ 100% Natural Nepali Rudraksha', '✔ Lab Certified', '✔ IIM Ahmedabad Alumnus', '✔ 15+ Yrs Experience', '✔ Global Consultations'].map(t => (
                                    <span key={t} style={{ fontSize: '12px', fontWeight: 500, color: '#5c3618', background: '#fdf1e2', borderRadius: '100px', padding: '4px 11px', border: '1px solid #f0dabb' }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* RIGHT */}
                        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
                            style={{ position: 'relative' }}>
                            <img src={IMG.hero} alt="Vedic Astrology Consultation"
                                style={{ width: '100%', height: '440px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 16px 60px rgba(80,40,10,0.16)', display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: '-16px', left: '-16px', background: '#fff', borderRadius: '10px', padding: '12px 18px', boxShadow: '0 4px 20px rgba(0,0,0,0.10)' }}>
                                <p style={{ fontSize: '22px', fontWeight: 900, color: '#c74500', fontFamily: 'Playfair Display, serif', lineHeight: 1 }}>4.9 ★</p>
                                <p style={{ fontSize: '11px', color: '#a06030', marginTop: '2px' }}>Thousands of happy clients</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ════ TRUST BAR ════ */}
            <section style={{ background: '#fff', borderBottom: '1px solid #f0e4cc' }}>
                <div className={W} style={{ paddingTop: '22px', paddingBottom: '22px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        {[
                            { emoji: '🛡️', title: 'Secure Payment', desc: 'UPI · Cards · Net Banking' },
                            { emoji: '📦', title: 'Free Shipping', desc: 'On orders above ₹999' },
                            { emoji: '🔬', title: 'Lab Certified', desc: 'X-Ray & IRL certified beads' },
                            { emoji: '↩️', title: 'Money-Back', desc: '100% no-questions guarantee' },
                        ].map(t => (
                            <div key={t.title} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', background: '#fdfbf7' }}>
                                <span style={{ fontSize: '22px', flexShrink: 0 }}>{t.emoji}</span>
                                <div>
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#1e0f06', margin: 0 }}>{t.title}</p>
                                    <p style={{ fontSize: '11px', color: '#9a6840', margin: 0, marginTop: '1px' }}>{t.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════ SERVICES ════ */}
            <section style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                <div className={W}>
                    <SectionLabel eyebrow="Services Offered" title="Vedic Sciences We Practice" sub="Authentic guidance rooted in classical texts by Er. Manu Gupta, IIM Ahmedabad Alumnus" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
                        {SERVICES.map((s, i) => (
                            <motion.div key={s.slug} {...rise(i * 0.07)}>
                                <Link to={`/services/${s.slug}`}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0', background: '#fdfbf7', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s', overflow: 'hidden', border: '1px solid rgba(201,151,42,0.1)' }}
                                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 10px 30px rgba(199,69,0,0.12)'; el.style.transform = 'translateY(-5px)' }}
                                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}>
                                    <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                                        <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '20px', textAlign: 'center' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1e0f06', margin: '0 0 12px', fontFamily: 'Playfair Display, serif' }}>{s.title}</h3>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#4a1408', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '8px 20px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            Learn More →
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '36px' }}>
                        <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'linear-gradient(135deg,#c74500,#e07818)', color: '#fff', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 3px 14px rgba(199,69,0,0.25)' }}>
                            Book Your Consultation <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ════ STATS ════ */}
            <section style={{ background: 'linear-gradient(135deg, #fdf4e0, #fef9f0)', borderTop: '1px solid #f0e4cc', borderBottom: '1px solid #f0e4cc', paddingTop: '48px', paddingBottom: '48px' }}>
                <div className={W}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', textAlign: 'center' }}>
                        {[
                            { num: '10,000+', label: 'Happy Clients', emoji: '🙏' },
                            { num: '15+', label: 'Years of Practice', emoji: '📅' },
                            { num: '300+', label: 'Rudraksha Products', emoji: '✨' },
                            { num: '4.9 ★', label: 'Average Rating', emoji: '⭐' },
                        ].map((s, i) => (
                            <motion.div key={s.label} {...rise(i * 0.08)}>
                                <div style={{ fontSize: '28px', marginBottom: '4px' }}>{s.emoji}</div>
                                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#c74500', fontFamily: 'Playfair Display, serif', lineHeight: 1 }}>{s.num}</div>
                                <div style={{ fontSize: '12px', fontWeight: 500, color: '#9a6840', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════ PRODUCTS ════ */}
            <section style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                <div className={W}>
                    <SectionLabel eyebrow="Latest Products" title="100% Natural Nepali Rudraksha" sub="Lab-certified, energised through Vedic rituals — each piece hand-selected from Nepal" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px' }}>
                        {PRODUCTS.map((p, i) => (
                            <motion.div key={p.id} {...rise((i % 4) * 0.07)} style={card}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = card.boxShadow as string }}>

                                {/* Image */}
                                <div style={{ position: 'relative', overflow: 'hidden', height: '200px', background: '#fdf3e3' }}>
                                    <img src={p.img} alt={p.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.45s' }}
                                        onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'}
                                        onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'} />
                                    <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(199,69,0,0.88)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                                        {p.badge}
                                    </span>
                                    <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.94)', color: '#1e0f06', fontSize: '11px', fontWeight: 600, padding: '3px 7px', borderRadius: '4px' }}>
                                        ★ {p.rating}
                                    </span>
                                </div>

                                {/* Body */}
                                <div style={{ padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 700, background: 'rgba(199,69,0,0.07)', color: '#c74500', padding: '2px 8px', borderRadius: '4px', alignSelf: 'flex-start', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {p.cat}
                                    </span>
                                    <h3 style={{ fontSize: '12.5px', fontWeight: 600, color: '#1e0f06', margin: 0, lineHeight: 1.35 }}>{p.name}</h3>
                                    <StarRow n={Math.floor(p.rating)} />

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '15px', fontWeight: 800, color: '#1e0f06' }}>₹{p.price.toLocaleString('en-IN')}</span>
                                        <span style={{ fontSize: '11px', textDecoration: 'line-through', color: '#c9a060' }}>₹{p.compare.toLocaleString('en-IN')}</span>
                                        <span style={{ fontSize: '10px', fontWeight: 700, background: '#edf7ee', color: '#2d6a32', padding: '2px 6px', borderRadius: '4px', marginLeft: 'auto' }}>
                                            {Math.round((1 - p.price / p.compare) * 100)}% OFF
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                        <button
                                            onClick={() => addItem({ id: p.id, name: p.name, slug: p.slug, price: p.price, images: [], description: '', category_id: null, category: null, mukhi_count: null, material: null, weight: null, short_desc: '', is_active: true, is_featured: true, stock: 99, sort_order: i, created_at: '', compare_price: p.compare, reviews: [], average_rating: p.rating, review_count: p.reviews } as never)}
                                            style={{ flex: 1, padding: '9px 0', background: 'linear-gradient(135deg,#c74500,#e07818)', color: '#fff', border: 'none', borderRadius: '7px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                                            Add to Cart
                                        </button>
                                        <a href={`https://www.manuastro.com/products/${p.slug}`} target="_blank" rel="noopener noreferrer"
                                            style={{ padding: '9px 12px', background: 'rgba(199,69,0,0.07)', color: '#c74500', borderRadius: '7px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                                            View
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '36px' }}>
                        <Link to="/collections/rudraksha"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', border: '1.5px solid #c74500', color: '#c74500', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                            View All Rudraksha <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ════ ABOUT / FOUNDER ════ */}
            <section style={{ background: '#fff', borderTop: '1px solid #f0e4cc', borderBottom: '1px solid #f0e4cc', paddingTop: '60px', paddingBottom: '60px' }}>
                <div className={W}>
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
            <section style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                <div className={W}>
                    <SectionLabel eyebrow="What Our Clients Say" title="Real Transformations" sub="Thousands of lives changed through authentic Vedic guidance" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px' }}>
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div key={t.name} {...rise(i * 0.07)} style={{ ...card, padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px', overflow: 'visible' }}>
                                <span style={{ fontSize: '28px', lineHeight: 1, color: t.color, opacity: 0.3 }}>"</span>
                                <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#5c3618', fontStyle: 'italic', flex: 1, margin: 0 }}>{t.review}</p>
                                <div>
                                    <StarRow n={t.rating} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${t.color}15`, color: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                                            {t.initials}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1e0f06', margin: 0 }}>{t.name}</p>
                                            <p style={{ fontSize: '11px', color: '#9a6840', margin: 0 }}>{t.city}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '28px' }}>
                        <a href="https://play.google.com/store/apps/details?id=com.manuastroapp&hl=en_GB" target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', border: '1.5px solid #c74500', color: '#c74500', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                            📱 Get the ManuAstro App
                        </a>
                    </div>
                </div>
            </section>

            {/* ════ BLOG ════ */}
            <section style={{ background: '#fff', borderTop: '1px solid #f0e4cc', borderBottom: '1px solid #f0e4cc', paddingTop: '60px', paddingBottom: '60px' }}>
                <div className={W}>
                    <SectionLabel eyebrow="Latest Blogs" title="Vedic Insights & Guidance" sub="Ancient wisdom and celestial updates from Er. Manu Gupta" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '22px' }}>
                        {BLOG.map((post, i) => (
                            <motion.div key={post.slug} {...rise(i * 0.09)} style={card}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(0,0,0,0.11)' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = card.boxShadow as string }}>
                                <div style={{ overflow: 'hidden', height: '180px' }}>
                                    <img src={post.img} alt={post.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.45s' }}
                                        onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'}
                                        onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'} />
                                </div>
                                <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 700, background: 'rgba(199,69,0,0.07)', color: '#c74500', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.cat}</span>
                                        <span style={{ fontSize: '11px', color: '#9a6840' }}>{post.readTime} read</span>
                                    </div>
                                    <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: '#1e0f06', margin: 0, lineHeight: 1.4 }}>{post.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #f0e8d8', marginTop: 'auto' }}>
                                        <span style={{ fontSize: '11px', color: '#c9a060' }}>{post.date}</span>
                                        <a href={`https://www.manuastro.com/blogs/blogs/${post.slug}`} target="_blank" rel="noopener noreferrer"
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: 600, color: '#c74500', textDecoration: 'none' }}>
                                            Read More <ChevronRight size={12} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '36px' }}>
                        <a href="https://www.manuastro.com/blogs/blogs" target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', border: '1.5px solid #c74500', color: '#c74500', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                            View All Blogs <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ════ CTA ════ */}
            <section style={{ background: 'linear-gradient(135deg, #fdf4e0, #fef9f0)', borderTop: '1px solid #f0e4cc' }}>
                <div className={W} style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                    <motion.div {...rise()} style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
                        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔮</div>
                        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, color: '#1e0f06', fontFamily: 'Playfair Display, serif', margin: '0 0 12px' }}>
                            Ready for Your Personalised Cosmic Guidance?
                        </h2>
                        <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#5c3618', marginBottom: '28px' }}>
                            Book a one-on-one consultation with Er. Manu Gupta — IIM Ahmedabad Alumnus, Vedic Astrologer with 15+ years guiding thousands globally.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 30px', background: 'linear-gradient(135deg,#c74500,#e07818)', color: '#fff', borderRadius: '8px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 18px rgba(199,69,0,0.28)' }}>
                                Book Consultation Now <ArrowRight size={15} />
                            </a>
                            <a href="https://www.manuastro.com/pages/pricing" target="_blank" rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 26px', border: '1.5px solid #c74500', color: '#c74500', borderRadius: '8px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
                                View Pricing Plans
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    )
}
