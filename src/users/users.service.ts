import {
  BadRequestException,
  Body,
  ForbiddenException,
  Injectable,
  Param,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcryptjs';
import { Bank, BankDocument } from '../schemas/bank.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Bank.name) private bankModel: Model<BankDocument>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(dto.password, salt);
    const newUser = new this.userModel({
      id: dto.id,
      email: dto.email,
      password: hashedPassword,
      username: dto.username,
      balance: dto.balance,
    });

    return newUser.save();
  }

  async createBankAccount(_id: number, balance: number): Promise<Bank> {
    const userBank = await new this.bankModel(_id, balance);

    return userBank;
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async getBalance(id: string) {
    const userId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;

    if (!userId) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = await this.userModel.findById(userId).lean();

    if (!user) {
      throw new ForbiddenException('У вас нет доступа');
    }

    return {
      balance: user.balance,
    };
  }

  async updateAcctBal(email: string, sum: number) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new ForbiddenException('У вас нет доступа');
    }

    const balanceSum = user.balance + sum;

    if (balanceSum < 0) {
      throw new BadRequestException('Недостаточно средств на счете');
    }

    await this.userModel.findOneAndUpdate({ email }, { balance: balanceSum });

    return {
      balance: balanceSum,
    };
  }

  async withdraw(email: string, minus: number) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new ForbiddenException('У вас нет доступа');
    }

    const balanceMinus = user.balance - minus;

    if (balanceMinus < 0) {
      throw new BadRequestException('Недостаточно средств на счете');
    }

    await this.userModel.findOneAndUpdate({ email }, { balance: balanceMinus });

    return {
      balance: balanceMinus,
    };
  }
}
