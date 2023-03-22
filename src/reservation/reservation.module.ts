import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reservation } from './reservation.entity';
import { SoldModule } from 'src/sold/sold.module';
import { HouseModule } from 'src/house/house.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), SoldModule, HouseModule],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule { }
