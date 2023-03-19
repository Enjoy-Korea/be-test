import { Module } from '@nestjs/common';
import { SignupController, LoginController } from './controllers';
import { SignupService, LoginService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from '../entities';
import {
  CheckEmailDuplicateRepository,
  CreateUserRepository,
  GetUserByIdRepository,
  GetUserByEmailRepository,
} from './repositories';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [SignupController, LoginController],
  providers: [
    SignupService,
    LoginService,
    JwtStrategy,
    JwtService,
    CheckEmailDuplicateRepository,
    CreateUserRepository,
    GetUserByIdRepository,
    GetUserByEmailRepository,
  ],
})
export class AuthModule {}
