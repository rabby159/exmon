import { z } from 'zod';

// Define schema for Variant
const VariantValidationSchema = z.object({
  type: z.string().nonempty("Variant type is required"),
  value: z.string().nonempty("Variant type is required")
});

// Define schema for Inventory
const InventoryValidationSchema = z.object({
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  inStock: z.boolean()
});

// Define schema for Product
const ProductValidationSchema = z.object({
  name: z.string().nonempty("Variant type is required"),
  description: z.string().nonempty("Variant type is required"),
  price: z.number().positive(),
  category: z.string().nonempty("Variant type is required"),
  tags: z.array(z.string()).optional(),
  variants: z.array(VariantValidationSchema).optional(),
  inventory: InventoryValidationSchema
});

export default ProductValidationSchema;
