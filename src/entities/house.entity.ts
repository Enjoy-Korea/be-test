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
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  university: string;

  @Column({ type: 'enum', enum: houseTypes })
  houseType: string;

  @Index()
  @Column({ type: 'int' })
  pricePerDay: number;

  @OneToMany(() => Image, (image) => image.house)
  images: Array<Image>;

  public getId() {
    return { houseId: this.id };
  }
}
