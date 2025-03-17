import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.setGlobalPrefix('api/v1', {exclude: ['']});
  await app.listen(port);
}
bootstrap();
