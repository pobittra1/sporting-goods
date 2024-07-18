import httpStatus from "http-status";
import AppError from "../../config/error/AppError";
import { TProduct, TProductCart } from "./product.interface";
import { Product } from "./product.model";
import mongoose from "mongoose";
import { ProductCart } from "./productCart.model";

// import { Models } from "./product.model";

// const { Product, ProductCart } = Models;

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
  const {
    name,
    category,
    stockQuantity,
    brand,
    rating,
    description,
    price,
    image,
  } = payload;
  const result = await Product.findByIdAndUpdate(
    id,
    { name, category, stockQuantity, brand, rating, description, price, image },
    { new: true }
  );

  return result;
};

const getProductsByCategoryFromDB = async (category: string) => {
  const product = await Product.find({ category: category });
  return product;
};

const addProductToCartIntoDB = async (productCartedData: TProductCart) => {
  const { product: productCartedId } = productCartedData;
  const objIdForStrProductId = new mongoose.Types.ObjectId(productCartedId);
  const isExistProduct = await Product.findById(objIdForStrProductId);
  if (!isExistProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found !");
  }

  productCartedData.stockQuantity = isExistProduct.stockQuantity;
  const strIdForProductId = objIdForStrProductId.toString();

  const isExistProductCart = await ProductCart.findOne({
    product: strIdForProductId,
  });
  if (isExistProductCart) {
    await Product.findOneAndUpdate(
      { _id: objIdForStrProductId },
      { stockQuantity: isExistProduct.stockQuantity - 1 },
      { new: true }
    );
    await ProductCart.findOneAndUpdate(
      { product: strIdForProductId },
      { quantity: isExistProductCart.quantity + 1 },
      { new: true }
    );
  }
  if (isExistProductCart === null) {
    isExistProduct.product = productCartedId;
    const result = await ProductCart.create(productCartedData);
    return result;
  }
};

const getCartsProductFromDB = async () => {
  const productCart = await ProductCart.find();
  return productCart;
};

const increaseQuantityFromDB = async (id: string) => {
  const product = await ProductCart.findOne({ _id: id });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found !");
  }

  const newQuantity = product.quantity + 1;

  // Update the product quantity
  const result = await ProductCart.updateOne(
    { _id: id },
    { $set: { quantity: newQuantity } },
    { new: true }
  );

  return result;
};
const decreaseQuantityFromDB = async (id: string) => {
  const product = await ProductCart.findOne({ _id: id });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found !");
  }

  const newQuantity = product.quantity - 1;

  // Update the product quantity
  const result = await ProductCart.updateOne(
    { _id: id }, // Filter to find the specific product by ID
    { $set: { quantity: newQuantity } }, // Set the new quantity
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
  addProductToCartIntoDB,
  getProductsByCategoryFromDB,
  getCartsProductFromDB,
  increaseQuantityFromDB,
  decreaseQuantityFromDB,
};
