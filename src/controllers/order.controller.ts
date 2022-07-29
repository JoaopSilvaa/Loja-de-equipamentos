import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  public service: OrderService;

  constructor() {
    this.service = new OrderService();
  }

  //   public create = async (req: Request, res: Response) => {
  //     const product = req.body;

  //     const productCreated = await this.service.create(product);

  //     res.status(201).json(productCreated);
  //   };

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.service.getAll();

    res.status(200).json(orders);
  };
}