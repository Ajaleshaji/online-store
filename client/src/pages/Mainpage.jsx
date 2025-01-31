import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/title.css";
import cart from "../assets/cart.png";
import Account from "../assets/Account.png";

const Mainpage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://online-store-daza.onrender.com/mainpage");
        const data = await response.json();
        console.log(data); 
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <div className="title-container">
        <span className="titlee">MegaMart</span>
        <span className="home">Home</span>
        <div className="right-section">
          <span className="cart">
            <Link to="/cart" className="cart">
              <img className="cartimage" src={cart} alt="Cart" />
              Cart
            </Link>
          </span>
          <span className="myaccount">
            <Link to="/my-account" className="myaccount">
              <img className="accountimage" src={Account} alt="Account" />
              My Account
            </Link>
          </span>
        </div>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button">Search</button>
      </div>
      <div>
        <h1 className="most">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Most Popular"}
        </h1>
      </div>
      <section id="texts">
        <div className="skills-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                className="box"
                key={product._id}
              >
                <img className="photos" src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <h4>{product.price}</h4>
              </Link>
            ))
          ) : (
            <h2>No products found</h2>
          )}
        </div>
      </section>
    </div>
  );
};

export default Mainpage;
