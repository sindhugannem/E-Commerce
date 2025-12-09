from fastapi import APIRouter

router = APIRouter()

cart = []

@router.get("/cart")
def get_cart():
    return cart

@router.post("/cart/add")
def add_to_cart(item: dict):
    for c in cart:
        if c["product_id"] == item["product_id"]:
            c["quantity"] += item["quantity"]
            return {"message": "Updated quantity"}

    cart.append(item)
    return {"message": "Item added"}

@router.delete("/cart/remove/{id}")
def remove_item(id: int):
    global cart
    cart = [c for c in cart if c["product_id"] != id]
    return {"message": "Item removed"}

@router.delete("/cart/clear")
def clear_cart():
    cart.clear()
    return {"message": "Cart cleared"}
