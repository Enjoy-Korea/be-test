import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { CreateHouseDto } from './dtos/create-house.dto';
import { FindAllHousesDto } from './dtos/find-all-house-dto';
import { HouseService } from './house.service';

@Controller('house')
export class HouseController {

    constructor(private readonly houseService: HouseService) { }
    @Post()
    addHouse(@Body() createHouseDto: CreateHouseDto) {
        return this.houseService.create(createHouseDto);
    }

    @Get()
    allHouses(@Query() { page, limit, sort }: FindAllHousesDto) {
        return this.houseService.findAll(parseInt(page), parseInt(limit), sort);
    }

    @Get(":id")
    singleHouse(@Param('id') id: string) {
        return this.houseService.findOne(parseInt(id))
    }

}
