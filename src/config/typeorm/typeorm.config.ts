import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { AnalysisUnit } from 'src/analysis_unit/analysis_unit/entity/analysis_unit';

dotenv.config();

export const typeormconnections: ConnectionOptions[] = [
  {
    name: process.env.NAME_CONN1,
    type: process.env.TYPE_CONN1 as any,
    host: process.env.HOST_CONN1,
    port: parseInt(process.env.PORT_CONN1),
    username: process.env.USERNAME_CONN1,
    password: process.env.PASSWORD_CONN1,
    database: process.env.DATABASE_CONN1,
    entities: [AnalysisUnit],
    synchronize: Boolean(process.env.SYNCHRONIZE_CONN1),
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
  entities: [AnalysisUnit],
  synchronize: Boolean(process.env.SYNCHRONIZE_CONN1),
};
//__dirname + '/../../**/*.entity.{js,ts}'