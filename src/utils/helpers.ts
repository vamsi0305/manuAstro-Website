/**
 * Utility helpers
 */

/**
 * Format a number as Indian Rupee price
 */
export function formatPrice(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

/**
 * Format date to human-readable string
 */
export function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date)
}

/**
 * Truncate text
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return `${text.substring(0, maxLength)}...`
}

/**
 * Slugify string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .trim()
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Get star rating array for display
 */
export function getStarArray(rating: number): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = []
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) stars.push('full')
        else if (rating >= i - 0.5) stars.push('half')
        else stars.push('empty')
    }
    return stars
}

/**
 * Calculate discount percentage
 */
export function discountPercent(price: number, comparePrice: number): number {
    if (!comparePrice || comparePrice <= price) return 0
    return Math.round(((comparePrice - price) / comparePrice) * 100)
}
