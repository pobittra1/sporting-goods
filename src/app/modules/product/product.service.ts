import AppError from "../../config/error/AppError";
import { TProduct } from "./product.interface";
import Product from "./product.model";

const addProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(404, "product is not found");
  }

  return product;
};

export const productService = {
  addProductIntoDB,
  getSingleProductFromDB,
};
