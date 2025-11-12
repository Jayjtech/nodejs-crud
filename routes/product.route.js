import express from "express";
import multer from "multer";
import {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProduct,
} from "../controllers/product.controller.js";
const router = express.Router();
const upload = multer();

router.post("/", upload.none(), addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
