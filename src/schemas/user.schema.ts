import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PrimaryGeneratedColumn } from 'typeorm';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  id: number;

  @Prop()
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
