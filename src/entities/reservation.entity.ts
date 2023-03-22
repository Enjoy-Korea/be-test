import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { House } from './house.entity';
import { User } from './user.entity';

@Entity({ name: 'reservations' })
export class Reservation {
  constructor(
    userId: string,
    houseId: string,
    checkInAt: string,
    checkOutAt: string,
    duration: number,
    totalPrice: number,
    id: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.houseId = houseId;
    this.checkInAt = checkInAt;
    this.checkOutAt = checkOutAt;
    this.duration = duration;
    this.totalPrice = totalPrice;
  }
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'bigint' })
  userId: string;

  @Column({ type: 'bigint' })
  houseId: string;

  @Column({ type: 'char', length: 8 })
  checkInAt: string;

  @Column({ type: 'char', length: 8 })
  checkOutAt: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'int' })
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => House)
  house: House;

  public getId() {
    return { reservationId: this.id };
  }
}
