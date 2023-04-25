import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;
}

export class LogOutDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
}
