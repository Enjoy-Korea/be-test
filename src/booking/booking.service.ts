import { Injectable } from '@nestjs/common';
import { Bookings } from 'src/repositories/entity/bookings.entity';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { BookingInfoDTO } from './interface/bookingInfo.dto';

@Injectable()
export class BookingService {
  constructor(private repositoriesService: RepositoriesService) {}

  async createBooking(bookingInfo: BookingInfoDTO): Promise<Bookings> {
    return await this.repositoriesService.createBooking(bookingInfo);
  }

  async getBookingList(userId: number): Promise<Bookings[]> {
    return await this.repositoriesService.getBookingList(userId);
  }
}
