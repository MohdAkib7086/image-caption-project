import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Chat } from './chat.schema';

export enum UserRole {
  Admin = 'admin',
  Employer = 'employer',
}


@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  resetPasswordToken: string;

  @Prop()
  resetPasswordExpires: number;

  @Prop({ enum: UserRole, default: UserRole.Employer })
  role: UserRole;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }] })
  chat: Chat[];
}

export const UserSchema = SchemaFactory.createForClass(User);
