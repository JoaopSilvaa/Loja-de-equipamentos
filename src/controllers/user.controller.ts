import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  public service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const token = await this.service.create(user);

    res.status(201).json({ token });
  };
}