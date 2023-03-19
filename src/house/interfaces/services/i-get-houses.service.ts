import { Thumbnail, PaginationInfo } from '../../dtos';

export interface GetHousesServiceInputDto {
  page: number;
  limit: number;
  order: string;
  sortBy: string;
  getPage(): number;
  getLimit(): number;
  getOrder(): string;
  getSkip(): number;
  getSortBy(): string;
}

export interface HouseInfo {
  name: string;
  university: string | null;
  houseType: string;
  pricePerDay: number;
  images: Thumbnail[];
}

export interface GetHousesServiceOutputDto {
  houses: HouseInfo[];
  paginationInfo: PaginationInfo;
}

export interface IGetHousesService {
  execute(params: GetHousesServiceInputDto): Promise<GetHousesServiceOutputDto>;
}
