import express from "express";
import { productController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productValidation } from "./product.validation";

//destructure controllers
const {
  addProduct,
  getSingleProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} = productController;
//destructure validations
const { addProductValidationSchema, updateProductValidationSchema } =
  productValidation;

const router = express.Router();

router.post(
  "/add-product",
  validateRequest(addProductValidationSchema),
  addProduct
);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.get("/", getAllProduct);
router.patch(
  "/:id",
  validateRequest(updateProductValidationSchema),
  updateProduct
);

export const productRoute = router;
