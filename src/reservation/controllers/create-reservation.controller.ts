import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReservationService } from '../services/create-reservation.service';
import { ICreateReservationService } from '../interfaces/i-create-reservation.service';
import { CreateReservationReqDto } from '../dtos/create-reservation.req.dto';
import { CreateReservationResDto } from '../dtos/create-reservation.res.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../commons/decorators/current-user.decorator';
import { TokenPayload } from '../../commons/types/token-payload';
import { getDuration } from '../../house/utils/getDuration';

@Controller('api/reservations')
export class CreateReservationController {
  constructor(
    @Inject(CreateReservationService)
    private createReservationService: ICreateReservationService,
  ) {}

  @ApiOperation({ summary: '숙소 예약' })
  @ApiResponse({ status: 201 })
  @ApiTags('Reservation')
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createRese(
    @CurrentUser('user') currentUser: TokenPayload,
    @Body() createReservationReqDto: CreateReservationReqDto,
  ): Promise<CreateReservationResDto> {
    const { userId } = currentUser;
    const { checkInAt, checkOutAt } = createReservationReqDto;
    const duration = getDuration(checkInAt, checkOutAt);
    return this.createReservationService.execute({
      ...createReservationReqDto,
      userId,
      duration,
    });
  }
}
