import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.connection.execute(
      `SELECT o.id, u.id 'userId'  
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Users AS u
      ON o.userId = u.id
      ORDER BY o.id`,
    );
    const [rows] = orders;
    return rows as Order[];
  }
}