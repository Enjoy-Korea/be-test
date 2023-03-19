export interface CreateReservationServiceInputDto {
  userId: string;
  houseId: string;
  checkInAt: string;
  checkOutAt: string;
  duration: number;
}

export interface CreateReservationServiceOutputDto {
  reservationId: string;
}
export interface ICreateReservationService {
  execute(
    params: CreateReservationServiceInputDto,
  ): Promise<CreateReservationServiceOutputDto>;
}
