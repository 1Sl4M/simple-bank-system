import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PrimaryGeneratedColumn } from 'typeorm';

export type BankDocument = Bank & Document;

@Schema()
export class Bank {
  @PrimaryGeneratedColumn()
  _id: number;

  @Prop()
  nameOfBank: string;

  @Prop()
  atm: string;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
