from sqlalchemy import Column, Integer, String, Float
from app.db.postgres import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    image_url = Column(String)
    
    # New fields
    category = Column(String, nullable=False, default="General")
    rating = Column(Float, nullable=False, default=4.5)
