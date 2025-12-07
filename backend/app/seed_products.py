from app.db.postgres import SessionLocal
from app.models.product import Product

db = SessionLocal()

products = [
    Product(
        name="Laptop",
        description="High-performance gaming laptop",
        price=65000,
        category="Electronics",
        rating=4.7,
        image_url="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
    ),
    Product(
        name="Headphones",
        description="Wireless Bluetooth headphones",
        price=1500,
        category="Audio",
        rating=4.5,
        image_url="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800"
    ),
    Product(
        name="Keyboard",
        description="Mechanical RGB gaming keyboard",
        price=3500,
        category="Accessories",
        rating=4.6,
        image_url="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800"
    ),
    Product(
        name="Smartphone",
        description="Latest 5G smartphone with AMOLED display",
        price=42000,
        category="Mobiles",
        rating=4.8,
        image_url="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
    ),
    Product(
        name="Smart Watch",
        description="Fitness tracking smartwatch",
        price=2999,
        category="Wearables",
        rating=4.4,
        image_url="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
    ),
    Product(
        name="Shoes",
        description="Comfortable running shoes",
        price=1800,
        category="Footwear",
        rating=4.3,
        image_url="https://images.unsplash.com/photo-1528701800489-199b6f76e9c3?w=800"
    ),
    Product(
        name="Backpack",
        description="Durable waterproof travel backpack",
        price=1200,
        category="Bags",
        rating=4.5,
        image_url="https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800"
    ),
    Product(
        name="Sunglasses",
        description="UV-protected stylish sunglasses",
        price=850,
        category="Fashion",
        rating=4.2,
        image_url="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800"
    ),
    Product(
        name="Wireless Mouse",
        description="Ergonomic wireless mouse",
        price=650,
        category="Accessories",
        rating=4.3,
        image_url="https://images.unsplash.com/photo-1587825140708-5c7d5e6f1f1b?w=800"
    ),
    Product(
        name="Power Bank",
        description="20000mAh fast-charging power bank",
        price=1100,
        category="Electronics",
        rating=4.4,
        image_url="https://images.unsplash.com/photo-1585386959984-a4155223f3f5?w=800"
    ),
]

for p in products:
    db.add(p)

db.commit()
db.close()

print("10 products seeded successfully with categories + ratings + images!")
