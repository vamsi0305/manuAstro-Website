const API_ORIGIN = new URL(import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1').origin

export function resolveAssetUrl(url?: string) {
  if (!url) {
    return ''
  }

  if (/^https?:\/\//i.test(url) || url.startsWith('blob:') || url.startsWith('data:')) {
    return url
  }

  return `${API_ORIGIN}${url.startsWith('/') ? url : `/${url}`}`
}

export const FALLBACK_PRODUCT_IMAGE = 'https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311'
