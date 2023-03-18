import { Inject, Injectable } from '@nestjs/common';
import { GetReservationsServiceOutputDto } from '../interfaces/i-get-reservations.service';
import { IGetReservationsRepository } from '../interfaces/i-get-reservations.repository';
import { GetReservationsRepository } from '../repositories/get-reservations.repository';
import { map, toArray } from '@fxts/core';

@Injectable()
export class GetReservationsService {
  constructor(
    @Inject(GetReservationsRepository)
    private getReservationsRepository: IGetReservationsRepository,
  ) {}

  async execute(userId: string): Promise<GetReservationsServiceOutputDto[]> {
    const reservations = await this.getReservationsRepository.execute(userId);
    console.log(reservations);
    return toArray(map((reservation) => reservation.getInfo(), reservations));
  }
}
