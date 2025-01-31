import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MyAccount.css";

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("https://online-store-daza.onrender.com/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="my-account-container">
      <h2>My Account</h2>
      {userData ? (
        <div>
          <div className="user-details">
            <h3>User Details</h3>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>Pincode:</strong> {userData.pincode}</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyAccount;
