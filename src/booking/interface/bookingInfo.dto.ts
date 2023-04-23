import { IsDate, IsNumber } from 'class-validator';

export class BookingInfoDTO {
  @IsNumber()
  userId: number;

  @IsNumber()
  houseId: number;

  @IsDate()
  checkinDate: Date;

  @IsDate()
  checkoutDate: Date;
}
