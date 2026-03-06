import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine, Base
from app.models.all import User, Product, Category, Coupon, Blog

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # COUPONS
    coupons_data = [
        {
            "code": "WELCOME10",
            "discount_type": "percentage",
            "discount_value": 10,
            "min_order": 0,
            "max_uses": 1000
        },
        {
            "code": "ASTRO20",
            "discount_type": "percentage",
            "discount_value": 20,
            "min_order": 999,
            "max_uses": 500
        },
        {
            "code": "FLAT500",
            "discount_type": "flat",
            "discount_value": 500,
            "min_order": 2000,
            "max_uses": 200
        },
    ]

    for c in coupons_data:
        exists = db.query(Coupon).filter(Coupon.code == c["code"]).first()
        if not exists:
            db.add(Coupon(**c))
            print(f"Coupon seeded: {c['code']}")

    # BLOGS
    blogs_data = [
        {
            "title": "How to Choose the Right Gemstone for Your Zodiac Sign",
            "slug": "choose-gemstone-zodiac-sign",
            "excerpt": "A complete guide to selecting gemstones based on your birth chart and planetary positions.",
            "content": """Gemstones have been used in Vedic astrology for thousands of years to harness planetary energies. Each planet in your birth chart corresponds to a specific gemstone that can amplify its positive effects.

The Sun is represented by Ruby (Manik), which enhances leadership, confidence, and vitality. Those with a strong Sun placement benefit greatly from wearing a natural Ruby on their ring finger.

The Moon governs Pearl (Moti), which promotes emotional balance, intuition, and mental peace. Pearl is particularly beneficial for those experiencing anxiety or emotional turbulence.

Mars corresponds to Red Coral (Moonga), which boosts energy, courage, and determination. Athletes and entrepreneurs often benefit from wearing Red Coral.

Mercury is associated with Emerald (Panna), enhancing communication, intelligence, and business acumen. Writers, teachers, and businesspeople benefit from this vibrant green stone.

Jupiter, the planet of wisdom and prosperity, is represented by Yellow Sapphire (Pukhraj). This powerful stone attracts wealth, wisdom, and spiritual growth.

Venus governs Diamond and White Sapphire, enhancing beauty, love, and artistic abilities. These stones are beneficial for those in creative fields.

Saturn corresponds to Blue Sapphire (Neelam), one of the most powerful gemstones in Vedic astrology. It must be worn only after proper astrological consultation.

Rahu is associated with Hessonite (Gomed), which helps navigate confusion and gain clarity in life decisions.

Ketu corresponds to Cat's Eye (Lehsunia), which provides spiritual protection and helps overcome past karma.

Always consult a qualified Vedic astrologer before wearing any gemstone, as the wrong stone can have adverse effects.""",
            "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=400&fit=crop",
            "tags": "gemstones,zodiac,astrology,vedic",
            "author": "Er. Manu Gupta"
        },
        {
            "title": "The Power of Rudraksha: Benefits and How to Wear Them",
            "slug": "power-of-rudraksha-benefits",
            "excerpt": "Discover the spiritual and healing benefits of different Rudraksha beads and the correct way to wear them.",
            "content": """Rudraksha beads are sacred seeds from the Elaeocarpus ganitrus tree, found primarily in Nepal and Indonesia. In Sanskrit, Rudraksha means the eye of Lord Shiva, and these beads have been worn by yogis and spiritual seekers for thousands of years.

The number of facets (mukhis) on a Rudraksha determines its properties and ruling deity.

1 Mukhi Rudraksha represents Lord Shiva himself and is the most powerful and rare bead. It bestows liberation, supreme consciousness, and destroys all sins. Genuine 1 Mukhi Rudraksha from Nepal is extremely rare and valuable.

5 Mukhi Rudraksha is the most common and suitable for everyone. It represents Lord Shiva in his Kalagni form and helps with health, peace of mind, and overall well-being.

7 Mukhi Rudraksha is ruled by Goddess Mahalakshmi and attracts wealth, prosperity, and good fortune. It is ideal for businesspeople and those seeking financial growth.

Gauri Shankar Rudraksha consists of two naturally joined Rudrakshas representing the union of Shiva and Parvati. It enhances relationships, family harmony, and marital bliss.

How to Wear Rudraksha:
First, the Rudraksha must be energised through proper Vedic rituals by a qualified priest or astrologer. It should be strung in red or gold thread or mounted in silver or gold. The bead should touch your skin to be effective. Monday is the most auspicious day to begin wearing Rudraksha. Remove before attending funerals or engaging in intimate activities.

Care instructions: Clean regularly with clean water and apply sandalwood oil occasionally to maintain lustre and energy.""",
            "image_url": "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&h=400&fit=crop",
            "tags": "rudraksha,spiritual,healing,shiva",
            "author": "Er. Manu Gupta"
        },
        {
            "title": "Vastu Shastra Basics: Aligning Your Home with Cosmic Energy",
            "slug": "vastu-shastra-basics-home",
            "excerpt": "Learn the fundamental principles of Vastu Shastra and how to apply them to your living space for harmony and prosperity.",
            "content": """Vastu Shastra is the ancient Indian science of architecture and space arrangement. The word Vastu means dwelling and Shastra means science or knowledge. This 5000-year-old system aligns your living and working spaces with the natural forces of the universe to promote health, happiness, and prosperity.

The Five Elements:
Vastu Shastra is based on the balance of five elements — Earth (Prithvi), Water (Jal), Fire (Agni), Air (Vayu), and Space (Akasha). Each direction is governed by these elements and specific deities.

Key Vastu Principles for Your Home:

The main entrance should ideally face North, East, or Northeast. These directions attract positive energy, prosperity, and good health. Avoid South-facing entrances where possible.

The master bedroom should be in the Southwest corner of the house. This direction represents stability, strength, and authority. The head while sleeping should point South or East.

The kitchen should be in the Southeast corner, which is governed by the fire element. The cook should face East while preparing food for maximum positive energy.

The living room works best in the North or East direction. Keep this space clutter-free and well-lit to allow positive energy to flow freely.

Water features like tanks and wells should be in the Northeast direction. This is the most sacred direction in Vastu and governs wisdom, health, and prosperity.

Common Vastu Remedies:
Not everyone can rebuild their home according to Vastu principles. Common remedies include placing mirrors strategically, using specific colours in different rooms, placing plants and crystals, and using Vastu Yantras to neutralise negative energies.

For a personalised Vastu consultation for your home or office, contact our expert team.""",
            "image_url": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=400&fit=crop",
            "tags": "vastu,home,energy,architecture,vedic",
            "author": "Er. Manu Gupta"
        },
    ]

    for b in blogs_data:
        exists = db.query(Blog).filter(Blog.slug == b["slug"]).first()
        if not exists:
            db.add(Blog(**b))
            print(f"Blog seeded: {b['title']}")

    db.commit()
    print("✅ All seed data added successfully")
    db.close()

if __name__ == "__main__":
    seed_db()
