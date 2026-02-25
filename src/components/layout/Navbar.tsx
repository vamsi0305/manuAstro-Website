import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, Menu, X, ChevronDown, Heart } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'

/* ─── Exact navigation from manuastro.com ─────────────────────────── */
const SERVICES_MENU = [
    { label: 'Vedic Astrology', slug: '/services/vedic-astrology' },
    { label: 'Palm Reading', slug: '/services/palm-reading' },
    { label: 'Personal Consultation', slug: '/services/personal-consultation' },
    { label: 'Vaastu Consultation', slug: '/services/vaastu' },
    { label: 'Corporate Programs', slug: '/services/corporate-programs' },
    { label: 'Face Reading & Numerology', slug: '/services/face-reading' },
]

const RUDRAKSHA_MENU = [
    { label: '1 Face Rudraksha', slug: '/collections/1-face-rudraksha' },
    { label: '2 Face Rudraksha', slug: '/collections/2-face-rudraksha' },
    { label: '3 Face Rudraksha', slug: '/collections/3-face-rudraksha' },
    { label: '4 Face Rudraksha', slug: '/collections/4-face-rudraksha' },
    { label: '5 Face Rudraksha', slug: '/collections/5-face-rudraksha' },
    { label: '6 Face Rudraksha', slug: '/collections/6-face-rudraksha' },
    { label: '7 Face Rudraksha', slug: '/collections/7-face-rudraksha' },
    { label: '8 Face Rudraksha', slug: '/collections/8-face-rudraksha' },
    { label: '9 Face Rudraksha', slug: '/collections/9-face-rudraksha' },
    { label: '10 Face Rudraksha', slug: '/collections/10-face-rudraksha' },
    { label: '11 Face Rudraksha', slug: '/collections/11-face-rudraksha' },
    { label: '12 Face Rudraksha', slug: '/collections/12-face-rudraksha' },
    { label: '13 Face Rudraksha', slug: '/collections/13-face-rudraksha' },
    { label: '14 Face Rudraksha', slug: '/collections/14-face-rudraksha' },
    { label: '15 Face Rudraksha', slug: '/collections/15-face-rudraksha' },
    { label: '16 Face Rudraksha', slug: '/collections/16-face-rudraksha' },
    { label: 'Gauri Shankar Rudraksha', slug: '/collections/gauri-shankar-rudraksha' },
    { label: 'Gauri Shankar Ganesh Rudraksha', slug: '/collections/gauri-shankar-ganesh-rudraksha' },
    { label: 'Garbh Gauri Rudraksha', slug: '/collections/garbh-gauri-rudraksha' },
    { label: 'Garbh Gauri Ganesh Rudraksha', slug: '/collections/garbh-gauri-ganesh-rudraksha' },
]

const YANTRA_MENU = [
    { label: 'Copper Platted Yantra', slug: '/collections/copper-platted-yantra' },
    { label: 'Export Premium Yantra', slug: '/collections/export-premium-yantra' },
    { label: 'Meru Shree Yantra (3D)', slug: '/collections/meru-shree-yantra' },
    { label: 'Pyra Silver Pendants', slug: '/collections/pyra-silver-pendants' },
]

const SHOP_MORE_MENU = [
    { label: 'Vastu Products', slug: '/collections/vastu' },
    { label: 'Dosh Nivaran Kit', slug: '/collections/dosh-nivaran-kit' },
    { label: 'Feng Shui Remedies', slug: '/collections/feng-shui-remedies' },
    { label: 'Pooja Samagri', slug: '/collections/pooja-samagri' },
    { label: 'Idols', slug: '/collections/idols' },
    { label: 'Shaligram', slug: '/collections/shaligram' },
    { label: 'Shivling', slug: '/collections/shivling' },
]

const GALLERY_MENU = [
    { label: 'Sannidhiya', slug: '/gallery/sannidhiya' },
    { label: 'Consultations', slug: '/gallery/consultations' },
]

