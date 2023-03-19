import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString, Length, Min } from 'class-validator';

export class CreateReservationReqDto {
  @IsAlphanumeric()
  @ApiProperty({
    example: '숙소 ID',
    required: true,
  })
  houseId: string;

  @IsString()
  @Length(8, 8)
  @ApiProperty({
    example: '체크인 날짜',
    description: '연월일(yyyy-mm-dd) 8자',
    required: true,
  })
  checkInAt: string;

  @IsString()
  @Length(8, 8)
  @ApiProperty({
    example: '체크아웃 날짜',
    description: '연월일(yyyy-mm-dd) 8자',
    required: true,
  })
  checkOutAt: string;
}
