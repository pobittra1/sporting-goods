import mongoose, { Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: [true, "name is required"] },
    category: { type: String, required: [true, "category is required"] },
    stockQuantity: { type: Number },
    brand: { type: String, required: [true, "brand is required"] },
    rating: { type: Number },
    description: { type: String, required: [true, "description is required"] },
    price: { type: Number, required: [true, "price is required"] },
    image: { type: String, required: [true, "image is required"] },
    product: { type: String },
  },
  { timestamps: true }
);

// Create product model
export const Product = mongoose.model<TProduct>("Product", productSchema);

// export const Models = {
//   Product,
//   ProductCart,
// };
