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

const deleteProductFromDB = async (id: string) => {
  // delete the Product
  const result = await Product.findByIdAndDelete(id);

  return result;
};
const getAllProductFromDB = async () => {
  // delete the Product
  const result = await Product.find();

  return result;
};

const updateProductFromDB = async (id: string, payload: Partial<TProduct>) => {
  // update the Product
  const { name, category, quantity, brand, rating, description, price, image } =
    payload;
  const result = await Product.findByIdAndUpdate(
    id,
    { name, category, quantity, brand, rating, description, price, image },
    { new: true }
  );

  return result;
};

export const productService = {
  addProductIntoDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  getAllProductFromDB,
  updateProductFromDB,
};
