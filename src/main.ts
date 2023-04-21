import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';


dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  const whitelist =[
    "http://localhost:3001"
  ];
  const corsOptions ={
    origin : function (origin,callback){
      if (whitelist.indexOf(origin)!== -1 || !origin){
        callback(null, true);
      }
      else{
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  
  app.enableCors(corsOptions);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
