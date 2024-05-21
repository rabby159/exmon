import express, { Request, Response } from "express";
import { ProductRouter } from "./modules/products/product.route";
import { OrderRouter } from "./modules/orders/order.route";
import { ProductController } from "./modules/products/product.controller";
import { OrderController } from "./modules/orders/order.controller";
const app = express();

//parser
app.use(express.json());

//middleware
app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);
app.use(ProductController.errorHandler);
app.use(ProductController.routeNotFound);
app.use(OrderController.errorHandler);
app.use(OrderController.routeNotFound);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

export default app;
