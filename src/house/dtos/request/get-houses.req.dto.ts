import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Order } from '../../../commons';

export enum Sort {
  Date = 'date',
  Price = 'price',
}

export class GetHousesReqDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    description: '페이지 query | 기본값 1',
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @ApiPropertyOptional({
    enum: Sort,
    default: 'date',
    description: '숙소 정렬 기준 | date 또는 pirce',
  })
  @IsEnum(Sort)
  sort: Sort = Sort.Date;

  @ApiPropertyOptional({
    minimum: 5,
    maximum: 30,
    default: 10,
    description: '숙소 리스트 조회 수 | 기본값 5개 | 최대 30개',
  })
  @IsInt()
  @Min(5)
  @Max(30)
  @IsOptional()
  @Type(() => Number)
  limit = 5;

  @ApiPropertyOptional({
    enum: Order,
    default: Order.DESC,
    description: '숙소 정렬 순서 | ASC(오름차순) 또는 DESC(내림차순)',
  })
  @IsEnum(Order)
  @IsOptional()
  order: Order = Order.DESC;

  public getPage(): number {
    return this.page;
  }

  public getLimit(): number {
    return this.limit;
  }

  public getOrder(): string {
    return this.order;
  }
  public getSkip(): number {
    return (this.page - 1) * this.limit;
  }

  public getSort(): string {
    return this.sort === 'date' ? 'createdAt' : 'pricePerDay';
  }
}
