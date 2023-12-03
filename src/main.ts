import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UserService } from './security/users/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const userServices = await app.resolve(UserService);
  if ((await userServices.findAll()).length === 0) {
    await userServices.create({
      username: 'admin',
      password: 'admin',
      rol: 'administrador',
    });
  }

  await app.listen(4000);
}
bootstrap();
