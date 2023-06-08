import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/MongooseConfigService';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import configUsers from './configUsers/configUsers';
import { MongooseConfigServiceUsers } from './configUsers/MongooseConfigServiceUsers';
import { AuthModule } from './auth/auth.module';
import { BankModule } from './bank/bank.module';
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigServiceUsers,
    }),
    ConfigModule.forRoot({
      load: [configuration, configUsers],
      expandVariables: true,
      envFilePath: '.env',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    AuthModule,
    BankModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
