import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import App from "./App";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import Register from "./components/Register";
export const ecomContext = createContext(null);

function Home() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // function handleRemoveFromCart(productId) {
  //   setCart((prevcart) =>
  //      prevcart.filter((product) => product.id !== productId);
  //   );
  // }

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      return prevCart.filter((product) => product.id !== productId);
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://strapi-store-server.onrender.com/api/products"
        );
        setProducts(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <ecomContext.Provider
        value={{ cart, setCart, products, handleRemoveFromCart, loading }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<App />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/" element={<Products />} /> */}
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </ecomContext.Provider>
    </BrowserRouter>
  );
}

export default Home;
