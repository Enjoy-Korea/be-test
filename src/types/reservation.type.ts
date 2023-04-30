export interface Reservation {
  reservation_id: number;
  reservation_date: Date;
  user_id: number;
  use_email: string;
  name: string;
  description: string;
  pricePerDay: number;
  accommodation_address: string;
  check_in: string;
  check_out: string;
}
