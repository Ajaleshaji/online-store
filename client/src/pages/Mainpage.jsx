import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/title.css";
import cart from "../assets/cart.png";
import Account from "../assets/Account.png";
import shoes from "../assets/shoes.png";
import perfume from "../assets/perfume.png";
import Watch from "../assets/Watch.png";
import powder from "../assets/powder.png";

const Mainpage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    { id: 1, name: "Classic Shoes for Men", price: "Rs 499", image: shoes, route: "/product/shoes" },
    { id: 2, name: "Perfume Green Nature", price: "Rs 399", image: perfume, route: "/product/perfume" },
    { id: 3, name: "Watch for Men", price: "Rs 699", image: Watch, route: "/product/watch" },
    { id: 4, name: "Powder for Girls", price: "Rs 199", image: powder, route: "/product/powder" },
  ];

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
            <img className="accountimage" src={Account} alt="Account" />
            My Account
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
              <Link to={product.route} className="box" key={product.id}>
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
