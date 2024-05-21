"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./modules/products/product.route");
const order_route_1 = require("./modules/orders/order.route");
const product_controller_1 = require("./modules/products/product.controller");
const order_controller_1 = require("./modules/orders/order.controller");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
//middleware
app.use("/api/products", product_route_1.ProductRouter);
app.use("/api/orders", order_route_1.OrderRouter);
app.use(product_controller_1.ProductController.errorHandler);
app.use(product_controller_1.ProductController.routeNotFound);
app.use(order_controller_1.OrderController.errorHandler);
app.use(order_controller_1.OrderController.routeNotFound);
app.get("/", (req, res) => {
    res.send("Welcome My Backend Project");
});
exports.default = app;
