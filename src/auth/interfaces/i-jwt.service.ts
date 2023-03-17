import { TokenPayload } from '../../commons/types/token-payload';
import { JwtSignOptions } from '@nestjs/jwt';

export interface IJwtService {
  sign(payload: TokenPayload, signOptions: JwtSignOptions): string;
}
