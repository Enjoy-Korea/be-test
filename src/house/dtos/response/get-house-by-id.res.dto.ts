import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateHouseReqDto } from '../request/create-house.req.dto';

interface imageRes {
  url: string;
  key: number;
}

export class GetHouseByIdResDto extends PickType(CreateHouseReqDto, [
  'name',
  'description',
  'address',
  'houseType',
  'pricePerDay',
] as const) {
  @ApiProperty({ example: '329', description: '숙소 ID' })
  houseId: string;

  @ApiProperty({ example: null, description: '인근 대학' })
  university: string | null;

  @ApiProperty({
    example: [
      {
        url: 'http://si.wsj.net/public/resources/images/OB-YO176_hodcol_H_20130815124744.jpg',
        key: 1,
      },
      {
        url: 'https://image.pensionlife.co.kr/penimg/pen_1/pen_19/1977/9734f7418fcc01a2321ba800b1f2c7ee.jpg',
        key: 2,
      },
    ],
    description: '숙소 사진',
  })
  images: imageRes[];
}
