import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { houseTypesEnum } from '../../commons/enums/house-types.enum';

export class Thumbnail {
  @IsUrl()
  @MaxLength(255)
  url: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  key: number;
}

export class CreateHouseReqDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({
    example: 'Yeondae Branch',
    description: '2자 이상 | 50자 이하',
    required: true,
  })
  name: string;

  @IsString()
  @ApiProperty({
    example:
      '입실/퇴실 시간\n ㅁ 입실시간 : 오후 3시 ~ 오후 10시\n ㅁ 퇴실시간 : 익일 오전 11시 까지\n ㅁ 오후 10시 이후의 입실은 미리 연락부탁드립니다.',
    description: '숙소를 소개하는 텍스트 형식',
    required: true,
  })
  description: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty({
    example: '경상북도 울진군 근남면 세포2길 1-21',
    description: '숙소 주소 | 100자 이내',
    required: true,
  })
  address: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  @ApiProperty({
    example: '울진대학교',
    description: '숙소 인근 대학교 | 필수값 ❌',
    required: false,
  })
  university?: string;

  @IsEnum(houseTypesEnum)
  @ApiProperty({
    example: '펜션',
    description: '숙소 종류 | [아파트, 펜션, 단독주택, 오피스텔, 원룸]',
    required: true,
  })
  houseType: string;

  @IsNumber()
  @ApiProperty({
    example: '30000',
    description: '1박당 가격',
    required: true,
  })
  pricePerDay: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @Type(() => Thumbnail)
  @ApiProperty({
    description: '숙소 사진 url',
    required: true,
  })
  images: Thumbnail[];
}
