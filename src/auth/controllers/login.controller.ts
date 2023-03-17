import { Body, Controller, HttpCode, Inject, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from '../interfaces/i-jwt.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginService } from '../services/login.service';
import { ILoginService } from '../interfaces/i-login.service';
import { LoginResDto } from '../dtos/login.res.dto';
import { TokenPayload } from '../../commons/types/token-payload';
import { LoginReqDto } from '../dtos/login.req.dto';

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
