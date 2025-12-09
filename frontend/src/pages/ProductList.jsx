import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://192.168.1.10:8000";




function ProductList() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [wishlist, setWishlist] = useState([]);

  // ✅ Load products + backend wishlist
  useEffect(() => {
    axios.get(`${API}/products`).then(res => {
      setProducts(res.data);

      const q = {};
      res.data.forEach(p => q[p.id] = 1);
      setQuantities(q);
    });

    axios.get(`${API}/wishlist`)
      .then(res => setWishlist(res.data));
  }, []);

  // ❤️ WISHLIST → BACKEND
  const toggleWishlist = (product) => {
    const exists = wishlist.find(i => i.id === product.id);

    if (exists) {
      axios.delete(`${API}/wishlist/remove/${product.id}`)
        .then(() => {
          setWishlist(prev => prev.filter(i => i.id !== product.id));
        });
    } else {
      axios.post(`${API}/wishlist/add`, product)
        .then(() => {
          setWishlist(prev => [...prev, product]);
        });
    }
  };

  // ✅ ✅ ✅ CART → BACKEND (FINAL FIX)
  const addToCart = (product) => {
    axios.post(`${API}/cart/add`, {
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantities[product.id]
    }).then(() => {
      alert("Added to cart ✅");
    }).catch(err => {
      console.error("Add to cart error:", err);
    });
  };

  const increaseQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decreaseQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>🔥 Products</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
        gap: "30px"
      }}>
        {products.map(p => (
          <div key={p.id} style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "14px",
            textAlign: "center",
            position: "relative",
            boxShadow: "0 5px 12px rgba(0,0,0,0.1)"
          }}>

            {/* ❤️ WISHLIST ICON */}
            <div
              onClick={() => toggleWishlist(p)}
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                fontSize: "22px",
                cursor: "pointer"
              }}
            >
              {wishlist.find(i => i.id === p.id) ? "❤️" : "🤍"}
            </div>

            {/* ✅ IMAGE FIX */}
            <img
              src={`http://192.168.1.10:8000/${p.image}`}
              alt={p.name}
              style={{ width: "170px", height: "170px", objectFit: "contain" }}
            />

            <h3>{p.name}</h3>
            <h4>₹{p.price}</h4>

            <div>
              <button onClick={() => decreaseQty(p.id)}>−</button>
              <span style={{ margin: "0 10px" }}>{quantities[p.id]}</span>
              <button onClick={() => increaseQty(p.id)}>+</button>
            </div>

            <button onClick={() => addToCart(p)} style={{ marginTop: "10px" }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
