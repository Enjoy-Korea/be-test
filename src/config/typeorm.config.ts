import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.enkor-bnb',
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  extra: {
    dateStrings: true,
  },
};

export default config;
