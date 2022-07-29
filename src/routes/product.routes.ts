import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import validationProduct from '../middlewares/product.middleware';

const router = Router();

const product = new ProductController();

router.post('/products', validationProduct, product.create);
router.get('/products', product.getAll);

export default router;
