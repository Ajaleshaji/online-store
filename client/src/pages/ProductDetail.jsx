import React from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useCart } from "../context/CartContext"; 
import shoes from "../assets/shoes.png";
import perfume from "../assets/perfume.png";
import Watch from "../assets/Watch.png";
import powder from "../assets/powder.png";
import "../styles/title.css";

const productDetails = [
  {
    id: "shoes",
    name: "Classic Shoes for Men",
    price: "Rs 499",
    description: "Comfortable and stylish shoes for everyday wear.",
    image: shoes,
  },
  {
    id: "perfume",
    name: "Perfume Green Nature",
    price: "Rs 399",
    description: "A fresh and floral fragrance for both men and women.",
    image: perfume,
  },
  {
    id: "watch",
    name: "Watch for Men",
    price: "Rs 699",
    description: "A sleek and elegant watch for daily use.",
    image: Watch,
  },
  {
    id: "powder",
    name: "Powder for Girls",
    price: "Rs 199",
    description: "A gentle powder for a soft and smooth finish.",
    image: powder,
  },
];

const ProductDetail = () => {
  const { id } = useParams(); 
  const { addToCart } = useCart(); 
  const navigate = useNavigate(); 

  const product = productDetails.find((p) => p.id === id);
  const handleBuy = () => {
    navigate("/checkout");
  };

  if (!product) {
    return <h2>Product not found</h2>; 
  }

  const handleAddToCart = () => {
    addToCart(product); 
    
    navigate("/cart");
  };

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2>{product.name}</h2>
        <h3>{product.price}</h3>
        <p>{product.description}</p>
        <div className="button-container">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          
          <button className="buy-btn" 
                onClick={handleBuy}>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
