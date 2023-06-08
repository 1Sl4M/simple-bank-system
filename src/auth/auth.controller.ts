import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException, UseGuards
} from "@nestjs/common";
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() { email, password }: CreateUserDto) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Ошибка авторизации');
    }

    return this.authService.login(email);
  }
}