import { defineConfig } from 'tailwindcss'

export default defineConfig({
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
                sans: ['"DM Sans"', '"Inter"', 'system-ui', 'sans-serif'],
                accent: ['"Cinzel"', '"Trajan Pro"', 'serif'],
            },
            colors: {
                // Primary — Deep Saffron / Rudraksha Brown
                saffron: {
                    50: '#fff8ec',
                    100: '#ffefd0',
                    200: '#ffdba0',
                    300: '#ffc165',
                    400: '#ffa030',
                    500: '#ff8408',
                    600: '#f06200',
                    700: '#c74500',   // Main CTA
                    800: '#9e3700',
                    900: '#7e2e04',
                },
                // Earthy Brown
                earth: {
                    50: '#fdf6ef',
                    100: '#fbe9d5',
                    200: '#f5d0a9',
                    300: '#eca275', // product cards, accents
                    400: '#e0783d',
                    500: '#c05520',
                    600: '#994015',
                    700: '#7a3012',
                    800: '#642814', // Primary text / headings
                    900: '#4a1c0c',
                },
                // Warm Cream / Parchment backgrounds
                cream: {
                    50: '#fefdfb',
                    100: '#fdf7ed', // page background
                    200: '#f9edd4', // card background
                    300: '#f3ddb3',
                    400: '#e8c88a',
                    500: '#d4a24c',
                },
                // Rudraksha Gold Accent
                gold: {
                    DEFAULT: '#c9972a',
                    light: '#f0c050',
                    dark: '#9a6f10',
                },
                // Deep forest green for authenticity badges
                forest: {
                    DEFAULT: '#3a6b3f',
                    light: '#5a9e62',
                    dark: '#254828',
                },
                // Text and surface
                text: {
                    primary: '#3a1f0d', // deep warm brown
                    secondary: '#6b3f1a',
                    muted: '#9c6e3a',
                    light: '#c9975e',
                },
            },
            backgroundImage: {
                'warm-gradient': 'linear-gradient(135deg, #fff8ec 0%, #fdf3e3 50%, #fceedd 100%)',
                'saffron-gradient': 'linear-gradient(135deg, #c74500 0%, #ff8408 100%)',
                'earth-gradient': 'linear-gradient(135deg, #7a3012 0%, #c05520 100%)',
                'gold-gradient': 'linear-gradient(135deg, #c9972a 0%, #f0c050 100%)',
                'hero-mandala': 'radial-gradient(ellipse at center, rgba(201,151,42,0.12) 0%, transparent 65%)',
            },
            boxShadow: {
                'card': '0 2px 16px rgba(99,44,14,0.10)',
                'card-hover': '0 8px 32px rgba(99,44,14,0.18)',
                'btn': '0 4px 14px rgba(199,69,0,0.30)',
                'btn-gold': '0 4px 14px rgba(201,151,42,0.35)',
                'inner-warm': 'inset 0 1px 0 rgba(255,240,200,0.6)',
            },
            borderRadius: {
                '2xl': '16px',
                '3xl': '24px',
            },
            animation: {
                'float-up': 'floatUp 6s ease-in-out infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
            },
            keyframes: {
                floatUp: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
            },
        },
    },
    plugins: [],
})
