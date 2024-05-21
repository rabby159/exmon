"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define schema for Variant
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().nonempty("Variant type is required"),
    value: zod_1.z.string().nonempty("Variant type is required")
});
// Define schema for Inventory
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
    inStock: zod_1.z.boolean()
});
// Define schema for Product
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Variant type is required"),
    description: zod_1.z.string().nonempty("Variant type is required"),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string().nonempty("Variant type is required"),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    variants: zod_1.z.array(VariantValidationSchema).optional(),
    inventory: InventoryValidationSchema
});
exports.default = ProductValidationSchema;
