import { Module } from '@nestjs/common';
import { CreateHouseController } from './controllers/create-house.controller';
import { CreateHouseService } from './services/create-house.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from '../entities/house.entity';
import { CreateHouseRepository } from './repositories/create-house.repository';
import { CreateImagesRepository } from '../image/repositories/create-images.repository';
import { Image } from '../entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([House, Image])],
  controllers: [CreateHouseController],
  providers: [
    CreateHouseService,
    CreateHouseRepository,
    CreateImagesRepository,
  ],
})
export class HouseModule {}
