import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigModule } from './config/db-config.module';
import { TypeormConfigService } from './config/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DbConfigModule],
      useClass: TypeormConfigService,
      inject: [TypeormConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
