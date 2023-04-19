import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { House } from './house.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @OneToOne(() => House, (house) => house.reservation)
  @JoinColumn()
  house: House;

  @Column()
  check_in: Date;

  @Column()
  check_out: Date;
}
