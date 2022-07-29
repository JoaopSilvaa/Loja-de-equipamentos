import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';

const doToken = (username: string, password: string): string => {
  const token = jwt.sign({ username, password }, 'secretSecret', { algorithm: 'HS256' });
  return token;
};

export default class UserService {
  public model: UserModel;
  
  constructor() {
    this.model = new UserModel(connection);
  }
  
  public async create(user: User): Promise<string> {
    const { username, password } = user;
    await this.model.create(user);
    const token = doToken(username, password);
    return token;
  }
  
  // public async getAll(): Promise<Product[]> {
  //   const result = await this.model.getAll();
  //   return result;
  // }
}