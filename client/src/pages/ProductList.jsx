import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import "../styles/title.css";

const ProductList = () => {
  const { addToCart } = useCart();

  return (
    <div className="product-list-container">
      {productDetails.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-details">
            <h2>{product.name}</h2>
            <h3>{product.price}</h3>
            <p>{product.description}</p>
            <div className="button-container">
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <Link to={`/product/${product.id}`} className="view-link">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
};

export default ProductList;
