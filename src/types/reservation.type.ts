export interface Reservation {
  reservationId: number;
  reservationDate: Date;
  userId: number;
  useEmail: string;
  name: string;
  description: string;
  pricePerDay: number;
  accommodationAddress: string;
  checkIn: Date | string;
  checkOut: Date | string;
}
