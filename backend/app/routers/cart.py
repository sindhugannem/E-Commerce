from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.config.db import cart_collection

router = APIRouter(prefix="/cart", tags=["Cart"])


class CartItem(BaseModel):
    product_id: int
    name: str
    price: int
    image: str
    quantity: int = 1


@router.post("/add")
def add_item(item: CartItem):
    existing = cart_collection.find_one({"product_id": item.product_id})

    if existing:
        cart_collection.update_one(
            {"product_id": item.product_id},
            {"$inc": {"quantity": 1}}
        )
    else:
        cart_collection.insert_one(item.dict())

    return {"message": "Item added to cart"}


@router.get("/")
def get_cart():
    cart = list(cart_collection.find())
    for c in cart:
        c["_id"] = str(c["_id"])
    return cart


@router.delete("/remove/{product_id}")
def remove_item(product_id: int):
    result = cart_collection.delete_one({"product_id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item removed"}


@router.delete("/clear")
def clear_cart():
    cart_collection.delete_many({})
    return {"message": "Cart cleared"}
