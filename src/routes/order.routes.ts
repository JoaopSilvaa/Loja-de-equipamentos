import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const router = Router();

const order = new OrderController();

router.post('/orders', order.create);
router.get('/orders', order.getAll);

export default router;
