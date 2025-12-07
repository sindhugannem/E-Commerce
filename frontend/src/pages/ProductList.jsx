import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => {
        setProducts(res.data);

        // Load wishlist from localStorage
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlist(storedWishlist);

        // Default quantity = 1 for all products
        const defaultQty = {};
        res.data.forEach(p => defaultQty[p.id] = 1);
        setQuantities(defaultQty);

      })
      .catch(() => alert("Failed to load products"));
  }, []);

  // ❤️ Add/Remove Wishlist
  const toggleWishlist = (productId) => {
    let updated = [];

    if (wishlist.includes(productId)) {
      updated = wishlist.filter(id => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // 🔢 Quantity Increase
  const increaseQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  // 🔢 Quantity Decrease
  const decreaseQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

  // 🛒 Add To Cart
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
        alert("Added to cart");

        const newCount = (parseInt(localStorage.getItem("cartCount") || "0") + qty);
        localStorage.setItem("cartCount", newCount);

        window.dispatchEvent(new Event("storage"));
      })
      .catch(() => alert("Add to cart failed"));
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Products</h2>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card} className="card-hover">

            {/* ❤️ Wishlist Button */}
            <div
              style={styles.wishlist}
              onClick={() => toggleWishlist(p.id)}
            >
              {wishlist.includes(p.id) ? "❤️" : "🤍"}
            </div>

            <img src={p.image} alt={p.name} style={styles.image} />

            <h3 style={styles.name}>{p.name}</h3>

            <p style={styles.price}>₹{p.price}</p>

            {/* 🔢 Quantity Selector */}
            <div style={styles.qtyContainer}>
              <button onClick={() => decreaseQty(p.id)} style={styles.qtyBtn}>−</button>
              <span style={styles.qtyText}>{quantities[p.id]}</span>
              <button onClick={() => increaseQty(p.id)} style={styles.qtyBtn}>+</button>
            </div>

            <button style={styles.button} onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: { padding: "30px" },
  title: { fontSize: "28px", fontWeight: "bold", marginBottom: "20px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    position: "relative",
  },

  wishlist: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: "24px",
    cursor: "pointer",
  },

  image: {
    width: "180px",
    height: "180px",
    objectFit: "contain",
  },

  name: { margin: "10px 0", fontSize: "20px", color: "#333" },

  price: { fontSize: "18px", color: "#009688", marginBottom: "10px" },

  // Quantity
  qtyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "12px",
  },

  qtyBtn: {
    padding: "5px 10px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "1px solid #ccc",
    background: "#f5f5f5",
  },

  qtyText: {
    margin: "0 12px",
    fontSize: "18px",
    minWidth: "20px",
    display: "inline-block",
  },

  button: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
  }
};

export default ProductList;
