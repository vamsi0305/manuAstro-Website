import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/api/services/order.service'
import { motion } from 'framer-motion'
import { User as UserIcon, ShoppingBag, Calendar, Heart, Settings, LogOut, ChevronRight, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { generateInvoice } from '@/utils/generateInvoice'
import SEOHead from '@/components/SEOHead'

export default function UserDashboard() {
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)

  const userInitial = user?.full_name?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || 'U';
  const userName = user?.full_name || user?.name || 'Sacred User';

  const { data: orderData } = useQuery({
    queryKey: ['my-orders'],
    queryFn: () => orderService.getMyOrders()
  })

  // Mock bookings/wishlist for now as we don't have endpoints yet
  const orders = orderData?.items || []
  const bookings = []
  const wishlistItems = []

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

            {/* Sidebar Navigation */}
            <aside className="space-y-6 sticky top-24">
              <div className="card p-8 bg-white border-2 border-gold/10 text-center">
                <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/20 flex items-center justify-center text-gold mx-auto mb-4 text-3xl font-serif">
                  {userInitial}
                </div>
                <h2 className="text-xl font-serif text-earth">{userName}</h2>
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Free Member</p>
              </div>

              <div className="card overflow-hidden bg-white border-2 border-gold/10">
                {[
                  { icon: <UserIcon size={18} />, label: 'Overview', active: true },
                  { icon: <ShoppingBag size={18} />, label: 'My Orders' },
                  { icon: <Calendar size={18} />, label: 'My Bookings' },
                  { icon: <Heart size={18} />, label: 'Wishlist' },
                  { icon: <UserIcon size={18} />, label: 'My Profile' }
                ].map((item, i) => (
                  <button
                    key={i}
                    className={`w-full px-6 py-4 flex items-center gap-4 text-sm font-bold transition-all border-b border-gold/5 last:border-0 ${item.active ? 'text-saffron bg-[#faf2e2]/50' : 'text-muted hover:bg-gold/5 hover:text-earth'
                      }`}
                  >
                    <span className={item.active ? 'text-saffron' : 'text-gold'}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="w-full px-6 py-6 flex items-center gap-4 text-sm font-bold text-earth/40 hover:text-saffron transition-all"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="space-y-10">
              {/* Stats Header */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: 'TOTAL ORDERS', val: orders.length },
                  { label: 'TOTAL BOOKINGS', val: bookings.length },
                  { label: 'WISHLIST ITEMS', val: wishlistItems.length }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="card p-8 bg-white border-2 border-gold/10"
                  >
                    <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-saffron)', fontWeight: 700 }}>
                      {stat.val}
                    </div>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Orders */}
              <section className="card bg-white border-2 border-gold/10 overflow-hidden">
                <div className="px-8 py-6 bg-[#faf2e2] border-b border-gold/10 flex justify-between items-center">
                  <h3 className="text-xl font-serif text-earth">Recent Orders</h3>
                  <Link to="/orders" className="text-[10px] font-bold uppercase text-saffron hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold text-muted uppercase tracking-widest bg-[#faf2e2]/30">
                        <th className="px-8 py-4">Order ID</th>
                        <th className="px-8 py-4">Product</th>
                        <th className="px-8 py-4">Date</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Action</th>
                        <th className="px-8 py-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/5">
                      {orders.slice(0, 5).map((order: any) => (
                        <tr key={order.id} className="text-sm font-medium hover:bg-[#faf2e2]/20 transition-colors">
                          <td className="px-8 py-6 text-earth font-bold">ORD-{order.id.toString().substring(0, 4)}</td>
                          <td className="px-8 py-6 text-muted">{order.items?.[0]?.product?.name || 'Vedic Item'}{order.items?.length > 1 ? ` +${order.items.length - 1}` : ''}</td>
                          <td className="px-8 py-6 text-muted">{new Date(order.created_at).toLocaleDateString()}</td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.status === 'delivered' ? 'bg-forest/10 text-forest' : 'bg-gold/10 text-gold'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <button
                              onClick={() => generateInvoice(order)}
                              className="flex items-center gap-2 px-3 py-1 bg-saffron text-white rounded-full text-[10px] font-bold tracking-wider uppercase hover:shadow-lg transition-all"
                            >
                              <Download size={12} />
                              Invoice
                            </button>
                          </td>
                          <td className="px-8 py-6 text-right text-earth font-bold">₹{order.total_inr.toLocaleString()}</td>

                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-8 py-12 text-center text-muted italic">No orders found yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Booking Section */}
              <section>
                {bookings.length > 0 ? (
                  <div className="card p-8 bg-earth text-[#fdf7ed] relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                      <div className="space-y-4 text-center md:text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Upcoming Consultation</p>
                        <h3 className="text-3xl font-serif">Vedic Astrology Session</h3>
                        <p className="text-[#faf2e2]/70">Tuesday, Feb 20 at 11:30 AM (IST)</p>
                      </div>
                      <div className="flex gap-4">
                        <button className="btn-gold px-8 py-3 text-xs w-full md:w-auto justify-center">Join Zoom</button>
                        <button className="bg-white/10 hover:bg-white/20 transition-all px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/20">Reschedule</button>
                      </div>
                    </div>
                    {/* Decorative Icon */}
                    <div className="absolute -right-8 -bottom-8 text-white/5 opacity-10">
                      <Calendar size={180} />
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)', border: '2px dashed var(--color-gold-light)', borderRadius: '1.5rem' }}>
                    <p className="font-serif text-lg mb-2">No bookings yet.</p>
                    <Link to="/services/personal-consultation" className="btn-primary" style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                      Book a Consultation
                    </Link>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
