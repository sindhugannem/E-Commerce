from app.db.postgres import Base, engine
import app.models.product  # important: import your model

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")
