import { Module } from '@nestjs/common';
import { RepositoriesModule } from './repositories/repositories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HouseModule } from './house/house.module';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(config),
    RepositoriesModule,
    AuthModule,
    HouseModule,
    BookingModule,
  ],
})
export class AppModule {}
