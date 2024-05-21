import { ObjectId } from 'bson';
import { Orders } from './order.interface';
import { Order } from './order.model';


const createOrder = async (orLoad: Orders) => {

    const result = await Order.create(orLoad);
  
    return result;
  };

  const getAllOrder = async (email: string) => {
    const searchReg = new RegExp(email, 'i');

  const result = await Order.find({
    $or: [
      { email: { $regex: searchReg } },
    ]
  });
  
    return result;
  };

export const OrderService = {
    createOrder,
    getAllOrder
}