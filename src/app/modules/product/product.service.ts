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
  const product = await Product.findOne({ category: category });
  return product;
};

const addProductToCartIntoDB = async (productCartedData: TProductCart) => {
  const { product: productCartedId } = productCartedData;
  const objIdForStrProductId = new mongoose.Types.ObjectId(productCartedId);
  const isExistProduct = await Product.findById(objIdForStrProductId);
  if (!isExistProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found !");
  }
  const strIdForProductId = objIdForStrProductId.toString();

  const isExistProductCart = await ProductCart.findOne({
    product: strIdForProductId,
  });
  // console.log("ay babu", isExistProductCart);
  if (isExistProductCart) {
    // await Product.findOneAndUpdate(
    //   { _id: objIdForStrProductId },
    //   { stockQuantity: -1 },
    //   { new: true }
    // );
    // await ProductCart.findOneAndUpdate(
    //   { product: strIdForProductId },
    //   { quantity: +1 },
    //   { new: true }
    // );
    // isExistProduct.stockQuantity = isExistProduct.stockQuantity - 1;
    // isExistProductCart.quantity = isExistProductCart.quantity + 1;
    // console.log(isExistProductCart.quantity);
  }
  if (isExistProductCart === null) {
    isExistProduct.product = productCartedId;
    const result = await ProductCart.create(productCartedData);
    console.log("something");
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
