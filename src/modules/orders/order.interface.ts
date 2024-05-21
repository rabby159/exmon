import mongoose from "mongoose";


export type Orders = {
    email: string;
    productId: mongoose.Schema.Types.ObjectId;
    price: number;
    quantity: number;
}