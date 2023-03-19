import { Inject, Injectable } from '@nestjs/common';
import {
  GetReservationsServiceOutputDto,
  IGetReservationsRepository,
} from '../interfaces';
import { GetReservationsRepository } from '../repositories';
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
