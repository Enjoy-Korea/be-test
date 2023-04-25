import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('useing guard!');
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log(token);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await new JwtService().verifyAsync(token, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });
      console.log(payload);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('token expired');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
