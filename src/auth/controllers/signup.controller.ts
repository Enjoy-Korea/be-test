import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from '../interfaces/i-jwt.service';
import { SignupService } from '../services/signup.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupReqDto } from '../dtos/signup.req.dto';
import { TokenPayload } from '../../commons/types/token-payload';
import { Response } from 'express';
import { SignupResDto } from '../dtos/signup.res.dto';
import { ISignupService } from '../interfaces/i-signup.service';

@Controller('api/auth')
export class SignupController {
  constructor(
    @Inject(SignupService)
    private readonly singupService: ISignupService,
    @Inject(JwtService)
    private jwtService: IJwtService,
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
      secret: process.env.JWT_SECRET,
    });
    response.cookie('Authorization', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return { userId };
  }
}
