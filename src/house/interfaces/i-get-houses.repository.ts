import { House } from '../../entities/house.entity';

export interface GetHousesRepositoryInputDto {
  limit: number;
  skip: number;
  order: string;
  sortBy: string;
}

export interface IGetHousesRepository {
  execute(params: GetHousesRepositoryInputDto): Promise<House[]>;
}
