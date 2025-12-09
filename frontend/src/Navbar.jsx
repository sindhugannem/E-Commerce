import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      padding: "15px 30px",
      background: "linear-gradient(to right, #ff5722, #ff9800)",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2 style={{ margin: 0 }}>🛍 My Shop</h2>

      <div>
        <Link to="/" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>
          Products
        </Link>

        <Link to="/wishlist" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>
          Wishlist ❤️
        </Link>

        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          Cart 🛒
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
