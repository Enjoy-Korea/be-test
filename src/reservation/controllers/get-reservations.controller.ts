import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../commons/decorators/current-user.decorator';
import { TokenPayload } from '../../commons/types/token-payload';
import { GetReservationsService } from '../services/get-reservations.service';
import { IGetReservationsService } from '../interfaces/i-get-reservations.service';
import { GetReservationsResDto } from '../dtos/get-reservations.res.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/reservations')
export class GetReservationsController {
  constructor(
    @Inject(GetReservationsService)
    private getReservationsService: IGetReservationsService,
  ) {}

  @ApiOperation({ summary: '유저가 예약한 숙소 리스트 조회' })
  @ApiResponse({
    status: 200,
    description: '숙소 조회 성공',
    type: [GetReservationsResDto],
  })
  @ApiTags('Reservation')
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getReservations(
    @CurrentUser('user') currentUser: TokenPayload,
  ): Promise<GetReservationsResDto[]> {
    const { userId } = currentUser;
    return this.getReservationsService.execute(userId);
  }
}
