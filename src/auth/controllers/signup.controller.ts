import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService, ISignupService } from '../interfaces';
import { SignupService } from '../services';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupReqDto, SignupResDto } from '../dtos';
import { TokenPayload } from '../../commons';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('api/auth')
export class SignupController {
  constructor(
    @Inject(SignupService)
    private readonly singupService: ISignupService,
    @Inject(JwtService)
    private jwtService: IJwtService,
    private configService: ConfigService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: SignupResDto,
  })
  @ApiTags('Auth')
  @Post()
  async signup(
    @Body() signupDto: SignupReqDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SignupResDto> {
    const userId = await this.singupService.execute(signupDto);
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
