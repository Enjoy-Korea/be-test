import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoldController } from './sold.controller';
import { Sold } from './sold.entity';
import { SoldService } from './sold.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sold])],
  controllers: [SoldController],
  providers: [SoldService],
  exports: [SoldService]
})
export class SoldModule {}
