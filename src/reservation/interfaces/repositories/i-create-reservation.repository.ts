import { Reservation } from '../../../entities';

export interface CreateReservationRepositoryInputDto {
  userId: string;
  houseId: string;
  checkInAt: string;
  checkOutAt: string;
  duration: number;
  totalPrice: number;
}

export interface ICreateReservationRepository {
  execute(params: CreateReservationRepositoryInputDto): Promise<Reservation>;
}
