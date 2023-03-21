import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true, name: "refresh_token" })
    refreshToken: string;

    // @OneToMany(() => Space, (space) => space.user)
    // spaces: Space[];
}