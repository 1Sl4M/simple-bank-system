import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from '../users/users.service';
import { CreateBankUserDto } from './dto/create-bank-user.dto';
import { Bank } from '../schemas/bank.schema';
import { BankService } from './bank.service';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('bank')
export class BankController {
  constructor(
    private readonly usersService: UsersService,
    private readonly bankService: BankService,
  ) {}

  @Post()
  createBankAccount(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getBalance(@Param('id') id: string) {
    return this.usersService.getBalance(id);
  }

  @Post('createBank')
  createBank(@Body() dto: CreateBankUserDto) {
    return this.bankService.createBank(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email/update')
  updateAcctBal(@Param('email') email: string) {
    return this.usersService.updateAcctBal(email, 200);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email/minus')
  withdraw(@Param('email') email: string) {
    return this.usersService.withdraw(email, 20);
  }
}
