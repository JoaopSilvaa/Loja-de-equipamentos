import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  public service: OrderService;

  constructor() {
    this.service = new OrderService();
  }

  // public create = async (req: Request, res: Response) => {
  //   const { productsIds } = req.body;

  //   const token = req.headers.Authentication;

  //   if (!token) {
  //     return res.status(401).json({ message: 'Token not found' });
  //   }

  //   const user = await verify(token);

  //   if (!user) {
  //     return res.status(401).json({ message: 'Invalid Token' });
  //   }

  //   const orderCreated = await this.service.create(productsIds);

  //   res.status(201).json(orderCreated);
  // };
 
  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.service.getAll();

    res.status(200).json(orders);
  };
}