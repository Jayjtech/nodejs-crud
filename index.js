import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Product from "./models/products.model.js";
import multer from "multer";
dotenv.config();
const app = express();
const upload = multer();

app.use(express.json());
//In order to accept data from forms
app.use(express.urlencoded({ extended: false }));

// Connect to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

//   Add product
app.post("/api/products", upload.none(), async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Get single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    const updatedProduct = await Product.findById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
// Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Server status is OK");
});
