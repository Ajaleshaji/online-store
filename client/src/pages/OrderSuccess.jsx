import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/title.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, paymentMethod, product } = location.state || {};
  if (!formData || !paymentMethod || !product) {
    return (
      <div className="order-success-container">
        <h2>Order information is missing.</h2>
        <button className="back-to-home-btn" onClick={() => navigate("/mainpage")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="order-success-container">
      <h1>Order Successful!</h1>
      <p>Thank you for your purchase! Your order has been placed successfully.</p>

      <div className="order-sections">
        <div>
          <h2>Order Summary</h2>
          <p><strong>Username:</strong> {formData?.username}</p>
          <p><strong>Email:</strong> {formData?.email}</p>
          <p><strong>Phone:</strong> {formData?.phone}</p>
          <p><strong>Address:</strong> {formData?.address}</p>
          <p><strong>Pin Code:</strong> {formData?.pinCode}</p>
          <p><strong>Payment Method:</strong> {paymentMethod}</p>
        </div>
        <div>
          <h2>Product Details</h2>
          <div className="product-details">
            <img src={product?.image} alt={product?.name} className="product-image" />
            <div>
              <p><strong>Name:</strong> {product?.name}</p>
              <p><strong>Price:</strong> {product?.price}</p>
              <p><strong>Description:</strong> {product?.description}</p>
            </div>
          </div>
        </div>
        <div>
          <h2>Delivery Details</h2>
          <p>Your order will be delivered to the provided address within 5-7 business days.</p>
        </div>
      </div>

      <button
        className="back-to-home-btn"
        onClick={() => navigate("/mainpage")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
