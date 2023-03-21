import { Inject, Injectable } from '@nestjs/common';
import {
  GetReservationsServiceOutputDto,
  IGetReservationsRepository,
} from '../interfaces';
import { GetReservationsRepository } from '../repositories';

@Injectable()
export class GetReservationsService {
  constructor(
    @Inject(GetReservationsRepository)
    private getReservationsRepository: IGetReservationsRepository,
  ) {}

  async execute(userId: string): Promise<GetReservationsServiceOutputDto[]> {
    return await this.getReservationsRepository.execute(userId);
  }
}
