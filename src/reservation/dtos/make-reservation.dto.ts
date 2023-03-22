import { IsDateString, IsString } from 'class-validator';

export class MakeReservationDto {
  @IsString()
  houseId: string;
  
  @IsDateString()
  checkInDate: Date;

  @IsDateString()
  checkOutDate: Date;
}