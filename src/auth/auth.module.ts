import { Module } from '@nestjs/common';
import { SignupController } from './controllers/signup.controller';
import { SignupService } from './services/signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { CheckEmailDuplicateRepository } from './repositories/check-email-duplicate.repository';
import { CreateUserRepository } from './repositories/create-user.repository';
import { ConfigService } from '@nestjs/config';
import { LoginService } from './services/login.service';
import { GetUserByIdRepository } from './repositories/get-user-by-id.repository';
import { GetUserByEmailRepository } from './repositories/get-user-by-email.repository';
import { LoginController } from './controllers/login.controller';
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
