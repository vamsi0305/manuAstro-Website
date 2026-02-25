import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, Menu, X, ChevronDown, Heart } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'

/* Exact services from manuastro.com */
const SERVICES_MENU = [
    { label: 'Vedic Astrology', slug: '/services/vedic-astrology' },
    { label: 'Palm Reading', slug: '/services/palm-reading' },
    { label: 'Personal Consultation', slug: '/services/personal-consultation' },
    { label: 'Vaastu Consultation', slug: '/services/vaastu' },
    { label: 'Corporate Programs', slug: '/services/corporate-programs' },
    { label: 'Face Reading & Numerology', slug: '/services/face-reading' },
]

/* Exact top-level nav from manuastro.com */
const NAV_LINKS = [
    { label: 'Home', to: '/' },
    { label: 'Year 2026', to: '/horoscope' },
    { label: 'Rudraksha', to: '/collections/rudraksha' },
    { label: 'About Us', to: '/about' },
    { label: "FAQ's", to: '/faq' },
    { label: 'Blogs', to: '/blog' },
    { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [scrolled, setScrolled] = useState(false)

    const cartCount = useCartStore(s => s.items.reduce((n, i) => n + i.quantity, 0))
    const { user, isAuthenticated } = useAuthStore()
    const navigate = useNavigate()
    const dropdownRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)

    /* scroll shadow */
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 6)
        window.addEventListener('scroll', fn)
        return () => window.removeEventListener('scroll', fn)
    }, [])

    /* close dropdown on outside click */
    useEffect(() => {
        const fn = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
                setServicesOpen(false)
        }
        document.addEventListener('mousedown', fn)
        return () => document.removeEventListener('mousedown', fn)
    }, [])

    /* focus search input */
    useEffect(() => {
        if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80)
    }, [searchOpen])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) { navigate(`/shop?q=${encodeURIComponent(query.trim())}`); setSearchOpen(false); setQuery('') }
    }

    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '13.5px',
        fontWeight: isActive ? 600 : 500,
        color: isActive ? '#c74500' : '#3a2010',
        transition: 'color 0.18s',
        textDecoration: 'none',
    })

    return (
        <header
            className="sticky top-0 z-50"
            style={{
                background: '#fff',
                borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(201,151,42,0.12)',
                boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
                transition: 'box-shadow 0.25s, border-color 0.25s',
            }}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                <div className="flex items-center h-16 gap-6">

                    {/* ── LOGO ─── */}
                    <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 mr-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg,#c74500,#e07a10)', fontFamily: 'Cinzel, serif', boxShadow: '0 2px 10px rgba(199,69,0,0.25)' }}>
                            मं
                        </div>
                        <div>
                            <p className="text-[15px] font-semibold leading-tight" style={{ color: '#2d1508', fontFamily: 'Playfair Display, serif' }}>ManuAstro</p>
                            <p className="text-[9px] tracking-[0.14em] uppercase" style={{ color: '#c9972a', fontFamily: 'DM Sans, sans-serif' }}>Vedic Sciences</p>
                        </div>
                    </Link>

                    {/* ── DESKTOP NAV ─── */}
                    <nav className="hidden lg:flex items-center gap-1 flex-1">
                        {NAV_LINKS.map(l => (
                            <NavLink key={l.to} to={l.to} style={linkStyle}
                                className="px-3 py-1.5 rounded-lg hover:text-[#c74500] hover:bg-orange-50 transition-all">
                                {l.label}
                            </NavLink>
                        ))}

                        {/* Services dropdown */}
                        <div ref={dropdownRef} className="relative">
                            <button
                                onClick={() => setServicesOpen(v => !v)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13.5px] font-medium hover:bg-orange-50 transition-colors"
                                style={{ color: servicesOpen ? '#c74500' : '#3a2010', fontFamily: 'DM Sans, sans-serif', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                Services <ChevronDown size={13} style={{ transform: servicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                            </button>

                            {servicesOpen && (
                                <div className="absolute top-full left-0 mt-2 w-52 rounded-xl py-1.5 overflow-hidden z-50"
                                    style={{ background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                                    {SERVICES_MENU.map(s => (
                                        <Link key={s.slug} to={s.slug}
                                            onClick={() => setServicesOpen(false)}
                                            className="block px-4 py-2 text-[13px] transition-colors hover:bg-orange-50"
                                            style={{ color: '#3a2010', fontFamily: 'DM Sans, sans-serif' }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#c74500'}
                                            onMouseLeave={e => e.currentTarget.style.color = '#3a2010'}>
                                            {s.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* ── ACTIONS ─── */}
                    <div className="flex items-center gap-1 ml-auto">

                        {/* Search */}
                        {searchOpen ? (
                            <form onSubmit={handleSearch} className="flex items-center gap-1">
                                <input
                                    ref={searchRef}
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    placeholder="Search products…"
                                    className="w-40 sm:w-52 px-3 py-1.5 text-sm rounded-lg outline-none"
                                    style={{ background: '#fdf8f0', border: '1px solid rgba(201,151,42,0.3)', color: '#2d1508', fontFamily: 'DM Sans, sans-serif' }}
                                />
                                <button type="button" onClick={() => setSearchOpen(false)} className="p-1.5" style={{ color: '#888' }}>
                                    <X size={15} />
                                </button>
                            </form>
                        ) : (
                            <button onClick={() => setSearchOpen(true)}
                                className="p-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: '#3a2010' }}>
                                <Search size={18} />
                            </button>
                        )}

                        {/* Wishlist */}
                        <Link to="/wishlist" className="p-2 rounded-lg hover:bg-orange-50 transition-colors hidden sm:flex" style={{ color: '#3a2010' }}>
                            <Heart size={18} />
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" className="relative p-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: '#3a2010' }}>
                            <ShoppingCart size={18} />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-[9px] font-bold text-white rounded-full"
                                    style={{ background: '#c74500', fontFamily: 'DM Sans, sans-serif' }}>
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Account */}
                        {isAuthenticated ? (
                            <Link to="/dashboard"
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors"
                                style={{ background: 'rgba(199,69,0,0.07)', color: '#c74500', fontFamily: 'DM Sans, sans-serif' }}>
                                <User size={13} /> {user?.name?.split(' ')[0] || 'Account'}
                            </Link>
                        ) : (
                            <Link to="/login"
                                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold text-white transition-all"
                                style={{ background: 'linear-gradient(135deg,#c74500,#e07a10)', fontFamily: 'DM Sans, sans-serif', boxShadow: '0 2px 10px rgba(199,69,0,0.22)' }}>
                                Sign In
                            </Link>
                        )}

                        {/* Mobile burger */}
                        <button onClick={() => setMenuOpen(v => !v)}
                            className="lg:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors ml-1" style={{ color: '#3a2010' }}>
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── MOBILE MENU ─── */}
            {menuOpen && (
                <div className="lg:hidden" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
                        {NAV_LINKS.map(l => (
                            <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
                                style={linkStyle}
                                className="py-2.5 px-3 rounded-lg hover:bg-orange-50 transition-colors">
                                {l.label}
                            </NavLink>
                        ))}
                        <div className="mt-1 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-2 px-3" style={{ color: '#c9972a', fontFamily: 'DM Sans, sans-serif' }}>Services</p>
                            {SERVICES_MENU.map(s => (
                                <Link key={s.slug} to={s.slug} onClick={() => setMenuOpen(false)}
                                    className="block py-2 px-3 text-[13px] rounded-lg hover:bg-orange-50 transition-colors"
                                    style={{ color: '#3a2010', fontFamily: 'DM Sans, sans-serif' }}>
                                    {s.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
