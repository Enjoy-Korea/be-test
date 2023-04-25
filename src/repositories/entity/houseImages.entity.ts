import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Houses } from './houses.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'house_images' })
export class HouseImages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  url: string;

  @Column()
  key: number;

  @ManyToOne(() => Houses, (house) => house.images)
  houses?: Houses;
}
