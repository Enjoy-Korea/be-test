import {
  UnauthorizedException,
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RepositoriesService } from '../repositories/repositories.service';
import { UserDTO, LogOutDTO } from './interface/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private repositoriesService: RepositoriesService,
    private readonly configService: ConfigService,
  ) {}

  async userLogin(userLoginInfo: UserDTO) {
    const { email, password } = userLoginInfo;
    const correctUser = await this.repositoriesService.getUser(email);

    if (!correctUser) throw new UnauthorizedException('Invalid email');
    const checkPassword = await bcrypt.compare(password, correctUser.password);

    if (!checkPassword) throw new UnauthorizedException('Invalid password');

    const accessToken = new JwtService({
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      signOptions: {
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRESIN'),
      },
    }).sign({ email, tokenType: 'accessToken' });

    const refreshToken = new JwtService({
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      signOptions: {
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRESIN'),
      },
    }).sign({ email, tokenType: 'refreshToken' });

    correctUser.refreshToken = refreshToken;

    await this.repositoriesService.upsertUser(correctUser);

    return { accessToken, refreshToken };
  }

  async userSignUp(userSignUpInfo: UserDTO) {
    const { email, password } = userSignUpInfo;
    const correctUser = await this.repositoriesService.getUser(email);
    if (correctUser) throw new BadRequestException('Email is already taken.');

    userSignUpInfo.password = await bcrypt.hash(password, 10);

    return await this.repositoriesService.upsertUser(userSignUpInfo);
  }

  async getNewAccessToken(requestInfo: Request) {
    const refreshToken = requestInfo.headers.authorization.slice(7);
    let payload: { email: string; tokenType: string };

    try {
      payload = await new JwtService().verify(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });
    } catch (err) {
      throw new UnauthorizedException('token expired');
    }

    if (!(payload && payload.tokenType === 'refreshToken'))
      throw new UnauthorizedException('token expired');

    const email = payload.email;
    const userInfo = await this.repositoriesService.getUser(email);

    if (userInfo.refreshToken !== refreshToken) {
      throw new UnauthorizedException('token expired');
    }

    const accessToken = new JwtService({
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      signOptions: {
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRESIN'),
      },
    }).sign({ email, tokenType: 'accessToken' });

    return { accessToken };
  }

  async userlogout(userlogoutInfo: LogOutDTO) {
    const user = await this.repositoriesService.getUser(userlogoutInfo.email);
    user.refreshToken = '';

    await this.repositoriesService.upsertUser(user);

    return { message: 'logout' };
  }
}
