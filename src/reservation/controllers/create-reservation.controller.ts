import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReservationService } from '../services';
import { ICreateReservationService } from '../interfaces';
import { CreateReservationReqDto, CreateReservationResDto } from '../dtos';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, TokenPayload } from '../../commons';
import { getDuration } from '../../house/utils/getDuration';

@Controller('api/reservations')
export class CreateReservationController {
  constructor(
    @Inject(CreateReservationService)
    private createReservationService: ICreateReservationService,
  ) {}

  @ApiOperation({ summary: '숙소 예약' })
  @ApiResponse({
    status: 201,
    description: '숙소 예약 성공',
    type: CreateReservationResDto,
  })
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
