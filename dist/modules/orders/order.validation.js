"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const OrdersValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string().optional().refine((val) => !val || bson_1.ObjectId.isValid(val), {
        message: "Invalid productId",
    }),
    price: zod_1.z.number(),
    quantity: zod_1.z.number()
}).transform(data => (Object.assign(Object.assign({}, data), { productId: data.productId ? new mongoose_1.Types.ObjectId(data.productId) : undefined })));
exports.default = OrdersValidationSchema;
