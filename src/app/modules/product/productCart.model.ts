import mongoose, { Schema } from "mongoose";
import { TProductCart } from "./product.interface";

const productCartSchema = new Schema<TProductCart>(
  {
    name: { type: String, required: [true, "name is required"] },
    category: { type: String, required: [true, "category is required"] },
    quantity: { type: Number, default: 1 },
    brand: { type: String, required: [true, "brand is required"] },
    rating: { type: Number },
    description: { type: String, required: [true, "description is required"] },
    price: { type: Number, required: [true, "price is required"] },
    image: { type: String, required: [true, "image is required"] },
    product: { type: String, required: [true, "product is required"] },
    stockQuantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Create product cart model
export const ProductCart = mongoose.model<TProductCart>(
  "ProductCart",
  productCartSchema
);
