import { Types } from "mongoose";

export type TProduct = {
  name: string;
  category: string;
  quantity: number;
  brand: string;
  rating: number;
  description: string;
  price: string;
  image: string;
};
export type TProductCart = {
  name: string;
  category: string;
  quantity: number;
  brand: string;
  rating: number;
  description: string;
  price: string;
  image: string;
  product: Types.ObjectId;
};
