const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
  name: { type: String},
  price: { type: String}, 
  image : {type : String},
  quantity: { type: Number , default : 1},
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  pincode: {
    type: Number,
    require: true,
  },
  cart: [
    CartItemSchema
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
