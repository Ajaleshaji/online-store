import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  if (!product) {
    return <h2>No product selected. Please go back to the cart.</h2>;
  }

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    pinCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment", { state: { formData, product } }); 
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="product-summary">
        <h3>Product Details</h3>
        <div className="product-details">
          <img src={product.image} alt={product.name} className="product-image" />
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>User Details</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="form-group">
          <label>Pin Code</label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleInputChange}
            placeholder="Enter your pin code"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Checkout;
