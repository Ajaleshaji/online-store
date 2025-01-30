import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/title.css";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/${id}`);
        const data = await response.json();
        setProduct(data); 
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]); 

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  const handleBuy = () => {
    navigate("/checkout", { state: { product } });
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
          <button className="buy-btn" onClick={handleBuy}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
