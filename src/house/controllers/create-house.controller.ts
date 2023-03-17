import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ICreateHouseService } from '../interfaces/i-create-house.service';
import { CreateHouseService } from '../services/create-house.service';
import { CreateHouseReqDto } from '../dtos/create-house.req.dto';
import { CreateHouseResDto } from '../dtos/create-house.res.dto';

@Controller('api/houses')
export class CreateHouseController {
  constructor(
    @Inject(CreateHouseService)
    private createHouseService: ICreateHouseService,
  ) {}

  @ApiOperation({ summary: '숙소 등록' })
  @ApiResponse({ status: 201 })
  @ApiTags('House')
  @Post()
  async createHouse(
    @Body() createHouseReqDto: CreateHouseReqDto,
  ): Promise<CreateHouseResDto> {
    return this.createHouseService.execute(createHouseReqDto);
  }
}
