import { ApiProperty } from '@nestjs/swagger';
import { houseInfo } from '../../interfaces';

export class GetReservationsResDto {
  @ApiProperty({ example: '329', description: '숙소 ID' })
  reservationId: string;

  @ApiProperty({ example: '20230320', description: '체크인 날짜' })
  checkInAt: string;

  @ApiProperty({ example: '20230420', description: '체크아웃 날짜' })
  checkOutAt: string;

  @ApiProperty({ example: 30, description: '숙소 이용 일수' })
  duration: number;

  @ApiProperty({ example: 900000, description: '총 금액' })
  totalPrice: number;

  @ApiProperty({
    example: {
      houseId: '2',
      name: '산토리 펜션',
      address: '경상북도 울진군 근남면 세포2길 1-21',
      university: '울진대학교',
      houseType: '펜션',
      imageUrl:
        'http://si.wsj.net/public/resources/images/OB-YO176_hodcol_H_20130815124744.jpg',
    },
  })
  house: houseInfo;
}
