import { Request, Response } from "express"
import { ProductService } from "./product.service"

const createProduct = async(req: Request, res: Response) => {

    const ProductData = req.body;

    const result = await ProductService.createProduct(ProductData);
    
    res.json({
        "success": true,
        "message": "Product created successfully!",
        "data" : result
    })

};

export const ProductController = {
    createProduct
}