export interface GetReservationsServiceOutputDto {
  reservationId: string;
  houseId: string;
  checkInAt: string;
  checkOutAt: string;
  duration: number;
  totalPrice: number;
  createdAt: Date;
  name: string;
  address: string;
  university: string;
  houseType: string;
  imageUrl: string;
}

export interface IGetReservationsService {
  execute(userId: string): Promise<GetReservationsServiceOutputDto[]>;
}
