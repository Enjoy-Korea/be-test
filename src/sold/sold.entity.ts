import { House } from 'src/house/house.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm'

@Entity()
export class Sold {
    @PrimaryColumn()
    houseId: number

    @PrimaryColumn()
    date: Date;

    @ManyToOne(() => House, (house) => house.solds, { eager: true })
    @JoinColumn()
    house: House;
}