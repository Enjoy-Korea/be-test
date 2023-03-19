import { House } from '../../../entities';

export interface IGetHouseByIdRepository {
  execute(houseId: string): Promise<House | null>;
}
