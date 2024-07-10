import express from "express";
import { productController } from "./product.controller";

//destructure controllers
const { addProduct } = productController;

const router = express.Router();

router.post("/add-product", addProduct);

export const productRoute = router;
