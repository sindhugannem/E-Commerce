from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

POSTGRES_URL = "postgresql://postgres:admin@localhost:5432/ecommerce_products"

engine = create_engine(POSTGRES_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Import models so SQLAlchemy sees them
from app.models import product, cart

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)
