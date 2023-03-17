import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GetHouseByIdRepository } from '../repositories/get-house-by-id.repository';
import { IGetHouseByIdRepository } from '../interfaces/i-get-house-by-id.repository';
import {
  GetHouseByIdServiceOutputDto,
  IGetHouseByIdService,
} from '../interfaces/i-get-house-by-id.service';

@Injectable()
export class GetHouseByIdService implements IGetHouseByIdService {
  constructor(
    @Inject(GetHouseByIdRepository)
    private getHouseByIdRepository: IGetHouseByIdRepository,
  ) {}

  async execute(houseId: string): Promise<GetHouseByIdServiceOutputDto> {
    const house = await this.getHouseByIdRepository.execute(houseId);
    if (!house) {
      throw new BadRequestException('존재하지 않는 숙소');
    }
    return house.getInfo();
  }
}
