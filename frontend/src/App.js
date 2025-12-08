import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://e-commerce-78nv.onrender.com/products")
      .then(res => res.json())
      .then(data => {
        console.log("Backend Response:", data);
        setProducts(data.products || []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((p, index) => (
            <li key={index}>{p.name} — ₹{p.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
