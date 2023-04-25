import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { LogOutDTO, UserDTO } from './interface/auth.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from './guard/guard';
import { ApiHeader } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServeice: AuthService) {}

  @Post('/signup')
  async userSignUp(@Body() userSignUpInfo: UserDTO) {
    return this.authServeice.userSignUp(userSignUpInfo);
  }

  @Post('/login')
  async userLogin(@Body() userLoginInfo: UserDTO) {
    return this.authServeice.userLogin(userLoginInfo);
  }

  @UseGuards(AuthGuard)
  @ApiHeader({
    name: 'Authorization',
    example: 'Bearer refreash_token',
  })
  @Get('/refresh')
  async getNewAccessToken(@Req() request: Request) {
    return this.authServeice.getNewAccessToken(request);
  }

  @Post('/logout')
  async userLogout(@Body() userInfo: LogOutDTO) {
    return this.authServeice.userlogout(userInfo);
  }
}
