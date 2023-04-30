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
    return await this.reservationModel.getReservationByUserId(userId);
  }
}

const reservationService = new ReservationService(reservationModel);

export { reservationService };
