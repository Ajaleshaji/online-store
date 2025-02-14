const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const UserModel = require("./UserModel");
const Product = require("./Product");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const { name, email, password, phone, address, pincode } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword, phone, address, pincode });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Signup not successful", error: error.message });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});


app.post("/verify-token", (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
});

app.get("/user", async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
    const user = await UserModel.findById(decoded.userId).select("-password"); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.get('/mainpage', async (req, res) => {
  try {
    const products = await Product.find(); 
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/add-to-cart", async (req, res) => {
  console.log(req.body)
  const { userId, product } = req.body;

  try {
    const user = await UserModel.findById(userId);
    console.log(user)
    if (!user) {
      console.log("user not found")
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log("before")
  
    const existingItem = user.cart.find((item) =>
      item.productId.equals(product._id)
    );  
    console.log(existingItem)

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image : product.image
      }); 
    }
    console.log(user)
    const dbResponse = await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
});

app.get("/get-cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId).populate("cart.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});
app.get("/remove-from-cart/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  console.log(userId , productId)
  console.log(req.params)

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => !item.productId.equals(productId));
    await user.save();

    res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing product", error: error.message });
  }
});


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB Connected"))
.catch((error) => {
  console.error(" MongoDB connection error:", error);
  process.exit(1);
});


  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
