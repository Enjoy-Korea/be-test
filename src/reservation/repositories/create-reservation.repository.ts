import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../../entities/reservation.entity';
import {
  CreateReservationRepositoryInputDto,
  ICreateReservationRepository,
} from '../interfaces/i-create-reservation.repository';

@Injectable()
export class CreateReservationRepository
  implements ICreateReservationRepository
{
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async execute(
    params: CreateReservationRepositoryInputDto,
  ): Promise<Reservation> {
    const reservation = this.reservationRepository.create(params);
    return await this.reservationRepository.save(reservation);
  }
}
