import { Inject, Injectable } from '@nestjs/common';
import {
  CreateHouseRepositoryInputDto,
  ICreateHouseRepository,
} from '../interfaces/i-create-house.repository';
import { CreateHouseServiceOutputDto } from '../interfaces/i-create-house.service';
import { CreateHouseRepository } from '../repositories/create-house.repository';

@Injectable()
export class CreateHouseService {
  constructor(
    @Inject(CreateHouseRepository)
    private createHouseRepository: ICreateHouseRepository,
  ) {}

  async execute(
    params: CreateHouseRepositoryInputDto,
  ): Promise<CreateHouseServiceOutputDto> {
    const house = await this.createHouseRepository.execute(params);
    return house.getId();
  }
}
