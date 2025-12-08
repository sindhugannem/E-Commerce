import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://e-commerce-78nv.onrender.com"; // ✅ Your Render backend

function Cart() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Load cart
  const loadCart = () => {
    axios.get(`${API}/cart`)
      .then(res => setCart(res.data))
      .catch(() => alert("Failed to load cart"));
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ✅ Remove item
  const removeItem = (id) => {
    axios.delete(`${API}/cart/remove/${id}`)
      .then(() => {
        loadCart();
        window.dispatchEvent(new Event("storage"));
      })
      .catch(() => alert("Remove failed"));
  };

  // ✅ Checkout & Clear cart
  const checkout = () => {
    setShowPopup(true);

    axios.delete(`${API}/cart/clear`)
      .then(() => {
        loadCart();
        window.dispatchEvent(new Event("storage"));
      })
      .catch(() => alert("Checkout failed"));
  };

  // ✅ Total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.product_id} style={{
              display: "flex",
              gap: "20px",
              borderBottom: "1px solid #ddd",
              padding: "10px"
            }}>

              <img src={item.image} alt={item.name} style={{ width: 90 }} />

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price} × {item.quantity}</p>

                <button onClick={() => removeItem(item.product_id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button onClick={checkout} style={{ padding: "10px 20px" }}>
            Checkout
          </button>
        </>
      )}

      {/* ✅ Success Popup */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupBox} className="popup-animate">
            <h2>Order Placed Successfully 🎉</h2>
            <p>Your order has been confirmed!</p>

            <button
              onClick={() => setShowPopup(false)}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        .popup-animate {
          animation: slideUpFadeIn 0.6s ease-out forwards;
        }

        @keyframes slideUpFadeIn {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  popupOverlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  popupBox: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    opacity: 0
  },
  closeButton: {
    marginTop: "15px",
    padding: "8px 15px",
    cursor: "pointer"
  }
};

export default Cart;
