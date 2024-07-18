import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: [true, "name is required"] },
    email: { type: String, required: [true, "email is required"] },
    phone: { type: String, required: [true, "phone is required"] },
    deliveryAddress: {
      type: String,
      required: [true, "deliveryAddress is required"],
    },
  },
  { timestamps: true }
);

// Create user model
export const User = mongoose.model<TUser>("User", userSchema);
