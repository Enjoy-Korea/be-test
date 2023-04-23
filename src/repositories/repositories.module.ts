import { Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { HouseImages } from './entity/houseimages.entity';
import { Houses } from './entity/houses.entity';
import { Bookings } from './entity/bookings.entity';
import { AuthModule } from 'src/auth/auth.module';
import { HouseModule } from 'src/house/house.module';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users, HouseImages, Houses, Bookings])],
  providers: [RepositoriesService],
  controllers: [RepositoriesController],
  exports: [RepositoriesService],
})
export class RepositoriesModule {}
