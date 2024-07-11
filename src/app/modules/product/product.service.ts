import httpStatus from "http-status";
import AppError from "../../config/error/AppError";
import { TProduct, TProductCart } from "./product.interface";
import { Models } from "./product.model";

const { Product, ProductCart } = Models;

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
const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  let name = "";
  if (query?.name) {
    name = query?.name as string;
  }
  const searchQuery = Product.find({ name: { $regex: name, $options: "i" } });

  //filtering
  delete queryObj.name;
  delete queryObj.sort;
  // get all Product
  const filterQuery = searchQuery.find(queryObj);

  let sort = "-createdAt";
  if (query?.sort) {
    sort = query?.sort as string;
  }

  const sortQuery = await filterQuery.sort(sort);

  return sortQuery;
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

const getProductsByCategoryFromDB = async (category: string) => {
  const product = await Product.findOne({ category: category });
  console.log("from servise", product);
  return product;
};

const addProductToCartIntoDB = async (productCartedData: TProductCart) => {
  const { product: productCartedId } = productCartedData;
  const isExistProduct = await Product.findById(productCartedId);
  if (!isExistProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found !");
  }
  // const { _id: productId } = isExistProduct;
  const isExistProductCart = await ProductCart.findById(productCartedId);
  if (isExistProductCart) {
    isExistProduct.quantity = isExistProduct.quantity - 1;
    isExistProductCart.quantity = isExistProductCart.quantity + 1;
  }
  if (!isExistProductCart) {
    const result = await ProductCart.create(isExistProduct);
    return result;
  }
};

export const productService = {
  addProductIntoDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  getAllProductFromDB,
  updateProductFromDB,
  addProductToCartIntoDB,
  getProductsByCategoryFromDB,
};
