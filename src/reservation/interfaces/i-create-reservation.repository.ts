import { Reservation } from '../../entities/reservation.entity';

export interface CreateReservationRepositoryInputDto {
  userId: string;
  houseId: string;
  checkInAt: string;
  checkOutAt: string;
  totalPrice: number;
}

export interface ICreateReservationRepository {
  execute(params: CreateReservationRepositoryInputDto): Promise<Reservation>;
}
