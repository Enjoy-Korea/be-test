import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Image } from './image.entity';
import { houseTypesEnum } from '../commons/enums/house-types.enum';
import { map, toArray } from '@fxts/core';

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

  @Column({ type: 'enum', enum: houseTypesEnum })
  houseType: string;

  @Index()
  @Column({ type: 'int' })
  pricePerDay: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Image, (image) => image.house)
  @JoinColumn()
  images: Array<Image>;

  public getId() {
    return { houseId: this.id };
  }

  public getInfo() {
    return {
      houseId: this.id,
      name: this.name,
      description: this.description,
      address: this.address,
      university: this.university ?? null,
      houseType: this.houseType,
      pricePerDay: this.pricePerDay,
      images: toArray(
        map(
          (image: Image) => ({ url: image.url, key: image.key }),
          this.images,
        ),
      ),
    };
  }

  public getPricePerDay() {
    return this.pricePerDay;
  }

  public getInfoForList() {
    return {
      name: this.name,
      university: this.university ?? null,
      houseType: this.houseType,
      pricePerDay: this.pricePerDay,
      images: this.images,
    };
  }
}
