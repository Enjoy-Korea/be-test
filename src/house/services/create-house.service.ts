import { Inject, Injectable } from '@nestjs/common';
import {
  CreateHouseServiceInputDto,
  CreateHouseServiceOutputDto,
  ICreateHouseRepository,
} from '../interfaces';
import { CreateHouseRepository } from '../repositories';
import { CreateImagesRepository } from '../../image/repositories/create-images.repository';
import { ICreateImagesRepository } from '../../image/interfaces/i-create-images.repository';

@Injectable()
export class CreateHouseService {
  constructor(
    @Inject(CreateHouseRepository)
    private createHouseRepository: ICreateHouseRepository,
    @Inject(CreateImagesRepository)
    private createImagesRepository: ICreateImagesRepository,
  ) {}

  async execute(
    params: CreateHouseServiceInputDto,
  ): Promise<CreateHouseServiceOutputDto> {
    const { images } = params;
    const house = await this.createHouseRepository.execute(params);
    console.log(house);
    await this.createImagesRepository.execute({
      houseId: house.getId().houseId,
      images,
    });
    return house.getId();
  }
}
