import { Products } from "./product.interface"
import { Product } from "./product.model";


const createProduct =  async(proLoad: Products) => {
    const result = await Product.create(proLoad);

    return result;
};

const getAllProduct =  async() => {
    const result = await Product.find();

    return result;
};

export const ProductService = {
    createProduct,
    getAllProduct
}