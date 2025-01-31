import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://online-store-daza.onrender.com/login", formData);
      localStorage.setItem("token", response.data.token); 
      navigate("/Mainpage");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email:</label>
        <input type="email" id="login-email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="login-password">Password:</label>
        <input type="password" id="login-password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit" className="login-button">Login</button>
      </form>

      <p className="switch-link">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
