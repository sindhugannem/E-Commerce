import React, { useEffect, useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>❤️ Your Wishlist</h2>

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
                  marginTop: "10px"
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
