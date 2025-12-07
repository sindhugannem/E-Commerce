from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]

products_collection = db["products"]
cart_collection = db["cart"]
