import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/title.css";
import { useCallback } from "react";
import axios from "axios"

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading , setLoading] = useState(true)
  const [noOfDelets, setNoOfDelets] = useState(0)

  const userId = "679c5a48753eb7a09ec20f10"

  const fetchCart = useCallback(async () => {
    if (!userId) return;

    try {
      const { data } = await axios.get(`https://online-store-daza.onrender.com/get-cart/${userId}`);
      setCart(data.cart || []);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]); 

  if (cart.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  const handleBuy = (product) => {
    navigate("/checkout", { state: { product } });
  };

  const removeFromCart = async (productId) => {
    try {
      console.log("remove from cart : " , productId)
      const { data } = await axios.get(`https://online-store-daza.onrender.com/remove-from-cart/${userId}/${noOfDelets === 0 ? productId._id : productId}`);
      setNoOfDelets(noOfDelets + 1)
      console.log(data)
      setCart(data.cart || []);
    } catch (error) {
      console.error("Error removing product:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="product-list-container">
      <h1>Your Cart</h1>
      {cart.map((product, index) => (
        <div key={index} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-details">
            <h2>{product.name}</h2>
            <h3>Rs {product.price}</h3>
            <div className="button-container">
              <button className="remove-btn" onClick={() => removeFromCart(product.productId)}>
                Remove
              </button>
              <button className="buy-btn" onClick={() => handleBuy(product)}>
                Buy
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
