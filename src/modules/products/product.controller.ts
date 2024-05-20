import { Request, Response } from "express"
import { ProductService } from "./product.service"

const createProduct = async(req: Request, res: Response) => {

    const ProductData = req.body;

    const result = await ProductService.createProduct(ProductData);
    
    res.json({
        success: true,
        message: "Product created successfully!",
        data : result
    })

};

const getAllProduct = async(req: Request, res: Response) =>{
    try{
        const result = await ProductService.getAllProduct();

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data : result
        })

    }catch(err: any){
        res.status(500).json({
            success: false,
            message: "Could Not fetched products!" ,
            error: err
        })
    }
}

export const ProductController = {
    createProduct,
    getAllProduct
}