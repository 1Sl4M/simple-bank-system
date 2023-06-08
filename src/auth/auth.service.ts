import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, 'email'>> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Пользователь не обнаружен');
    }
    return {
      email: user.email,
    };
  }

  async login(email: string) {
    const payload = { email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const oldUser = await this.usersService.findByEmail(dto.email);

      if (!oldUser) {
        const userData = await this.usersService.create(dto);

        return userData;
      } else {
        throw new ForbiddenException('Пользователь уже существует');
      }
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Ошибка при регистрации');
    }
  }
}
