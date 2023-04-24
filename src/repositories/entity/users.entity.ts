import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bookings } from './bookings.entity';
import { BaseEntity } from './base.entity';
import { toUSVString } from 'util';

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ name: 'refreash_token', nullable: true })
  refreshToken?: string;

  @OneToMany(() => Bookings, (booking) => booking.user)
  bookings: Bookings[];
}
