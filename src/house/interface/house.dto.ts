import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  university: string;

  @ApiProperty()
  @IsString()
  houseType: string;

  @ApiProperty()
  @IsNumber()
  pricePerDay: number;

  @ApiProperty()
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
