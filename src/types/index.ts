export interface User {
    id: string
    name: string
    email: string
    phone?: string
    dob?: string
    birth_time?: string
    birth_place?: string
    role: 'user' | 'admin'
    avatar_url?: string
    is_active: boolean
    created_at: string
}

export interface AuthTokens {
    access_token: string
    refresh_token: string
    token_type: string
}

export interface LoginData {
    email: string
    password: string
}

export interface RegisterData {
    name: string
    email: string
    password: string
    phone?: string
}

export interface Category {
    id: string
    name: string
    slug: string
    image_url?: string
    description?: string
    parent_id?: string
    sort_order: number
}

export interface ProductImage {
    id: string
    url: string
    alt?: string
    is_primary: boolean
    sort_order: number
}

export interface Review {
    id: string
    product_id: string
    user_id: string
    user_name: string
    rating: number
    comment?: string
    is_verified: boolean
    created_at: string
}

export interface Product {
    id: string
    name: string
    slug: string
    description: string
    short_desc?: string
    price: number
    compare_price?: number
    stock: number
    category_id: string
    category?: Category
    images: ProductImage[]
    reviews?: Review[]
    avg_rating?: number
    review_count?: number
    mukhi_count?: number
    material?: string
    weight?: number
    is_active: boolean
    is_featured: boolean
    sort_order: number
    created_at: string
}

export interface CartItem {
    id: string
    product_id: string
    product: Product
    quantity: number
    price: number
}

export interface Cart {
    items: CartItem[]
    subtotal: number
    discount: number
    total: number
    coupon_code?: string
}

export interface ShippingAddress {
    full_name: string
    phone: string
    address_line1: string
    address_line2?: string
    city: string
    state: string
    pincode: string
}

export interface Order {
    id: string
    user_id: string
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    total_inr: number
    shipping_address: ShippingAddress
    payment_status: 'pending' | 'submitted' | 'confirmed' | 'failed'
    tracking_id?: string
    items: OrderItem[]
    created_at: string
}

export interface OrderItem {
    id: string
    order_id: string
    product_id: string
    product: Product
    quantity: number
    price_at_time: number
}

export interface Booking {
    id: string
    user_id: string
    consultation_type_id: string
    consultation_type?: ConsultationType
    scheduled_at: string
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    notes?: string
    payment_status: 'pending' | 'paid'
    created_at: string
}

export interface ConsultationType {
    id: string
    name: string
    duration_min: number
    price_inr: number
    service_id: string
}

export interface Service {
    id: string
    title: string
    slug: string
    description: string
    icon: string
    image_url?: string
    consultation_types?: ConsultationType[]
    is_active: boolean
}

export interface Blog {
    id: string
    title: string
    slug: string
    content: string
    excerpt?: string
    thumbnail_url?: string
    author_id: string
    author_name?: string
    category_id: string
    category?: BlogCategory
    status: 'draft' | 'published'
    published_at?: string
    tags: string[]
}

export interface BlogCategory {
    id: string
    name: string
    slug: string
}

export interface Testimonial {
    id: string
    name: string
    role?: string
    description: string
    avatar_url?: string
    rating: number
    is_active: boolean
    is_featured: boolean
    sort_order: number
}

export interface FAQ {
    id: string
    question: string
    answer: string
    category?: string
    sort_order: number
}

export interface GalleryImage {
    id: string
    url: string
    caption?: string
    category?: string
    sort_order: number
}

export interface Horoscope {
    id: string
    sign: ZodiacSign
    content: string
    lucky_color?: string
    lucky_number?: number
    period: 'daily' | 'weekly' | 'monthly' | 'yearly'
    created_by_admin: string
}

export type ZodiacSign =
    | 'aries' | 'taurus' | 'gemini' | 'cancer'
    | 'leo' | 'virgo' | 'libra' | 'scorpio'
    | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    per_page: number
    total_pages: number
}

export interface ApiResponse<T> {
    data: T
    message: string
    status: string
}
