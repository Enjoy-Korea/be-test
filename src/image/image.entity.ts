import { House } from 'src/house/house.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Image {
    @PrimaryColumn()
    id: number

    @ManyToOne(() => House, (house) => house.images)
    @JoinColumn()
    house: House;

    @Column()
    url: string;

    @Column()
    key: number;
}