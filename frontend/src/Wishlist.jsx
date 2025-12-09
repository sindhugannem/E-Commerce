import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://192.168.1.10:8000";


function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // ✅ Load wishlist from BACKEND (shared across all systems)
  useEffect(() => {
    axios.get(`${API}/wishlist`)
      .then(res => setWishlist(res.data))
      .catch(err => console.error("Wishlist load error:", err));
  }, []);

  // ✅ Remove from BACKEND wishlist
  const removeFromWishlist = (id) => {
    axios.delete(`${API}/wishlist/remove/${id}`)
      .then(() => {
        setWishlist(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => console.error("Wishlist remove error:", err));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>❤️ Shared Wishlist</h2>

      {wishlist.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>Your wishlist is empty 😢</h3>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: "25px"
        }}>
          {wishlist.map(item => (
            <div key={item.id} style={{
              background: "white",
              padding: "18px",
              borderRadius: "16px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "160px", height: "160px", objectFit: "contain" }}
              />

              <h3>{item.name}</h3>
              <h4 style={{ color: "#ff5722" }}>₹{item.price}</h4>

              <button
                onClick={() => removeFromWishlist(item.id)}
                style={{
                  background: "#f44336",
                  color: "white",
                  marginTop: "10px",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Remove ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
