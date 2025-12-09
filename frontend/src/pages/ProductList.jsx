import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load products
    axios.get(`${API}/products`)
      .then(res => {
        setProducts(res.data);

        const q = {};
        res.data.forEach(p => q[p.id] = 1);
        setQuantities(q);
      })
      .catch(err => console.error("Products error:", err));

    // Load wishlist from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  // ✅ TOGGLE WISHLIST
  const toggleWishlist = (product) => {
    let updated;

    if (wishlist.find(item => item.id === product.id)) {
      updated = wishlist.filter(item => item.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const increaseQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decreaseQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

  const addToCart = (p) => {
    axios.post(`${API}/cart/add`, {
      product_id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      quantity: quantities[p.id]
    })
      .then(() => alert("Added to cart ✅"))
      .catch(() => alert("Add to cart failed ❌"));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>🔥 Trending Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: "30px"
        }}
      >
        {products.map(p => (
          <div
            key={p.id}
            style={{
              background: "#ffffff",
              padding: "18px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              position: "relative"
            }}
          >
            {/* ❤️ WISHLIST HEART ICON */}
            <div
              onClick={() => toggleWishlist(p)}
              style={{
                position: "absolute",
                top: "10px",
                right: "12px",
                fontSize: "22px",
                cursor: "pointer"
              }}
            >
              {wishlist.find(item => item.id === p.id) ? "❤️" : "🤍"}
            </div>

            <img
              src={p.image}
              alt={p.name}
              style={{ width: "180px", height: "180px", objectFit: "contain" }}
            />

            <h3>{p.name}</h3>
            <h4>₹{p.price}</h4>

            <div style={{ marginBottom: "10px" }}>
              <button onClick={() => decreaseQty(p.id)}>−</button>
              <span style={{ margin: "0 10px" }}>
                {quantities[p.id]}
              </span>
              <button onClick={() => increaseQty(p.id)}>+</button>
            </div>

            <button onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
