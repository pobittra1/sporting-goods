import express from "express";
import { productController } from "./product.controller";

//destructure controllers
const { addProduct, getSingleProduct, deleteProduct } = productController;

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);

export const productRoute = router;
