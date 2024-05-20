import express, { Request, Response } from "express";
import { ProductRouter } from "./modules/products/product.route";
const app = express();

//parser
app.use(express.json());

//middleware
app.use("/api/products", ProductRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

export default app;
