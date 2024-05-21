import express from 'express'
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProduct);
router.get('/:productId', ProductController.getProductId);
router.put('/:productId', ProductController.updateProductById);
router.delete('/:productId', ProductController.deleteProductById);
router.get('/', ProductController.getProductInSearch);

export const ProductRouter = router;