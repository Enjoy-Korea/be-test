import { IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookingInfoDTO {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  houseId: number;

  @ApiProperty()
  @IsDate()
  checkinDate: Date;

  @ApiProperty()
  @IsDate()
  checkoutDate: Date;
}
