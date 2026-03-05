import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistItem {
    id: string
    name: string
    price: number
    image: string
    slug: string
    compare_price?: number
}

interface WishlistState {
    items: WishlistItem[]
    addItem: (item: WishlistItem) => void
    removeItem: (id: string) => void
    clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (item) =>
                set((state) => ({
                    items: state.items.some((i) => i.id === item.id)
                        ? state.items
                        : [...state.items, item],
                })),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                })),
            clearWishlist: () => set({ items: [] }),
        }),
        { name: 'wishlist-storage' }
    )
)
