import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../../entities';
import {
  CheckReservationAvailableRepositoryInputDto,
  ICheckReservationAvailableRepository,
} from '../interfaces';

@Injectable()
export class CheckReservationAvailableRepository
  implements ICheckReservationAvailableRepository
{
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async execute(
    params: CheckReservationAvailableRepositoryInputDto,
  ): Promise<boolean> {
    const { houseId, checkInAt, checkOutAt } = params;
    const reservation = await this.reservationRepository.query(`
      SELECT COUNT(*)
      FROM (
        SELECT *
        FROM reservations
        WHERE HOUSEID = ${houseId}
      ) as R
      WHERE (DATE(CHECKINAT) <= DATE(${checkInAt}) AND DATE(CHECKOUTAT) >= DATE(${checkInAt})) OR
            (DATE(CHECKOUTAT) >= DATE(${checkOutAt}) AND DATE(CHECKINAT) <= DATE(${checkOutAt}))
    `);
    return !+reservation[0]['COUNT(*)'];
  }
}
