import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { HousesService } from './houses.service';
import { FindAllHouseDto } from './dto/findall-house.dto';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/list')
  findHouseList(@Query() findAllHouseDto: FindAllHouseDto) {
    return this.housesService.findHouseList(findAllHouseDto);
  }
}
