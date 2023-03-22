import { House } from 'src/house/house.entity';
import { User } from 'src/user/user.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Reservation {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    houseId:number

    @PrimaryColumn()
    date: Date

    @ManyToOne(() => User, (user) => user.reservations, { eager: true })
    @JoinColumn()
    user: User;

    @ManyToOne(() => House, (house) => house.reservations, { eager: true })
    @JoinColumn()
    house: House;
}