import { createContext, useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import axios from "axios"
import Header from "./components/Header"
import App from "./App.jsx"
import Cart from "./pages/Cart.jsx"
import Products from "./pages/Products.jsx"

export const ecomContext = createContext(null);

function Home() {
const[cart,setCart] = useState([]);
const[products,setProducts] = useState([]);
const [loading,setLoading] = useState(true);
  
useEffect(()=>{
  async function fetchData(){
    try{
      const response = await axios.get("https://strapi-store-server.onrender.com/api/products");
      setProducts(response.data.data)
    }catch(error){
      console.error("Error fetching products:",error)
    }finally{
      setLoading(false)
    }
  }
  fetchData();
},[])
  return (
    <BrowserRouter >
      <ecomContext.Provider value={{ cart,setCart,products,loading }}>
        <Header />
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </ecomContext.Provider>
    </BrowserRouter>
  )
}

export default Home