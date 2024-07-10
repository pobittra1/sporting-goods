import express from "express";
import { productController } from "./product.controller";

//destructure controllers
const { addProduct, getSingleProduct } = productController;

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/:id", getSingleProduct);

export const productRoute = router;
