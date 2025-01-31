import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/title.css";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
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
  const handleAddToCart = async () => {
    const userId = "679c5a48753eb7a09ec20f10" 

    if (!userId) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, product }),
      });
 
      const data = await response.json();

      if (response.ok) {
        navigate("/mainpage")
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleBuy = () => {
    navigate("/checkout", { state: { product } });
  };

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2>{product.name}</h2>
        <h3>Rs {product.price}</h3>
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
