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
  addProductToCart,
  getProductsByCategory,
  getCartProducts,
  increaseQuantity,
  decreaseQuantity,
} = productController;
//destructure validations
const {
  addProductValidationSchema,
  updateProductValidationSchema,
  addProductCartValidationSchema,
} = productValidation;

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
router.get("/category/:category", getProductsByCategory);

router.post(
  "/add-product-to-cart",
  validateRequest(addProductCartValidationSchema),
  addProductToCart
);

router.get("/cart-products/product", getCartProducts);

router.patch("/quantity/increase/:id", increaseQuantity);
router.patch("/quantity/decrease/:id", decreaseQuantity);
export const productRoute = router;
