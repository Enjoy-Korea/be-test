import { House } from '../../entities/house.entity';

export interface CreateHouseRepositoryInputDto {
  name: string;
  description: string;
  address: string;
  university?: string;
  houseType: string;
  pricePerDay: number;
}

export interface ICreateHouseRepository {
  execute(params: CreateHouseRepositoryInputDto): Promise<House>;
}