import { Module } from '@nestjs/common';
import { SignupController } from './controllers/signup.controller';
import { SignupService } from './services/signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { CheckEmailDuplicateRepository } from './repositories/check-email-duplicate.repository';
import { CreateUserRepository } from './repositories/create-user.repository';
import { ConfigService } from '@nestjs/config';

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
  controllers: [SignupController],
  providers: [
    SignupService,
    JwtService,
    CheckEmailDuplicateRepository,
    CreateUserRepository,
  ],
})
export class AuthModule {}
