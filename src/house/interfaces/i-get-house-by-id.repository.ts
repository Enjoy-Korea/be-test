import { House } from '../../entities/house.entity';

export interface IGetHouseByIdRepository {
  execute(houseId: string): Promise<House | null>;
}
