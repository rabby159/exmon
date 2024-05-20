import { Products } from "./product.interface"
import { Product } from "./product.model";


const createProduct =  async(proLoad: Products) => {
    const result = await Product.create(proLoad);

    return result;
};

export const ProductService = {
    createProduct
}