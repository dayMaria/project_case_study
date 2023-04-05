import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerConn } from './connections/ServerConn';
import * as dotenv from 'dotenv';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  await ServerConn.createConnection();
  await ServerConn.getAllDatabase('postgresConnection');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);

  const config: SequelizeOptions = {
    username: process.env.USERNAME_CONN1,
    password: process.env.PASSWORD_CONN1,
    database: process.env.DATABASE_CONN1,
    host: process.env.HOST_CONN1,
    port: parseInt(process.env.PORT_CONN1),
    dialect: process.env.TYPE_CONN1 as any,
  };
  const sequelize = new Sequelize({
    ...config,
  });
  sequelize.getQueryInterface();
}
bootstrap();
