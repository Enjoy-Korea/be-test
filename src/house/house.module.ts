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
import { GetHousesController } from './controllers/get-houses.controller';
import { GetHousesService } from './services/get-houses.service';
import { GetHouseTotalCountRepository } from './repositories/get-house-total-count.repository';
import { GetHousesRepository } from './repositories/get-houses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([House, Image])],
  controllers: [
    CreateHouseController,
    GetHouseByIdController,
    GetHousesController,
  ],
  providers: [
    CreateHouseService,
    CreateHouseRepository,
    CreateImagesRepository,
    GetHouseByIdService,
    GetHouseByIdRepository,
    GetHousesService,
    GetHouseTotalCountRepository,
    GetHousesRepository,
  ],
})
export class HouseModule {}
