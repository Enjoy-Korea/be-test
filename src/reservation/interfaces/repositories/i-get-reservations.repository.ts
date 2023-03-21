import { GetReservationsServiceOutputDto } from '../services/i-get-reservations.service';

export type GetReservationsRepositoryOutputDto =
  GetReservationsServiceOutputDto;

export interface IGetReservationsRepository {
  execute(userId: string): Promise<GetReservationsRepositoryOutputDto[]>;
}
