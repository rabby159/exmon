import { ObjectId } from 'bson';
import { Types } from 'mongoose';
import { z } from 'zod';


const OrdersValidationSchema = z.object({
    email: z.string().email(), 
    productId: z.string().optional().refine((val) => !val || ObjectId.isValid(val), {
        message: "Invalid productId",
    }),
    price: z.number(),
    quantity: z.number()
}).transform(data => ({
    ...data,
    productId: data.productId ? new Types.ObjectId(data.productId) : undefined
}));

export default OrdersValidationSchema;