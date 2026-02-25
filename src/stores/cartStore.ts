import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartState {
    items: CartItem[]
    couponCode: string | null
    discount: number
    isOpen: boolean

    addItem: (product: Product, quantity?: number) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    applyCoupon: (code: string, discount: number) => void
    removeCoupon: () => void
    toggleCart: () => void
    openCart: () => void
    closeCart: () => void

    // Computed
    itemCount: () => number
    subtotal: () => number
    total: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            couponCode: null,
            discount: 0,
            isOpen: false,

            addItem: (product, quantity = 1) => {
                set((state) => {
                    const existing = state.items.find((i) => i.product_id === product.id)
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.product_id === product.id
                                    ? { ...i, quantity: i.quantity + quantity }
                                    : i
                            ),
                        }
                    }
                    const newItem: CartItem = {
                        id: `${product.id}-${Date.now()}`,
                        product_id: product.id,
                        product,
                        quantity,
                        price: product.price,
                    }
                    return { items: [...state.items, newItem], isOpen: true }
                })
            },

            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((i) => i.product_id !== productId),
                })),

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId)
                    return
                }
                set((state) => ({
                    items: state.items.map((i) =>
                        i.product_id === productId ? { ...i, quantity } : i
                    ),
                }))
            },

            clearCart: () =>
                set({ items: [], couponCode: null, discount: 0, isOpen: false }),

            applyCoupon: (code, discount) =>
                set({ couponCode: code, discount }),

            removeCoupon: () =>
                set({ couponCode: null, discount: 0 }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
            subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
            total: () => {
                const sub = get().subtotal()
                const disc = get().discount
                return Math.max(0, sub - disc)
            },
        }),
        {
            name: 'manuastro-cart',
            partialize: (state: CartState) => ({
                items: state.items,
                couponCode: state.couponCode,
                discount: state.discount,
            }),
        }
    )
)
