import express, { Request, Response } from "express";
import { ProductRouter } from "./modules/products/product.route";
import { OrderRouter } from "./modules/orders/order.route";
const app = express();

//parser
app.use(express.json());

//middleware
app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

export default app;
