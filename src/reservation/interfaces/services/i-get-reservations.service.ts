export interface houseInfo {
  houseId: string;
  name: string;
  address: string;
  university: string | null;
  houseType: string;
  imageUrl: string;
}

export interface GetReservationsServiceOutputDto {
  reservationId: string;
  checkInAt: string;
  checkOutAt: string;
  duration: number;
  totalPrice: number;

  house: houseInfo;
}

export interface IGetReservationsService {
  execute(userId: string): Promise<Array<GetReservationsServiceOutputDto>>;
}
