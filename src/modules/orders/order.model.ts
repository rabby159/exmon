import mongoose, { Schema, model } from "mongoose";
import { Orders } from "./order.interface";


const ordersSchema = new Schema<Orders>({
    email: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

export const Order = model<Orders>("Order", ordersSchema);