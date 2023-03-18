import { Thumbnail } from '../dtos/create-house.req.dto';

export interface CreateHouseServiceInputDto {
  name: string;
  description: string;
  address: string;
  university?: string;
  houseType: string;
  pricePerDay: number;
  images: Thumbnail[];
}

export interface CreateHouseServiceOutputDto {
  houseId: string;
}

export interface ICreateHouseService {
  execute(
    params: CreateHouseServiceInputDto,
  ): Promise<CreateHouseServiceOutputDto>;
}
