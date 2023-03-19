import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House, Image } from '../entities';
import {
  CreateHouseController,
  GetHouseByIdController,
  GetHousesController,
} from './controllers';
import {
  GetHouseByIdService,
  GetHousesService,
  CreateHouseService,
} from './services';
import {
  GetHouseByIdRepository,
  GetHouseTotalCountRepository,
  GetHousesRepository,
  CreateHouseRepository,
} from './repositories';
import { CreateImagesRepository } from '../image/repositories/create-images.repository';

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
