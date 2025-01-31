import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    pincode: ""
  });

  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://online-store-daza.onrender.com/signup", formData);
      alert(response.data.message); 
      navigate("/login"); 
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="signup-name">Name:</label>
        <input type="text" id="signup-name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="signup-email">Email:</label>
        <input type="email" id="signup-email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="signup-password">Password:</label>
        <input type="password" id="signup-password" name="password" value={formData.password} onChange={handleChange} required />

        <label htmlFor="signup-phone">Phone:</label>
        <input type="text" id="signup-phone" name="phone" value={formData.phone} onChange={handleChange} required />

        <label htmlFor="signup-address">Address:</label>
        <textarea id="signup-address" name="address" value={formData.address} onChange={handleChange} required></textarea>

        <label htmlFor="signup-pincode">Pin Code:</label>
        <input type="text" id="signup-pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />

        <button type="submit" className="signup-button">Signup</button>
      </form>

      <p className="switch-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
