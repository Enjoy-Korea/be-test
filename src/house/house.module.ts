import { Module } from '@nestjs/common';
import { CreateHouseController } from './controllers/create-house.controller';
import { CreateHouseService } from './services/create-house.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from '../entities/house.entity';
import { CreateHouseRepository } from './repositories/create-house.repository';
import { CreateImagesRepository } from '../image/repositories/create-images.repository';
import { Image } from '../entities/image.entity';
import { GetHouseByIdController } from './controllers/get-house-by-id.controller';
import { GetHouseByIdService } from './services/get-house-by-id.service';
import { GetHouseByIdRepository } from './repositories/get-house-by-id.repository';

@Module({
  imports: [TypeOrmModule.forFeature([House, Image])],
  controllers: [CreateHouseController, GetHouseByIdController],
  providers: [
    CreateHouseService,
    CreateHouseRepository,
    CreateImagesRepository,
    GetHouseByIdService,
    GetHouseByIdRepository,
  ],
})
export class HouseModule {}
