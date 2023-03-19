import { Thumbnail } from '../../dtos';

export interface GetHouseByIdServiceOutputDto {
  houseId: string;
  name: string;
  description: string;
  address: string;
  university: string | null;
  houseType: string;
  pricePerDay: number;
  images: Thumbnail[];
}

export interface IGetHouseByIdService {
  execute(houseId: string): Promise<GetHouseByIdServiceOutputDto>;
}
