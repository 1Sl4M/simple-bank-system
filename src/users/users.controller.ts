import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { BankService } from '../bank/bank.service';
import { CreateBankUserDto } from '../bank/dto/create-bank-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly bankService: BankService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':nameOfBank')
  getATM(
    @Body() dto: CreateBankUserDto,
    @Param('nameOfBank') nameOfBank: string,
  ) {
    return this.bankService.getATM(dto, nameOfBank);
  }
}
