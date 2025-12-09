from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.products import router as products_router
from app.routers.wishlist import router as wishlist_router
from app.routers.cart import router as cart_router   # ✅ ADD THIS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products_router)
app.include_router(wishlist_router)
app.include_router(cart_router)   # ✅ ADD THIS

@app.get("/")
def home():
    return {"message": "Backend running!"}
