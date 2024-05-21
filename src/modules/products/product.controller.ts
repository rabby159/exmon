import { Product } from './product.model';
import { Request, Response } from "express"
import { ProductService } from "./product.service"
import ProductValidationSchema from './product.validation';
import { ZodError } from 'zod';

//create product
const createProduct = async(req: Request, res: Response) => {
    
    try{
        // const {Product : ProductData} = req.body;
    //validation using zod

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
                // error: error.message
              });
          }
    }

};

//get all product
const getAllProduct = async(req: Request, res: Response) =>{
    try{

        const { searchTerm } = req.query as { searchTerm: string };

        if (!searchTerm) {
            return res.status(400).json({
              success: false,
              message: "Search term is required"
            });
          }

        const result = await ProductService.getAllProduct(searchTerm);

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

export const ProductController = {
    createProduct,
    getAllProduct,
    getProductId,
    updateProductById,
    deleteProductById
}