import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8000";

function Navbar() {
  const [count, setCount] = useState(0);

  const loadCount = () => {
    axios.get(`${API}/cart`)
      .then(res => {
        setCount(res.data.length);
        localStorage.setItem("cartCount", res.data.length);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadCount();

    // Listen for cart updates from anywhere in app
    const handleStorageChange = () => loadCount();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Products</Link>

      <Link to="/cart" style={styles.cartLink}>
        🛒 Cart <span style={styles.badge}>{count}</span>
      </Link>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#222",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    fontSize: "18px"
  },
  link: { color: "white", textDecoration: "none" },
  cartLink: { color: "white", textDecoration: "none" },
  badge: {
    background: "red",
    color: "white",
    padding: "4px 8px",
    borderRadius: "50%",
    marginLeft: "6px"
  }
};

export default Navbar;
