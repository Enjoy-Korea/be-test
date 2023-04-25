import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  database: 'enkorbnb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  extra: {
    dateStrings: true,
  },
};

export default config;
