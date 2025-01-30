import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mainpage from "./pages/Mainpage";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import MyAccount from "./pages/MyAccount";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (token) {
      axios
        .post(
          "http://localhost:5000/verify-token",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
        
          setLoading(false);
        })
        .catch((error) => {
         
          localStorage.removeItem("token");
          navigate("/");
          setLoading(false);
        });
    } else {
      setLoading(false);
      navigate("/");
    }
  }, [token, navigate]);
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <CartProvider>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/my-account" element={<MyAccount />} />
          
        </Routes>
    </CartProvider>
  );
}

export default App;
