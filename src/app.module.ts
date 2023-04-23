import { Module } from '@nestjs/common';
import { RepositoriesModule } from './repositories/repositories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HouseModule } from './house/house.module';
import { BookingModule } from './booking/booking.module';
import config from './config/typeorm.config';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    RepositoriesModule,
    AuthModule,
    HouseModule,
    BookingModule,
  ],
})
export class AppModule {}
