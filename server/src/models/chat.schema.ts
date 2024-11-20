
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './users.schema';
 
@Schema({
    timestamps: true,
})
export class Chat {
    @Prop()
    chatId: string;
 
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
 
    @Prop()
    email: string;
 
    @Prop()
    password: string;
 
    @Prop()
    message: string;
 
    @Prop()
    favorite: boolean;
 
    @Prop()
    createdAt: number;
 
    @Prop()
    model: string;
}
 
export const ChatSchema = SchemaFactory.createForClass(Chat);
 