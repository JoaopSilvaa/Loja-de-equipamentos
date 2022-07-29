import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const router = Router();

const product = new ProductController();

router.post('/products', product.create);

export default router;
