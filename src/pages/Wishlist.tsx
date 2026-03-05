import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import api from '@/api/axios'
import SEOHead from '@/components/SEOHead'

const WishlistCard = ({ product, onRemove }: { product: any, onRemove: (id: number) => void }) => {
    const handleAddToCart = async () => {
        try {
            await api.post('/cart/items', { product_id: product.id, quantity: 1 })
            onRemove(product.id)
        } catch (err) {
            console.error('Add to cart failed', err)
        }
    }

    return (
        <div className="card" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
            {/* Remove from wishlist button */}
            <button
                onClick={() => onRemove(product.id)}
                style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    zIndex: 2,
                    width: '32px', height: '32px',
                    borderRadius: '50%',
                    background: 'white',
                    border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                <Heart size={16} fill="var(--color-saffron)" color="var(--color-saffron)" />
            </button>

            {/* Product image */}
            <Link to={`/shop/${product.slug}`}>
                <img
                    src={product.image || product.thumbnail_url}
                    alt={product.name}
                    style={{
                        width: '100%', height: '200px',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            </Link>

            {/* Product info */}
            <div style={{ padding: '1rem' }}>
                <Link to={`/shop/${product.slug}`}>
                    <h3 className="font-serif" style={{
                        fontSize: '1rem',
                        color: 'var(--color-earth)',
                        marginBottom: '0.25rem'
                    }}>{product.name}</h3>
                </Link>
                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '0.8rem',
                    marginBottom: '0.75rem'
                }}>{product.category}</p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.1rem',
                        color: 'var(--color-gold)',
                        fontWeight: 700
                    }}>₹{product.price?.toLocaleString('en-IN')}</span>
                    <button
                        onClick={handleAddToCart}
                        className="btn-primary"
                        style={{ padding: '0.4rem 0.875rem', fontSize: '0.8rem' }}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadWishlist = async () => {
            try {
                const { data } = await api.get('/wishlist')
                setWishlistItems(data)
            } catch (err) {
                console.error('Wishlist load failed', err)
            } finally {
                setLoading(false)
            }
        }
        loadWishlist()
    }, [])

    const handleRemove = async (productId: number) => {
        try {
            await api.delete(`/wishlist/${productId}`)
            setWishlistItems(prev => prev.filter(item => item.product_id !== productId))
        } catch (err) {
            console.error('Remove failed', err)
        }
    }

    const count = wishlistItems.length

    return (
        <div className="bg-[#fdf7ed] min-h-screen">
            <SEOHead title="My Wishlist" description="View and manage your saved sacred items. Keep track of the gemstones, rudraksha, and yantras you resonate with." />
            {/* 1. Hero Section */}
            <section className="section" style={{ paddingBottom: '2rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.75rem',
                            letterSpacing: '0.15em',
                            color: 'var(--color-saffron)',
                            display: 'block',
                            marginBottom: '0.75rem'
                        }}>MY COLLECTION</span>
                        <h1 className="font-serif" style={{
                            fontSize: '2.5rem',
                            color: 'var(--color-earth)',
                            marginBottom: '1rem'
                        }}>My Wishlist</h1>
                        <div style={{
                            width: '50px', height: '3px',
                            background: 'var(--color-gold)',
                            margin: '0 auto'
                        }} />
                        <p style={{
                            color: 'var(--color-text-muted)',
                            marginTop: '1rem',
                            fontSize: '0.95rem'
                        }}>{count} saved {count === 1 ? 'item' : 'items'}</p>
                    </div>
                </div>
            </section>

            {count === 0 ? (
                /* 2. Empty State */
                <section className="section" style={{ paddingTop: '0' }}>
                    <div className="container">
                        <div className="card" style={{
                            maxWidth: '500px',
                            margin: '0 auto',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            gap: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                width: '80px', height: '80px',
                                borderRadius: '50%',
                                border: '2px solid var(--color-gold)',
                                background: 'var(--color-bg-card)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Heart size={32} color="var(--color-saffron)" />
                            </div>
                            <h2 className="font-serif" style={{
                                fontSize: '1.5rem',
                                color: 'var(--color-earth)'
                            }}>Your wishlist is empty</h2>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                Save your favourite gemstones, rudraksha, and yantras here
                            </p>
                            <Link to="/shop" className="btn-primary">Explore Products</Link>
                        </div>
                    </div>
                </section>
            ) : (
                /* 3. Wishlist Grid */
                <section className="section" style={{ paddingTop: '0' }}>
                    <div className="container">
                        {/* Top bar */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '2rem'
                        }}>
                            <span style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '0.9rem'
                            }}>{count} {count === 1 ? 'item' : 'items'} saved</span>
                        </div>

                        {/* Products grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '1.5rem' }}>
                            {wishlistItems.map((item: any) => (
                                <WishlistCard
                                    key={item.id}
                                    product={{ ...item.product, id: item.product_id }}
                                    onRemove={handleRemove}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 5. Bottom CTA Section */}
            <section className="section">
                <div className="container">
                    <div className="card" style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        padding: '3rem 2rem',
                        textAlign: 'center'
                    }}>
                        <h2 className="font-serif" style={{
                            fontSize: '1.75rem',
                            color: 'var(--color-earth)',
                            marginBottom: '0.5rem'
                        }}>Need Help Choosing?</h2>
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            marginBottom: '1.5rem'
                        }}>Our expert astrologer can guide you to the right gemstone or rudraksha based on your birth chart.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/services/personal-consultation" className="btn-primary">Book Consultation</Link>
                            <Link to="/shop" className="btn-outline">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
