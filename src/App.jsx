import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./index.css";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  const [products, setProducts] = useState([]);
  const [theme, setTheme] = useState("light"); // Estado para el tema de la aplicación (light, dark, blue)  

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.toggle(savedTheme);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const editProduct = (index, newProduct) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? newProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const toggleTheme = () => { // Función que cambia el tema de la aplicación
    const newTheme = theme === "light" ? "dark" : theme === "dark" ? "blue" : theme === "blue" ? "yellow" : theme === "yellow" ? "green" : "light"; // Cambia el tema actual al siguiente en el ciclo (light -> dark -> blue -> yellow --> green -->light) 
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Router>
      <div className="container">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Modo Oscuro" : theme === "dark" ? "🔵 Modo Azul" : theme === "blue" ? "Modo Amarillo" : theme === "yellow" ? "Modo Verde" : "Blanco"}
        </button>
        <h1>Inventario de Equipos de la USTA</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductForm onAdd={addProduct} />
                <ProductList products={products} onDelete={deleteProduct} onEdit={editProduct} />
              </>
            }
          />
          <Route path="/detalle-producto" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
