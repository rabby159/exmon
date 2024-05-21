import { NextFunction, Request, Response } from "express";
import { OrderService } from "./order.service";
import { ZodError } from "zod";
import OrdersValidationSchema from "./order.validation";

//create new order
const createOrder = async (req: Request, res: Response) => {
  try {
    const zodParsedDataOrder = OrdersValidationSchema.parse(req.body);

    const result = await OrderService.createOrder(zodParsedDataOrder);

    res.json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.issues,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  }
};

//get all order
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query as { email: string };

    const result = await OrderService.getAllOrder(email);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could Not fetched orders!",
      error: err,
    });
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

export const OrderController = {
  createOrder,
  getAllOrder,
  errorHandler,
  routeNotFound
};
