// models/OrderModel.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Reference to the User model
    required: true,
  },
  products: [
    {
      name: String,
      price: String,
      description: String,
      image: String,
    },
  ],
  paymentMethod: String,
  formData: {
    username: String,
    email: String,
    phone: String,
    address: String,
    pinCode: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
