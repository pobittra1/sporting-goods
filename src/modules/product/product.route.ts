import express from "express";

const router = express.Router();

router.post("/add-product", productController.createProduct);

export const productRoute = router;
