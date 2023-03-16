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

  @ManyToOne(() => House, (house) => house.images)
  user: User;

  @ManyToOne(() => House, (house) => house.images)
  house: House;
}
