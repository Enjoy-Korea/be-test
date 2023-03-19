export interface CheckReservationAvailableRepositoryInputDto {
  houseId: string;
  checkInAt: string;
  checkOutAt: string;
}

export interface ICheckReservationAvailableRepository {
  execute(
    params: CheckReservationAvailableRepositoryInputDto,
  ): Promise<boolean>;
}
