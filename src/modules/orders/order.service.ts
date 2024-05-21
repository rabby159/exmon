import { Orders } from './order.interface';
import { Order } from './order.model';


const createOrder = async (orLoad: Orders) => {
    const result = await Order.create(orLoad);
  
    return result;
  };




export const OrderService = {
    createOrder
}