from sqlalchemy.orm import Session

from app.models.all import Category


DEFAULT_CATEGORY_SEEDS = [
    {
        "name": "Gemstones",
        "slug": "gemstones",
        "description": "Certified gemstones recommended for planetary balance and Vedic remedies.",
    },
    {
        "name": "Rudraksha",
        "slug": "rudraksha",
        "description": "Authentic Nepali and Indonesian Rudraksha beads for spiritual growth and protection.",
    },
    {
        "name": "Yantra",
        "slug": "yantra",
        "description": "Sacred energized Yantras for prosperity, protection, and vastu correction.",
    },
    {
        "name": "Vastu Products",
        "slug": "vastu-products",
        "description": "Vastu tools and remedies to improve harmony in homes and workplaces.",
    },
    {
        "name": "Bracelets & Pendants",
        "slug": "bracelets-pendants",
        "description": "Wearable spiritual accessories including pendants, malas, and healing bracelets.",
    },
    {
        "name": "Puja Essentials",
        "slug": "puja-essentials",
        "description": "Daily ritual items used for energizing, worship, and spiritual practice.",
    },
]


def ensure_default_categories(db: Session) -> list[Category]:
    existing_categories = db.query(Category).all()
    existing_by_slug = {category.slug: category for category in existing_categories}
    created = False

    for seed in DEFAULT_CATEGORY_SEEDS:
        if seed["slug"] not in existing_by_slug:
            db.add(Category(**seed))
            created = True

    if created:
        db.commit()

    return db.query(Category).order_by(Category.name.asc()).all()
