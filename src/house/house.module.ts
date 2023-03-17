import { Module } from '@nestjs/common';
import { CreateHouseController } from './controllers/create-house.controller';
import { CreateHouseService } from './services/create-house.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from '../entities/house.entity';
import { CreateHouseRepository } from './repositories/create-house.repository';

@Module({
  imports: [TypeOrmModule.forFeature([House])],
  controllers: [CreateHouseController],
  providers: [CreateHouseService, CreateHouseRepository],
})
export class HouseModule {}
