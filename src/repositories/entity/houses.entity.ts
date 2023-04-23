import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { HouseImages } from './houseimages.entity';
import { Bookings } from './bookings.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'houses' })
export class Houses extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'houses_id' })
  houseId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  university: string;

  @Column({ name: 'houseType' })
  houseType: string;

  @Column({ name: 'pricePerDay' })
  pricePerDay: number;

  @OneToMany(() => HouseImages, (houseImage) => houseImage.houses)
  houseImages: HouseImages[];

  @OneToMany(() => Bookings, (booking) => booking.house)
  bookings: Bookings[];
}
