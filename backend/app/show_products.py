from app.db.postgres import SessionLocal
from app.models.product import Product

db = SessionLocal()
products = db.query(Product).all()

for p in products:
    print(p.id, p.name, p.image_url)

db.close()
