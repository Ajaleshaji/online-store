import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/title.css'
import cart from "../assets/cart.png";
import Account from "../assets/Account.png";
import shoes from "../assets/shoes.png";
import perfume from "../assets/perfume.png";
import Watch from "../assets/Watch.png";
import powder from "../assets/powder.png";

const Mainpage = () => {
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
        />
        <button className="search-button">Search</button>
      </div>
      <div>
        <h1 className="most">Most Popular</h1>
      </div>
      <section id="texts">
        <div className="skills-grid">
          <Link to="/product/shoes" className="box">
            <img className="photos" src={shoes} alt="shoes" />
            <h3>Classic Shoes for Men</h3>
            <h4>Rs 499</h4>
          </Link>

          <Link to="/product/perfume" className="box">
            <img className="photos" src={perfume} alt="perfume" />
            <h3>Perfume Green Nature</h3>
            <h4>Rs 399</h4>
          </Link>

          <Link to="/product/watch" className="box">
            <img className="photos" src={Watch} alt="Watch" />
            <h3>Watch for Men</h3>
            <h4>Rs 699</h4>
          </Link>

          <Link to="/product/powder" className="box">
            <img className="photos" src={powder} alt="powder" />
            <h3>Powder for Girls</h3>
            <h4>Rs 199</h4>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Mainpage;
