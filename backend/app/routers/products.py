from fastapi import APIRouter

router = APIRouter(prefix="/products", tags=["Products"])

PRODUCTS = [
    {"id": 1, "name": "Laptop", "price": 65000,
     "image": "https://m.media-amazon.com/images/I/61PW241BjqL._AC_SL1500_.jpg"},
    {"id": 2, "name": "Headphones", "price": 1500,
     "image": "https://m.media-amazon.com/images/I/61k2Uq3+e1L._AC_SL1500_.jpg"},
    {"id": 3, "name": "Keyboard", "price": 3500,
     "image": "https://m.media-amazon.com/images/I/71cWgCx5BML._AC_SL1500_.jpg"},
    {"id": 4, "name": "Smartphone", "price": 42000,
     "image": "https://m.media-amazon.com/images/I/71S8U9VzLTL._AC_SL1500_.jpg"},
    {"id": 5, "name": "Smart Watch", "price": 2999,
     "image": "https://m.media-amazon.com/images/I/61DUO0NqyyL._AC_SL1500_.jpg"},
    {"id": 6, "name": "Shoes", "price": 1800,
     "image": "https://m.media-amazon.com/images/I/71Q0vTCOqdL._AC_UL1500_.jpg"},
    {"id": 7, "name": "Backpack", "price": 1200,
     "image": "https://m.media-amazon.com/images/I/81qjIoZGTkL._AC_SL1500_.jpg"},
    {"id": 8, "name": "Sunglasses", "price": 850,
     "image": "https://m.media-amazon.com/images/I/61UW0GBN6OL._AC_SL1500_.jpg"},
    {"id": 9, "name": "Wireless Mouse", "price": 650,
     "image": "https://m.media-amazon.com/images/I/61LtuGzXeaL._AC_SL1500_.jpg"},
    {"id": 10, "name": "Power Bank", "price": 1100,
     "image": "https://m.media-amazon.com/images/I/61zL6u9kA8L._AC_SL1500_.jpg"},
]


@router.get("/")
def get_products():
    return PRODUCTS
