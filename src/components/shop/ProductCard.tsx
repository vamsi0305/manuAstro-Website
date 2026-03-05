import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { motion } from 'framer-motion'

interface ProductProps {
    product: {
        id: string
        name: string
        slug: string
        price: number
        compare_price?: number
        thumbnail_url?: string
        fallback_url?: string
        rating?: number
        badge?: string
        planet?: string
    }
}

export default function ProductCard({ product }: ProductProps) {
    const addItem = useCartStore((s) => s.addItem)
    const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore()

    const isInWishlist = wishlistItems.some((item) => item.id === product.id)

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        if (isInWishlist) {
            removeFromWishlist(product.id)
        } else {
            addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.thumbnail_url || '',
                slug: product.slug,
                compare_price: product.compare_price
            })
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card group overflow-hidden"
        >
            <Link to={`/shop/${product.slug}`} className="block">
                <div style={{
                    borderRadius: '1rem 1rem 0 0',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '220px',
                    background: 'var(--color-bg-secondary)'
                }}>
                    <img
                        src={product.thumbnail_url}
                        alt={product.name}
                        style={{
                            width: '100%',
                            height: '220px',
                            objectFit: 'cover',
                            display: 'block',
                            borderRadius: '1rem 1rem 0 0'
                        }}
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src = product.fallback_url || 'https://images.unsplash.com/photo-1604423043492-41b6d3e9eff3?w=400&h=300&fit=crop';
                        }}
                    />
                    {/* Planet badge top-left */}
                    {product.planet && (
                        <span style={{
                            position: 'absolute', top: '0.75rem', left: '0.75rem',
                            background: 'var(--color-saffron)', color: 'white',
                            fontSize: '0.7rem', fontWeight: 600,
                            padding: '0.2rem 0.6rem', borderRadius: '1rem',
                            fontFamily: 'var(--font-accent)', letterSpacing: '0.05em'
                        }}>
                            {product.planet}
                        </span>
                    )}
                    {/* Badge top-left (fallback for general badges) */}
                    {!product.planet && product.badge && (
                        <span style={{
                            position: 'absolute', top: '0.75rem', left: '0.75rem',
                            background: 'var(--color-saffron)', color: 'white',
                            fontSize: '0.7rem', fontWeight: 600,
                            padding: '0.2rem 0.6rem', borderRadius: '1rem',
                            fontFamily: 'var(--font-accent)', letterSpacing: '0.05em'
                        }}>
                            {product.badge}
                        </span>
                    )}
                    {/* Wishlist heart top-right */}
                    <button onClick={handleWishlist} style={{
                        position: 'absolute', top: '0.75rem', right: '0.75rem',
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'rgba(255,249,242,0.9)',
                        border: '1px solid var(--color-border)',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', cursor: 'pointer',
                        color: isInWishlist ? 'var(--color-saffron)' : 'var(--color-text-muted)'
                    }}>
                        <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} />
                    </button>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </Link>

            <div className="p-6">
                <Link to={`/shop/${product.slug}`}>
                    <h3 className="font-serif text-lg mb-2 text-[var(--color-earth)] line-clamp-1 group-hover:text-[var(--color-saffron)] transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 mb-3">
                    <div className="stars flex text-[var(--color-gold)]">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < (product.rating || 5) ? "currentColor" : "none"}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-[var(--color-text-muted)]">({product.rating || 5}.0)</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-[var(--color-gold)]">
                            ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.compare_price && (
                            <span className="text-xs text-[var(--color-text-muted)] line-through">
                                ₹{product.compare_price.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => addItem({ ...product as any, quantity: 1 })}
                        className="btn-primary px-4 py-2 text-xs"
                    >
                        <ShoppingCart size={14} /> Add
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
