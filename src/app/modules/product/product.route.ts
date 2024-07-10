import express from "express";
import { productController } from "./product.controller";

//destructure controllers
const { addProduct, getSingleProduct, deleteProduct, getAllProduct } =
  productController;

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.get("/", getAllProduct);

export const productRoute = router;
