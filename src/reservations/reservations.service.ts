import "dotenv/config";
import { reservationModel, ReservationModel } from "./reservations.model";

class ReservationService {
  private reservationModel: ReservationModel;

  constructor(reservationModel: ReservationModel) {
    this.reservationModel = reservationModel;
  }

  async createReservation(userId: number, accommodationId: number, checkInDate: string, checkOutDate: string): Promise<void> {
    this.reservationModel.createReservation(userId, accommodationId, checkInDate, checkOutDate);
  }
}

const reservationService = new ReservationService(reservationModel);

export { reservationService };
