import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import OrderService from '../services/order.service';
import UserService from '../services/user.service';

const properties = ['productsIds'];

function validateProperties(productIds: []): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(productIds, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateLength(productIds: []): [boolean, string | null] {
  if (productIds.length === 0) {
    return [false, 'productsIds'];
  }
  return [true, null];
}

function validateArray(productIds: []): [boolean, string | null] {
  if (typeof productIds !== 'object') {
    return [false, 'array'];
  }
  return [true, null];
}

function validationProductsIds(requerement: any) {
  let [valid, property] = validateProperties(requerement);
  if (!valid) return { status: 400, message: { message: `"${property}" is required` } };
  const [valide, propriedade] = validateArray(requerement.productsIds);
  if (!valide) {
    return { status: 422, message: { message: `"productsIds" must be an ${propriedade}` } };
  }
  [valid, property] = validateLength(requerement.productsIds);
  if (!valid) {
    return { status: 422, message: { message: `"${property}" must include only numbers` } };
  }
}

export default class OrderController {
  public service: OrderService;

  public userService: UserService;

  constructor() {
    this.service = new OrderService();
    this.userService = new UserService();
  }

  public auth = async (token: any): Promise<number | undefined> => {
    const decoded = jwt.verify(token, 'secretSecret');
    let username; let 
      password = '';
    if (typeof decoded !== 'string') {
      username = decoded.username;
      password = decoded.password;
    }  

    const user = await this.userService.getUser(username, password);
    return user.id;
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const { productsIds } = req.body;

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const user = await this.auth(token);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      const result = validationProductsIds(req.body);
      if (result) return res.status(result.status).json(result.message);
      await this.service.create(user, productsIds);
      
      res.status(201).json({ userId: user, productsIds });
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.service.getAll();

    res.status(200).json(orders);
  };
}