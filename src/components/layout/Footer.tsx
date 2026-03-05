import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'

const LINKS = {
    explore: [
        { l: 'Home', to: '/' },
        { l: 'Shop', to: '/shop' },
        { l: 'Horoscope', to: '/horoscope' },
        { l: 'Blog', to: '/blog' },
        { l: 'Gallery', to: '/gallery' },
        { l: 'About Us', to: '/about' },
        { l: 'Contact', to: '/contact' }
    ],
    services: [
        { l: 'Vedic Astrology', to: '/services/vedic-astrology' },
        { l: 'Palm Reading', to: '/services/palm-reading' },
        { l: 'Face Reading', to: '/services/face-reading' },
        { l: 'Vaastu Shastra', to: '/services/vaastu' },
        { l: 'Corporate Programs', to: '/services/corporate-programs' },
        { l: 'Consultation', to: '/services/personal-consultation' }
    ],
    legal: [
        { l: 'Privacy Policy', to: '/privacy' },
        { l: 'Terms & Conditions', to: '/terms' },
        { l: 'Refund Policy', to: '/refund' },
        { l: 'Shipping Policy', to: '/shipping' }
    ],
}

export default function Footer() {
    const F = { fontFamily: 'DM Sans, sans-serif' }
    const FH = { fontFamily: 'Playfair Display, serif' }

    return (
        <footer style={{ background: '#fdfaf5', borderTop: '1px solid rgba(201,151,42,0.15)' }}>

            {/* Main */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2.5 mb-4">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold text-white"
                                style={{ background: 'linear-gradient(135deg,#c74500,#e07a10)', fontFamily: 'Cinzel, serif' }}>मं</div>
                            <div>
                                <p className="text-[15px] font-semibold leading-tight" style={{ color: '#2d1508', ...FH }}>ManuAstro</p>
                                <p className="text-[9px] tracking-[0.12em] uppercase" style={{ color: '#c9972a', ...F }}>Vedic Sciences</p>
                            </div>
                        </Link>
                        <p className="text-[13px] leading-relaxed mb-5" style={{ color: '#8c6040', ...F }}>
                            Authentic Vedic astrology, sacred Rudraksha, and spiritual guidance. Rooted in classical Sanskrit texts. Trusted since 2003.
                        </p>
                        {/* Social */}
                        <div className="flex items-center gap-2">
                            {[
                                { icon: <Instagram size={15} />, href: '#' },
                                { icon: <Facebook size={15} />, href: '#' },
                                { icon: <Youtube size={15} />, href: '#' },
                            ].map((s, i) => (
                                <a key={i} href={s.href}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                                    style={{ background: 'rgba(199,69,0,0.07)', color: '#c74500' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#c74500'; e.currentTarget.style.color = '#fff' }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(199,69,0,0.07)'; e.currentTarget.style.color = '#c74500' }}>
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#c9972a', ...F }}>Explore</p>
                        <ul className="flex flex-col gap-2">
                            {LINKS.explore.map((l, i) => (
                                <li key={i}>
                                    <Link to={(l as { l: string; to: string }).to || '/'} className="text-[13px] transition-colors"
                                        style={{ color: '#6b4020', ...F }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#c74500'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#6b4020'}>
                                        {(l as { l: string }).l}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#c9972a', ...F }}>Services</p>
                        <ul className="flex flex-col gap-2">
                            {LINKS.services.map(s => (
                                <li key={s.to}>
                                    <Link to={s.to} className="text-[13px] transition-colors"
                                        style={{ color: '#6b4020', ...F }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#c74500'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#6b4020'}>
                                        {s.l}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#c9972a', ...F }}>Contact</p>
                        <div className="flex flex-col gap-3 mb-5">
                            {[
                                { icon: <Phone size={13} />, text: '+91 97424 00000' },
                                { icon: <Mail size={13} />, text: 'support@manuastro.com' },
                                { icon: <MapPin size={13} />, text: 'HSR Layout, Bengaluru, India' },
                            ].map(c => (
                                <div key={String(c.text)} className="flex items-start gap-2.5">
                                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#c74500' }}>{c.icon}</span>
                                    <span className="text-[13px]" style={{ color: '#6b4020', ...F }}>{c.text}</span>
                                </div>
                            ))}
                        </div>
                        {/* Trust marks */}
                        <div className="flex flex-col gap-1.5">
                            {['X-Ray Certified Products', 'ISO 9001 Operations', '100% Money-Back Guarantee'].map(t => (
                                <div key={t} className="flex items-center gap-1.5 text-[11px]" style={{ color: '#8c6040', ...F }}>
                                    <span style={{ color: '#3a6b3f', fontSize: '12px' }}>✓</span> {t}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: '1px solid rgba(201,151,42,0.12)', background: '#fff' }}>
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[12px]" style={{ color: '#a07850', ...F }}>
                        © {new Date().getFullYear()} ManuAstro. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {LINKS.legal.map(l => (
                            <Link key={l.to} to={l.to}
                                className="text-[12px] transition-colors"
                                style={{ color: '#a07850', ...F }}
                                onMouseEnter={e => e.currentTarget.style.color = '#c74500'}
                                onMouseLeave={e => e.currentTarget.style.color = '#a07850'}>
                                {l.l}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* WhatsApp FAB */}
            <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'}`}
                target="_blank" rel="noopener noreferrer"
                className="fixed bottom-5 right-5 z-50 w-12 h-12 flex items-center justify-center rounded-full text-white text-xl shadow-lg transition-transform"
                style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.35)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                💬
            </a>
        </footer>
    )
}
