import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, ShoppingCart, Users, Calendar, TrendingUp, Package, MessageSquare, Bell, Loader2 } from 'lucide-react'
import SEOHead from '@/components/SEOHead'
import api from '@/api/axios'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null)
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadAdminData = async () => {
            try {
                const [statsRes, ordersRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/admin/orders')
                ])
                setStats(statsRes.data)
                setOrders(ordersRes.data)
            } catch (err) {
                toast.error('Failed to load administrative data.')
            } finally {
                setLoading(false)
            }
        }
        loadAdminData()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf7ed] gap-4">
                <Loader2 className="w-12 h-12 text-saffron animate-spin" />
                <p className="font-serif text-earth">Consulting the Records...</p>
            </div>
        )
    }

    const ADMIN_STATS = [
        { label: 'Total Revenue', val: `₹${stats?.total_revenue?.toLocaleString() || '0'}`, change: 'Live', icon: <TrendingUp size={20} />, color: 'text-forest' },
        { label: 'Total Customers', val: stats?.total_users || '0', change: 'Live', icon: <Users size={20} />, color: 'text-saffron' },
        { label: 'Pending Bookings', val: stats?.pending_bookings || '0', change: 'Alert', icon: <Calendar size={20} />, color: 'text-gold' }
    ]
    return (
        <div className="bg-[#fdf7ed] min-h-screen pt-24 pb-20">
            <SEOHead title="Admin Dashboard" description="ManuAstro Internal Administration Panel." />
            <div className="container">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-serif text-earth mb-2">Admin Dashboard</h1>
                        <p className="text-sm text-muted">Auspicious greetings, Administrator. Here is today's overview.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="w-12 h-12 bg-white rounded-xl border border-gold/10 flex items-center justify-center text-muted relative hover:border-saffron transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-saffron rounded-full" />
                        </button>
                        <button className="btn-primary px-8">Export Report</button>
                    </div>
                </div>

                {/* Top Stats */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {ADMIN_STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="card p-8 bg-white border-2 border-gold/10 group hover:border-saffron/30 transition-all"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-gold/10 rounded-xl text-gold group-hover:bg-saffron/10 group-hover:text-saffron transition-all">
                                    {stat.icon}
                                </div>
                                <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
                            </div>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-4xl font-serif text-earth">{stat.val}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-[1fr_350px] gap-8">
                    {/* Recent Massive Activity */}
                    <div className="space-y-8">
                        <section className="card bg-white border-2 border-gold/10 overflow-hidden">
                            <div className="px-8 py-6 bg-[#faf2e2] border-b border-gold/10">
                                <h3 className="text-xl font-serif text-earth">New Orders</h3>
                            </div>
                            <div className="p-0 overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-bold text-muted uppercase tracking-widest border-b border-gold/5">
                                            <th className="px-8 py-4">Customer</th>
                                            <th className="px-8 py-4">Item</th>
                                            <th className="px-8 py-4 text-right">Payment</th>
                                            <th className="px-8 py-4 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gold/5">
                                        {orders.slice(0, 5).map(order => (
                                            <tr key={order.id} className="text-sm">
                                                <td className="px-8 py-6">
                                                    <p className="font-bold text-earth">{order.user_email || `ORD-${order.id}`}</p>
                                                    <p className="text-[10px] text-muted">{new Date(order.created_at).toLocaleString()}</p>
                                                </td>
                                                <td className="px-8 py-6 font-medium text-muted">
                                                    {order.items?.length} {order.items?.length === 1 ? 'Item' : 'Items'}
                                                </td>
                                                <td className="px-8 py-6 text-right font-bold text-forest uppercase">
                                                    {order.status}
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <button className="text-xs font-bold text-saffron uppercase hover:underline">Manage</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {orders.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="px-8 py-12 text-center text-muted italic">No orders found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* System Logs / Notifications */}
                        <section className="card p-8 bg-white border-2 border-gold/10">
                            <h3 className="text-xl font-serif text-earth mb-8">System Activity</h3>
                            <div className="space-y-6">
                                {[
                                    { type: 'Service', msg: 'New Blog Post: "Importance of 7 Mukhi" published.', time: '1h ago' },
                                    { type: 'Alert', msg: 'Stock for "Natural Emerald" is running low (2 left).', time: '3h ago' },
                                    { type: 'User', msg: 'Admin User "Sanjay" logged in from new device.', time: '5h ago' }
                                ].map((log, i) => (
                                    <div key={i} className="flex gap-4 items-start pb-4 border-b border-gold/5 last:border-0">
                                        <div className="w-2 h-2 rounded-full bg-gold mt-1.5" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-earth">{log.msg}</p>
                                            <span className="text-[10px] text-muted uppercase font-bold">{log.type} • {log.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Quick Actions Sidebar */}
                    <aside className="space-y-8">
                        <div className="card p-8 bg-earth text-[#faf2e2]">
                            <h3 className="text-xl font-serif mb-8 border-b border-white/10 pb-4">Quick Management</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: <Package size={18} />, label: 'Add New Product' },
                                    { icon: <MessageSquare size={18} />, label: 'Manage Blogs' },
                                    { icon: <Calendar size={18} />, label: 'Update Schedule' },
                                    { icon: <LayoutDashboard size={18} />, label: 'Settings' }
                                ].map((btn, i) => (
                                    <button key={i} className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">
                                        <span className="text-gold">{btn.icon}</span>
                                        {btn.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="card p-8 bg-white border-2 border-gold/10">
                            <h3 className="text-xl font-serif text-earth mb-6">Database Health</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-muted">API Connection</span>
                                    <span className="text-forest flex items-center gap-2"><div className="w-2 h-2 bg-forest rounded-full animate-pulse" /> Stable</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-muted">Database Latency</span>
                                    <span className="text-gold">42ms</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
