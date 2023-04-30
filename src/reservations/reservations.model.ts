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
        a.id as reservation_id,
        a.created_at as reservation_date,
        b.id as user_id,
        b.email as use_email,
        c.title as name,
        c.description as description,
        c.price as pricePerDay,
        c.address as accommodation_address,
        a.check_in_date as check_in,
        a.check_out_date as check_out
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
