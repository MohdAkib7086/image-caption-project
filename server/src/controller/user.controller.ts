import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './users.interface';
import { User } from 'src/models/users.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private usersModel: mongoose.Model<User>,
  ) { }

  // private readonly users: IUser[] = [
  //   {
  //     email: 'israel.lavi@lumiq.ai',
  //     name: 'Israel Lavi',
  //     password: '123456'
  //   },
  //   {
  //     email: 'john.smith@lumiq.ai',
  //     name: 'John Smith',
  //     password: '123456'
  //   },
  // ];



  async findOne(email: string) {
    return await this.usersModel.find({email}).exec();
  }

  async validateUser(email: string, password: string) {
    try {
      console.log("first")
      console.log(`[UsersService] validate, email: ${email}, password: ${password}`)
      const user = await this.usersModel.findOne({ email, password }).exec();
      console.log(user)
      if (user) {
        console.log('[UsersService] validate: found user', user)
        return { ...user, password: undefined }
      }
      return undefined
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
