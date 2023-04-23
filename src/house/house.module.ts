import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { RepositoriesModule } from 'src/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
