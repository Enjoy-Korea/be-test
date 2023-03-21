import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class PaginationInfo {
  @ApiProperty()
  currentPage: number;
  @ApiProperty()
  totalPage: number;
  @ApiProperty()
  hasNextPage: boolean;
  @ApiProperty()
  hasPreviousPage: boolean;
}

export class GetHousesResDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  houses: T[];

  @ApiProperty({ type: () => PaginationInfo })
  paginationInfo: PaginationInfo;
}
