import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interface';
import ProductModel from '../models/product.model';

export default class OrderService {
  public model: OrderModel;

  public modelProduct: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.modelProduct = new ProductModel(connection);
  }

  public async create(id: number, productIds: any): Promise<number> {
    const orderId = await this.model.create(id);
    productIds.forEach(async (product: any) => {
      await this.modelProduct.updateWithOrder(product, orderId);
    });
    return orderId;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.model.getAll();
    
    return result;
  }
}