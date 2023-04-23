import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bookings } from './bookings.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Bookings, (booking) => booking.user)
  bookings: Bookings[];
}
