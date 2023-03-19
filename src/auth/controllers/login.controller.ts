import { Body, Controller, HttpCode, Inject, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginService, IJwtService } from '../interfaces';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginResDto, LoginReqDto } from '../dtos';
import { TokenPayload } from '../../commons';
import { LoginService } from '../services';

@Controller('api/auth/login')
export class LoginController {
  constructor(
    @Inject(LoginService)
    private readonly loginInboundPort: ILoginService,
    @Inject(JwtService)
    private jwtService: IJwtService,
  ) {}

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공', type: LoginResDto })
  @ApiTags('Auth')
  @Post()
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginReqDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResDto> {
    const userId = await this.loginInboundPort.execute(loginDto);
    const payload: TokenPayload = {
      userId,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    response.cookie('Authorization', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return { userId };
  }
}
