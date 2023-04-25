import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RepositoriesModule, ConfigModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
