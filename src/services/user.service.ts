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
  
  public async login(username: string, password: string): Promise<void | string> {
    const user = await this.model.getUser(username, password);
    if (!user) {
      return user;
    }

    const token = doToken(username, password);
    return token;
  }

  public async getUser(username: string, password: string): Promise<User> {
    const result = await this.model.getUser(username, password);
    
    return result;
  }
}