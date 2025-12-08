import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://e-commerce-78nv.onrender.com";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => {
        setProducts(res.data);

        const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlist(storedWishlist);

        const defaultQty = {};
        res.data.forEach(p => defaultQty[p.id] = 1);
        setQuantities(defaultQty);
      })
      .catch(() => alert("Failed to load products"));
  }, []);

  const toggleWishlist = (productId) => {
    let updated = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];

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
    const qty = quantities[p.id];

    axios.post(`${API}/cart/add`, {
      product_id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      quantity: qty
    })
      .then(() => {
        alert("Added to cart ✅");
        const newCount = (parseInt(localStorage.getItem("cartCount") || "0") + qty);
        localStorage.setItem("cartCount", newCount);
        window.dispatchEvent(new Event("storage"));
      })
      .catch(() => alert("Add to cart failed ❌"));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Products</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "25px"
      }}>

        {products.map((p) => (
          <div key={p.id} style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
            position: "relative"
          }}>

            <div
              style={{ position: "absolute", top: 10, right: 10, fontSize: "24px", cursor: "pointer" }}
              onClick={() => toggleWishlist(p.id)}
            >
              {wishlist.includes(p.id) ? "❤️" : "🤍"}
            </div>

            <img src={p.image} alt={p.name} style={{ width: "180px", height: "180px", objectFit: "contain" }} />

            <h3>{p.name}</h3>
            <p style={{ color: "#009688", fontWeight: "bold" }}>₹{p.price}</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button onClick={() => decreaseQty(p.id)}>−</button>
              <span>{quantities[p.id]}</span>
              <button onClick={() => increaseQty(p.id)}>+</button>
            </div>

            <button
              style={{ marginTop: "10px", padding: "8px 12px", background: "#4CAF50", color: "#fff", border: "none" }}
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default ProductList;
