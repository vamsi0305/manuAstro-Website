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
                        className="fixed right-0 top-0 h-full w-full max-w-md z-[61] flex flex-col shadow-2xl"
                        style={{ background: 'var(--color-bg-card)', borderLeft: '1px solid var(--color-border)' }}
                        id="cart-sidebar"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-[var(--color-saffron)]" />
                                <h2 className="text-lg font-serif font-semibold text-[var(--color-earth)]">
                                    Your Cart
                                    {items.length > 0 && (
                                        <span className="ml-2 text-sm text-[var(--color-gold)]">({items.length})</span>
                                    )}
                                </h2>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors text-[var(--color-text-primary)]"
                                id="cart-close-btn"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items */}
                        {items.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 bg-[var(--color-bg-card)]">
                                <ShoppingBag className="w-16 h-16 text-[var(--color-text-muted)] opacity-20" />
                                <p className="text-center text-[var(--color-text-muted)]">
                                    Your cart is empty
                                </p>
                                <button onClick={closeCart} className="btn-gold text-sm py-2 px-6">
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[var(--color-bg-card)]">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="card flex gap-3 p-3 bg-white"
                                        >
                                            <div
                                                className="w-16 h-16 rounded-lg flex-shrink-0 bg-[var(--color-bg-secondary)] border border-[var(--color-border-light)]"
                                                style={{
                                                    backgroundImage: item.product.images?.[0]
                                                        ? `url(${item.product.images[0]})`
                                                        : undefined,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[var(--color-text-primary)] truncate font-serif">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-[var(--color-gold)] text-sm font-bold mt-0.5">
                                                    {formatPrice(item.price)}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                        className="w-6 h-6 rounded border border-[var(--color-border)] flex items-center justify-center text-xs text-[var(--color-text-primary)] hover:border-[var(--color-saffron)] transition-colors"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="text-sm w-6 text-center text-[var(--color-text-primary)]">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                        className="w-6 h-6 rounded border border-[var(--color-border)] flex items-center justify-center text-xs text-[var(--color-text-primary)] hover:border-[var(--color-saffron)] transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.product_id)}
                                                className="p-1.5 text-[var(--color-saffron)]/60 hover:text-[var(--color-saffron)] transition-colors self-start"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Summary */}
                                <div className="px-6 py-4 border-t border-[var(--color-border)] space-y-3 bg-[var(--color-bg)]">
                                    {couponCode && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[var(--color-text-muted)]">
                                                Coupon <span className="text-[var(--color-saffron)]">{couponCode}</span>
                                            </span>
                                            <span className="text-forest">−{formatPrice(discount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--color-text-muted)]">Subtotal</span>
                                        <span className="text-[var(--color-text-primary)]">{formatPrice(subtotal())}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span className="text-[var(--color-text-primary)]">Total</span>
                                        <span className="text-[var(--color-gold)] font-bold text-lg">{formatPrice(total())}</span>
                                    </div>
                                    <Link
                                        to="/checkout"
                                        onClick={closeCart}
                                        className="btn-primary w-full text-center block py-3"
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
