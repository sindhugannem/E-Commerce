# backend/app/update_image_urls.py
from app.db.postgres import SessionLocal
from app.models.product import Product

# Map product name -> stable image URL (replace or extend as you like)
UPDATES = {
    "Headphones": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop",
    "Keyboard": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    "Smartphone": "https://images.unsplash.com/photo-1510552776732-03e61cf4b144?q=80&w=800&auto=format&fit=crop",
    "Smart Watch": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=800&auto=format&fit=crop",
    "Backpack": "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=800&auto=format&fit=crop",
    "Sunglasses": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800&auto=format&fit=crop",
    "Wireless Mouse": "https://images.unsplash.com/photo-1587825140708-5c7d5e6f1f1b?q=80&w=800&auto=format&fit=crop",
    "Power Bank": "https://images.unsplash.com/photo-1585386959984-a4155223f3f5?q=80&w=800&auto=format&fit=crop",
    # keep Laptop and Shoes as-is (or add here)
}

db = SessionLocal()
try:
    updated = 0
    for name, url in UPDATES.items():
        product = db.query(Product).filter(Product.name == name).first()
        if product:
            product.image_url = url
            db.add(product)
            updated += 1
    db.commit()
    print(f"Updated {updated} products.")
finally:
    db.close()
