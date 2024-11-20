import { Injectable } from '@nestjs/common';
import { IUser } from './users.interface';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/models/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: mongoose.Model<User>,
  ) {}

  private readonly users: IUser[] = [
    {
      email: 'israel.lavi@lumiq.ai',
      name: 'Israel Lavi',
      password: '123456',
    },
    {
      email: 'john.smith@gmail.com',
      name: 'John Smith',
      password: '123456',
    },
  ];

  async findOne(email: string): Promise<IUser | undefined> {
    return this.userModel.findOne({ email });
    // return this.users.find(user => user.email === email);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUser | undefined> {
    console.log(
      `[UsersService] validateUser, email: ${email}, password: ${password}`,
    );
    const user = await this.userModel.findOne({ email, password });
    // const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      console.log('[UsersService] validateUser: found user', user);
      return { ...user, password: undefined };
    }
    return undefined;
  }
}
