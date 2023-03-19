import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { House } from './house.entity';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'bigint' })
  houseId: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'int' })
  key: number;

  @ManyToOne(() => House, (house) => house.images)
  house: House;
}
