import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/title.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, paymentMethod, product } = location.state || {}; // Retrieve passed state

  if (!product) {
    return <h2>Product not found. Please try again.</h2>;
  }

  return (
    <div className="order-success-container">
      <h1>Order Successful!</h1>
      <p>Thank you for your purchase! Your order has been placed successfully.</p>

      <h3>Order Summary</h3>
      <p><strong>Username:</strong> {formData?.username}</p>
      <p><strong>Email:</strong> {formData?.email}</p>
      <p><strong>Phone:</strong> {formData?.phone}</p>
      <p><strong>Address:</strong> {formData?.address}</p>
      <p><strong>Pin Code:</strong> {formData?.pinCode}</p>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      <h3>Product Details</h3>
      <div className="product-details">
        <img src={product?.image} alt={product?.name} className="product-image" />
        <p><strong>Name:</strong> {product?.name}</p>
        <p><strong>Price:</strong> {product?.price}</p>
        <p><strong>Description:</strong> {product?.description}</p>
      </div>

      <h3>Delivery Details</h3>
      <p>Your order will be delivered to the provided address within 5-7 business days.</p>

      <button className="back-to-home-btn" onClick={() => navigate("/mainpage")}>
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
