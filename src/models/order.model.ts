import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

function generateNewOrders(orders: any, productsIdsByOrder: any): any {
  const newOrders = orders.map((order: any, index: any) => {
    const productsIds = productsIdsByOrder[index];
    return { ...order, productsIds };
  });
  return newOrders;
}

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async searchProductsIds(orderId: number | undefined): Promise<any> {
    const productId = await this.connection.execute(
      'SELECT id FROM Trybesmith.Products WHERE orderId=?',
      [orderId],
    );
    return productId;
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.connection.execute(
      `SELECT o.id, u.id 'userId'  
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Users AS u
      ON o.userId = u.id`,
    );
    let [rows] = orders;
    const oorders = rows as Order[];
    const productsIdsByOrder = await Promise.all(oorders.map(async (order) => {
      const productId = await this.searchProductsIds(order.id);
      [rows] = productId;
      const productIds = productId[0].map((product: any) => product.id);
      return productIds;
    }));
    const newOrders = generateNewOrders(oorders, productsIdsByOrder);
    return newOrders;
  }

  public async create(id: number): Promise<number> {
    const order = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [id],
    );
    const [dataInsert] = order;
    const { insertId } = dataInsert;
    return insertId;
  }
}