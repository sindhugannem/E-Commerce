import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function Cart() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const loadCart = () => {
    axios.get(`${API}/cart`).then(res => setCart(res.data));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = (id) => {
    axios.delete(`${API}/cart/remove/${id}`).then(loadCart);
  };

  const checkout = () => {
    setShowPopup(true);
    axios.delete(`${API}/cart/clear`).then(loadCart);
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div style={{ padding: "40px" }}>
      <h2>🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? <h3 style={{ textAlign: "center" }}>Cart is Empty 😢</h3> : (
        <>
          {cart.map(item => (
            <div key={item.product_id} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              <img src={item.image} width="70" />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price} × {item.quantity}</p>
              </div>

              <button
                style={{ background: "#f44336", color: "white" }}
                onClick={() => removeItem(item.product_id)}
              >
                Remove
              </button>
            </div>
          ))}

          <h2 style={{ textAlign: "right" }}>Total: ₹{total}</h2>

          <button
            style={{
              width: "100%",
              padding: "12px",
              background: "#4CAF50",
              color: "white",
              fontSize: "18px"
            }}
            onClick={checkout}
          >
            ✅ Checkout Securely
          </button>
        </>
      )}

      {showPopup && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "14px",
            textAlign: "center"
          }}>
            <h2>🎉 Order Successful!</h2>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
