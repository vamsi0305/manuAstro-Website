import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Calendar, Heart, User, LogOut, Star } from 'lucide-react'
import SEOHead from '../../components/SEOHead'
import api from '../../lib/api'
import { generateInvoice } from '../../utils/generateInvoice'

export default function UserDashboard() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('overview')
    const [orders, setOrders] = useState<any[]>([])
    const [bookings, setBookings] = useState<any[]>([])
    const [wishlist, setWishlist] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (stored) setUser(JSON.parse(stored))

        const load = async () => {
            try {
                const [o, b, w] = await Promise.all([
                    api.get('/orders/my-orders').catch(() => ({ data: [] })),
                    api.get('/bookings/my').catch(() => ({ data: [] })),
                    api.get('/wishlist').catch(() => ({ data: [] })),
                ])
                setOrders(o.data || [])
                setBookings(b.data || [])
                setWishlist(w.data || [])
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/')
    }

    const userName = user?.full_name || user?.name || 'Sacred User'
    const userEmail = user?.email || ''
    const userInitial = userName.charAt(0).toUpperCase()

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <ShoppingBag size={15} /> },
        { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={15} /> },
        { id: 'bookings', label: 'My Bookings', icon: <Calendar size={15} /> },
        { id: 'wishlist', label: 'Wishlist', icon: <Heart size={15} /> },
        { id: 'profile', label: 'My Profile', icon: <User size={15} /> },
    ]

    return (
        <div className="page-wrapper">
            <SEOHead title="My Dashboard" description="Manage your orders, bookings and profile on ManuAstro." />
            <main>

                {/* ■■ SECTION 1: HERO — identical structure to About hero ■■ */}
                <section style={{
                    position: 'relative', width: '100%', minHeight: '420px',
                    display: 'flex', alignItems: 'center',
                    background: 'var(--color-bg)', padding: '5rem 0', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <img
                            src="https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311"
                            alt="dashboard"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08 }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.82 }} />
                    </div>
                    <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                        <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                            MY ACCOUNT
                        </span>
                        <h1 className="font-serif" style={{
                            fontSize: '3rem', color: 'var(--color-earth)',
                            lineHeight: 1.2, marginBottom: '1rem'
                        }}>
                            Namaste, {userName.split(' ')[0]} 🙏
                        </h1>
                        <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', margin: '0 auto 1.5rem' }} />
                        <p className="font-sans" style={{
                            fontSize: '1.1rem', color: 'var(--color-text-secondary)',
                            lineHeight: 1.75, maxWidth: '640px', margin: '0 auto'
                        }}>
                            Welcome to your sacred space. Track your orders, bookings and saved items.
                        </p>

                        {/* User info badges — same style as About founder badges */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
                            <span className="badge-saffron">{userEmail}</span>
                            <span className="badge-gold">{orders.length} Orders</span>
                            <span className="badge-saffron">{bookings.length} Bookings</span>
                        </div>
                    </div>
                </section>

                <div className="divider-ornamental">*</div>

                {/* ■■ SECTION 2: DASHBOARD STATS — same as Core Values section ■■ */}
                <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 className="font-serif" style={{
                                fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
                            }}>Your Sacred Journey</h2>
                            <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
                        </div>

                        {/* Stats — same 4-column grid as Core Values */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: <ShoppingBag size={22} />, label: 'Total Orders', value: orders.length, tab: 'orders' },
                                { icon: <Calendar size={22} />, label: 'Bookings', value: bookings.length, tab: 'bookings' },
                                { icon: <Heart size={22} />, label: 'Wishlist', value: wishlist.length, tab: 'wishlist' },
                                { icon: <Star size={22} />, label: 'Loyalty Points', value: '⭐', tab: 'profile' },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="card"
                                    onClick={() => setActiveTab(stat.tab)}
                                    style={{
                                        padding: '2rem 1.5rem',
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}>
                                    {/* Icon — identical to About core values icon */}
                                    <div style={{
                                        width: '56px', height: '56px', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '2px solid var(--color-gold)',
                                        background: 'var(--color-bg)',
                                        color: 'var(--color-saffron)'
                                    }}>
                                        {stat.icon}
                                    </div>
                                    <div style={{
                                        fontSize: '2.2rem',
                                        fontFamily: 'var(--font-serif)',
                                        color: 'var(--color-saffron)',
                                        fontWeight: 700,
                                        lineHeight: 1
                                    }}>{stat.value}</div>
                                    <h3 className="font-serif" style={{ fontSize: '1rem', color: 'var(--color-earth)', margin: 0 }}>
                                        {stat.label}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="divider-ornamental">*</div>

                {/* ■■ SECTION 3: NAVIGATION TABS + CONTENT ■■ */}
                <section className="section">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                            {/* LEFT: Navigation sidebar — same layout as About founder left column */}
                            <div style={{ position: 'sticky', top: '2rem' }}>
                                <span className="badge-gold" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                                    NAVIGATION
                                </span>
                                <h2 className="font-serif" style={{
                                    fontSize: '2.2rem', color: 'var(--color-earth)',
                                    marginBottom: '1.5rem', lineHeight: 1.3
                                }}>
                                    Manage Your<br />Account
                                </h2>
                                <p className="font-sans" style={{
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 1.8, marginBottom: '2rem', fontSize: '1rem'
                                }}>
                                    Access your orders, bookings, wishlist and profile all in one place.
                                </p>

                                {/* Tab buttons */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                padding: '0.875rem 1.25rem',
                                                background: activeTab === tab.id
                                                    ? 'var(--color-saffron)'
                                                    : 'var(--color-bg-card)',
                                                color: activeTab === tab.id
                                                    ? 'white'
                                                    : 'var(--color-earth)',
                                                border: `1px solid ${activeTab === tab.id ? 'var(--color-saffron)' : 'var(--color-border)'}`,
                                                borderRadius: '0.75rem',
                                                cursor: 'pointer',
                                                fontFamily: 'var(--font-accent)',
                                                fontSize: '0.82rem',
                                                letterSpacing: '0.06em',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                transition: 'all 0.2s',
                                                boxShadow: activeTab === tab.id ? '0 4px 16px rgba(199,69,0,0.2)' : 'none'
                                            }}>
                                            <span style={{ opacity: activeTab === tab.id ? 1 : 0.6 }}>{tab.icon}</span>
                                            {tab.label}
                                        </button>
                                    ))}

                                    {/* Logout */}
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '0.875rem 1.25rem',
                                            background: 'transparent',
                                            color: 'var(--color-text-muted)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '0.75rem',
                                            cursor: 'pointer',
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.82rem',
                                            letterSpacing: '0.06em',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            marginTop: '0.5rem',
                                            transition: 'all 0.2s'
                                        }}>
                                        <LogOut size={15} />
                                        Logout
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT: Tab content — same layout as About founder right column */}
                            <div>

                                {/* OVERVIEW */}
                                {activeTab === 'overview' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                                        {/* Recent Orders card — same as About testimonial card */}
                                        <div className="card" style={{ padding: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                                <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--color-earth)', margin: 0 }}>
                                                    Recent Orders
                                                </h3>
                                                <button onClick={() => setActiveTab('orders')} style={{
                                                    background: 'transparent', border: 'none',
                                                    color: 'var(--color-saffron)', cursor: 'pointer',
                                                    fontFamily: 'var(--font-accent)', fontSize: '0.72rem', letterSpacing: '0.1em'
                                                }}>VIEW ALL →</button>
                                            </div>
                                            {orders.length === 0 ? (
                                                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                                                        No orders yet. Start exploring our sacred collection.
                                                    </p>
                                                    <Link to="/shop" className="btn-primary">Explore Shop</Link>
                                                </div>
                                            ) : orders.slice(0, 3).map((order: any) => (
                                                <div key={order.id} style={{
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                    padding: '0.875rem 0', borderBottom: '1px solid var(--color-border)'
                                                }}>
                                                    <div>
                                                        <p style={{ fontWeight: 600, color: 'var(--color-earth)', margin: 0, fontSize: '0.9rem' }}>
                                                            Order #{order.id}
                                                        </p>
                                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', margin: '0.15rem 0 0' }}>
                                                            {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontWeight: 700, margin: 0 }}>
                                                            ₹{order.total?.toLocaleString('en-IN')}
                                                        </p>
                                                        <span style={{
                                                            background: order.status === 'paid' ? '#e8f5e9' : 'rgba(199,69,0,0.08)',
                                                            color: order.status === 'paid' ? '#2e7d32' : 'var(--color-saffron)',
                                                            padding: '0.15rem 0.6rem', borderRadius: '1rem',
                                                            fontSize: '0.65rem', fontFamily: 'var(--font-accent)'
                                                        }}>{order.status?.toUpperCase()}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Recent Bookings card */}
                                        <div className="card" style={{ padding: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                                <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--color-earth)', margin: 0 }}>
                                                    Recent Bookings
                                                </h3>
                                                <button onClick={() => setActiveTab('bookings')} style={{
                                                    background: 'transparent', border: 'none',
                                                    color: 'var(--color-saffron)', cursor: 'pointer',
                                                    fontFamily: 'var(--font-accent)', fontSize: '0.72rem', letterSpacing: '0.1em'
                                                }}>VIEW ALL →</button>
                                            </div>
                                            {bookings.length === 0 ? (
                                                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                                                        No bookings yet. Book a consultation with Er. Manu Gupta.
                                                    </p>
                                                    <Link to="/services/personal-consultation" className="btn-primary">Book Now</Link>
                                                </div>
                                            ) : bookings.slice(0, 3).map((b: any) => (
                                                <div key={b.id} style={{
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                    padding: '0.875rem 0', borderBottom: '1px solid var(--color-border)'
                                                }}>
                                                    <div>
                                                        <p style={{ fontWeight: 600, color: 'var(--color-earth)', margin: 0, fontSize: '0.9rem' }}>
                                                            {b.service_type}
                                                        </p>
                                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', margin: '0.15rem 0 0' }}>
                                                            {b.date} • {b.time_slot}
                                                        </p>
                                                    </div>
                                                    <span style={{
                                                        background: 'rgba(199,69,0,0.08)',
                                                        color: 'var(--color-saffron)',
                                                        padding: '0.15rem 0.6rem', borderRadius: '1rem',
                                                        fontSize: '0.65rem', fontFamily: 'var(--font-accent)',
                                                        border: '1px solid var(--color-border)'
                                                    }}>{b.status?.toUpperCase()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* ORDERS TAB */}
                                {activeTab === 'orders' && (
                                    <div>
                                        <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>MY ORDERS</span>
                                        <h2 className="font-serif" style={{ fontSize: '2.2rem', color: 'var(--color-earth)', marginBottom: '1.5rem', lineHeight: 1.3 }}>
                                            Order History
                                        </h2>
                                        {orders.length === 0 ? (
                                            <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                                    You haven't placed any orders yet. Explore our sacred collection.
                                                </p>
                                                <Link to="/shop" className="btn-primary">Start Shopping</Link>
                                            </div>
                                        ) : orders.map((order: any) => (
                                            <div key={order.id} className="card" style={{ padding: '2rem', marginBottom: '1rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                    <div>
                                                        <p style={{ fontWeight: 600, color: 'var(--color-earth)', fontSize: '1rem', margin: '0 0 0.25rem' }}>
                                                            Order #{order.id}
                                                        </p>
                                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: 0 }}>
                                                            {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
                                                            ₹{order.total?.toLocaleString('en-IN')}
                                                        </p>
                                                        <span style={{
                                                            background: order.status === 'paid' ? '#e8f5e9' : 'rgba(199,69,0,0.08)',
                                                            color: order.status === 'paid' ? '#2e7d32' : 'var(--color-saffron)',
                                                            padding: '0.2rem 0.75rem', borderRadius: '1rem',
                                                            fontSize: '0.68rem', fontFamily: 'var(--font-accent)'
                                                        }}>{order.status?.toUpperCase()}</span>
                                                    </div>
                                                </div>
                                                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                                                    <button
                                                        onClick={() => generateInvoice(order)}
                                                        className="btn-outline"
                                                        style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
                                                        Download Invoice
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* BOOKINGS TAB */}
                                {activeTab === 'bookings' && (
                                    <div>
                                        <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>MY BOOKINGS</span>
                                        <h2 className="font-serif" style={{ fontSize: '2.2rem', color: 'var(--color-earth)', marginBottom: '1.5rem', lineHeight: 1.3 }}>
                                            Consultation History
                                        </h2>
                                        {bookings.length === 0 ? (
                                            <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                                    No bookings yet. Book a personal consultation with Er. Manu Gupta.
                                                </p>
                                                <Link to="/services/personal-consultation" className="btn-primary">Book a Consultation</Link>
                                            </div>
                                        ) : bookings.map((b: any) => (
                                            <div key={b.id} className="card" style={{ padding: '2rem', marginBottom: '1rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <div>
                                                        <p style={{ fontWeight: 600, color: 'var(--color-earth)', fontSize: '1rem', margin: '0 0 0.4rem' }}>
                                                            {b.service_type}
                                                        </p>
                                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: '0 0 0.2rem' }}>
                                                            📅 {b.date}
                                                        </p>
                                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: 0 }}>
                                                            🕐 {b.time_slot}
                                                        </p>
                                                        {b.message && (
                                                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
                                                                "{b.message}"
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span style={{
                                                        background: b.status === 'confirmed' ? '#e8f5e9' : 'rgba(199,69,0,0.08)',
                                                        color: b.status === 'confirmed' ? '#2e7d32' : 'var(--color-saffron)',
                                                        padding: '0.25rem 0.75rem', borderRadius: '1rem',
                                                        fontSize: '0.68rem', fontFamily: 'var(--font-accent)',
                                                        border: '1px solid var(--color-border)',
                                                        whiteSpace: 'nowrap'
                                                    }}>{b.status?.toUpperCase()}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* WISHLIST TAB */}
                                {activeTab === 'wishlist' && (
                                    <div>
                                        <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>MY WISHLIST</span>
                                        <h2 className="font-serif" style={{ fontSize: '2.2rem', color: 'var(--color-earth)', marginBottom: '1.5rem', lineHeight: 1.3 }}>
                                            Saved Items
                                        </h2>
                                        {wishlist.length === 0 ? (
                                            <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                                    No saved items yet. Heart your favourite products to save them here.
                                                </p>
                                                <Link to="/shop" className="btn-primary">Explore Products</Link>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                {wishlist.map((item: any) => (
                                                    <div key={item.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                                                        <img
                                                            src={item.product?.image}
                                                            alt={item.product?.name}
                                                            style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                                                        />
                                                        <div style={{ padding: '1.25rem' }}>
                                                            <p className="font-serif" style={{ color: 'var(--color-earth)', fontSize: '1rem', marginBottom: '0.25rem' }}>
                                                                {item.product?.name}
                                                            </p>
                                                            <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontWeight: 700, marginBottom: '0.875rem' }}>
                                                                ₹{item.product?.price?.toLocaleString('en-IN')}
                                                            </p>
                                                            <Link to={`/shop/${item.product?.slug}`} className="btn-primary"
                                                                style={{ fontSize: '0.78rem', padding: '0.4rem 0.875rem', display: 'inline-block' }}>
                                                                View Product
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* PROFILE TAB */}
                                {activeTab === 'profile' && (
                                    <div>
                                        <span className="badge-gold" style={{ marginBottom: '1rem', display: 'inline-block' }}>MY PROFILE</span>
                                        <h2 className="font-serif" style={{ fontSize: '2.2rem', color: 'var(--color-earth)', marginBottom: '1.5rem', lineHeight: 1.3 }}>
                                            Account Details
                                        </h2>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {[
                                                { label: 'FULL NAME', value: user?.full_name || '—' },
                                                { label: 'EMAIL ADDRESS', value: user?.email || '—' },
                                                { label: 'PHONE NUMBER', value: user?.phone || '—' },
                                                { label: 'MEMBER SINCE', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '—' },
                                            ].map(field => (
                                                <div key={field.label} className="card" style={{
                                                    padding: '1.25rem 1.5rem',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <span style={{
                                                        fontFamily: 'var(--font-accent)',
                                                        fontSize: '0.72rem',
                                                        letterSpacing: '0.1em',
                                                        color: 'var(--color-text-muted)'
                                                    }}>{field.label}</span>
                                                    <span style={{
                                                        color: 'var(--color-earth)',
                                                        fontSize: '0.9rem',
                                                        fontWeight: 500
                                                    }}>{field.value}</span>
                                                </div>
                                            ))}
                                            <div style={{ marginTop: '0.5rem' }}>
                                                <button className="btn-primary" style={{ fontSize: '0.875rem' }}>
                                                    Edit Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </section>

                <div className="divider-ornamental">*</div>

                {/* ■■ SECTION 4: BOTTOM CTA — same as About testimonials section ■■ */}
                <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>
                                Continue Your Journey
                            </h2>
                            <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: <ShoppingBag size={22} />,
                                    title: 'Sacred Shop',
                                    desc: 'Explore our collection of gemstones, rudraksha and yantras energised through Vedic rituals.',
                                    link: '/shop', cta: 'Shop Now'
                                },
                                {
                                    icon: <Calendar size={22} />,
                                    title: 'Book Consultation',
                                    desc: 'Get personalised guidance from Er. Manu Gupta based on your birth chart and life situation.',
                                    link: '/services/personal-consultation', cta: 'Book Now'
                                },
                                {
                                    icon: <Star size={22} />,
                                    title: 'Daily Horoscope',
                                    desc: 'Check your daily, weekly and monthly horoscope predictions for all 12 zodiac signs.',
                                    link: '/horoscope', cta: 'Read Now'
                                },
                            ].map((item, i) => (
                                <div key={i} className="card" style={{ padding: '2rem' }}>
                                    <div style={{
                                        width: '56px', height: '56px', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '2px solid var(--color-gold)',
                                        background: 'var(--color-bg)',
                                        color: 'var(--color-saffron)',
                                        marginBottom: '1.25rem'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--color-earth)', marginBottom: '0.75rem' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                        {item.desc}
                                    </p>
                                    <Link to={item.link} className="btn-primary" style={{ fontSize: '0.82rem' }}>
                                        {item.cta}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}
