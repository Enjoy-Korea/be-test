import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseResDto {
  @ApiProperty({ example: '329', description: '하우스 ID' })
  houseId: string;
}
