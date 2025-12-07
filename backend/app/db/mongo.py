from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["ecommerce"]
cart_collection = db["cart"]

def get_cart():
    return list(cart_collection.find({}, {"_id": 0}))

def add_to_cart(item):
    existing = cart_collection.find_one({"product_id": item["product_id"]})
    if existing:
        cart_collection.update_one(
            {"product_id": item["product_id"]},
            {"$inc": {"quantity": item["quantity"]}}
        )
    else:
        cart_collection.insert_one(item)

def remove_from_cart(product_id):
    cart_collection.delete_one({"product_id": product_id})

def clear_cart():
    cart_collection.delete_many({})
