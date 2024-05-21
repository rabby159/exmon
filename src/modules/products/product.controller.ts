import { Product } from './product.model';
import { Request, Response } from "express"
import { ProductService } from "./product.service"

//create product
const createProduct = async(req: Request, res: Response) => {

    const ProductData = req.body;

    const result = await ProductService.createProduct(ProductData);
    
    res.json({
        success: true,
        message: "Product created successfully!",
        data : result
    })

};

//get all product
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

//get all product by there id
const getProductId = async(req: Request, res: Response) => {
    try{

        const productId = req.params.productId;

        const result = await ProductService.getProductId(productId);

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
};

//update all product by there id
const updateProductById = async(req: Request, res: Response) => {
    try{

        const  { productId } = req.params;

        const result = await ProductService.updateProductById(productId);

        res.status(200).json({
            success: true,
            message: "Products Update successfully!",
            data : result
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: "Could Not fetched products!" ,
            error: err
        })
    }
};

//delete all product by there id
const deleteProductById = async(req: Request, res: Response) => {
    try{

        const  { productId } = req.params;

        const result = await ProductService.deleteProductById(productId);

        res.status(200).json({
            success: true,
            message: "Products Delete successfully!",
            data : result
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: "Could Not fetched products!" ,
            error: err
        })
    }
};

//delete all product by there id
const getProductInSearch = async(req: Request, res: Response) => {
    try{

        const  { searchTerm } = req.params;

        const searchReg = new RegExp(searchTerm as string)

        const result = await ProductService.getProductInSearch(searchReg);

        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data : result
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: "Could Not fetched products!" ,
            error: err
        })
    }
};

export const ProductController = {
    createProduct,
    getAllProduct,
    getProductId,
    updateProductById,
    deleteProductById,
    getProductInSearch
}