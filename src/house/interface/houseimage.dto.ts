import { IsNumber, IsString } from 'class-validator';

export class HouseImagesDTO {
  @IsString()
  url: string;

  @IsNumber()
  key: number;
}
