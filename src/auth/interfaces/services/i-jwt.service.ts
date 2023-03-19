import { TokenPayload } from '../../../commons';
import { JwtSignOptions } from '@nestjs/jwt';

export interface IJwtService {
  sign(payload: TokenPayload, signOptions: JwtSignOptions): string;
}
