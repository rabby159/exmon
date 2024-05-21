import { Request, Response } from "express";
import { OrderService } from "./order.service";

//create new order
const createOrder = async(req: Request, res: Response) => {
    
    const OrderData = req.body;

    const result = await OrderService.createOrder(OrderData)
    
    res.json({
        success: true,
        message: "Order created successfully!",
        data : result
    })
};

//get all order
const getAllOrder = async(req: Request, res: Response) =>{
    try{
        const result = await OrderService.getAllOrder();

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