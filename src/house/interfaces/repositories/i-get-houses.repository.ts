import { House } from '../../../entities';

export interface GetHousesRepositoryInputDto {
  limit: number;
  skip: number;
  order: string;
  sortBy: string;
}

export interface IGetHousesRepository {
  execute(params: GetHousesRepositoryInputDto): Promise<House[]>;
}
