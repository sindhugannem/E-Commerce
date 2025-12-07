import React from "react";
import { Link } from "react-router-dom";

const CartIcon = ({ count }) => {
  return (
    <Link to="/cart" style={{ position: "relative", textDecoration: "none" }}>
      <span style={{ fontSize: "28px" }}>🛒</span>
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-10px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "4px 7px",
            fontSize: "12px",
          }}
        >
          {count}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
