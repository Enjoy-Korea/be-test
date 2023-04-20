import {
  Controller,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create.reservation.dto';
import { AccessTokenGuard } from 'src/auth/jwt/access.guard';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/decorater/get.user.decorater';

@Controller('reservations')
@UseGuards(AccessTokenGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post(':id')
  @UsePipes(ValidationPipe)
  createReservation(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    const userId = user.id;
    const houseId = Number(id);
    const reservationInfo = {
      userId,
      houseId,
      ...createReservationDto,
    };
    return this.reservationsService.createReservation(reservationInfo);
  }
}
