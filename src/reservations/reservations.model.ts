import pool from "../db/db.index";

export class ReservationModel {
  async createReservation(userId: number, accommodationId: number, checkInDate: string, checkOutDate: string): Promise<void> {
    await pool.query(
      `
      INSERT INTO reservation(user_id, accommodation_id, check_in_date, check_out_date)
      VALUES (?, ?, ?, ?);
      `,
      [userId, accommodationId, checkInDate, checkOutDate]
    );
  }

  async getReservationByUserId() {
    const reservationInfo = await pool.query(
      `
      `,
      []
    );

    return reservationInfo;
  }
}

const reservationModel = new ReservationModel();

export { reservationModel };
