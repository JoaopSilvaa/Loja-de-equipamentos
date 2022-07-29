import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validationUser from '../middlewares/login.middleware';

const router = Router();

const user = new UserController();

router.post('/users', user.create);
router.post('/login', validationUser, user.login);

export default router;