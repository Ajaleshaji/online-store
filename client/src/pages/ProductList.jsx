import React from "react";
import { Link } from "react-router-dom";
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
