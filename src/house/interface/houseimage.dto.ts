import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HouseImagesDTO {
  @ApiProperty()
  @IsNumber()
  houseId?: number;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsNumber()
  key: number;
}
