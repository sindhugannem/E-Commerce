import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Wishlist from "./Wishlist";
import Navbar from "./Navbar";   // ✅ make sure Navbar.jsx exists in src/

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
