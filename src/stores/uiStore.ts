import { create } from 'zustand'

interface UIState {
    mobileMenuOpen: boolean
    searchOpen: boolean
    activeModal: string | null

    openMobileMenu: () => void
    closeMobileMenu: () => void
    toggleMobileMenu: () => void
    openSearch: () => void
    closeSearch: () => void
    openModal: (name: string) => void
    closeModal: () => void
}

export const useUIStore = create<UIState>()((set) => ({
    mobileMenuOpen: false,
    searchOpen: false,
    activeModal: null,

    openMobileMenu: () => set({ mobileMenuOpen: true }),
    closeMobileMenu: () => set({ mobileMenuOpen: false }),
    toggleMobileMenu: () =>
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
    openSearch: () => set({ searchOpen: true }),
    closeSearch: () => set({ searchOpen: false }),
    openModal: (name) => set({ activeModal: name }),
    closeModal: () => set({ activeModal: null }),
}))