type DropdownKey = 'services' | 'rudraksha' | 'yantra' | 'shopmore' | 'gallery' | null

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
    const [searchOpen, setSearchOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [scrolled, setScrolled] = useState(false)

    const cartCount = useCartStore(s => s.items.reduce((n, i) => n + i.quantity, 0))
    const { user, isAuthenticated } = useAuthStore()
    const navigate = useNavigate()
    const navRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 6)
        window.addEventListener('scroll', fn)
        return () => window.removeEventListener('scroll', fn)
    }, [])

    useEffect(() => {
        const fn = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node))
                setActiveDropdown(null)
        }
        document.addEventListener('mousedown', fn)
        return () => document.removeEventListener('mousedown', fn)
    }, [])

    useEffect(() => {
        if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80)
    }, [searchOpen])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) { navigate(`/shop?q=${encodeURIComponent(query.trim())}`); setSearchOpen(false); setQuery('') }
    }

    const toggle = (key: DropdownKey) => setActiveDropdown(v => v === key ? null : key)

    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '13.5px',
        fontWeight: isActive ? 600 : 500,
        color: isActive ? '#c74500' : '#3a2010',
        transition: 'color 0.18s',
        textDecoration: 'none',
    })

    const DropdownMenu = ({ items, isOpen, onClose }: { items: { label: string; slug: string }[]; isOpen: boolean; onClose: () => void }) => {
        if (!isOpen) return null
        return (
            <div
                className="absolute top-full left-0 mt-1 min-w-[200px] rounded-xl py-1.5 overflow-hidden z-50"
                style={{ background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(201,151,42,0.14)' }}
            >
                {items.map(s => (
                    <Link key={s.slug} to={s.slug} onClick={onClose}
                        className="block px-4 py-2 text-[13px] transition-colors hover:bg-orange-50 hover:text-[#c74500]"
                        style={{ color: '#3a2010', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap' }}
                    >
                        {s.label}
                    </Link>
                ))}
            </div>
        )
    }

    const NavDropdownBtn = ({ label, dKey }: { label: string; dKey: DropdownKey }) => (
        <button
            onClick={() => toggle(dKey)}
            className="flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-[13.5px] font-medium hover:bg-orange-50 hover:text-[#c74500] transition-colors whitespace-nowrap"
            style={{ color: activeDropdown === dKey ? '#c74500' : '#3a2010', fontFamily: 'DM Sans, sans-serif', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
            {label}
            <ChevronDown size={12} className="ml-0.5 flex-shrink-0" style={{ transform: activeDropdown === dKey ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
    )

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
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex items-center h-16 gap-4" ref={navRef}>

                    {/* ── LOGO ─── */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
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
                    <nav className="hidden xl:flex items-center gap-0.5 flex-1 flex-wrap">

                        <NavLink to="/" style={linkStyle} className="px-2.5 py-1.5 rounded-lg hover:text-[#c74500] hover:bg-orange-50 transition-all text-[13.5px] whitespace-nowrap">Home</NavLink>
                        <NavLink to="/horoscope" style={linkStyle} className="px-2.5 py-1.5 rounded-lg hover:text-[#c74500] hover:bg-orange-50 transition-all text-[13.5px] whitespace-nowrap">Horoscope 2026</NavLink>

                        {/* Services */}
                        <div className="relative">
                            <NavDropdownBtn label="Services" dKey="services" />
                            <DropdownMenu items={SERVICES_MENU} isOpen={activeDropdown === 'services'} onClose={() => setActiveDropdown(null)} />
                        </div>

                        {/* Rudraksha */}
                        <div className="relative">
                            <NavDropdownBtn label="Rudraksha" dKey="rudraksha" />
                            <div
                                className={`absolute top-full left-0 mt-1 z-50 ${activeDropdown === 'rudraksha' ? 'block' : 'hidden'}`}
                                style={{ background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(201,151,42,0.14)', borderRadius: '12px', padding: '6px 0', minWidth: '220px', maxHeight: '70vh', overflowY: 'auto' }}
                            >
                                {RUDRAKSHA_MENU.map(s => (
                                    <Link key={s.slug} to={s.slug} onClick={() => setActiveDropdown(null)}
                                        className="block px-4 py-2 text-[13px] transition-colors hover:bg-orange-50 hover:text-[#c74500]"
                                        style={{ color: '#3a2010', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap' }}
                                    >
                                        {s.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <NavLink to="/collections/gemstones" style={linkStyle} className="px-2.5 py-1.5 rounded-lg hover:text-[#c74500] hover:bg-orange-50 transition-all text-[13.5px] whitespace-nowrap">Gemstones</NavLink>

                        {/* Yantra */}
                        <div className="relative">
                            <NavDropdownBtn label="Yantra" dKey="yantra" />
                            <DropdownMenu items={YANTRA_MENU} isOpen={activeDropdown === 'yantra'} onClose={() => setActiveDropdown(null)} />
                        </div>

                        {/* Shop More */}
                        <div className="relative">
                            <NavDropdownBtn label="Shop More" dKey="shopmore" />
                            <DropdownMenu items={SHOP_MORE_MENU} isOpen={activeDropdown === 'shopmore'} onClose={() => setActiveDropdown(null)} />
                        </div>

                        <NavLink to="/about" style={linkStyle} className="px-2.5 py-1.5 rounded-lg hover:text-[#c74500] hover:bg-orange-50 transition-all text-[13.5px] whitespace-nowrap">About Us</NavLink>

                        {/* Gallery */}
                        <div className="relative">
                            <NavDropdownBtn label="Gallery" dKey="gallery" />
                            <DropdownMenu items={GALLERY_MENU} isOpen={activeDropdown === 'gallery'} onClose={() => setActiveDropdown(null)} />
                        </div>

                        <NavLink to="/blog" style={linkStyle} className="px-2.5 py-1.5 rounded-lg hover:text-[#c74500] hover:bg-orange-50 transition-all text-[13.5px] whitespace-nowrap">Blogs</NavLink>
                        <NavLink to="/contact" style={linkStyle} className="px-2.5 py-1.5 rounded-lg hover:text-[#c74500] hover:bg-orange-50 transition-all text-[13.5px] whitespace-nowrap">Contact Us</NavLink>
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
                                    placeholder="Search…"
                                    className="w-36 sm:w-48 px-3 py-1.5 text-sm rounded-lg outline-none"
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

                        <Link to="/wishlist" className="p-2 rounded-lg hover:bg-orange-50 transition-colors hidden sm:flex" style={{ color: '#3a2010' }}>
                            <Heart size={18} />
                        </Link>

                        <Link to="/cart" className="relative p-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: '#3a2010' }}>
                            <ShoppingCart size={18} />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-[9px] font-bold text-white rounded-full"
                                    style={{ background: '#c74500', fontFamily: 'DM Sans, sans-serif' }}>
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </Link>

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
                            className="xl:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors ml-1" style={{ color: '#3a2010' }}>
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── MOBILE MENU ─── */}
            {menuOpen && (
                <div className="xl:hidden" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <div className="max-w-screen-xl mx-auto px-5 py-4 flex flex-col gap-1">
                        <NavLink to="/" onClick={() => setMenuOpen(false)} style={linkStyle} className="py-2.5 px-3 rounded-lg hover:bg-orange-50">Home</NavLink>
                        <NavLink to="/horoscope" onClick={() => setMenuOpen(false)} style={linkStyle} className="py-2.5 px-3 rounded-lg hover:bg-orange-50">Horoscope 2026</NavLink>
                        <NavLink to="/collections/gemstones" onClick={() => setMenuOpen(false)} style={linkStyle} className="py-2.5 px-3 rounded-lg hover:bg-orange-50">Gemstones</NavLink>
                        <NavLink to="/about" onClick={() => setMenuOpen(false)} style={linkStyle} className="py-2.5 px-3 rounded-lg hover:bg-orange-50">About Us</NavLink>
                        <NavLink to="/blog" onClick={() => setMenuOpen(false)} style={linkStyle} className="py-2.5 px-3 rounded-lg hover:bg-orange-50">Blogs</NavLink>
                        <NavLink to="/contact" onClick={() => setMenuOpen(false)} style={linkStyle} className="py-2.5 px-3 rounded-lg hover:bg-orange-50">Contact Us</NavLink>

                        <div className="mt-2 pt-3 border-t border-orange-50">
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-2 px-3" style={{ color: '#c9972a' }}>Services</p>
                            {SERVICES_MENU.map(s => (
                                <Link key={s.slug} to={s.slug} onClick={() => setMenuOpen(false)}
                                    className="block py-2 px-3 text-[13px] rounded-lg hover:bg-orange-50"
                                    style={{ color: '#3a2010', fontFamily: 'DM Sans, sans-serif' }}>
                                    {s.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-2 pt-3 border-t border-orange-50">
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-2 px-3" style={{ color: '#c9972a' }}>Rudraksha</p>
                            {RUDRAKSHA_MENU.slice(0, 8).map(s => (
                                <Link key={s.slug} to={s.slug} onClick={() => setMenuOpen(false)}
                                    className="block py-2 px-3 text-[13px] rounded-lg hover:bg-orange-50"
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
