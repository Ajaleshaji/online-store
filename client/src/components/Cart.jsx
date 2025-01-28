import React from "react";
import { useNavigate } from "react-router-dom"; 
import { useCart } from "../context/CartContext";
import "../styles/title.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  const handleBuy = (product) => {
    navigate("/checkout", { state: { product } }); 
  };

  return (
    <div className="product-list-container">
      <h1>Your Cart</h1>
      {cart.map((product, index) => (
        <div key={index} className="product-card">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-details">
            <h2>{product.name}</h2>
            <h3>{product.price}</h3>
            
            <div className="button-container">
              <button
                className="remove-btn"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
              <button
                className="buy-btn"
                onClick={() => handleBuy(product)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total: Rs {cart.reduce((acc, product) => acc + parseFloat(product.price.replace("Rs ", "")), 0)}</h3>
      </div>
    </div>
  );
};

export default Cart;
