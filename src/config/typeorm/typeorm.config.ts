import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const typeormconnections: ConnectionOptions[] = [
  {
    name: process.env.NAME_CONN3,
    type: process.env.TYPE_CONN3 as any,
    host: process.env.HOST_CONN3,
    port: parseInt(process.env.PORT_CONN3),
    username: process.env.USERNAME_CONN3,
    password: process.env.PASSWORD_CONN3,
    database: process.env.DATABASE_CONN3,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: Boolean(process.env.SYNCHRONIZE_CONN3),
  },
];

export const typeOrmConfig: TypeOrmModuleOptions = {
  name: process.env.NAME_CONN1,
  type: process.env.TYPE_CONN1 as any,
  host: process.env.HOST_CONN1,
  port: parseInt(process.env.PORT_CONN1),
  username: process.env.USERNAME_CONN1,
  password: process.env.PASSWORD_CONN1,
  database: process.env.DATABASE_CONN1,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  synchronize: Boolean(process.env.SYNCHRONIZE_CONN1),
};