import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Houses } from './houses.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'house_images' })
export class HouseImages extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'house_images_id' })
  houseImageId: number;

  @Column()
  url: string;

  @Column()
  key: number;

  @ManyToOne(() => Houses, (house) => house.houseImages)
  houses: Houses;
}
