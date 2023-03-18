import { Module } from '@nestjs/common';
import { CreateReservationController } from './controllers/create-reservation.controller';
import { CreateReservationService } from './services/create-reservation.service';
import { GetHouseByIdRepository } from '../house/repositories/get-house-by-id.repository';
import { CreateReservationRepository } from './repositories/create-reservation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { House } from '../entities/house.entity';
import { CheckReservationAvailableRepository } from './repositories/check-reservation-available.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, House])],
  controllers: [CreateReservationController],
  providers: [
    CreateReservationService,
    GetHouseByIdRepository,
    CreateReservationRepository,
    CheckReservationAvailableRepository,
  ],
})
export class ReservationModule {}
