from app.db.postgres import SessionLocal
from app.models.product import Product

db = SessionLocal()

try:
    # Try just getting count
    print("Trying DB...")
    count = db.query(Product).count()
    print("Product count:", count)
finally:
    db.close()
