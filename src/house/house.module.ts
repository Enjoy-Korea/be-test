import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { RepositoriesModule } from 'src/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [HouseService],
})
export class HouseModule {}
