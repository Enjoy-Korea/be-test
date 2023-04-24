import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;
}
