import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GetHouseByIdRepository } from '../../house/repositories';
import { IGetHouseByIdRepository } from '../../house/interfaces';
import {
  CreateReservationServiceInputDto,
  CreateReservationServiceOutputDto,
  ICheckReservationAvailableRepository,
  ICreateReservationRepository,
  ICreateReservationService,
} from '../interfaces';
import {
  CreateReservationRepository,
  CheckReservationAvailableRepository,
} from '../repositories';

@Injectable()
export class CreateReservationService implements ICreateReservationService {
  constructor(
    @Inject(GetHouseByIdRepository)
    private getHouseByIdRepository: IGetHouseByIdRepository,
    @Inject(CheckReservationAvailableRepository)
    private checkReservationAvailableRepository: ICheckReservationAvailableRepository,
    @Inject(CreateReservationRepository)
    private createReservationRepository: ICreateReservationRepository,
  ) {}

  async execute(
    params: CreateReservationServiceInputDto,
  ): Promise<CreateReservationServiceOutputDto> {
    const { houseId, checkInAt, checkOutAt, duration } = params;
    const house = await this.getHouseByIdRepository.execute(houseId);
    if (!house) {
      throw new BadRequestException('존재하지 않는 숙소');
    }

    const reservationAvailable =
      await this.checkReservationAvailableRepository.execute({
        houseId,
        checkInAt,
        checkOutAt,
      });

    if (!reservationAvailable) {
      throw new BadRequestException('비정상적인 요청');
    }

    const pricePerDay = house.getPricePerDay();
    const totalPrice = pricePerDay * duration;

    const reservation = await this.createReservationRepository.execute({
      ...params,
      totalPrice,
    });

    return reservation.getId();
  }
}
