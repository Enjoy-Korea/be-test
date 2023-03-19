import { Reservation } from '../../../entities';

export interface IGetReservationsRepository {
  execute(userId: string): Promise<Reservation[]>;
}
