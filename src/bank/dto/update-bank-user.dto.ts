import { PartialType } from '@nestjs/mapped-types';
import { CreateBankUserDto } from "./create-bank-user.dto";

export class UpdateUserDto extends PartialType(CreateBankUserDto) {}
