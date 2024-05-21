import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { ZodError } from "zod";
import OrdersValidationSchema from "./order.validation";

//create new order
const createOrder = async(req: Request, res: Response) => {
    
    try{
        // const OrderData = req.body;

        const zodParsedDataOrder = OrdersValidationSchema.parse( req.body)

    const result = await OrderService.createOrder(zodParsedDataOrder)
    
    res.json({
        success: true,
        message: "Order created successfully!",
        data : result
    })
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

//get all order
const getAllOrder = async(req: Request, res: Response) =>{
    try{

        const { email } = req.query as { email: string };

        if (!email) {
            return res.status(400).json({
              success: false,
              message: "Search email is required"
            });
          }

        const result = await OrderService.getAllOrder(email);

        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data : result
        })

    }catch(err: any){
        res.status(500).json({
            success: false,
            message: "Could Not fetched orders!" ,
            error: err
        })
    }
}


export const OrderController = {
    createOrder,
    getAllOrder
}