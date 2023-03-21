import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class House {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    address: string;

    @Column()
    university: string; // 이거 테이블 따로 뺴야되나?

    @Column()
    houseType: string; // 이건 enum으로 처리하는게 좋을듯.

    @Column()
    pricePerDay: number;
}