import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HouseService } from 'src/house/house.service';
import { SoldService } from 'src/sold/sold.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { MakeReservationDto } from './dtos/make-reservation.dto';
import { Reservation } from './reservation.entity';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
        @Inject(SoldService) private readonly soldService: SoldService,
        @Inject(HouseService) private readonly houseService: HouseService
    ) { }

    async create(makeReservationDto: MakeReservationDto, currentUser: User) {
        const houseId = parseInt(makeReservationDto.houseId);
        const [house] = await this.houseService.findOne(houseId)

        const currentDate = new Date(makeReservationDto.checkInDate);
        const endDate = new Date(makeReservationDto.checkOutDate);
        
        const reservations = [];
        while (currentDate <= endDate) {
            const reservation = this.reservationRepository.create({ date: currentDate });

            reservation.user = currentUser;
            reservation.house = house;

            reservations.push(await this.reservationRepository.save(reservation));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return reservations;
    }

    async findAll(currentUser: User) {
        return await this.reservationRepository.find({
            where: {
                userId: currentUser.id
            }
        });
    }
}
