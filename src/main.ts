import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { isConstructor } from "@nestjs/common/utils/shared.utils";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
