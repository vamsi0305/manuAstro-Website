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
        rating?: number
        badge?: string
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
                <div className="product-img-wrap h-64 relative overflow-hidden bg-[#faf2e2]">
                    <img
                        src={product.thumbnail_url || 'https://images.unsplash.com/photo-1609743522653-52354461eb27?w=600'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <button
                        onClick={handleWishlist}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${isInWishlist ? 'bg-[var(--color-saffron)] text-white shadow-lg' : 'bg-white/80 text-[var(--color-text-muted)] hover:bg-white hover:text-[var(--color-saffron)] shadow-sm'
                            }`}
                    >
                        <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
                    </button>

                    {product.badge && (
                        <div className="absolute top-4 left-4 z-10">
                            <span className="badge-saffron">{product.badge}</span>
                        </div>
                    )}

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
