import { ApiProperty } from '@nestjs/swagger';

export class SignupResDto {
  @ApiProperty({ example: '329', description: '유저 ID' })
  userId: string;
}
