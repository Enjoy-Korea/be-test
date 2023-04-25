import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { HouseImages } from './entity/houseimages.entity';
import { Houses } from './entity/houses.entity';
import { Bookings } from './entity/bookings.entity';
import { CreateHouseDTO } from 'src/house/interface/house.dto';
import { HouseImagesDTO } from 'src/house/interface/houseimage.dto';
import { BookingInfoDTO } from 'src/booking/interface/bookingInfo.dto';
import { UserDTO } from 'src/auth/interface/auth.dto';
import { SignUpResult } from 'src/auth/interface/auth.interface';

@Injectable()
export class RepositoriesService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(HouseImages)
    private houseImagesRepository: Repository<HouseImages>,
    @InjectRepository(Houses)
    private housesRepository: Repository<Houses>,
    @InjectRepository(Bookings)
    private bookingsRepository: Repository<Bookings>,
  ) {}

  async upsertUser(userInfo: UserDTO): Promise<SignUpResult> {
    try {
      await this.usersRepository.save(userInfo);
      return { email: userInfo.email, message: 'signUp' };
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getUser(email: string): Promise<Users> {
    try {
      return await this.usersRepository.findOne({
        where: {
          email: email,
        },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async createHouse(newHouesInfo: CreateHouseDTO): Promise<Houses> {
    try {
      const houseSavedInfo = await this.housesRepository.save(newHouesInfo);
      return houseSavedInfo;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getHouseDetail(houseId: number): Promise<Houses> {
    try {
      return this.housesRepository.findOne({
        where: { id: houseId },
        relations: ['images'],
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getHouseList(
    start: number,
    limit: number,
    sort: string,
    order: string,
  ): Promise<Houses[]> {
    const orderType = {};
    orderType[sort] = order;

    try {
      return await this.housesRepository.find({
        skip: start,
        take: limit,
        relations: ['houseImages'],
        order: orderType,
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async createBooking(bookingInfo: BookingInfoDTO): Promise<Bookings> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: bookingInfo.userId },
      });

      const house = await this.housesRepository.findOne({
        where: { id: bookingInfo.houseId },
      });

      if (user && house) {
        const createdBookingInfo: Bookings = {
          user: user,
          house: house,
          checkinDate: bookingInfo.checkinDate,
          checkoutDate: bookingInfo.checkoutDate,
        };
        return await this.bookingsRepository.save(createdBookingInfo);
      } else {
        throw new InternalServerErrorException();
      }
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getBookingList(userId: number): Promise<Bookings[]> {
    try {
      return await this.bookingsRepository.find({
        where: { user: { id: userId } },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async createHouseImage(houseImages: HouseImages[]): Promise<HouseImages[]> {
    try {
      return await this.houseImagesRepository.save(houseImages);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
