import { useState, useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/api/services/order.service'
import { User as UserIcon, ShoppingBag, Calendar, Heart, LogOut, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { generateInvoice } from '@/utils/generateInvoice'
import SEOHead from '@/components/SEOHead'
import api from '@/lib/api'

export default function UserDashboard() {
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState<any[]>([])
  const [wishlistItems, setWishlistItems] = useState<any[]>([])

  const userInitial = user?.full_name?.charAt(0)?.toUpperCase() ||
    user?.name?.charAt(0)?.toUpperCase() || 'U'
  const userName = user?.full_name || user?.name || 'Sacred User'
  const userEmail = user?.email || ''

  const { data: orderData } = useQuery({
    queryKey: ['my-orders'],
    queryFn: () => orderService.getMyOrders()
  })
  const orders = orderData?.items || orderData || []

  useEffect(() => {
    api.get('/bookings/my').then(r => setBookings(r.data || [])).catch(() => { })
    api.get('/wishlist').then(r => setWishlistItems(r.data || [])).catch(() => { })
  }, [])

  const tabs = [
    { id: 'overview', icon: <UserIcon size={18} />, label: 'Overview' },
    { id: 'orders', icon: <ShoppingBag size={18} />, label: 'My Orders' },
    { id: 'bookings', icon: <Calendar size={18} />, label: 'My Bookings' },
    { id: 'wishlist', icon: <Heart size={18} />, label: 'Wishlist' },
    { id: 'profile', icon: <UserIcon size={18} />, label: 'My Profile' },
  ]

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      <SEOHead title="My Dashboard" description="Manage your orders, bookings and profile on ManuAstro." />
      <div className="bg-[#fdf7ed] min-h-screen pt-24">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '2rem',
            alignItems: 'flex-start'
          }}>

            {/* ── SIDEBAR ── */}
            <aside className="space-y-6 sticky top-24">

              {/* Profile card */}
              <div className="card p-8 bg-white border-2 border-gold/10 text-center">
                <div style={{
                  width: '80px', height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-saffron), var(--color-gold))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', color: 'white',
                  fontFamily: 'var(--font-serif)',
                  border: '3px solid var(--color-gold)',
                  margin: '0 auto 1rem',
                  boxShadow: '0 4px 20px rgba(199,69,0,0.2)'
                }}>
                  {userInitial}
                </div>
                <h2 className="text-xl font-serif" style={{ color: 'var(--color-earth)' }}>
                  {userName}
                </h2>
                <p style={{
                  fontSize: '0.72rem', fontFamily: 'var(--font-accent)',
                  letterSpacing: '0.12em', color: 'var(--color-text-muted)',
                  marginTop: '0.25rem'
                }}>{userEmail}</p>
                <p style={{
                  fontSize: '0.65rem', fontFamily: 'var(--font-accent)',
                  letterSpacing: '0.1em', color: 'var(--color-saffron)',
                  marginTop: '0.25rem', textTransform: 'uppercase'
                }}>Free Member</p>
              </div>

              {/* Nav tabs */}
              <div className="card overflow-hidden bg-white border-2 border-gold/10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-accent)',
                      letterSpacing: '0.04em',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none',
                      borderBottom: '1px solid rgba(201,151,42,0.08)',
                      background: activeTab === tab.id
                        ? 'rgba(199,69,0,0.06)'
                        : 'transparent',
                      color: activeTab === tab.id
                        ? 'var(--color-saffron)'
                        : 'var(--color-earth)',
                      transition: 'all 0.2s',
                      textAlign: 'left'
                    }}>
                    <span style={{
                      color: activeTab === tab.id
                        ? 'var(--color-saffron)'
                        : 'var(--color-gold)'
                    }}>
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={logout}
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-accent)',
                    letterSpacing: '0.04em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--color-text-muted)',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}>
                  <LogOut size={18} style={{ color: 'var(--color-text-muted)' }} />
                  Logout
                </button>
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div className="space-y-8">

              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <>
                  {/* Stats */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { label: 'TOTAL ORDERS', val: orders.length, tab: 'orders' },
                      { label: 'TOTAL BOOKINGS', val: bookings.length, tab: 'bookings' },
                      { label: 'WISHLIST ITEMS', val: wishlistItems.length, tab: 'wishlist' }
                    ].map((stat, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveTab(stat.tab)}
                        className="card p-8 bg-white border-2 border-gold/10"
                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}>
                        <div style={{
                          fontSize: '2.5rem',
                          fontFamily: 'var(--font-serif)',
                          color: 'var(--color-saffron)',
                          fontWeight: 700
                        }}>{stat.val}</div>
                        <div style={{
                          fontFamily: 'var(--font-accent)',
                          fontSize: '0.72rem',
                          letterSpacing: '0.1em',
                          color: 'var(--color-earth)',
                          marginTop: '0.25rem',
                          fontWeight: 600
                        }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Orders table */}
                  <section className="card bg-white border-2 border-gold/10 overflow-hidden">
                    <div className="px-8 py-6 bg-[#faf2e2] border-b border-gold/10 flex justify-between items-center">
                      <h3 className="text-xl font-serif" style={{ color: 'var(--color-earth)' }}>
                        Recent Orders
                      </h3>
                      <button
                        onClick={() => setActiveTab('orders')}
                        style={{
                          fontSize: '0.68rem', fontFamily: 'var(--font-accent)',
                          letterSpacing: '0.1em', color: 'var(--color-saffron)',
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontWeight: 700, textTransform: 'uppercase'
                        }}>View All →</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr style={{
                            fontSize: '0.65rem', fontFamily: 'var(--font-accent)',
                            letterSpacing: '0.12em', color: 'var(--color-earth)',
                            background: 'rgba(250,242,226,0.3)', fontWeight: 700
                          }}>
                            <th className="px-8 py-4">ORDER ID</th>
                            <th className="px-8 py-4">PRODUCT</th>
                            <th className="px-8 py-4">DATE</th>
                            <th className="px-8 py-4">STATUS</th>
                            <th className="px-8 py-4">INVOICE</th>
                            <th className="px-8 py-4 text-right">AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.length === 0 ? (
                            <tr>
                              <td colSpan={6} style={{
                                padding: '3rem', textAlign: 'center',
                                color: 'var(--color-text-muted)',
                                fontStyle: 'italic', fontSize: '0.9rem'
                              }}>
                                No orders yet.{' '}
                                <Link to="/shop" style={{ color: 'var(--color-saffron)' }}>
                                  Start shopping
                                </Link>
                              </td>
                            </tr>
                          ) : orders.slice(0, 5).map((order: any) => (
                            <tr key={order.id} style={{
                              borderTop: '1px solid rgba(201,151,42,0.08)',
                              fontSize: '0.85rem', transition: 'background 0.2s'
                            }}>
                              <td className="px-8 py-5" style={{ color: 'var(--color-earth)', fontWeight: 700 }}>
                                ORD-{String(order.id).padStart(4, '0')}
                              </td>
                              <td className="px-8 py-5" style={{ color: 'var(--color-text-secondary)' }}>
                                {order.items?.[0]?.product?.name || 'Vedic Item'}
                                {order.items?.length > 1 ? ` +${order.items.length - 1}` : ''}
                              </td>
                              <td className="px-8 py-5" style={{ color: 'var(--color-text-muted)' }}>
                                {new Date(order.created_at).toLocaleDateString('en-IN', {
                                  day: 'numeric', month: 'short', year: 'numeric'
                                })}
                              </td>
                              <td className="px-8 py-5">
                                <span style={{
                                  padding: '0.2rem 0.75rem',
                                  borderRadius: '1rem',
                                  fontSize: '0.65rem',
                                  fontFamily: 'var(--font-accent)',
                                  letterSpacing: '0.06em',
                                  fontWeight: 700,
                                  background: order.status === 'paid' || order.status === 'delivered'
                                    ? '#e8f5e9' : 'rgba(199,69,0,0.08)',
                                  color: order.status === 'paid' || order.status === 'delivered'
                                    ? '#2e7d32' : 'var(--color-saffron)'
                                }}>
                                  {order.status?.toUpperCase()}
                                </span>
                              </td>
                              <td className="px-8 py-5">
                                <button
                                  onClick={() => generateInvoice(order)}
                                  style={{
                                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                                    padding: '0.3rem 0.75rem',
                                    background: 'var(--color-saffron)',
                                    color: 'white', border: 'none',
                                    borderRadius: '1rem', cursor: 'pointer',
                                    fontSize: '0.65rem', fontFamily: 'var(--font-accent)',
                                    letterSpacing: '0.06em', fontWeight: 700
                                  }}>
                                  <Download size={11} /> Invoice
                                </button>
                              </td>
                              <td className="px-8 py-5 text-right" style={{
                                color: 'var(--color-earth)', fontWeight: 700,
                                fontFamily: 'var(--font-serif)'
                              }}>
                                ₹{(order.total || order.total_inr)?.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Bookings section */}
                  <section>
                    {bookings.length > 0 ? (
                      <div className="card p-8 bg-white border-2 border-gold/10">
                        <h3 className="text-xl font-serif mb-4" style={{ color: 'var(--color-earth)' }}>
                          Recent Bookings
                        </h3>
                        {bookings.slice(0, 3).map((b: any) => (
                          <div key={b.id} style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', padding: '0.875rem 0',
                            borderBottom: '1px solid rgba(201,151,42,0.1)'
                          }}>
                            <div>
                              <p style={{ color: 'var(--color-earth)', fontWeight: 600, fontSize: '0.9rem' }}>
                                {b.service_type}
                              </p>
                              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>
                                {b.date} • {b.time_slot}
                              </p>
                            </div>
                            <span style={{
                              padding: '0.2rem 0.75rem', borderRadius: '1rem',
                              fontSize: '0.65rem', fontFamily: 'var(--font-accent)',
                              background: 'rgba(199,69,0,0.08)',
                              color: 'var(--color-saffron)', fontWeight: 700
                            }}>{b.status?.toUpperCase()}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{
                        textAlign: 'center', padding: '2.5rem',
                        border: '2px dashed rgba(201,151,42,0.3)',
                        borderRadius: '1.5rem', background: 'white'
                      }}>
                        <p className="font-serif" style={{
                          fontSize: '1.1rem', color: 'var(--color-earth)', marginBottom: '0.5rem'
                        }}>No bookings yet.</p>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                          Book a personal consultation with Er. Manu Gupta
                        </p>
                        <Link to="/services/personal-consultation" className="btn-primary"
                          style={{ display: 'inline-block' }}>
                          Book a Consultation
                        </Link>
                      </div>
                    )}
                  </section>
                </>
              )}

              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <section className="card bg-white border-2 border-gold/10 overflow-hidden">
                  <div className="px-8 py-6 bg-[#faf2e2] border-b border-gold/10">
                    <h3 className="text-xl font-serif" style={{ color: 'var(--color-earth)' }}>
                      My Orders
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr style={{
                          fontSize: '0.65rem', fontFamily: 'var(--font-accent)',
                          letterSpacing: '0.12em', color: 'var(--color-earth)',
                          background: 'rgba(250,242,226,0.3)', fontWeight: 700
                        }}>
                          <th className="px-8 py-4">ORDER ID</th>
                          <th className="px-8 py-4">PRODUCT</th>
                          <th className="px-8 py-4">DATE</th>
                          <th className="px-8 py-4">STATUS</th>
                          <th className="px-8 py-4">INVOICE</th>
                          <th className="px-8 py-4 text-right">AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length === 0 ? (
                          <tr>
                            <td colSpan={6} style={{
                              padding: '4rem', textAlign: 'center',
                              color: 'var(--color-text-muted)', fontStyle: 'italic'
                            }}>
                              No orders yet.{' '}
                              <Link to="/shop" style={{ color: 'var(--color-saffron)' }}>
                                Explore our shop
                              </Link>
                            </td>
                          </tr>
                        ) : orders.map((order: any) => (
                          <tr key={order.id} style={{
                            borderTop: '1px solid rgba(201,151,42,0.08)',
                            fontSize: '0.85rem'
                          }}>
                            <td className="px-8 py-5" style={{ color: 'var(--color-earth)', fontWeight: 700 }}>
                              ORD-{String(order.id).padStart(4, '0')}
                            </td>
                            <td className="px-8 py-5" style={{ color: 'var(--color-text-secondary)' }}>
                              {order.items?.[0]?.product?.name || 'Vedic Item'}
                            </td>
                            <td className="px-8 py-5" style={{ color: 'var(--color-text-muted)' }}>
                              {new Date(order.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric'
                              })}
                            </td>
                            <td className="px-8 py-5">
                              <span style={{
                                padding: '0.2rem 0.75rem', borderRadius: '1rem',
                                fontSize: '0.65rem', fontFamily: 'var(--font-accent)',
                                fontWeight: 700,
                                background: order.status === 'paid' ? '#e8f5e9' : 'rgba(199,69,0,0.08)',
                                color: order.status === 'paid' ? '#2e7d32' : 'var(--color-saffron)'
                              }}>{order.status?.toUpperCase()}</span>
                            </td>
                            <td className="px-8 py-5">
                              <button
                                onClick={() => generateInvoice(order)}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                                  padding: '0.3rem 0.75rem',
                                  background: 'var(--color-saffron)', color: 'white',
                                  border: 'none', borderRadius: '1rem', cursor: 'pointer',
                                  fontSize: '0.65rem', fontFamily: 'var(--font-accent)',
                                  fontWeight: 700
                                }}>
                                <Download size={11} /> Invoice
                              </button>
                            </td>
                            <td className="px-8 py-5 text-right" style={{
                              color: 'var(--color-earth)', fontWeight: 700,
                              fontFamily: 'var(--font-serif)'
                            }}>
                              ₹{(order.total || order.total_inr)?.toLocaleString('en-IN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* BOOKINGS TAB */}
              {activeTab === 'bookings' && (
                <section className="card bg-white border-2 border-gold/10 overflow-hidden">
                  <div className="px-8 py-6 bg-[#faf2e2] border-b border-gold/10">
                    <h3 className="text-xl font-serif" style={{ color: 'var(--color-earth)' }}>My Bookings</h3>
                  </div>
                  <div className="p-8">
                    {bookings.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                          No bookings yet. Book a personal consultation.
                        </p>
                        <Link to="/services/personal-consultation" className="btn-primary">
                          Book Now
                        </Link>
                      </div>
                    ) : bookings.map((b: any) => (
                      <div key={b.id} style={{
                        padding: '1.25rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(201,151,42,0.15)',
                        marginBottom: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                      }}>
                        <div>
                          <p style={{ color: 'var(--color-earth)', fontWeight: 600, marginBottom: '0.3rem' }}>
                            {b.service_type}
                          </p>
                          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>📅 {b.date}</p>
                          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>🕐 {b.time_slot}</p>
                        </div>
                        <span style={{
                          padding: '0.25rem 0.75rem', borderRadius: '1rem',
                          fontSize: '0.65rem', fontFamily: 'var(--font-accent)',
                          background: 'rgba(199,69,0,0.08)', color: 'var(--color-saffron)',
                          fontWeight: 700, border: '1px solid rgba(199,69,0,0.15)'
                        }}>{b.status?.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* WISHLIST TAB */}
              {activeTab === 'wishlist' && (
                <section className="card bg-white border-2 border-gold/10 overflow-hidden">
                  <div className="px-8 py-6 bg-[#faf2e2] border-b border-gold/10">
                    <h3 className="text-xl font-serif" style={{ color: 'var(--color-earth)' }}>My Wishlist</h3>
                  </div>
                  <div className="p-8">
                    {wishlistItems.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                          No saved items yet.
                        </p>
                        <Link to="/shop" className="btn-primary">Explore Products</Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-6">
                        {wishlistItems.map((item: any) => (
                          <div key={item.id} style={{
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(201,151,42,0.15)',
                            overflow: 'hidden'
                          }}>
                            <img src={item.product?.image} alt={item.product?.name}
                              style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                            <div style={{ padding: '1rem' }}>
                              <p className="font-serif" style={{ color: 'var(--color-earth)', marginBottom: '0.25rem' }}>
                                {item.product?.name}
                              </p>
                              <p style={{ color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.75rem' }}>
                                ₹{item.product?.price?.toLocaleString('en-IN')}
                              </p>
                              <Link to={`/shop/${item.product?.slug}`} className="btn-primary"
                                style={{ fontSize: '0.75rem', padding: '0.35rem 0.875rem', display: 'inline-block' }}>
                                View
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <section className="card bg-white border-2 border-gold/10 overflow-hidden">
                  <div className="px-8 py-6 bg-[#faf2e2] border-b border-gold/10">
                    <h3 className="text-xl font-serif" style={{ color: 'var(--color-earth)' }}>My Profile</h3>
                  </div>
                  <div className="p-8">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
                      {[
                        { label: 'FULL NAME', value: user?.full_name || user?.name || '—' },
                        { label: 'EMAIL ADDRESS', value: user?.email || '—' },
                        { label: 'PHONE NUMBER', value: user?.phone || '—' },
                        { label: 'ACCOUNT TYPE', value: user?.is_admin ? 'Administrator' : 'Member' },
                      ].map(field => (
                        <div key={field.label} style={{
                          padding: '1rem 1.25rem',
                          borderRadius: '0.625rem',
                          border: '1px solid rgba(201,151,42,0.15)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: '#faf2e2'
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.68rem',
                            letterSpacing: '0.1em',
                            color: 'var(--color-text-muted)',
                            fontWeight: 700
                          }}>{field.label}</span>
                          <span style={{
                            color: 'var(--color-earth)',
                            fontSize: '0.9rem',
                            fontWeight: 600
                          }}>{field.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
