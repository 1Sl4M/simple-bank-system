import { IsNotEmpty } from 'class-validator';

export class CreateBankUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  nameOfBank: string;

  @IsNotEmpty()
  atm: string;
}
