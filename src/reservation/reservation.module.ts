import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreateReservationController,
  GetReservationsController,
} from './controllers';
import { CreateReservationService, GetReservationsService } from './services';
import { GetHouseByIdRepository } from '../house/repositories';
import {
  CreateReservationRepository,
  GetReservationsRepository,
  CheckReservationAvailableRepository,
} from './repositories';
import { House, Reservation } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, House])],
  controllers: [CreateReservationController, GetReservationsController],
  providers: [
    CreateReservationService,
    GetHouseByIdRepository,
    CreateReservationRepository,
    CheckReservationAvailableRepository,
    GetReservationsService,
    GetReservationsRepository,
  ],
})
export class ReservationModule {}
