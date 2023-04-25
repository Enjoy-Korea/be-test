import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { HouseController } from './house.controller';

@Module({
  imports: [RepositoriesModule],
  providers: [HouseService],
  controllers: [HouseController],
})
export class HouseModule {}
