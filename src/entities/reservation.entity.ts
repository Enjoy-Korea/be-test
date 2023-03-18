import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { House } from './house.entity';
import { User } from './user.entity';

@Entity({ name: 'reservations' })
export class Reservation {
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

  @ManyToOne(() => House, (house) => house.images)
  user: User;

  @ManyToOne(() => House, (house) => house.images)
  house: House;

  public getId() {
    return { reservationId: this.id };
  }
}
