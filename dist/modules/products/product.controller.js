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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const zod_1 = require("zod");
//create product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodParsedData = product_validation_1.default.parse(req.body);
        const result = yield product_service_1.ProductService.createProduct(zodParsedData);
        res.json({
            success: true,
            message: "Product created successfully!",
            data: result
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.issues
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error
            });
        }
    }
});
//get all product
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        if (!searchTerm) {
            return res.status(400).json({
                success: false,
                message: "Search term is required"
            });
        }
        const result = yield product_service_1.ProductService.getAllProduct(searchTerm);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could Not fetched products!",
            error: err
        });
    }
});
//get all product by there id
const getProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductService.getProductId(productId);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could Not fetched products!",
            error: err
        });
    }
});
//update all product by there id
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.updateProductById(productId);
        res.status(200).json({
            success: true,
            message: "Products Update successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could Not fetched products!",
            error: err
        });
    }
});
//delete all product by there id
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.deleteProductById(productId);
        res.status(200).json({
            success: true,
            message: "Products Delete successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could Not fetched products!",
            error: err
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
exports.ProductController = {
    createProduct,
    getAllProduct,
    getProductId,
    updateProductById,
    deleteProductById,
    errorHandler,
    routeNotFound
};
