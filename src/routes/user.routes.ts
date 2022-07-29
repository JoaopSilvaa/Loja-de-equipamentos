import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validationLogin from '../middlewares/login.middleware';
import validationUser from '../middlewares/user.middleware';

const router = Router();

const user = new UserController();

router.post('/users', validationUser, user.create);
router.post('/login', validationLogin, user.login);

export default router;