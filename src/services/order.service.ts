import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interface';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  //   public async create(product: Product): Promise<Product> {
  //     const result = await this.model.create(product);
  //     return result;
  //   }

  public async getAll(): Promise<Order[]> {
    const result = await this.model.getAll();
    
    return result;
  }
}