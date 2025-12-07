from app.db.postgres import SessionLocal
from app.models.product import Product

BAD_PREFIXES = [
    "https://example.com",
    "https://share.google",
    "https://i.imgur.com",
    "https://images.unsplash.com"
]

db = SessionLocal()

try:
    products = db.query(Product).all()
    count = 0

    for p in products:
        if any(p.image_url.startswith(prefix) for prefix in BAD_PREFIXES):
            db.delete(p)
            count += 1

    db.commit()
    print(f"Deleted {count} products with bad image URLs!")

finally:
    db.close()
