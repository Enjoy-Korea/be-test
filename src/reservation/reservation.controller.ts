import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { Body, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { MakeReservationDto } from './dtos/make-reservation.dto';
import { ReservationService } from './reservation.service';

@UseGuards(AccessTokenGuard)
@Controller('reservation')
export class ReservationController {
    
    constructor(private readonly reservationService: ReservationService) { }


    @Post()
    @UsePipes(ValidationPipe)
    makeReservation(@Body() makeReservationDto: MakeReservationDto, @CurrentUser() currentUser: User) {
        return this.reservationService.create(makeReservationDto, currentUser)
    }

    @Get()
    reservations(@CurrentUser() currentUser: User) {
        return this.reservationService.findAll(currentUser);
    }
}
