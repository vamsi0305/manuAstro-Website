from slowapi import Limiter
from slowapi.util import get_remote_address

# Use a more permissive rate limiter for local development
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["100/minute", "1000/hour"]
)
