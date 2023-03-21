import { ApiProperty } from '@nestjs/swagger';

export class GetReservationsResDto {
  @ApiProperty({ example: '329', description: '숙소 ID' })
  reservationId: string;

  @ApiProperty({ example: '123', description: '하우스 ID' })
  houseId: string;

  @ApiProperty({ example: '20230320', description: '체크인 날짜' })
  checkInAt: string;

  @ApiProperty({ example: '20230420', description: '체크아웃 날짜' })
  checkOutAt: string;

  @ApiProperty({ example: 30, description: '숙소 이용 일수' })
  duration: number;

  @ApiProperty({ example: 900000, description: '총 금액' })
  totalPrice: number;

  @ApiProperty({
    example: '2023-03-21T12:04:59.220Z',
    description: '예약한 날짜',
  })
  createdAt: Date;

  @ApiProperty({
    example: '산토리 펜션',
    description: '숙소 이름',
  })
  name: string;

  @ApiProperty({
    example: '경상북도 울진군 근남면 세포2길 1-21',
    description: '숙소 주소',
  })
  address: string;

  @ApiProperty({
    example: '울진대학교',
    description: '인근 대학',
  })
  university: string | null;

  @ApiProperty({ example: '펜션', description: '숙소 타입' })
  houseType: string;

  @ApiProperty({
    example:
      'https://s3.wsj.net/public/resources/images/OB-YO176_hodcol_H_20130815124744.jpg',
    description: '숙소 대표 사진',
  })
  imageUrl: string;
}
