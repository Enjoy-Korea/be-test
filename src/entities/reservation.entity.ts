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
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  userId: string;

  @Column()
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

  public getInfo() {
    return {
      reservationId: this.id,
      checkInAt: this.checkInAt,
      checkOutAt: this.checkOutAt,
      duration: this.duration,
      totalPrice: this.totalPrice,
      house: {
        houseId: this.houseId,
        name: this.house.name,
        address: this.house.address,
        university: this.house.university ?? null,
        houseType: this.house.houseType,
        imageUrl: this.house.images![0].url ?? null,
      },
    };
  }
}
