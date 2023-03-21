import { Module } from '@nestjs/common';
import { SoldController } from './sold.controller';
import { SoldService } from './sold.service';

@Module({
  controllers: [SoldController],
  providers: [SoldService]
})
export class SoldModule {}
