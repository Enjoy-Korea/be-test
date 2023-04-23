import { Controller, Body, Post, Query, Get } from '@nestjs/common';
import { BookingInfoDTO } from './interface/bookingInfo.dto';
import { Bookings } from 'src/repositories/entity/bookings.entity';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}
  @Post()
  async createBooking(@Body() bookingInfo: BookingInfoDTO): Promise<Bookings> {
    return await this.bookingService.createBooking(bookingInfo);
  }

  @Get()
  async getBookingList(@Query('userId') userId: number) {
    return await this.bookingService.getBookingList(userId);
  }
}
