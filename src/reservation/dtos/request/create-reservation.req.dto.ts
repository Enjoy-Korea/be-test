import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreateReservationReqDto {
  @IsInt()
  @IsPositive()
  @ApiProperty({
    example: '숙소 ID',
    required: true,
  })
  houseId: string;

  @IsString()
  @Length(8, 8)
  @ApiProperty({
    example: '체크인 날짜',
    description: '연월일(yyyymmdd) 8자',
    required: true,
  })
  checkInAt: string;

  @IsString()
  @Length(8, 8)
  @ApiProperty({
    example: '체크아웃 날짜',
    description: '연월일(yyyymmdd) 8자',
    required: true,
  })
  checkOutAt: string;
}
