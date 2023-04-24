import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RepositoriesModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
