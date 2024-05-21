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

const getProductId =  async(id: string) => {
    const result = await Product.findById(id);

    return result;
};

const updateProductById =  async(id: string) => {
    const result = await Product.findByIdAndUpdate(id);

    return result;
};

const deleteProductById =  async(id: string) => {
    const result = await Product.findByIdAndDelete(id);

    return result;
};

const getProductInSearch =  async(searchReg: any) => {
    const result = await Product.find({
        $or: [
            {name : searchReg},
            {description: searchReg},
            {tags: searchReg},
            {category: searchReg}
        ]
    });

    return result;
};

export const ProductService = {
    createProduct,
    getAllProduct,
    getProductId,
    updateProductById,
    deleteProductById,
    getProductInSearch
}