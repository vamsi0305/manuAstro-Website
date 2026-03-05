import { Navigate, type RouteObject } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { useAuthStore } from '@/stores/authStore'

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/Home'))
const ShopPage = lazy(() => import('@/pages/Shop/ShopPage'))
const CategoryPage = lazy(() => import('@/pages/Shop/CategoryPage'))
const ProductDetail = lazy(() => import('@/pages/Shop/ProductDetail'))
const CartPage = lazy(() => import('@/pages/Shop/CartPage'))
const WishlistPage = lazy(() => import('@/pages/Wishlist'))
const CheckoutPage = lazy(() => import('@/pages/Shop/CheckoutPage'))
const Horoscope = lazy(() => import('@/pages/Horoscope'))
const BlogList = lazy(() => import('@/pages/Blog/BlogList'))
const BlogDetail = lazy(() => import('@/pages/Blog/BlogDetail'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const Login = lazy(() => import('@/pages/Auth/Login'))
const Register = lazy(() => import('@/pages/Auth/Register'))
const UserDashboard = lazy(() => import('@/pages/Dashboard/UserDashboard'))
const AdminDashboard = lazy(() => import('@/pages/Dashboard/AdminDashboard'))

// Asset Pages
const Gemstones = lazy(() => import('@/pages/Gemstones'))
const RudrakshaList = lazy(() => import('@/pages/Rudraksha/RudrakshaList'))
const YantraList = lazy(() => import('@/pages/Yantra/YantraList'))

// Service pages
const VedicAstrology = lazy(() => import('@/pages/Services/VedicAstrology'))
const PalmReading = lazy(() => import('@/pages/Services/PalmReading'))
const PersonalConsultation = lazy(() => import('@/pages/Services/PersonalConsultation'))
const Vaastu = lazy(() => import('@/pages/Services/Vaastu'))
const CorporatePrograms = lazy(() => import('@/pages/Services/CorporatePrograms'))
const FaceReading = lazy(() => import('@/pages/Services/FaceReading'))

// Policy pages
const Privacy = lazy(() => import('@/pages/policies/Privacy'))
const Terms = lazy(() => import('@/pages/policies/Terms'))
const Shipping = lazy(() => import('@/pages/policies/Shipping'))
const Refund = lazy(() => import('@/pages/policies/Refund'))

const Loading = () => (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="w-10 h-10 border-2 border-[var(--color-gold)]/20 border-t-[var(--color-saffron)] rounded-full animate-spin" />
    </div>
)

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    if (!isAuthenticated) return <Navigate to="/login" replace />
    return <>{children}</>
}

function AdminRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useAuthStore()
    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (user?.role !== 'admin') return <Navigate to="/" replace />
    return <>{children}</>
}

function S({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export const routes: RouteObject[] = [
    { path: '/', element: <S><Home /></S> },
    {
        path: '/services',
        children: [
            { path: 'vedic-astrology', element: <S><VedicAstrology /></S> },
            { path: 'palm-reading', element: <S><PalmReading /></S> },
            { path: 'personal-consultation', element: <S><PersonalConsultation /></S> },
            { path: 'vaastu', element: <S><Vaastu /></S> },
            { path: 'corporate-programs', element: <S><CorporatePrograms /></S> },
            { path: 'face-reading', element: <S><FaceReading /></S> },
        ],
    },
    { path: '/shop', element: <S><ShopPage /></S> },
    { path: '/shop/category/:category', element: <S><CategoryPage /></S> },
    { path: '/shop/:slug', element: <S><ProductDetail /></S> },
    { path: '/gemstones', element: <S><Gemstones /></S> },
    { path: '/rudraksha', element: <S><RudrakshaList /></S> },
    { path: '/yantra', element: <S><YantraList /></S> },
    { path: '/cart', element: <S><CartPage /></S> },
    { path: '/wishlist', element: <S><WishlistPage /></S> },
    {
        path: '/checkout',
        element: <ProtectedRoute><S><CheckoutPage /></S></ProtectedRoute>,
    },
    { path: '/horoscope', element: <S><Horoscope /></S> },
    { path: '/blog', element: <S><BlogList /></S> },
    { path: '/blog/:slug', element: <S><BlogDetail /></S> },
    { path: '/gallery', element: <S><Gallery /></S> },
    { path: '/about', element: <S><About /></S> },
    { path: '/contact', element: <S><Contact /></S> },
    { path: '/pricing', element: <S><Pricing /></S> },
    { path: '/login', element: <S><Login /></S> },
    { path: '/register', element: <S><Register /></S> },
    { path: '/privacy', element: <S><Privacy /></S> },
    { path: '/terms', element: <S><Terms /></S> },
    { path: '/shipping', element: <S><Shipping /></S> },
    { path: '/refund', element: <S><Refund /></S> },
    {
        path: '/dashboard',
        element: <ProtectedRoute><S><UserDashboard /></S></ProtectedRoute>,
    },
    {
        path: '/admin',
        element: <AdminRoute><S><AdminDashboard /></S></AdminRoute>,
    },
    { path: '*', element: <Navigate to="/" replace /> },
]
