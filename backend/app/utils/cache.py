from cachetools import TTLCache

products_cache = TTLCache(maxsize=100, ttl=300)   # 5 min
blogs_cache = TTLCache(maxsize=50, ttl=300)
categories_cache = TTLCache(maxsize=20, ttl=600)  # 10 min


def invalidate_products_cache():
    products_cache.clear()


def invalidate_blogs_cache():
    blogs_cache.clear()
