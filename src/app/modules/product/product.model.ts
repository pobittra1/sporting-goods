import mongoose, { Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
  name: { type: String, required: [true, "name is required"] },
  category: { type: String, required: [true, "category is required"] },
  quantity: { type: Number, required: [true, "quantity is required"] },
  brand: { type: String, required: [true, "brand is required"] },
  rating: { type: Number },
  description: { type: String, required: [true, "description is required"] },
  price: { type: String, required: [true, "price is required"] },
  image: { type: String, required: [true, "image is required"] },
});

// Create model
const Product = mongoose.model<TProduct>("Product", productSchema);

export default Product;
