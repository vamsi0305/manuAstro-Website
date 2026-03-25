export interface FallbackProduct {
  id: string
  name: string
  slug: string
  price: number
  compare_price?: number
  image_url?: string
  thumbnail_url?: string
  images?: string[]
  description?: string
  rating?: number
  reviews_count?: number
  category?: { name: string }
  stock?: number
  is_featured?: boolean
}

const items: FallbackProduct[] = [
  {
    id: 'fallback-ruby',
    name: 'Premium Natural Ruby (Manik)',
    slug: 'premium-natural-ruby-manik',
    price: 15000,
    image_url: 'https://manuastro.com/cdn/shop/files/Vedic_Astrology_New_500x500_jpg.jpg?v=1770036692',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/Vedic_Astrology_New_500x500_jpg.jpg?v=1770036692',
    images: ['https://manuastro.com/cdn/shop/files/Vedic_Astrology_New_500x500_jpg.jpg?v=1770036692'],
    description: 'Natural Ruby gemstone for Sun. Enhances leadership, confidence and vitality.',
    category: { name: 'Gemstones' },
    rating: 5,
    reviews_count: 48,
    stock: 10,
    is_featured: true
  },
  {
    id: 'fallback-emerald',
    name: 'Zambian Emerald (Panna)',
    slug: 'zambian-emerald-panna',
    price: 12000,
    image_url: 'https://manuastro.com/cdn/shop/files/Palm_Reading_New_500x500_jpg.jpg?v=1770036747',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/Palm_Reading_New_500x500_jpg.jpg?v=1770036747',
    images: ['https://manuastro.com/cdn/shop/files/Palm_Reading_New_500x500_jpg.jpg?v=1770036747'],
    description: 'Natural Emerald for Mercury. Enhances intelligence, communication and business.',
    category: { name: 'Gemstones' },
    rating: 5,
    reviews_count: 41,
    stock: 8,
    is_featured: true
  },
  {
    id: 'fallback-yellow-sapphire',
    name: 'Ceylon Yellow Sapphire',
    slug: 'ceylon-yellow-sapphire-pukhraj',
    price: 18000,
    image_url: 'https://manuastro.com/cdn/shop/files/Personal_Consultation_New_500x500_jpg.jpg?v=1770036746',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/Personal_Consultation_New_500x500_jpg.jpg?v=1770036746',
    images: ['https://manuastro.com/cdn/shop/files/Personal_Consultation_New_500x500_jpg.jpg?v=1770036746'],
    description: 'Natural Yellow Sapphire for Jupiter. Attracts wealth, wisdom and spiritual growth.',
    category: { name: 'Gemstones' },
    rating: 5,
    reviews_count: 36,
    stock: 5,
    is_featured: true
  },
  {
    id: 'fallback-natural-ruby',
    name: 'Premium Natural Ruby (Manik)',
    slug: 'natural-ruby',
    price: 25000,
    compare_price: 30000,
    image_url: 'https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842',
    images: ['https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842'],
    description: 'A radiant ruby selected for solar strength, confidence, and vitality.',
    category: { name: 'Gemstones' },
    rating: 5,
    reviews_count: 22,
    stock: 4
  },
  {
    id: 'fallback-zambian-emerald',
    name: 'Zambian Emerald (Panna)',
    slug: 'zambian-emerald',
    price: 18000,
    compare_price: 22000,
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyL7hkd9Pi740IrmPzfOhHTKddxz6xbDz2uw&s',
    thumbnail_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyL7hkd9Pi740IrmPzfOhHTKddxz6xbDz2uw&s',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyL7hkd9Pi740IrmPzfOhHTKddxz6xbDz2uw&s'],
    description: 'An elegant emerald selected for Mercury remedies and sharper communication.',
    category: { name: 'Gemstones' },
    rating: 5,
    reviews_count: 19,
    stock: 6
  },
  {
    id: 'fallback-blue-sapphire',
    name: 'Natural Blue Sapphire (Neelam)',
    slug: 'blue-sapphire',
    price: 65000,
    compare_price: 80000,
    image_url: 'https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776',
    images: ['https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776'],
    description: 'Blue Sapphire for Saturn remedies, discipline, and grounded success.',
    category: { name: 'Gemstones' },
    rating: 5,
    reviews_count: 12,
    stock: 2
  },
  {
    id: 'fallback-5m-nepali',
    name: '5 Mukhi Nepali Rudraksha',
    slug: '5-mukhi-nepali-rudraksha',
    price: 1320,
    image_url: 'https://manuastro.com/cdn/shop/files/01_11.jpg?v=1770928893',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/01_11.jpg?v=1770928893',
    images: ['https://manuastro.com/cdn/shop/files/01_11.jpg?v=1770928893'],
    description: 'The most auspicious Rudraksha for health, peace of mind, and overall balance.',
    category: { name: 'Rudraksha' },
    rating: 5,
    reviews_count: 67,
    stock: 40,
    is_featured: true
  },
  {
    id: 'fallback-4m-nepali',
    name: '4 Mukhi Nepali Rudraksha',
    slug: '4-mukhi-nepali-rudraksha',
    price: 1200,
    image_url: 'https://manuastro.com/cdn/shop/files/01_10.jpg?v=1770927798',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/01_10.jpg?v=1770927798',
    images: ['https://manuastro.com/cdn/shop/files/01_10.jpg?v=1770927798'],
    description: 'Supports knowledge, articulation, and creative intelligence.',
    category: { name: 'Rudraksha' },
    rating: 5,
    reviews_count: 31,
    stock: 30
  },
  {
    id: 'fallback-10m-nepali',
    name: '10 Mukhi Nepali Rudraksha',
    slug: '10-mukhi-nepali-rudraksha',
    price: 7150,
    image_url: 'https://manuastro.com/cdn/shop/files/10fr_1.jpg?v=1770986595',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/10fr_1.jpg?v=1770986595',
    images: ['https://manuastro.com/cdn/shop/files/10fr_1.jpg?v=1770986595'],
    description: 'Offers protection from negative influences and deepens spiritual steadiness.',
    category: { name: 'Rudraksha' },
    rating: 5,
    reviews_count: 18,
    stock: 20,
    is_featured: true
  },
  {
    id: 'fallback-gauri-shankar',
    name: 'Gauri Shankar Rudraksha',
    slug: 'gauri-shankar-rudraksha',
    price: 9680,
    image_url: 'https://manuastro.com/cdn/shop/files/GSR.png?v=1770991378',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/GSR.png?v=1770991378',
    images: ['https://manuastro.com/cdn/shop/files/GSR.png?v=1770991378'],
    description: 'A sacred bead symbolizing Shiva-Parvati harmony and relationship balance.',
    category: { name: 'Rudraksha' },
    rating: 5,
    reviews_count: 25,
    stock: 15,
    is_featured: true
  },
  {
    id: 'fallback-gauri-ganesh',
    name: 'Gauri Shankar Ganesh Rudraksha (2.25g)',
    slug: 'gauri-shankar-ganesh-rudraksha',
    price: 65000,
    image_url: 'https://manuastro.com/cdn/shop/files/GSGR.jpg?v=1770991476',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/GSGR.jpg?v=1770991476',
    images: ['https://manuastro.com/cdn/shop/files/GSGR.jpg?v=1770991476'],
    description: 'An elevated form of Rudraksha used for harmony, blessings, and obstacle removal.',
    category: { name: 'Rudraksha' },
    rating: 5,
    reviews_count: 9,
    stock: 3
  },
  {
    id: 'fallback-5m-644',
    name: '5 Mukhi Nepali Rudraksha (6.44g)',
    slug: '5-mukhi-nepali-rudraksha-6-44',
    price: 1320,
    image_url: 'https://manuastro.com/cdn/shop/files/01_12.jpg?v=1770928499',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/01_12.jpg?v=1770928499',
    images: ['https://manuastro.com/cdn/shop/files/01_12.jpg?v=1770928499'],
    description: 'A heavier 5 Mukhi bead suited for well-being, focus, and calm energy.',
    category: { name: 'Rudraksha' },
    rating: 5,
    reviews_count: 15,
    stock: 25
  },
  {
    id: 'fallback-16m',
    name: '16 Mukhi Nepali Rudraksha (2.73g)',
    slug: '16-mukhi-nepali-rudraksha',
    price: 110000,
    image_url: 'https://manuastro.com/cdn/shop/files/16_FACE_1.jpg?v=1770990686',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/16_FACE_1.jpg?v=1770990686',
    images: ['https://manuastro.com/cdn/shop/files/16_FACE_1.jpg?v=1770990686'],
    description: 'A rare protective Rudraksha known for courage, authority, and shielding.',
    category: { name: 'Rudraksha' },
    rating: 5,
    reviews_count: 7,
    stock: 1
  },
  {
    id: 'fallback-15m',
    name: '15 Mukhi Nepali Rudraksha (2.73g)',
    slug: '15-mukhi-nepali-rudraksha',
    price: 45000,
    image_url: 'https://manuastro.com/cdn/shop/files/15_FACE_1.jpg?v=1770990668',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/15_FACE_1.jpg?v=1770990668',
    images: ['https://manuastro.com/cdn/shop/files/15_FACE_1.jpg?v=1770990668'],
    description: 'A bead associated with abundance, emotional grounding, and magnetism.',
    category: { name: 'Rudraksha' },
    rating: 5,
    reviews_count: 11,
    stock: 2
  },
  {
    id: 'fallback-14m',
    name: '14 Mukhi Nepali Rudraksha (2.5g)',
    slug: '14-mukhi-nepali-rudraksha',
    price: 40000,
    image_url: 'https://manuastro.com/cdn/shop/files/14_FACE_1.jpg?v=1770990639',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/14_FACE_1.jpg?v=1770990639',
    images: ['https://manuastro.com/cdn/shop/files/14_FACE_1.jpg?v=1770990639'],
    description: 'Known as Dev Mani, valued for intuition, protection, and decisive strength.',
    category: { name: 'Rudraksha' },
    rating: 5,
    reviews_count: 10,
    stock: 2
  },
  {
    id: 'fallback-13m',
    name: '13 Mukhi Nepali Rudraksha (2.27g)',
    slug: '13-mukhi-nepali-rudraksha',
    price: 21000,
    image_url: 'https://manuastro.com/cdn/shop/files/13_FACE_1.jpg?v=1770990713',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/13_FACE_1.jpg?v=1770990713',
    images: ['https://manuastro.com/cdn/shop/files/13_FACE_1.jpg?v=1770990713'],
    description: 'Supports attraction, confidence, and refined social presence.',
    category: { name: 'Rudraksha' },
    rating: 5,
    reviews_count: 14,
    stock: 4
  },
  {
    id: 'fallback-yantra-copper',
    name: 'Shree Yantra Copper',
    slug: 'shree-yantra-copper',
    price: 950,
    image_url: 'https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876',
    images: ['https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876'],
    description: 'An energized prosperity yantra used for abundance, focus, and spiritual alignment.',
    category: { name: 'Yantra' },
    rating: 5,
    reviews_count: 33,
    stock: 30,
    is_featured: true
  },
  {
    id: 'fallback-surya-yantra',
    name: 'Surya Yantra',
    slug: 'surya-yantra',
    price: 750,
    image_url: 'https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842',
    images: ['https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842'],
    description: 'A yantra for confidence, radiance, and solar vitality.',
    category: { name: 'Yantra' },
    rating: 5,
    reviews_count: 20,
    stock: 25
  },
  {
    id: 'fallback-mangal-yantra',
    name: 'Mangal Yantra',
    slug: 'mangal-yantra',
    price: 850,
    image_url: 'https://manuastro.com/cdn/shop/files/Mangal_Yantra.jpg?v=1765298377',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/Mangal_Yantra.jpg?v=1765298377',
    images: ['https://manuastro.com/cdn/shop/files/Mangal_Yantra.jpg?v=1765298377'],
    description: 'A Mars yantra used for courage, action, and resolving Mangal Dosha remedies.',
    category: { name: 'Yantra' },
    rating: 5,
    reviews_count: 18,
    stock: 20,
    is_featured: true
  },
  {
    id: 'fallback-rahu-yantra',
    name: 'Shri Rahu Yantra (3x3 inch)',
    slug: 'shri-rahu-yantra',
    price: 550,
    image_url: 'https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876',
    images: ['https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876'],
    description: 'An energized Rahu yantra for stability, direction, and clarity in challenging phases.',
    category: { name: 'Yantra' },
    rating: 5,
    reviews_count: 16,
    stock: 30
  },
  {
    id: 'fallback-shani-yantra',
    name: 'Shani Yantra (3x3 inch)',
    slug: 'shani-yantra',
    price: 550,
    image_url: 'https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776',
    images: ['https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776'],
    description: 'A yantra for discipline, karmic steadiness, and Saturn balancing.',
    category: { name: 'Yantra' },
    rating: 5,
    reviews_count: 14,
    stock: 24
  },
  {
    id: 'fallback-kuber-yantra',
    name: 'Shri Kuber Yantra (3x3 inch)',
    slug: 'shri-kuber-yantra',
    price: 550,
    image_url: 'https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876',
    images: ['https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876'],
    description: 'A sacred prosperity yantra aligned with wealth, stability, and resource flow.',
    category: { name: 'Yantra' },
    rating: 5,
    reviews_count: 13,
    stock: 18
  },
  {
    id: 'fallback-export-surya',
    name: 'Export Premium Surya Yantra',
    slug: 'export-premium-surya-yantra',
    price: 2100,
    image_url: 'https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842',
    images: ['https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842'],
    description: 'A premium Surya yantra crafted for display, vitality, and focused intention.',
    category: { name: 'Yantra' },
    rating: 5,
    reviews_count: 8,
    stock: 8
  },
  {
    id: 'fallback-export-shani',
    name: 'Export Premium Shani Yantra',
    slug: 'export-premium-shani-yantra',
    price: 2100,
    image_url: 'https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776',
    images: ['https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776'],
    description: 'A premium Shani yantra for disciplined energy, endurance, and karmic balance.',
    category: { name: 'Yantra' },
    rating: 5,
    reviews_count: 8,
    stock: 7
  },
  {
    id: 'fallback-shree-yantra-gold',
    name: 'Shree Yantra Gold Plated',
    slug: 'shree-yantra-gold',
    price: 3500,
    image_url: 'https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842',
    images: ['https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842'],
    description: 'A decorative and sacred Shree Yantra for prosperity, harmony, and focus.',
    category: { name: 'Yantra' },
    rating: 5,
    reviews_count: 11,
    stock: 5
  },
  {
    id: 'fallback-sannidhiya-shani',
    name: 'Sannidhiya Shani Yantra',
    slug: 'sannidhiya-shani-yantra',
    price: 750,
    image_url: 'https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776',
    thumbnail_url: 'https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776',
    images: ['https://manuastro.com/cdn/shop/files/ShaniYantra.jpg?v=1765298776'],
    description: 'A compact Shani yantra for everyday spiritual use and Saturn balance.',
    category: { name: 'Yantra' },
    rating: 5,
    reviews_count: 10,
    stock: 12
  }
]

const bySlug = new Map(items.map((item) => [item.slug, item]))

export function getFallbackProductBySlug(slug: string) {
  return bySlug.get(slug)
}

export const fallbackProducts = items
