import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetReservationsRepositoryOutputDto,
  IGetReservationsRepository,
} from '../interfaces';
import { Reservation } from '../../entities';

@Injectable()
export class GetReservationsRepository implements IGetReservationsRepository {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async execute(userId: string): Promise<GetReservationsRepositoryOutputDto[]> {
    const reservations = (await this.reservationRepository.query(`
      SELECT r.id as reservationId, r.houseId, r.checkInAt, r.checkOutAt, r.duration, r.totalPrice, r.createdAt, h.name, h.address, h.university, h.houseType, i.url as imageUrl
      FROM (
        SELECT *
        FROM reservations
        WHERE userId = ${userId}
      ) as r
      JOIN houses as h
      ON h.id = r.houseId
      JOIN images as i
      ON h.id = i.houseId AND i.key = 1
      ORDER BY createdAt DESC;
    `)) as GetReservationsRepositoryOutputDto[];
    return reservations;
  }
}
