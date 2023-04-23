import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHouseDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsString()
  university: string;

  @IsString()
  houseType: string;

  @IsNumber()
  pricePerDay: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagesArr)
  images?: ImagesArr[];
}

class ImagesArr {
  @IsString()
  url: string;

  @IsNumber()
  key: number;
}
