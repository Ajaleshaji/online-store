// routes/order.js
const express = require("express");
const Order = require("../models/Order");
const { authenticateUser } = require("../middleware/auth");

const router = express.Router();

// POST - Save Order
router.post("/", authenticateUser, async (req, res) => {
  const { formData, paymentMethod, product } = req.body;

  if (!formData || !paymentMethod || !product) {
    return res.status(400).json({ message: "Missing required data" });
  }

  const order = new Order({
    userId: req.user._id,  // User ID from the authenticated request
    products: [product],  // Assuming we are saving a single product for simplicity
    paymentMethod,
    formData,
  });

  try {
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

module.exports = router;
