import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetHouseByIdResDto } from '../dtos';
import { GetHouseByIdService } from '../services';
import { IGetHouseByIdService } from '../interfaces';

@Controller('api/houses/:houseId')
export class GetHouseByIdController {
  constructor(
    @Inject(GetHouseByIdService)
    private getHouseByIdService: IGetHouseByIdService,
  ) {}

  @ApiOperation({ summary: '숙소 상세정보 조회' })
  @ApiResponse({
    status: 200,
    description: '숙소 조회 성공',
    type: GetHouseByIdResDto,
  })
  @ApiTags('House')
  @Get()
  getHouseById(@Param('houseId') houseId: string): Promise<GetHouseByIdResDto> {
    return this.getHouseByIdService.execute(houseId);
  }
}
