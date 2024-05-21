import { Products } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (proLoad: Products) => {
  const result = await Product.create(proLoad);

  return result;
};

const getAllProduct = async (searchTerm: string) => {
  
  const searchReg = new RegExp(searchTerm, 'i');

  const result = await Product.find({
    $or: [
      { name: { $regex: searchReg } },
      { description: { $regex: searchReg } },
      { tags: { $regex: searchReg } },
      { category: { $regex: searchReg } }
    ]
  });

  return result;
};

const getProductId = async (id: string) => {
  const result = await Product.findById(id);

  return result;
};

const updateProductById = async (id: string) => {
  const result = await Product.findByIdAndUpdate(id);

  return result;
};

const deleteProductById = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);

  return result;
};

export const ProductService = {
  createProduct,
  getAllProduct,
  getProductId,
  updateProductById,
  deleteProductById,
  // getProductInSearch,
};
