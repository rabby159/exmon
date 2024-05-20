import { Schema, model } from "mongoose";
import { Variant, Inventory, Products } from "./product.interface";


const variantSchema = new Schema<Variant>({
    type: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
});

const inventorySchema = new Schema<Inventory>({
    quantity: {
        type: Number,
        required: true
      },
      inStock: {
        type: Boolean,
        required: true
      }
});

const productsSchema = new Schema<Products>({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      tags: [{
        type: String
      }],
      variants: [variantSchema],
      inventory: inventorySchema
});

export const Product = model<Products>("Product", productsSchema)