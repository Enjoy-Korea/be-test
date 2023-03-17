import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetHouseByIdResDto } from '../dtos/get-house-by-id.res.dto';
import { GetHouseByIdService } from '../services/get-house-by-id.service';
import { IGetHouseByIdService } from '../interfaces/i-get-house-by-id.service';

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
