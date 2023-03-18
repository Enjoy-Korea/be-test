import { Thumbnail } from '../dtos/create-house.req.dto';

export interface GetHouseByIdServiceOutputDto {
  houseId: string;
  name: string;
  description: string;
  address: string;
  university: string | undefined;
  houseType: string;
  pricePerDay: number;
  images: Thumbnail[];
}

export interface IGetHouseByIdService {
  execute(houseId: string): Promise<GetHouseByIdServiceOutputDto>;
}
