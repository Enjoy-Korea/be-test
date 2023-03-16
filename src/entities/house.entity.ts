import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Image } from './image.entity';
import { houseTypes } from './../commons/enums/houseTypes';

@Entity()
export class House {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 20 })
  university: string;

  @Column({ type: 'enum', enum: houseTypes })
  houseType: houseTypes;

  @Index()
  @Column({ type: 'int' })
  pricePerDay: number;

  @OneToMany(() => Image, (image) => image.house)
  images: Array<Image>;
}
