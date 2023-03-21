import { Body, Controller, HttpCode, Inject, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginService, IJwtService } from '../interfaces';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginResDto, LoginReqDto } from '../dtos';
import { TokenPayload } from '../../commons';
import { LoginService } from '../services';
import { ConfigService } from '@nestjs/config';

@Controller('api/auth/login')
export class LoginController {
  constructor(
    @Inject(LoginService)
    private readonly loginInboundPort: ILoginService,
    @Inject(JwtService)
    private jwtService: IJwtService,
    private configService: ConfigService,
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
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    response.cookie('Authorization', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
    });
    return { userId };
  }
}
