import "dotenv/config";
import { reservationModel, ReservationModel } from "./reservations.model";
import { Reservation } from "../types/reservation.type";

class ReservationService {
  private reservationModel: ReservationModel;

  constructor(reservationModel: ReservationModel) {
    this.reservationModel = reservationModel;
  }

  async createReservation(userId: number, accommodationId: number, checkInDate: string, checkOutDate: string): Promise<void> {
    this.reservationModel.createReservation(userId, accommodationId, checkInDate, checkOutDate);
  }

  async getReservationByUserId(userId: number): Promise<Reservation[]> {
    const reservation = await this.reservationModel.getReservationByUserId(userId);
    reservation.forEach((val) => {
      let curCheckInDate = val.checkIn as Date;
      let curCheckOutDate = val.checkOut as Date;

      val.checkIn = curCheckInDate.toISOString().slice(0, 10);
      val.checkOut = curCheckOutDate.toISOString().slice(0, 10);
    });

    return reservation;
  }
}

const reservationService = new ReservationService(reservationModel);

export { reservationService };
