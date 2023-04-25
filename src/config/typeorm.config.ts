import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  extra: {
    dateStrings: true,
  },
};

export default config;
