import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;
    // FK1

    // FK2

    @Column()
    guestNumber: number;

    @Column()
    checkInAt: Date

    @Column()
    checkOutAt: Date
}