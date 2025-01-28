import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/title.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, product } = location.state || {}; 

  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }
    navigate("/order-success", {
      state: { formData, paymentMethod, product }, 
    });
  };

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      <h3>Order Summary</h3>
      <p><strong>Username:</strong> {formData?.username}</p>
      <p><strong>Email:</strong> {formData?.email}</p>
      <p><strong>Phone:</strong> {formData?.phone}</p>
      <p><strong>Address:</strong> {formData?.address}</p>
      <p><strong>Pin Code:</strong> {formData?.pinCode}</p>

      <h3>Product Details</h3>
      <div className="product-details">
        <img src={product?.image} alt={product?.name} className="product-image" />
        <p><strong>Name:</strong> {product?.name}</p>
        <p><strong>Price:</strong> {product?.price}</p>
        <p><strong>Description:</strong> {product?.description}</p>
      </div>

      <h3>Select Payment Method</h3>
      <div className="payment-method">
        <label>
          <input
            type="radio"
            value="Credit Card"
            checked={paymentMethod === "Credit Card"}
            onChange={handlePaymentMethodChange}
          />
          Credit Card
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="Debit Card"
            checked={paymentMethod === "Debit Card"}
            onChange={handlePaymentMethodChange}
          />
          Debit Card
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={handlePaymentMethodChange}
          />
          UPI
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="Cash on Delivery"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={handlePaymentMethodChange}
          />
          Cash on Delivery (COD)
        </label>
      </div>

      <button onClick={handlePayment} className="payment-btn">
        Proceed to Pay
      </button>
    </div>
  );
};

export default Payment;
