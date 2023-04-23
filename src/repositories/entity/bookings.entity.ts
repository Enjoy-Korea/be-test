import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';
import { Houses } from './houses.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'bookings' })
export class Bookings extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'booking_id' })
  bookingId: number;

  @ManyToOne(() => Users, (user) => user.bookings)
  user: Users;

  @ManyToOne(() => Houses, (house) => house.bookings)
  house: Houses;

  @Column({ name: 'checkin_date' })
  checkinDate: Date;

  @Column({ name: 'checkout_date' })
  checkoutDate: Date;
}
