import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigModule } from './config/db-config.module';
import { TypeormConfigService } from './config/typeorm-config.service';
import { AuthModule } from './auth/auth.module';
import * as Joi from '@hapi/joi';
import { APP_PIPE } from '@nestjs/core';
import { HouseModule } from './house/house.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      cache: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [DbConfigModule],
      useClass: TypeormConfigService,
      inject: [TypeormConfigService],
    }),
    AuthModule,
    HouseModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}
