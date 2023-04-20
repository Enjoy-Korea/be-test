import { IsInt, IsString } from 'class-validator';

export class FindAllHouseDto {
  @IsInt()
  page: number;

  @IsString()
  sort: ListSort;
}

export enum ListSort {
  ASC = 'ASC',
  DESC = 'DESC',
}
