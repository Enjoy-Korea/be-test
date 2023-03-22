import { Image } from 'src/image/image.entity';
import { Reservation } from 'src/reservation/reservation.entity';
import { Sold } from 'src/sold/sold.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class House {
    @PrimaryGeneratedColumn({name: "house_id"})
    id: number

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    address: string;

    @Column()
    university: string; 

    @Column()
    houseType: string; 

    @Column()
    pricePerDay: number;

    @OneToMany(() => Sold, (sold) => sold.house)
    solds: Sold[];

    @OneToMany(() => Image, (image) => image.house, {cascade: true, eager: true})
    images: Image[];

    @OneToMany(() => Reservation, (reservation) => reservation.house)
    reservations: Reservation[];
}