import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';
import { HouseService } from './house.service';
import { Houses } from 'src/repositories/entity/houses.entity';
import { CreateHouseDTO } from './interface/house.dto';
import { HouseImagesDTO } from './interface/houseimage.dto';
import { HouseImages } from 'src/repositories/entity/houseimages.entity';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  async createHouse(@Body() newHouesInfo: CreateHouseDTO): Promise<Houses> {
    return this.houseService.createHouse(newHouesInfo);
  }

  @Get('/:houseid')
  async getHouseDetail(@Param('houseid') houseId: number) {
    return this.houseService.getHouseDetail(houseId);
  }

  @Get()
  async getHousesList(
    @Query('start') start = 0,
    @Query('limit') end = 10,
    @Query('sort') sort = 'created_At',
    @Query('order') order = 'DESC',
  ): Promise<Houses[]> {
    return this.houseService.getHouseList(start, end, sort, order);
  }

  @Post('/:houseId/image')
  async createHouseImage(
    @Param('houseId') houseId: number,
    @Body() imageInfo: HouseImagesDTO[],
  ): Promise<HouseImages[]> {
    return this.houseService.createHouseImage(houseId, imageInfo);
  }
}
