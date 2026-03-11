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

  const userInitial = user?.full_name?.charAt(0)?.toUpperCase() || 'U'
  const userName = user?.full_name || user?.name || 'Sacred User'
  const userEmail = user?.email || ''

  const { data: orderData } = useQuery({
    queryKey: ['my-orders'],
    queryFn: () => orderService.getMyOrders()
  })
  const orders = Array.isArray(orderData) ? orderData : orderData?.items || []

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
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <SEOHead title="My Dashboard" description="Manage your orders, bookings and profile." />

      {/* ── Hero Section — matches About page hero ── */}
      <section className="section" style={{ paddingTop: '8rem', paddingBottom: '3rem', textAlign: 'center' }}>
        <div className="container">
          {/* Avatar */}
          <div style={{
            width: '96px', height: '96px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-saffron), var(--color-gold))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem', color: 'white',
            fontFamily: 'var(--font-serif)',
            border: '4px solid var(--color-gold)',
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 32px rgba(199,69,0,0.2)'
          }}>
            {userInitial}
          </div>

          <p style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: 'var(--color-saffron)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>MY ACCOUNT</p>

          <h1 className="font-serif" style={{
            fontSize: '2.5rem',
            color: 'var(--color-earth)',
            marginBottom: '0.5rem'
          }}>{userName}</h1>

          <p style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem',
            marginBottom: '0.25rem'
          }}>{userEmail}</p>

          <p style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            color: 'var(--color-gold)',
            textTransform: 'uppercase'
          }}>Free Member</p>
        </div>
      </section>

      {/* ── Gold Divider ── */}
      <div className="divider-ornamental">*</div>

      {/* ── Stats Section — matches Core Values cards ── */}
      <section className="section" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {[
              { label: 'Total Orders', val: orders.length, icon: <ShoppingBag size={32} />, tab: 'orders' },
              { label: 'Total Bookings', val: bookings.length, icon: <Calendar size={32} />, tab: 'bookings' },
              { label: 'Wishlist Items', val: wishlistItems.length, icon: <Heart size={32} />, tab: 'wishlist' },
            ].map((stat, i) => (
              <div
                key={i}
                onClick={() => setActiveTab(stat.tab)}
                className="card"
                style={{
                  padding: '2.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: 'white',
                  border: '1px solid rgba(201,151,42,0.15)',
                }}
              >
                <div style={{
                  width: '64px', height: '64px',
                  borderRadius: '50%',
                  border: '2px solid var(--color-gold)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                  margin: '0 auto 1.25rem'
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '2.5rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-saffron)',
                  fontWeight: 700,
                  marginBottom: '0.25rem'
                }}>{stat.val}</div>
                <div style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: 'var(--color-earth)',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gold Divider ── */}
      <div className="divider-ornamental">*</div>

      {/* ── Navigation Tabs + Content ── */}
      <section className="section" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '240px 1fr',
            gap: '3rem',
            alignItems: 'flex-start'
          }}>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: '6rem' }}>
              <div className="card" style={{
                overflow: 'hidden',
                background: 'white',
                border: '1px solid rgba(201,151,42,0.15)',
                padding: 0
              }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      width: '100%',
                      padding: '1.1rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-accent)',
                      letterSpacing: '0.04em',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none',
                      borderBottom: '1px solid rgba(201,151,42,0.08)',
                      background: activeTab === tab.id
                        ? 'linear-gradient(135deg, rgba(199,69,0,0.06), rgba(201,151,42,0.06))'
                        : 'transparent',
                      color: activeTab === tab.id
                        ? 'var(--color-saffron)'
                        : 'var(--color-earth)',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      borderLeft: activeTab === tab.id
                        ? '3px solid var(--color-saffron)'
                        : '3px solid transparent',
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
                    padding: '1.1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-accent)',
                    letterSpacing: '0.04em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: 'none',
                    borderLeft: '3px solid transparent',
                    background: 'transparent',
                    color: 'var(--color-text-muted)',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}>
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div>

              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                  {/* Section title */}
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.2em',
                      color: 'var(--color-saffron)',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem'
                    }}>DASHBOARD</p>
                    <h2 className="font-serif" style={{
                      fontSize: '2rem',
                      color: 'var(--color-earth)'
                    }}>Welcome back, {userName.split(' ')[0]}</h2>
                    <div style={{
                      width: '48px', height: '3px',
                      background: 'var(--color-gold)',
                      marginTop: '0.75rem'
                    }} />
                  </div>

                  {/* Recent Orders */}
                  <div className="card" style={{
                    background: 'white',
                    border: '1px solid rgba(201,151,42,0.15)',
                    overflow: 'hidden',
                    padding: 0
                  }}>
                    <div style={{
                      padding: '1.5rem 2rem',
                      background: 'rgba(250,242,226,0.5)',
                      borderBottom: '1px solid rgba(201,151,42,0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <h3 className="font-serif" style={{
                        fontSize: '1.25rem',
                        color: 'var(--color-earth)'
                      }}>Recent Orders</h3>
                      <button onClick={() => setActiveTab('orders')} style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-accent)',
                        letterSpacing: '0.1em',
                        color: 'var(--color-saffron)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                      }}>View All →</button>
                    </div>

                    {orders.length === 0 ? (
                      <div style={{
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        color: 'var(--color-text-muted)'
                      }}>
                        <ShoppingBag size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                        <p className="font-serif" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                          No orders yet
                        </p>
                        <Link to="/shop" style={{
                          color: 'var(--color-saffron)',
                          fontSize: '0.85rem'
                        }}>
                          Start shopping →
                        </Link>
                      </div>
                    ) : (
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{
                            background: 'rgba(250,242,226,0.3)',
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-accent)',
                            letterSpacing: '0.12em',
                            color: 'var(--color-earth)',
                            fontWeight: 700,
                            textTransform: 'uppercase'
                          }}>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Order ID</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Product</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Invoice</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map((order: any) => (
                            <tr key={order.id} style={{
                              borderTop: '1px solid rgba(201,151,42,0.08)',
                              fontSize: '0.875rem'
                            }}>
                              <td style={{ padding: '1rem 1.5rem', color: 'var(--color-earth)', fontWeight: 700 }}>
                                ORD-{String(order.id).padStart(4, '0')}
                              </td>
                              <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>
                                {order.items?.[0]?.product?.name || 'Vedic Item'}
                              </td>
                              <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>
                                {new Date(order.created_at).toLocaleDateString('en-IN', {
                                  day: 'numeric', month: 'short', year: 'numeric'
                                })}
                              </td>
                              <td style={{ padding: '1rem 1.5rem' }}>
                                <span style={{
                                  padding: '0.2rem 0.75rem',
                                  borderRadius: '1rem',
                                  fontSize: '0.65rem',
                                  fontFamily: 'var(--font-accent)',
                                  fontWeight: 700,
                                  background: order.status === 'paid' ? '#e8f5e9' : 'rgba(199,69,0,0.08)',
                                  color: order.status === 'paid' ? '#2e7d32' : 'var(--color-saffron)'
                                }}>
                                  {order.status?.toUpperCase()}
                                </span>
                              </td>
                              <td style={{ padding: '1rem 1.5rem' }}>
                                <button onClick={() => generateInvoice(order)} style={{
                                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                                  padding: '0.3rem 0.75rem',
                                  background: 'var(--color-saffron)', color: 'white',
                                  border: 'none', borderRadius: '1rem', cursor: 'pointer',
                                  fontSize: '0.65rem', fontWeight: 700
                                }}>
                                  <Download size={11} /> Invoice
                                </button>
                              </td>
                              <td style={{
                                padding: '1rem 1.5rem', textAlign: 'right',
                                color: 'var(--color-earth)', fontWeight: 700,
                                fontFamily: 'var(--font-serif)'
                              }}>
                                ₹{(order.total || order.total_inr)?.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* Bookings */}
                  {bookings.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '3rem 2rem',
                      border: '2px dashed rgba(201,151,42,0.25)',
                      borderRadius: '1.5rem',
                      background: 'white'
                    }}>
                      <Calendar size={40} style={{ margin: '0 auto 1rem', color: 'var(--color-gold)', opacity: 0.5 }} />
                      <p className="font-serif" style={{
                        fontSize: '1.2rem',
                        color: 'var(--color-earth)',
                        marginBottom: '0.5rem'
                      }}>No bookings yet</p>
                      <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.875rem',
                        marginBottom: '1.5rem'
                      }}>
                        Book a personal consultation with Er. Manu Gupta
                      </p>
                      <Link to="/services/personal-consultation" className="btn-primary"
                        style={{ display: 'inline-block' }}>
                        Book a Consultation
                      </Link>
                    </div>
                  ) : (
                    <div className="card" style={{
                      background: 'white',
                      border: '1px solid rgba(201,151,42,0.15)',
                      padding: '2rem'
                    }}>
                      <h3 className="font-serif" style={{
                        fontSize: '1.25rem',
                        color: 'var(--color-earth)',
                        marginBottom: '1.5rem'
                      }}>Recent Bookings</h3>
                      {bookings.slice(0, 3).map((b: any) => (
                        <div key={b.id} style={{
                          display: 'flex', justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1rem 0',
                          borderBottom: '1px solid rgba(201,151,42,0.08)'
                        }}>
                          <div>
                            <p style={{ color: 'var(--color-earth)', fontWeight: 600 }}>{b.service_type}</p>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                              📅 {b.date} • {b.time_slot}
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
                  )}
                </div>
              )}

              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div>
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{
                      fontFamily: 'var(--font-accent)', fontSize: '0.75rem',
                      letterSpacing: '0.2em', color: 'var(--color-saffron)',
                      textTransform: 'uppercase', marginBottom: '0.5rem'
                    }}>HISTORY</p>
                    <h2 className="font-serif" style={{ fontSize: '2rem', color: 'var(--color-earth)' }}>
                      My Orders
                    </h2>
                    <div style={{ width: '48px', height: '3px', background: 'var(--color-gold)', marginTop: '0.75rem' }} />
                  </div>
                  <div className="card" style={{
                    background: 'white',
                    border: '1px solid rgba(201,151,42,0.15)',
                    overflow: 'hidden', padding: 0
                  }}>
                    {orders.length === 0 ? (
                      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        <ShoppingBag size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                        <p className="font-serif" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>No orders yet</p>
                        <Link to="/shop" className="btn-primary" style={{ display: 'inline-block' }}>
                          Explore Shop
                        </Link>
                      </div>
                    ) : (
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{
                            background: 'rgba(250,242,226,0.5)',
                            fontSize: '0.68rem', fontFamily: 'var(--font-accent)',
                            letterSpacing: '0.12em', color: 'var(--color-earth)',
                            fontWeight: 700, textTransform: 'uppercase'
                          }}>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Order ID</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Product</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>Invoice</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order: any) => (
                            <tr key={order.id} style={{
                              borderTop: '1px solid rgba(201,151,42,0.08)',
                              fontSize: '0.875rem'
                            }}>
                              <td style={{ padding: '1rem 1.5rem', color: 'var(--color-earth)', fontWeight: 700 }}>
                                ORD-{String(order.id).padStart(4, '0')}
                              </td>
                              <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>
                                {order.items?.[0]?.product?.name || 'Vedic Item'}
                              </td>
                              <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>
                                {new Date(order.created_at).toLocaleDateString('en-IN')}
                              </td>
                              <td style={{ padding: '1rem 1.5rem' }}>
                                <span style={{
                                  padding: '0.2rem 0.75rem', borderRadius: '1rem',
                                  fontSize: '0.65rem', fontFamily: 'var(--font-accent)', fontWeight: 700,
                                  background: order.status === 'paid' ? '#e8f5e9' : 'rgba(199,69,0,0.08)',
                                  color: order.status === 'paid' ? '#2e7d32' : 'var(--color-saffron)'
                                }}>{order.status?.toUpperCase()}</span>
                              </td>
                              <td style={{ padding: '1rem 1.5rem' }}>
                                <button onClick={() => generateInvoice(order)} style={{
                                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                                  padding: '0.3rem 0.75rem',
                                  background: 'var(--color-saffron)', color: 'white',
                                  border: 'none', borderRadius: '1rem', cursor: 'pointer',
                                  fontSize: '0.65rem', fontWeight: 700
                                }}>
                                  <Download size={11} /> Invoice
                                </button>
                              </td>
                              <td style={{
                                padding: '1rem 1.5rem', textAlign: 'right',
                                color: 'var(--color-earth)', fontWeight: 700,
                                fontFamily: 'var(--font-serif)'
                              }}>
                                ₹{(order.total || order.total_inr)?.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* BOOKINGS TAB */}
              {activeTab === 'bookings' && (
                <div>
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{
                      fontFamily: 'var(--font-accent)', fontSize: '0.75rem',
                      letterSpacing: '0.2em', color: 'var(--color-saffron)',
                      textTransform: 'uppercase', marginBottom: '0.5rem'
                    }}>SCHEDULE</p>
                    <h2 className="font-serif" style={{ fontSize: '2rem', color: 'var(--color-earth)' }}>
                      My Bookings
                    </h2>
                    <div style={{ width: '48px', height: '3px', background: 'var(--color-gold)', marginTop: '0.75rem' }} />
                  </div>
                  <div className="card" style={{
                    background: 'white',
                    border: '1px solid rgba(201,151,42,0.15)',
                    padding: '2rem'
                  }}>
                    {bookings.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                        <Calendar size={48} style={{ margin: '0 auto 1rem', color: 'var(--color-gold)', opacity: 0.3 }} />
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                          No bookings yet
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
                        alignItems: 'flex-start',
                        background: 'rgba(250,242,226,0.3)'
                      }}>
                        <div>
                          <p style={{ color: 'var(--color-earth)', fontWeight: 600, marginBottom: '0.3rem' }}>
                            {b.service_type}
                          </p>
                          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                            📅 {b.date} • 🕐 {b.time_slot}
                          </p>
                        </div>
                        <span style={{
                          padding: '0.25rem 0.75rem', borderRadius: '1rem',
                          fontSize: '0.65rem', fontFamily: 'var(--font-accent)',
                          background: 'rgba(199,69,0,0.08)',
                          color: 'var(--color-saffron)', fontWeight: 700
                        }}>{b.status?.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WISHLIST TAB */}
              {activeTab === 'wishlist' && (
                <div>
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{
                      fontFamily: 'var(--font-accent)', fontSize: '0.75rem',
                      letterSpacing: '0.2em', color: 'var(--color-saffron)',
                      textTransform: 'uppercase', marginBottom: '0.5rem'
                    }}>SAVED</p>
                    <h2 className="font-serif" style={{ fontSize: '2rem', color: 'var(--color-earth)' }}>
                      My Wishlist
                    </h2>
                    <div style={{ width: '48px', height: '3px', background: 'var(--color-gold)', marginTop: '0.75rem' }} />
                  </div>
                  {wishlistItems.length === 0 ? (
                    <div style={{
                      textAlign: 'center', padding: '4rem 2rem',
                      border: '2px dashed rgba(201,151,42,0.25)',
                      borderRadius: '1.5rem', background: 'white'
                    }}>
                      <Heart size={48} style={{ margin: '0 auto 1rem', color: 'var(--color-gold)', opacity: 0.3 }} />
                      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>No saved items yet</p>
                      <Link to="/shop" className="btn-primary">Explore Products</Link>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                      {wishlistItems.map((item: any) => (
                        <div key={item.id} className="card" style={{
                          overflow: 'hidden', padding: 0,
                          border: '1px solid rgba(201,151,42,0.15)'
                        }}>
                          <img src={item.product?.image_url || item.product?.thumbnail_url}
                            alt={item.product?.name}
                            style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                          <div style={{ padding: '1.25rem' }}>
                            <p className="font-serif" style={{
                              color: 'var(--color-earth)',
                              marginBottom: '0.25rem', fontSize: '1rem'
                            }}>{item.product?.name}</p>
                            <p style={{
                              color: 'var(--color-gold)', fontWeight: 700,
                              marginBottom: '1rem'
                            }}>₹{item.product?.price?.toLocaleString('en-IN')}</p>
                            <Link to={`/shop/${item.product?.slug}`}
                              className="btn-primary"
                              style={{ fontSize: '0.75rem', display: 'inline-block' }}>
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
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{
                      fontFamily: 'var(--font-accent)', fontSize: '0.75rem',
                      letterSpacing: '0.2em', color: 'var(--color-saffron)',
                      textTransform: 'uppercase', marginBottom: '0.5rem'
                    }}>ACCOUNT</p>
                    <h2 className="font-serif" style={{ fontSize: '2rem', color: 'var(--color-earth)' }}>
                      My Profile
                    </h2>
                    <div style={{ width: '48px', height: '3px', background: 'var(--color-gold)', marginTop: '0.75rem' }} />
                  </div>
                  <div className="card" style={{
                    background: 'white',
                    border: '1px solid rgba(201,151,42,0.15)',
                    padding: '2rem'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '520px' }}>
                      {[
                        { label: 'FULL NAME', value: user?.full_name || user?.name || '—' },
                        { label: 'EMAIL ADDRESS', value: user?.email || '—' },
                        { label: 'PHONE NUMBER', value: (user as any)?.phone || '—' },
                        { label: 'ACCOUNT TYPE', value: (user as any)?.is_admin ? 'Administrator' : 'Member' },
                      ].map(field => (
                        <div key={field.label} style={{
                          padding: '1.25rem 1.5rem',
                          borderRadius: '0.75rem',
                          border: '1px solid rgba(201,151,42,0.15)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'rgba(250,242,226,0.3)'
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.68rem',
                            letterSpacing: '0.12em',
                            color: 'var(--color-text-muted)',
                            fontWeight: 700,
                            textTransform: 'uppercase'
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
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}