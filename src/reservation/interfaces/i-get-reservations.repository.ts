import { Reservation } from '../../entities/reservation.entity';

export interface IGetReservationsRepository {
  execute(userId: string): Promise<Reservation[]>;
}
