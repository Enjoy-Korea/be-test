import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetHousesReqDto, GetHousesResDto } from '../dtos';
import { GetHousesService } from '../services';
import { HouseInfo, IGetHousesService } from '../interfaces';

@Controller('api/houses')
export class GetHousesController {
  constructor(
    @Inject(GetHousesService)
    private getHousesService: IGetHousesService,
  ) {}

  @ApiOperation({ summary: '숙소 리스트 조회' })
  @ApiResponse({
    status: 200,
    description: '숙소 리스트 조회 성공',
    type: GetHousesResDto,
  })
  @ApiTags('House')
  @Get()
  getHouses(
    @Query() getHousesReqDto: GetHousesReqDto,
  ): Promise<GetHousesResDto<HouseInfo>> {
    console.log(getHousesReqDto);
    return this.getHousesService.execute(getHousesReqDto);
  }
}
