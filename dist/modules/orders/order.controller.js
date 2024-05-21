"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const zod_1 = require("zod");
const order_validation_1 = __importDefault(require("./order.validation"));
//create new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodParsedDataOrder = order_validation_1.default.parse(req.body);
        const result = yield order_service_1.OrderService.createOrder(zodParsedDataOrder);
        res.json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Validation error",
                error: error.issues,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error,
            });
        }
    }
});
//get all order
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const result = yield order_service_1.OrderService.getAllOrder(email);
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could Not fetched orders!",
            error: err,
        });
    }
});
//error handling 
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: err.issues
        });
    }
    switch (err.message) {
        case 'InsufficientQuantity':
            return res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory'
            });
        case 'OrderNotFound':
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        default:
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: err.message
            });
    }
};
const routeNotFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
};
exports.OrderController = {
    createOrder,
    getAllOrder,
    errorHandler,
    routeNotFound
};
