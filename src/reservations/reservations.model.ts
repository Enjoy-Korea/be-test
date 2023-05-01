import pool from "../db/db.index";
import { Reservation } from "../types/reservation.type";

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

  async getReservationByUserId(userId: number): Promise<Reservation[]> {
    const [reservationInfo] = await pool.query(
      `
      SELECT
        a.id as reservationId,
        a.created_at as reservationDate,
        b.id as userId,
        b.email as useEmail,
        c.title as name,
        c.description as description,
        c.price as pricePerDay,
        c.address as accommodationAddress,
        a.check_in_date as checkIn,
        a.check_out_date as checkOut
      FROM
        reservation a,
        user b,
        accommodation c
      WHERE a.user_id = b.id
      AND a.accommodation_id = c.id
      AND b.id = ?
      ORDER BY a.created_at;
      `,
      [userId]
    );

    return reservationInfo;
  }
}

const reservationModel = new ReservationModel();

export { reservationModel };
