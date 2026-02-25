import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/utils/helpers'

export default function CartSidebar() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, total, couponCode, discount } =
        useCartStore()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60]"
                        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                        onClick={closeCart}
                    />

                    {/* Drawer */}
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md z-[61] flex flex-col"
                        style={{ background: '#12122A', borderLeft: '1px solid rgba(108,63,199,0.3)' }}
                        id="cart-sidebar"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-[#6C3FC7]" />
                                <h2 className="text-lg font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    Your Cart
                                    {items.length > 0 && (
                                        <span className="ml-2 text-sm text-[#00D4FF]">({items.length})</span>
                                    )}
                                </h2>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                id="cart-close-btn"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items */}
                        {items.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                                <ShoppingBag className="w-16 h-16 text-white/20" />
                                <p className="text-center" style={{ color: 'rgba(232,232,255,0.5)' }}>
                                    Your cart is empty
                                </p>
                                <button onClick={closeCart} className="btn-neon text-sm py-2 px-6">
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="glass flex gap-3 p-3"
                                        >
                                            <div
                                                className="w-16 h-16 rounded-lg flex-shrink-0 bg-white/10"
                                                style={{
                                                    backgroundImage: item.product.images?.[0]?.url
                                                        ? `url(${item.product.images[0].url})`
                                                        : undefined,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                                    {item.product.name}
                                                </p>
                                                <p className="text-[#FFB800] text-sm font-bold mt-0.5">
                                                    {formatPrice(item.price)}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                        className="w-6 h-6 rounded border border-white/20 flex items-center justify-center text-xs hover:border-cyan-400 transition-colors"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                        className="w-6 h-6 rounded border border-white/20 flex items-center justify-center text-xs hover:border-cyan-400 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.product_id)}
                                                className="p-1.5 text-red-400/60 hover:text-red-400 transition-colors self-start"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Summary */}
                                <div className="px-6 py-4 border-t border-white/10 space-y-3">
                                    {couponCode && (
                                        <div className="flex justify-between text-sm">
                                            <span style={{ color: 'rgba(232,232,255,0.6)' }}>
                                                Coupon <span className="text-[#00D4FF]">{couponCode}</span>
                                            </span>
                                            <span className="text-green-400">−{formatPrice(discount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span style={{ color: 'rgba(232,232,255,0.6)' }}>Subtotal</span>
                                        <span>{formatPrice(subtotal())}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span className="text-[#FFB800]">{formatPrice(total())}</span>
                                    </div>
                                    <Link
                                        to="/checkout"
                                        onClick={closeCart}
                                        className="btn-neon w-full text-center block py-3"
                                        id="cart-checkout-btn"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                </div>
                            </>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    )
}
