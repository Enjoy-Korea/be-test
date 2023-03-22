import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class PaginationInfo {
  @ApiProperty({ example: 1, description: '현재 페이지' })
  currentPage: number;

  @ApiProperty({ example: 10, description: '전체 페이지 수' })
  totalPage: number;

  @ApiProperty({
    example: true,
    description: '다음 페이지 존재 여부 | true 또는 false',
  })
  hasNextPage: boolean;

  @ApiProperty({
    example: false,
    description: '이전 페이지 존재 여부 | true 또는 false',
  })
  hasPreviousPage: boolean;
}

export class GetHousesResDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  houses: T[];

  @ApiProperty({ type: () => PaginationInfo })
  paginationInfo: PaginationInfo;
}
