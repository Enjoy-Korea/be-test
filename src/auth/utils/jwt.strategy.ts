import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { TokenPayload } from '../../commons/types/token-payload';
import { ConfigService } from '@nestjs/config';
import { IGetUserByIdRepository } from '../interfaces/i-get-user-by-id.repository';
import { GetUserByIdRepository } from '../repositories/get-user-by-id.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(GetUserByIdRepository)
    private getUserByIdRepository: IGetUserByIdRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        function (req) {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['Authorization'];
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenPayload): Promise<TokenPayload> {
    const { userId } = payload;
    const user = await this.getUserByIdRepository.execute(userId);
    if (!user) {
      throw new UnauthorizedException('인증이 필요한 유저');
    }
    return payload;
  }
}
