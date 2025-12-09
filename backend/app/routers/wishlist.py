
from fastapi import APIRouter

router = APIRouter()
wishlist = []

@router.get("/wishlist")
def get_wishlist():
    return wishlist

@router.post("/wishlist/add")
def add_to_wishlist(item: dict):
    for i in wishlist:
        if i["id"] == item["id"]:
            return {"message": "Already in wishlist"}
    wishlist.append(item)
    return {"message": "Added to wishlist"}

@router.delete("/wishlist/remove/{product_id}")
def remove_from_wishlist(product_id: int):
    global wishlist
    wishlist = [i for i in wishlist if i["id"] != product_id]
    return {"message": "Removed"}
