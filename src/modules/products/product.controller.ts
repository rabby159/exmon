import { NextFunction, Request, Response } from "express"
import { ProductService } from "./product.service"
import ProductValidationSchema from './product.validation';
import { ZodError } from 'zod';

//create product
const createProduct = async(req: Request, res: Response) => {
    
    try{

    const zodParsedData = ProductValidationSchema.parse(req.body);
    

    const result = await ProductService.createProduct(zodParsedData);

    res.json({
        success: true,
        message: "Product created successfully!",
        data : result
    });

    }catch(error){
        if (error instanceof ZodError) {
            res.status(400).json({
              success: false,
              message: 'Validation error',
              error: error.issues
            });
          }else{
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error
              });
          }
    }

};

//get all product
const getAllProduct = async(req: Request, res: Response) =>{
    try{


        const { searchTerm } = req.query as { searchTerm: string };

        const result = await ProductService.getAllProduct(searchTerm);

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data : result
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Could Not fetched products!" ,
            error: err
        })
    }
};

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
    }catch(err){
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
    }catch(err){
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
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Could Not fetched products!" ,
            error: err
        })
    }
};

//error handling 
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
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

const routeNotFound = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
};

export const ProductController = {
    createProduct,
    getAllProduct,
    getProductId,
    updateProductById,
    deleteProductById,
    errorHandler,
    routeNotFound

}