import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://e-commerce-78nv.onrender.com";

function Cart() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const loadCart = () => {
    axios.get(`${API}/cart`)
      .then(res => setCart(res.data))
      .catch(() => alert("Failed to load cart"));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = (id) => {
    axios.delete(`${API}/cart/remove/${id}`)
      .then(() => {
        loadCart();
        window.dispatchEvent(new Event("storage"));
      })
      .catch(() => alert("Remove failed"));
  };

  const checkout = () => {
    setShowPopup(true);

    axios.delete(`${API}/cart/clear`)
      .then(() => {
        loadCart();
        window.dispatchEvent(new Event("storage"));
      });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 ? <p>No items in cart</p> : (
        <>
          {cart.map(item => (
            <div key={item.product_id} style={{ display: "flex", gap: "20px", borderBottom: "1px solid #ddd" }}>
              <img src={item.image} alt={item.name} width="90" />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price} × {item.quantity}</p>
                <button onClick={() => removeItem(item.product_id)}>Remove</button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
          <button onClick={checkout}>Checkout</button>
        </>
      )}

      {showPopup && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "12px" }}>
            <h2>Order Placed Successfully 🎉</h2>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Cart;
