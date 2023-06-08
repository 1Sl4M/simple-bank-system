import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Bank, BankSchema } from "../schemas/bank.schema";
import { BankService } from "../bank/bank.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Bank.name, schema: BankSchema }]),
  ],
  providers: [UsersService, BankService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
