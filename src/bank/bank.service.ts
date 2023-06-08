import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bank, BankDocument } from '../schemas/bank.schema';
import { Model } from 'mongoose';
import { CreateBankUserDto } from './dto/create-bank-user.dto';

@Injectable()
export class BankService {
  constructor(@InjectModel(Bank.name) private bankModel: Model<BankDocument>) {}

  async findByEmail(email: string) {
    return this.bankModel.findOne({ email });
  }

  async createBank(dto: CreateBankUserDto) {
    const bank = await new this.bankModel(dto);

    return bank.save();
  }

  async getATM(dto: CreateBankUserDto, nameOfBank) {
    const bank = await this.bankModel.findOne({ nameOfBank });

    if (!bank) {
      throw new ForbiddenException('У вас нет доступа');
    }

    return {
      atm: bank.atm,
    };
  }
}
