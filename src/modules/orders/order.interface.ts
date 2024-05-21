import { Types } from "mongoose";

export type Orders = {
  email: string;
  productId?: Types.ObjectId;
  price: number;
  quantity: number;
};
