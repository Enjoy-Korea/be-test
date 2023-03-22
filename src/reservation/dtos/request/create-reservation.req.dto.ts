import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationReqDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    example: '329',
    description: '예약할 숙소 ID',
    required: true,
  })
  houseId: string;

  @IsString()
  @Length(8, 8)
  @ApiProperty({
    example: '20230301',
    description: '연월일(yyyymmdd) 8자',
    required: true,
  })
  checkInAt: string;

  @IsString()
  @Length(8, 8)
  @ApiProperty({
    example: '20230331',
    description: '연월일(yyyymmdd) 8자',
    required: true,
  })
  checkOutAt: string;
}
