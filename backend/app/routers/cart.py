from fastapi import APIRouter
from pydantic import BaseModel
from app.db.mongo import get_cart, add_to_cart, remove_from_cart, clear_cart

router = APIRouter(prefix="/cart", tags=["Cart"])


# ✅ Cart Item Model
class CartItem(BaseModel):
    product_id: int
    name: str
    price: int
    quantity: int


# ✅ Get all cart items
@router.get("/", status_code=200)
def read_cart():
    return get_cart()


# ✅ Add item to cart
@router.post("/add", status_code=201)
def add_item(item: CartItem):
    add_to_cart(item.dict())
    return {"message": "Item added to cart"}


# ✅ Remove single item from cart
@router.delete("/remove/{product_id}", status_code=200)
def remove_item(product_id: int):
    remove_from_cart(product_id)
    return {"message": "Item removed from cart"}


# ✅ Clear entire cart
@router.delete("/clear", status_code=200)
def clear_all():
    clear_cart()
    return {"message": "Cart cleared"}
