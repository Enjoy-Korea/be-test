export interface CreateHouseServiceInputDto {
  name: string;
  description: string;
  address: string;
  university?: string;
  houseType: string;
  pricePerDay: number;
}

export interface CreateHouseServiceOutputDto {
  houseId: string;
}

export interface ICreateHouseService {
  execute(
    params: CreateHouseServiceInputDto,
  ): Promise<CreateHouseServiceOutputDto>;
}
