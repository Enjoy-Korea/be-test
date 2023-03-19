import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationResDto {
  @ApiProperty({ example: '329', description: '예약내역 ID' })
  reservationId: string;
}
