import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://192.168.1.10:8000";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const loadCart = async () => {
    try {
      const res = await axios.get(`${API}/cart`);
      setCartItems(res.data);

      let sum = 0;
      res.data.forEach((item) => {
        sum += item.price * item.quantity;
      });
      setTotal(sum);
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div>
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 && <p>No items in cart</p>}

      {cartItems.map((item) => (
        <div key={item.product_id}>
          <h4>{item.name}</h4>
          <p>
            ₹{item.price} x {item.quantity}
          </p>
        </div>
      ))}

      <h3>💰 Total: ₹{total}</h3>

      {cartItems.length > 0 && (
        <button
          onClick={() => alert("✅  Checkout Successful")}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          ✅ Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
