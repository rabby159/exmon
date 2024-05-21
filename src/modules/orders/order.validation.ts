import { z } from 'zod';

const OrdersValidationSchema = z.object({
    email: z.string().email(), 
    productId: z.string().optional(),
    price: z.number(),
    quantity: z.number()
});

export default OrdersValidationSchema;