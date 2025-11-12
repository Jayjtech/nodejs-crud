import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/product.route.js";
import { swaggerSpec, swaggerUiHandler } from "./config/swagger.js";
dotenv.config();
const app = express();

app.use(express.json());
//In order to accept data from forms
app.use(express.urlencoded({ extended: false }));
// swagger documentation route
app.use(
  "/api-docs",
  swaggerUiHandler.serve,
  swaggerUiHandler.setup(swaggerSpec)
);

app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("Server status is OK");
});

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
